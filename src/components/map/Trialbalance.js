import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce, head, set } from "lodash";
import Select from 'react-select';
import { IconFlagSearch } from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Plus, RefreshCcw, Search, ArrowUp, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";
import GLModal from "../commonpopups/GLModal";



const Trialbalance = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [pageno, setPageNo] = useState(1);
    const records = 10;
    const [Trialbalance, setTrialbalance] = useState([]);
    const [ids, setIds] = useState(null);
    const [TrialbalanceAdd, setTrialbalanceAdd] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showTB, setShowTB] = useState(false);
    const [showGl, setShowGl] = useState(false);
    const [title, setTitle] = useState("Create");
    const [header, setHeader] = useState("Create a New Trialbalance");
    const [isEditMode, setIsEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const [FrameworkID, setFrameworkID] = useState("");
    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [fallingunder, setFallingUnder] = useState([]);
    const active = Trialbalance.filter(item => item.is_active);
    const inactive = Trialbalance.filter(item => !item.is_active);
    const displayed = showActive ? active : inactive;
    const [selecteGlId, setSelecteGlId] = useState(null);
    const [GLDropDown, setGLDropDown] = useState([]);
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [searchGlName, setSearchGlName] = useState('');
    const [searchOA, setSearchOA] = useState('');
    const [searchCA, setSearchCA] = useState('');
    const [searchDA, setSearchDA] = useState('');
    const [searchNA, setSearchNA] = useState('');
    const [selectedGl, setSelectedGl] = useState(null);
    const [fsliList, setFsliList] = useState([]);
    const [OthersMap, setOthersMap] = useState([]);
    const [OthersMapAdd, setOthersMapAdd] = useState([]);



    // Sorting function
    const handleSort = (column) => {
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';
        setSortOn(column);
        setSortDir(newSortDir);

        getAllTrialbalance(); // call API again after sort change
    };

    // Sorting icon (example basic function)
    const getSortingIcon = (column) => {
        if (sortOn !== column) return <ChevronUp size={16} />;
        return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    };


    const decodeData = (data) => {
        return decodeURIComponent(atob(data));
    };

    const location = useLocation();
    console.log(location, "ggg");
    // const { id } = useParams(); 
    const queryParams = new URLSearchParams(location.search);
    const tbs = decodeData(queryParams.get("tbs"));
    const locationId = decodeData(queryParams.get("location_id"));
    const BatchId = decodeData(queryParams.get("batch_id"));

    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());

    }, []);





    const formTB = useForm({
        mode: "onChange",
    });

    // const formMap = useForm({
    //     mode: "onChange",
    // });

    const formMap = useForm({
        defaultValues: {
          gl_code: "",
          gl_name: "",
          fsli_master_id: "",
          falling_under_id: "",
          is_active: true,
        }
      });


    const resetAllForms = () => {
        // formTan.reset();
        formTB.reset();
        formMap.reset();

    };




    useEffect(() => {
        if (EntityID && showActive) {
            getAllTrialbalance();
            getAllGLDropdwon(EntityID);
            getAllFallingUnder(EntityID ,FrameworkID);

        }
        else {
            getAllInactive(EntityID);

        }

    }, [EntityID, showActive, pageno, records]);

    const deleteTB = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteChartofAcc}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming Trialbalance is the state that holds the list of accounts
                    const updatedTrialbalance = Trialbalance.filter((item) => item.id !== id);
                    setTrialbalance(updatedTrialbalance); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleCloseTB(); // Close modal or any UI element that needs closing
                    getAllTrialbalance();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleCloseTB(); // Close modal or any UI element that needs closing
                    getAllTrialbalance();

                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    swal("Error", "You don't have permission to delete this item!", "error");
                } else {
                    swal("Error", "Something went wrong!", "error");
                }
            });
    };



    const getAllFallingUnder = () => {
            const requestData = {
                entity_id: EntityID,
                // framework_id: FrameworkID,
            };
    
            commonService.add(apiUrlsService.getAllOthresMap, requestData)
                .then((response) => {
                    if (response && response.data) {
                        console.log("mani", response.data);
    
                        // Filter the data to include only items with node_level = 1
                        const filteredData = response.data.data;
    
                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.gl_name
                        }));
    
                        setFallingUnder(transformedData); // Set the filtered and transformed data as options
                    }
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error fetching data:", error);
                });
        };





    const getAllTrialbalance = (key = "", value = "") => {
        const requestData = {
            entity_id: EntityID,
            period_id: Id,
            batch_id: BatchId,
            key: key,
            value: value,
            sortOn: sortOn,
            sortDir: sortDir
        };
        const status = showActive ? 1 : 0;

        commonService.add(
            `${apiUrlsService.getAllTrialBalancedTb}?page=${pageno}&limit=${records}&is_active=${status}`,
            requestData
        )
            .then((response) => {
                console.log("API TB :", response.data.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setTrialbalance(response.data.data);
                        setTotalElements(response.data.total);
                    } else {
                        swal(response.data.error);
                        setTrialbalance([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllGLDropdwon = () => {
        const requestData = {
            entity_id: EntityID,

        };

        commonService.add(`${apiUrlsService.getAllGldropdown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.gl_name
                        }));

                        setGLDropDown(transformedData);
                    } else {
                        swal(response.data.error);
                        setGLDropDown([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    const getAllInactive = () => {

        const requestData = {
            entity_id: EntityID,
        }

        commonService.add(apiUrlsService.getAllInactiveChartofAccounts, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setTrialbalance(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        swal(response.data.error);
                        // setInactive([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllActive = (id) => {

        commonService.update(`${apiUrlsService.getActiveChartofAccounts}/${id}`)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setTrialbalance(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                        swal("Success", "Active successfully!", "success");
                        handleCloseTB(); // Close modal or any UI element that needs closing
                        getAllTrialbalance();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleCloseTB(); // Close modal or any UI element that needs closing
                        getAllTrialbalance();
                    }

                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const onSubmit = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,
            created_by: auth.login_id,
            location_id: locationId,
            period_id: Id,
            gl_id: data.gl_id,
            batch_id: BatchId,
            credit_amount: parseFloat(data.credit_amount),
            debit_amount: parseFloat(data.debit_amount),
            opening_amount: parseFloat(data.opening_amount)

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addTrialBalancedTb, requestData)
                .then((res) => {
                    setTrialbalanceAdd([...TrialbalanceAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseTB();
                    getAllTrialbalance();
                })
                .catch((error) => {
                    swal(error.error);

                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsService.editTrialbalance}/${ids}`, requestData)

                .then((res) => {
                    const updatedTrialbalance = Trialbalance.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setTrialbalance(updatedTrialbalance);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseTB();
                    getAllTrialbalance();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };

    const handleCloseTB = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowTB(false)
        reset(); // Reset the form state
        resetAllForms();

        setShowDeleteButton(false);

    }

    const handleCloseTBOverride = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleShowEdit = (id) => {
        // console.log(Trialbalance, "this is the id for id");

        const itemToEdit = Trialbalance.find((item) => item.id === id);
        // console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setHeader("Update Batch");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            setIsEditMode(true);
            // setShow(true);
            reset();


        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Create");
            setHeader("Create a New Trialbalance");
            setIds(null);
            setShowDeleteButton(false);
            setIsEditMode(true);
            // setShow(true);
            reset();

        }
        setShowTB(true);
        reset();
    };

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });


    const handleShowTB = () => {
        // reset();
        setShowTB(true);
        setTitle("Create");
        setHeader("Create a New Trialbalance");
    }

    const handleReset = () => {
        setSearchGlName('');
        setSearchOA('');
        setSearchNA('');
        setSearchCA('');
        setSearchDA('');
        getAllTrialbalance();
    };

    const handleCloseGl = () => {
 
        // handleShowGl()
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowGl(false)
        reset(null); // Reset the form state
        resetAllForms();
        formMap.reset(); // Reset the form state for GL Modal
        setShowDeleteButton(false);



    }

    
    

    const handleShowGl = () => {
        // alert("show gl")
        resetAllForms();
        setShowGl(true);    
        getAllGLDropdwon();
        getAllFallingUnder();
        setTitle("Create");
        setHeader("Create a New Trialbalance");
        formMap.reset(); // Reset the form state for GL Modal
    }



    return (
        <div className="">

            <div className="table-top-area d-flex justify-content-between custom-table-search">
                <h6 className=""> <Link to={"/data/trial-balance"}> All Trialbalance</Link> / {tbs && <span> {tbs}</span>}    </h6>

                {/* <div className="form-check form-switch d-flex align-items-center gap-1 table-list-status">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="statusToggle"
                        checked={showActive}
                        onChange={() => setShowActive(!showActive)}

                    />
                    <label className="" htmlFor="statusToggle">
                        {showActive ? 'Active' : 'Inactive'}
                    </label>


                </div> */}




                <div className="d-flex">

                    <div className="position-relative mx-2" style={{ width: '250px' }}>
                        {/* <input
                            type="text"
                            placeholder="Search..."
                            className="form-control pe-4"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
                            style={{ cursor: 'pointer' }}
                        >
                            <Search size={'18'} className="" />
                        </span> */}
                    </div>


                    <div className="d-flex align-items-center">

                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowTB()}
                        >
                            <Plus size={15} /> Create
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-design-1">
                    <thead>
                        <tr className="bg-light">

                            <th width="8%" onClick={() => handleSort('sno')}>
                                S.No {getSortingIcon('sno')}
                            </th>
                            <th onClick={() => handleSort('gl_name')}>
                                GL Name {getSortingIcon('gl_name')}
                            </th>
                            <th onClick={() => handleSort('opening_amount')}> Opening Amount
                                {getSortingIcon('opening_amount')}
                            </th>
                            <th onClick={() => handleSort('debit_amount')}> Debit Amount  {getSortingIcon('debit_amount')}</th>
                            <th onClick={() => handleSort('credit_amount')}> Credit Amount  {getSortingIcon('credit_amount')}</th>
                            <th onClick={() => handleSort('net_amount')}> Net Amount  {getSortingIcon('net_amount')}</th>
                        </tr>

                        <tr className="inline-col-search">

                            <th> </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchGlName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchGlName(value);
                                            getAllTrialbalance('gl_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchOA}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchOA(value);
                                            getAllTrialbalance('opening_amount', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchDA}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchDA(value);
                                            getAllTrialbalance('debit_amount', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchCA}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchCA(value);
                                            getAllTrialbalance('credit_amount', value);


                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchNA}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchNA(value);
                                            getAllTrialbalance('net_amount', value);


                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            {/* 
                            <th className="text-center">
                                <button className=" btn btn-sm p-0 px-2" onClick={handleReset}> <RefreshCcw size={16} /> </button>

                            </th> */}
                        </tr>

                    </thead>
                    <tbody>
                        {Array.isArray(displayed) && displayed.length > 0 ? (
                            displayed.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr onClick={() => handleShowEdit(item.id)} className="tr-hover-effect1" key={item.id}>
                                        <td >{sNo}</td>
                                        <td >{item.gl_name}</td>
                                        <td >{item.opening_amount}</td>
                                        <td >{item.debit_amount}</td>
                                        <td >{item.credit_amount}</td>
                                        <td >{item.net_amount}</td>

                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>

            <div className="d-flex justify-content-between custom-pagination">
                <div className="show-records">
                    <span>
                        Showing {(pageno - 1) * records + 1} to{" "}
                        {totalElements < pageno * records ? totalElements : pageno * records} of {totalElements} entries
                    </span>
                </div>
                <div>
                    <Pagination
                        totalElements={totalElements}
                        recordsPerPage={records}
                        pageNumber={pageno}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <div className="model_box">
                <Modal
                    show={showTB}
                    onHide={handleCloseTB}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {isEditMode ? header : header} </Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formTB.handleSubmit(onSubmit)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container ">
                                    <div className="row pt-1 mt-1">

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Select GL Name <span className="text-danger">*</span>
                                                    <button
                                                        type="button"
                                                        className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                                                        title="Create New GL "
                                                        onClick={() => handleShowGl()}
                                                    >
                                                        <Plus size={15} />
                                                    </button>
                                                </label>
                                                <Controller
                                                    name="gl_id"
                                                    control={formTB.control}
                                                    defaultValue={editData?.gl_id || ''}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={GLDropDown}
                                                            isSearchable
                                                            placeholder="Select"
                                                            className="react-select-container flex-grow-1"
                                                            classNamePrefix="custom-select"
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                            value={GLDropDown.find(option => option.value === field.value)}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.location_id && (
                                                <small className="text-danger ms-3">This field is required.</small>
                                            )}
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Opening Amount<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Opening Amount"
                                                    className="form-control"
                                                    {...formTB.register("opening_amount", { required: true })}
                                                    defaultValue={editData ? editData.opening_amount : ""}
                                                />
                                            </div>

                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Debit Amount<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Debit Amount"
                                                    className="form-control"
                                                    {...formTB.register("debit_amount", { required: true })}
                                                    defaultValue={editData ? editData.debit_amount : ""}
                                                />
                                            </div>

                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Credit Amount<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Credit Amount"
                                                    className="form-control"
                                                    {...formTB.register("credit_amount", { required: true })}
                                                    defaultValue={editData ? editData.credit_amount : ""}
                                                />
                                            </div>

                                        </div>




                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            {showActive ? (
                                <>
                                    {showDeleteButton && (
                                        <button
                                            type="button"
                                            onClick={() => deleteTB(editData?.id)}
                                            className="btn btn-sm btn-danger mx-2"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button className="btn btn-primary btn-sm">
                                        {title}
                                    </button>
                                </>
                            ) : (
                                <button type="button" onClick={() => getAllActive(editData?.id)} className="btn btn-sm btn-success">
                                    Active
                                </button>
                            )}
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>

            <GLModal
                show={showGl}
                handleClose={handleCloseGl}
                title={selectedGl ? "Update" : "Create"}
                isEditMode={!!selectedGl}
                editData={editData}
                fslimaster={fsliList}
                fallingunder={fallingunder}
                showDeleteButton={!!editData}
                showActive={true}
                EntityID={EntityID}
                loginId={auth.login_id}
                ids={selectedGl?.id}
                setOthersMap={setOthersMap}
                setOthersMapAdd={setOthersMapAdd}
                OthersMapAdd={OthersMapAdd}
                OthersMap={OthersMap}
            />




        </div >
    );
};

export default Trialbalance;
