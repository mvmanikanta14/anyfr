import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, RefreshCcw, Search, ArrowUp, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import Select from 'react-select';
import apiUrlsModulesService from "../../services/apiUrlsModules.service";

const ArapArTranInvoices = ({ datas }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isManualPaging, setIsManualPaging] = useState(false);
    const [searchColObj, setsearchColObj] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [pageno, setPageNo] = useState(1);
    const records = 10;
    const [OthersMap, setOthersMap] = useState([]);
    const [ids, setIds] = useState(null);
    const [OthersMapAdd, setOthersMapAdd] = useState([]);
    const [editData, setEditData] = useState(null);
    const [editDataOverride, setEditDataOverride] = useState(null);
    const [show, setShow] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [showShareCaptial, setShareCaptial] = useState(false);

    const [showOverride, setShowOverride] = useState(false);
    const [title, setTitle] = useState("Add");
    const [header, setHeader] = useState("Create a New GL");
    const [isEditMode, setIsEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const [FrameworkID, setFrameworkID] = useState("");
    const [Finyear, setFinYear] = useState("");
    const [PeriodId, setPeriodId] = useState("");

    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [BulkMap, setBulkMap] = useState([]);
    const active = OthersMap.filter(item => item.is_active);
    const inactive = OthersMap.filter(item => !item.is_active);
    const displayed = showActive ? active : inactive;
    const [selecteGlname, setSelecteGlname] = useState(null);
    const [selecteGlId, setSelecteGlId] = useState(null);

    const [Shareholderdrop, setShareholderdrop] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [searchID, setsearchInvoiceDate] = useState('');
    const [searchIN, setsearchInvoiceNumber] = useState('');
    const [searchAmount, setsearchAmount] = useState('');
    const [searchPD, setsearchPD] = useState('');
    const [searchCP, setsearchCP] = useState('');
    const [searchPN, setsearchPN] = useState('');
    const [searchDD, setsearchDD] = useState('');
    const [searchNarration, setSearchNarration] = useState('');

    const [InvRegisterAdd, setInvRegisterAdd] = useState([]);




    const handleSort = (column) => {
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';

        // Immediately use the new values in the API call
        setSortOn(column);
        setSortDir(newSortDir);

        getAllListings("", "", column, newSortDir); // pass explicitly
    };



    const getSortingIcon = (column) => {
        if (sortOn === column) {
            return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
        } else {
            return (
                <div style={{ lineHeight: '1', fontSize: '10px', color: '#ccc' }}>
                    ▲<br />▼
                </div>
            );
        }
    };


    useEffect(() => {

        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());
        setFinYear(tokenService.getPeriodName());
        setPeriodId(tokenService.getEID());


        getAllshareholderdrop();


        if (EntityID) {
            if (!isManualPaging) {
                getAllListings();
            }
        }
    }, [EntityID, pageno, records]);





    const formInvRegister = useForm({
        mode: "onChange",
    });



    const deleteArapArtranInvList = (id) => {
        const deleteUrl = `${apiUrlsModulesService.deleteArapArtranInvList}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming OthersMap is the state that holds the list of accounts
                    const updatedOthersMap = OthersMap.filter((item) => item.id !== id);
                    setOthersMap(updatedOthersMap); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleCloseInvRegister(); // Close modal or any UI element that needs closing
                    getAllListings();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleCloseInvRegister(); // Close modal or any UI element that needs closing
                    getAllListings();

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




    const resetAllForms = () => {
        // formTan.reset();
        formInvRegister.reset();


    };

    const getAllListings = (key = "", value = "", passedSortOn = sortOn, passedSortDir = sortDir) => {

        setPageNo(1);

        const requestData = {
            entity_id: EntityID,
            key: key,
            value: value,
            searchFilters: {
                invoice_date: key === "invoice_date" ? value.trim() : searchID.trim(),
                invoice_number: key === "invoice_number" ? value.trim() : searchIN.trim(),
                amount: key === "amount" ? value.trim() : searchAmount.trim(),
                performance_date: key === "performance_date" ? value.trim() : searchPD.trim(),
                credit_period: key === "credit_period" ? value.trim() :
                    searchCP.trim(),
                due_date: key === "due_date" ? value.trim() :
                    searchDD.trim(),
                narration: key === "narration" ? value.trim() : searchNarration.trim(),


            },
            sortOn: passedSortOn,
            sortDir: passedSortDir,
        };
        // searchColObj = requestData;
        console.log("SEARCH VV", searchColObj)
        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsModulesService.getAllArapArtranInvList}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total);
                    } else {
                        swal(response.data.error);
                        setOthersMap([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const [selectedItems, setSelectedItems] = useState([]); // Track selected items

    const handleCheckboxChange = (id) => {
        const updatedData = displayed.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, selected: !item.selected }; // Toggle selected state
                return updatedItem;
            }
            return item;
        });
        setOthersMap(updatedData); // Update the displayed data state

        // Track the selected items based on the updated state
        const selectedIds = updatedData.filter(item => item.selected).map(item => item.id);
        setSelectedItems(selectedIds);
    };

    const handleSelectAll = () => {
        const newSelectionState = displayed.every(item => item.selected);
        const updatedData = displayed.map(item => ({
            ...item,
            selected: !newSelectionState, // Toggle selection for all
        }));

        setOthersMap(updatedData);

        // Update selectedItems state based on all rows being selected
        const selectedIds = updatedData.filter(item => item.selected).map(item => item.id);
        setSelectedItems(selectedIds);
    };


    const handlePageChange = (newPageNumber) => {


        setIsManualPaging(true); // 🔥 tell React: I'm handling manually now
        setPageNo(newPageNumber);


        const status = showActive ? 1 : 0;

        commonService.add(`${apiUrlsModulesService.getAllArapArtranInvList}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total);
                        setIsManualPaging(false); // ✅ After success, allow default API again
                    } else {
                        swal(response.data.error);
                        setOthersMap([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const getAllshareholderdrop = () => {


        const requestData = {
            entity_id: EntityID,
        };


        commonService.add(`${apiUrlsModulesService.getAllshareholderdrop}`, requestData)
            .then((response) => {


                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.party_name
                        }));

                        setShareholderdrop(transformedData);
                    } else {
                        swal(response.data.error);
                        setOthersMap([]);
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
                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllListings();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllListings();
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
            entity_id: EntityID,  // Ensure entity_id is a string
            created_by: auth.login_id,
            falling_under: data.falling_under,
            has_subsidiary: "false",
            is_party: "false",

        };

        if (ids) {
            requestData.is_active = true; // Add is_active for update only
        }

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssmap, requestData)
                .then((res) => {
                    setOthersMapAdd([...OthersMapAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
                    getAllListings();
                })
                .catch((error) => {
                    if (error.details && error.details.length > 0) {
                        error.details.forEach((detail) => {
                            swal("Validation", `Column: ${detail.column}, Message: ${detail.message}, Value: ${detail.value}`);
                        });
                    }
                    console.error("Error Mani:", error.details);
                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsService.editOthersMap}/${ids}`, requestData)

                .then((res) => {
                    const updatedOthersMap = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setOthersMap(updatedOthersMap);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllListings();
                })
                .catch((error) => {
                    console.error("Error:", error);

                });
        }
    };


    const onSubmitInvRegister = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,

            created_by: auth.login_id,
            // location_id: data.location_id, 

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsModulesService.addArapArtranInvList, requestData)
                .then((res) => {
                    setInvRegisterAdd([...InvRegisterAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseInvRegister();
                    getAllListings();
                })
                .catch((error) => {
                    swal(error.error);

                });
        } else {

            requestData.id = ids;

            requestData.updated_by = auth.login_id;

            commonService.update(`${apiUrlsModulesService.editArapArtranInvList}`, requestData)

                .then((res) => {
                    const updatedInvestmentRegister = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setInvRegisterAdd(updatedInvestmentRegister);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseInvRegister();
                    getAllListings();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };


    const handleClose = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShow(false)
        reset(); // Reset the form state
        resetAllForms();

        setShowDeleteButton(false);

    }


    const handleCloseInvRegister = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShareCaptial(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }


    const handleShowEdit = (id) => {
        console.log(OthersMap, "this is the id for id");

        const itemToEdit = OthersMap.find((item) => item.id === id);
        // console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setHeader("Update GL");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            setIsEditMode(true);
            // setShow(true);
            reset();



        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Create");
            setHeader("Create a New GL");
            setIds(null);
            setShowDeleteButton(false);
            setIsEditMode(true);
            // setShow(true);
            reset();

        }
        setShareCaptial(true);
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




    const handleShowShareCaptial = () => {
        // reset();
        setShareCaptial(true);
        setTitle("Add")
    }


    const handleShowOverride = (id, gl_name) => {
        // console.log(OthersMap, "this is the id for id");

        const itemToEdit = OthersMap.find((item) => item.id === id);
        // console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setIds(itemToEdit.id);
            setIsEditMode(true);
            // setShow(true);
            reset();


        }
        setShowOverride(true);
        setSelecteGlname(gl_name);
        setSelecteGlId(id);


    };

    const handleShowBulk = () => {

        setShowBulk(true);
        setTitle("Add")
    }



    const handleShowToggle = () => {
        setShowActive(!showActive);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setOthersMap([]);
            getAllListings();
        }
    };


    const handleReset = () => {

        setsearchInvoiceDate('');
        setsearchInvoiceNumber('');
        setsearchAmount('');
        setsearchPD('');
        setsearchCP('');
        setsearchDD('');
        setSearchNarration('');

        getAllListings();
    };



    return (
        <div className="">

            <div className="table-top-area d-flex justify-content-between custom-table-search">

                <div className="form-check form-switch d-flex align-items-center gap-1 table-list-status">
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


                    <button
                        style={{ display: selectedItems.length > 0 ? 'inline-block' : 'none' }}
                        onClick={() => handleShowBulk()}
                        className="btn btn-sm btn-outline-primary"
                    >
                        Mapped Seleted GL
                    </button>
                </div>



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


                    <div className="d-flex align-items-center gap-2">





                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowShareCaptial()}
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
                            {/* <th>
                                <input
                                    type="checkbox"
                                    checked={displayed.every(item => item.selected)}
                                    onChange={handleSelectAll}
                                    className="h-auto"
                                />

                            </th> */}
                            <th width="8%" onClick={() => handleSort('sno')}>
                                S.No {getSortingIcon('sno')}
                            </th>

                            <th onClick={() => handleSort('invoice_date')}>
                                Invoice Date {getSortingIcon('invoice_date')}
                            </th>
                            <th onClick={() => handleSort('invoice_number')}>
                                Invoice Number {getSortingIcon('invoice_number')}
                            </th>
                            <th onClick={() => handleSort('amount')}>
                                Amount {getSortingIcon('amount')}
                            </th>
                            <th onClick={() => handleSort('performance_date')}>
                                Performance Date {getSortingIcon('performance_date')}
                            </th>
                            <th onClick={() => handleSort('credit_period')}>
                                Credit Period{getSortingIcon('credit_period')}
                            </th>
                            <th onClick={() => handleSort('due_date')}>
                                Due Date {getSortingIcon('due_date')}
                            </th>
                            <th onClick={() => handleSort('party_name')}>
                                Party Name {getSortingIcon('party_name')}
                            </th>
                            <th onClick={() => handleSort('narration')}>
                                Narration {getSortingIcon('narration')}
                            </th>



                            {/* <th>Action</th> */}

                        </tr>
                        <tr className="inline-col-search">

                            {/* <th> </th> */}
                            <th> </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchID}
                                        onChange={(e) => {
                                            const newvalue = e.target.value;
                                            setsearchInvoiceDate(newvalue);
                                            getAllListings('invoice_date', newvalue);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchIN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchInvoiceNumber(value);
                                            getAllListings('invoice_number', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchAmount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchAmount(value);
                                            getAllListings('amount', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchPD}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchPD(value);
                                            getAllListings('performance_date', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchCP}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchCP(value);
                                            getAllListings('credit_period', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchDD}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchDD(value);
                                            getAllListings('due_date', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchPN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchPN(value);
                                            getAllListings('party_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search d-flex">
                                    <input
                                        type="text"
                                        value={searchNarration}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchNarration(value);
                                            getAllListings('narration', value);
                                        }}
                                        className="form-control table-col-search"
                                    />

                                    <button className=" btn btn-sm p-0 px-2" onClick={handleReset}> <RefreshCcw size={16} /> </button>
                                </div>
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayed) && displayed.length > 0 ? (
                            displayed.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr className="tr-hover-effect1" key={item.id}>
                                        {/* <td>
                                            <input
                                                type="checkbox"
                                                checked={item.selected || false}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="h-auto"
                                            />
                                        </td> */}
                                        <td onClick={() => handleShowEdit(item.id)}>{sNo}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.invoice_date}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.invoice_number}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.amount}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.performance_date}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.credit_period}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.due_date}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.party_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.narration}</td>


                                        {/* <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleShowOverride(item.id, item.gl_name)}
                                            >
                                                <IconSwitchHorizontal size={16} />
                                            </button>

                                        </td> */}
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
                    show={showShareCaptial}
                    onHide={handleCloseInvRegister}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Account Receivable" : "Account Receivable"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formInvRegister.handleSubmit(onSubmitInvRegister)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">


                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Invoice Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    {...formInvRegister.register("invoice_date", { required: true })}
                                                    defaultValue={editData ? editData.invoice_date : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Invoice Number <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter no of Shares"
                                                    className="form-control"
                                                    {...formInvRegister.register("invoice_number", { required: true })}
                                                    defaultValue={editData ? editData.invoice_number : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Amount <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter no of Shares"
                                                    className="form-control"
                                                    {...formInvRegister.register("amount", { required: true })}
                                                    defaultValue={editData ? editData.amount : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Performance Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    {...formInvRegister.register("performance_date", { required: true })}
                                                    defaultValue={editData ? editData.performance_date : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Credit Period <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    {...formInvRegister.register("credit_period", { required: true })}
                                                    defaultValue={editData ? editData.credit_period : ""}
                                                />
                                            </div>
                                        </div>



                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Due Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    {...formInvRegister.register("due_date", { required: true })}
                                                    defaultValue={editData ? editData.due_date : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Party Name <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="party_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.party_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={Shareholderdrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={Shareholderdrop.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.instrument_type_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Narration <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter no of Shares"
                                                    className="form-control"
                                                    {...formInvRegister.register("narration", { required: true })}
                                                    defaultValue={editData ? editData.narration : ""}
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
                                            onClick={() => deleteArapArtranInvList(editData?.id)}
                                            className="btn btn-sm btn-danger mx-1"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button className="btn btn-sm btn-success">
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


        </div >
    );
};

export default ArapArTranInvoices;
