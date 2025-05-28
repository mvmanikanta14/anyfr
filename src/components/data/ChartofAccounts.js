import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce } from "lodash";


const ChartofAccounts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageNo] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page
    const [chartofAccounts, setChartofAccounts] = useState([]); // State to hold chart of accounts data
    const [ShowTan, setShowTan] = useState(false); // State to control modal visibility
    const [selecteTan, setSelecteTan] = useState(""); // State to hold selected TAN
    const [selectedId, setSelectedId] = useState(null); // State to hold selected ID for editing
    const [ids, setIds] = useState(null); // State to hold ID for update operation
    const [chartofAccountsAdd, setChartofAccountsAdd] = useState([]); // State to hold added chartofAccounts
    const [editData, setEditData] = useState(null); // State to hold edit data for chartofAccounts
    const [show, setShow] = useState(false); // State to control modal visibility for chartofAccounts
    const [title, setTitle] = useState("Add");
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true); // State to toggle between active and inactive shares
    const [showInactive, setShowInactive] = useState(false); // State to toggle between active and inactive shares
    const [showDeleteButton, setShowDeleteButton] = useState(false);



    const activeShares = chartofAccounts.filter(item => item.is_active);
    const inactiveShares = chartofAccounts.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);


    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
    }, []);

    const debouncedSearch = debounce(() => {
        getAllChartofAccountsSearch();  // Call the API when searchTerm changes
    }, 500);

    const deleteCA = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteChartofAcc}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming chartofAccounts is the state that holds the list of accounts
                    const updatedChartOfAccounts = chartofAccounts.filter((item) => item.id !== id);
                    setChartofAccounts(updatedChartOfAccounts); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllChartofAccounts();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllChartofAccounts();

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



    useEffect(() => {
        if (searchTerm) {
            debouncedSearch();  // Call the debounced function
        } else {
            setChartofAccounts([]);  // Reset search when searchTerm is empty
        }
        // Cleanup debounce on component unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    const getAllChartofAccountsSearch = () => {
        const requestData = {
            query: searchTerm,
        };

        commonService.add(apiUrlsService.getAllSearch, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setChartofAccounts(response.data);
                    } else {
                        swal(response.data.error);
                        setChartofAccounts([]);  // Reset search results if there's an error
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    // Fetch data from the API
    const getAllChartofAccounts = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(apiUrlsService.getAllFssFsliList, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setChartofAccounts(response.data.data); // Set the filtered data
                        setTotalElements(response.data.total); // Set total records for pagination (based on filtered data)
                    } else {
                        swal(response.data.error);
                        setChartofAccounts([]);
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

    useEffect(() => {
        if (EntityID && Id) {
            getAllChartofAccounts();
        }
    }, [EntityID, Id]);

    useEffect(() => {
        if (showActive) {
            getAllChartofAccounts();  // Fetch active entities
        } else {
            getAllInactive();  // Fetch inactive entities
        }

    }, [showActive, pageno, records]);




    const getAllInactive = () => {

        const requestData = {
            entity_id: EntityID,
        }

        commonService.add(apiUrlsService.getAllInactiveChartofAccounts, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setChartofAccounts(response.data.data);
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
                        setChartofAccounts(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllChartofAccounts();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllChartofAccounts();
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
            falling_under: null,
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssFsli, requestData)
                .then((res) => {
                    setChartofAccountsAdd([...chartofAccountsAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
                    getAllChartofAccounts();
                })
                .catch((error) => {
                    if (error.details && error.details.length > 0) {
                        error.details.forEach((detail) => {
                           swal("Validation",`Column: ${detail.column}, Message: ${detail.message}, Value: ${detail.value}`);
                        });
                    }
                    console.error("Error Mani:", error.details);
                });
        } else {
            // UPDATE Operation
            commonService.update(`${apiUrlsService.editchartofAccounts}/${ids}`, requestData)
                .then((res) => {
                    const updatedChartOfAccounts = chartofAccounts.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setChartofAccounts(updatedChartOfAccounts);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllChartofAccounts();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure

                    if (error?.response?.data?.newMapping?.error) {
                        // Handle specific errors from the server
                        if (error.response.data.newMapping.status === 500) {
                            swal("Error", `Server error: ${error.response.data.newMapping.error}`, "error");
                        } else {
                            swal("Error", error.response.data.newMapping.error, "error");
                        }
                    } else {
                        // Fallback for unhandled errors
                        swal("Error", "An unexpected error occurred", "error");
                    }
                });
        }
    };




    const handleClose = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShow(false)
        reset(); // Reset the form state

        setShowDeleteButton(false);

    }

    const handleShowEdit = (id) => {
        const itemToEdit = chartofAccounts.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            // setShow(true);


        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Add");
            setIds(null);
            setShowDeleteButton(false);
            // setShow(true);

        }
        setShow(true);
        reset();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });


    const handleShow = () => {

        // reset();
        setShow(true);
        setTitle("Add")
    }

    // const handleShowEdit = (id) => {
    //     const itemToEdit = chartofAccounts.find((item) => item.id === id);
    //     console.log("Item to Edit:", itemToEdit);
    //     setEditData(itemToEdit);
    //     setTitle("Edit");
    //     setIds(itemToEdit.id);
    //     setShow(true);
    //     setIsEditMode(true);
    //     reset();
    // };

    const handleShowToggle = () => {
        setShowActive(!showActive);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setChartofAccounts([]);
            getAllChartofAccounts();
        }
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
                </div>



                <div className="d-flex">

                    <div className="position-relative mx-2" style={{ width: '250px' }}>
                        <input
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
                        </span>
                    </div>


                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShow()}
                        >
                            <Plus size={15} /> Add New
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">

                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th>S.No</th>
                            <th>GL Name</th>
                            <th >GL Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                            displayedShares.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr className="tr-hover-effect1" onClick={() => handleShowEdit(item.id)} key={item.id}>
                                        <td> {index + 1}</td>
                                        <td>{item.gl_name}</td>
                                        <td>{item.gl_code || "Not answered"}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="2">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between">
                <div>
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
                    show={show}
                    onHide={handleClose}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {isEditMode ? "Edit Chart of Accounts" : "Add Chart of Accounts"} </Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">

                                <div className="container">
                                    <div className="row pt-1 mt-1">
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                GL Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter GL Name"
                                                className="form-control"
                                                {...register("gl_name", { required: true })}
                                                defaultValue={editData ? editData.gl_name : ""}
                                            />
                                            {/* {errors.entity_name && <span className="text-danger"></span>} */}
                                            {/* {validationErrors.gl_name && <p className="text-danger">{validationErrors.gl_name}</p>} */}
                                        </div>


                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                GL Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter GL Code"
                                                className="form-control"
                                                {...register("gl_code", { required: true })}
                                                defaultValue={editData ? editData.gl_code : ""}
                                            />
                                            {/* {errors.gl_code && <span className="text-danger"></span>} */}
                                            {/* {validationErrors.gl_code && <p className="text-danger">{validationErrors.gl_code}</p>} */}
                                        </div>

                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Falling Under<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter GL Code"
                                                className="form-control"
                                                {...register("falling_under", { required: true })}
                                                defaultValue={editData ? editData.falling_under : ""}
                                            />
                                            {errors.falling_under && <span className="text-danger"></span>}
                                            {validationErrors.falling_under && <p className="text-danger">{validationErrors.falling_under}</p>}
                                        </div> */}

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Is Party<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Party"
                                                className="form-control"
                                                {...register("is_party", { required: true })}
                                                defaultValue={editData ? editData.is_party : ""}
                                            />
                                            {/* {errors.is_party && <span className="text-danger"></span>} */}
                                            {/* {validationErrors.is_party && <p className="text-danger">{validationErrors.is_party}</p>} */}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Subsidiary<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Party"
                                                className="form-control"
                                                {...register("has_subsidiary", { required: true })}
                                                defaultValue={editData ? editData.has_subsidiary : ""}
                                            />
                                            {/* {errors.has_subsidiary && <span className="text-danger"></span>} */}
                                            {/* {validationErrors.has_subsidiary && <p className="text-danger">{validationErrors.has_subsidiary}</p>} */}
                                        </div>


                                        <div className="col-lg-12 text-right my-3">
                                            {showActive ? (
                                                <>
                                                    {showDeleteButton && (
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteCA(editData?.id)}
                                                            className="btn btn-sm btn-danger mx-2"
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
                                        </div>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </div>
    );
};

export default ChartofAccounts;
