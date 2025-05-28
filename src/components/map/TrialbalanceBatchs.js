import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce, head } from "lodash";
import Select from 'react-select';
import { IconFlagSearch } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import LocationModal from "../commonpopups/LocationModal";



const TrialbalanceBatchs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [pageno, setPageNo] = useState(1);
    const records = 10;
    const [Trialbalance, setTrialbalance] = useState([]);
    const [ids, setIds] = useState(null);
    const [TrialbalanceAdd, setTrialbalanceAdd] = useState([]);
    const [editData, setEditData] = useState(null);
    const [show, setShow] = useState(false);
    const [ShowLocation, setShowLocation] = useState(false);
    const [title, setTitle] = useState("Create");
    const [header, setHeader] = useState("Create a New Batch");
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
    const [TrialbalanceDropDown, setTrialbalanceDropDown] = useState([]);
    const [LocationAdd, setLocationAdd] = useState([]);


    const encodeData = (data) => {
        return btoa(encodeURIComponent(data));
    };



    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());
    }, []);

    const debouncedSearch = debounce(() => {
        getAllTrialbalanceSearch();  // Call the API when searchTerm changes
    }, 500);



    const formMap = useForm({
        mode: "onChange",
    });


    const resetAllForms = () => {
        // formTan.reset();
        formMap.reset();

    };


    useEffect(() => {
        if (searchTerm) {
            debouncedSearch();
        } else {
            setTrialbalance([]);
        }
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    useEffect(() => {
        if (EntityID && showActive) {
            getAllTrialbalance();
            getAllTrialbalanceDropdwon(EntityID);

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
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllTrialbalance();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
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



    const getAllTrialbalanceSearch = () => {
        const requestData = {
            query: searchTerm,
        };

        commonService.add(apiUrlsService.getAllSearch, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setTrialbalance(response.data);
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

    const getAllTrialbalance = () => {
        const requestData = {
            entity_id: EntityID,
            period_id: Id,
            location_id: 2,
        };
        const status = showActive ? 1 : 0;

        commonService.add(`${apiUrlsService.getAllTrialBalanced}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

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

    const getAllTrialbalanceDropdwon = () => {
        const requestData = {
            entity_id: EntityID,

        };

        commonService.add(`${apiUrlsService.getAllLocationDropdown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.location_name
                        }));

                        setTrialbalanceDropDown(transformedData);
                    } else {
                        swal(response.data.error);
                        setTrialbalanceDropDown([]);
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
            period_id: Id,
        }

        commonService.add(apiUrlsService.getAllTrialBalancedinactive, requestData)
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
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllTrialbalance();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
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
            location_id: data.location_id,
            period_id: Id,
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addTrialBalanced, requestData)
                .then((res) => {
                    setTrialbalanceAdd([...TrialbalanceAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
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
                    handleClose();
                    getAllTrialbalance();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };


    const onSubmitLocation = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            entity_id: EntityID,

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addLocation, requestData)
                .then((res) => {
                    // Add the new location to the dropdown options
                    const newLocation = { value: res.data.id, label: res.data.location_name };
                    setTrialbalanceDropDown((prev) => {
                        const updatedOptions = [...prev, newLocation];
                        console.log("Updated dropdown after ADD:", updatedOptions);  // Log for verification
                        return updatedOptions;
                    });
                    swal("Success", "Added successfully!", "success");
                    handleCloseLocation();
                    reset();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure

                    // Check if error message is present and contains 'Duplicate entry'
                    if (error?.error && error.error.includes("Duplicate entry")) {
                        swal("Error", "Entity name already exists!", "error");
                    } else if (error?.response?.data?.error) {
                        // Handle other specific error formats
                        swal("Error", error.response.data.error, "error");
                    } else {
                        // Fallback for unhandled errors
                        // handleApiError(error);
                    }
                });
        } else {
            // UPDATE Operation
            commonService.update(`${apiUrlsService.editLocation}/${ids}`, requestData)
                .then((res) => {
                    const updatedLocation = Location.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setLocationAdd(updatedLocation);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseLocation();
                    // getAllLocation();
                    reset();
                })
                .catch((error) => {
                    // handleApiError(error);
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

    const handleCloseLocation = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowLocation(false)
        reset(); // Reset the form state
        resetAllForms();

        setShowDeleteButton(false);

    }

    const handleCloseOverride = () => {
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
            setHeader("Create a New Batch");
            setIds(null);
            setShowDeleteButton(false);
            setIsEditMode(true);
            // setShow(true);
            reset();

        }
        setShow(true);
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


    const handleShow = () => {
        // reset();
        setShow(true);
        setTitle("Create");
        setHeader("Create a New Batch");
    }

    const handleShowLoction = () => {
        // reset();
        setShowLocation(true);
        setTitle("Create");
        setHeader("Create a New Batch");
    }



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


                    <div className="d-flex align-items-center">

                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShow()}
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

                            <th>S.No</th>
                            <th> Name of The Batch</th>
                            <th>Location Name</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {Array.isArray(displayed) && displayed.length > 0 ? (
                            displayed.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr

                                        className="tr-hover-effect1" key={item.id}>

                                        <td onClick={() => handleShowEdit(item.id)}>{sNo}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.batch_name} </td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.location_name}</td>

                                        <td>
                                            <Link to={`/data/tb/${encodeData(item.id)}?tbs=${encodeData(item.batch_name)}&location_id=${encodeData(item.location_id)}&batch_id=${encodeData(item.id)}`}>
                                                Mapping
                                            </Link>
                                        </td>
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

            {/* <div className="d-flex justify-content-between custom-pagination">
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
            </div> */}

            <div className="model_box">
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {isEditMode ? header : header} </Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formMap.handleSubmit(onSubmit)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container ">
                                    <div className="row pt-1 mt-1">

                                        {/* Entity Name */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Name of the Batch <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Batch Name"
                                                    className="form-control"
                                                    {...formMap.register("batch_name", { required: true })}
                                                    defaultValue={editData ? editData.batch_name : ""}
                                                />
                                            </div>

                                        </div>

                                        {/* Reporting Frequency */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Select Location Name <span className="text-danger">*</span>
                                                    <button
                                                        type="button"
                                                        className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                                                        title="Create Location"
                                                        onClick={() => handleShowLoction()}
                                                    >
                                                        <Plus size={15} />
                                                    </button>
                                                </label>

                                                <Controller
                                                    name="location_id"
                                                    control={formMap.control}
                                                    defaultValue={editData?.location_id || ''}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={TrialbalanceDropDown}
                                                            isSearchable
                                                            placeholder="Select"
                                                            className="react-select-container flex-grow-1"
                                                            classNamePrefix="custom-select"
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                            value={TrialbalanceDropDown.find(option => option.value === field.value)}
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


                <LocationModal
                    show={ShowLocation}
                    handleClose={handleCloseLocation}
                    onSubmit={onSubmitLocation}
                    title={title}
                    editData={editData}
                    showDeleteButton={showDeleteButton}
                // deleteLocation={deleteLocation}
                />
            </div>




        </div >
    );
};

export default TrialbalanceBatchs;
