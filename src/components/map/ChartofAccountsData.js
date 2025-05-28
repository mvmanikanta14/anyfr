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
import { debounce } from "lodash";
import Select from 'react-select';



const ChartofAccountsData = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageNo] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page
    const [FssParamMap, setFssParamMap] = useState([]); // State to hold chart of accounts data
    const [ids, setIds] = useState(null); // State to hold ID for update operation
    const [FssParamMapAdd, setFssParamMapAdd] = useState([]); // State to hold added FssParamMap
    const [editData, setEditData] = useState(null); // State to hold edit data for FssParamMap
    const [show, setShow] = useState(false); // State to control modal visibility for FssParamMap
    const [title, setTitle] = useState("Add");
    const [isEditMode, setIsEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true); // State to toggle between active and inactive shares
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [fallingunder, setFallingUnder] = useState([]); // State to hold chart of accounts data
    const [positionafter, setPostionAfter] = useState([]); // State to hold chart of accounts data
    // const [fallingUnders, setFallingUnders] = useState("");  // Store selected falling_under value






    const active = FssParamMap.filter(item => item.is_active);
    const inactive = FssParamMap.filter(item => !item.is_active);

    const displayed = showActive ? active : inactive;
    console.log("Active Shares:", active);
    console.log("Inactive Shares:", inactive);


    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
    }, []);

    const debouncedSearch = debounce(() => {
        getAllFssParamMapSearch();  // Call the API when searchTerm changes
    }, 500);

    const deleteCA = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteChartofAcc}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming FssParamMap is the state that holds the list of accounts
                    const updatedFssParamMap = FssParamMap.filter((item) => item.id !== id);
                    setFssParamMap(updatedFssParamMap); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllFssParamMap();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllFssParamMap();

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
            setFssParamMap([]);  // Reset search when searchTerm is empty
        }
        // Cleanup debounce on component unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    const getAllFssParamMapSearch = () => {
        const requestData = {
            query: searchTerm,
        };

        commonService.add(apiUrlsService.getAllSearch, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setFssParamMap(response.data);
                    } else {
                        swal(response.data.error);
                        setFssParamMap([]);  // Reset search results if there's an error
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllFssParamMap = () => {
        const requestData = {
            entity_id: EntityID,
            framework_id: 1,
        };

        commonService.add(apiUrlsService.getAllFssFsliMapList, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        // const hierarchicalData = buildHierarchy(response.data.data);
                        setFssParamMap(response.data.data); // Set hierarchical data
                        setTotalElements(response.data.total); // Set total records for pagination
                    } else {
                        swal(response.data.error);
                        setFssParamMap([]); // Clear the data if the response is invalid
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const renderRows = (data, level = 0) => {
        return data.map((item, index) => {
            return (
                <React.Fragment key={item.id}>
                    <tr
                        className="tr-hover-effect1"
                        onClick={() => {
                            if (item.is_added) {
                                // Trigger popup for is_added: true
                                handleShowEdit(item.id);
                                // swal("Row clicked", `You clicked on the row with ID: ${item.id}`, "success");
                            } else {
                                // Alert for rows with is_added: false
                                // swal("Row not added", "This row is not added yet.", "warning");
                            }
                        }}
                    >
                        {/* <td style={{ paddingLeft: `${level * 20}px` }}>{index + 1}</td> */}
                        <td style={{ paddingLeft: `${item.node_level * 20}px` }}>{item.flsi_master_name}</td>
                        <td>{item.custom_name
                        }</td>

                        </tr>
                    {item.children && item.children.length > 0 && renderRows(item.children, level + 1)}  {/* Recursively render children */}
                </React.Fragment>
            );
        });
    };
    
    

    const getAllFallingUnder = () => {
        const requestData = {
            entity_id: EntityID,
            framework_id: 1,
        };

        commonService.add(apiUrlsService.getAllFssFsliMapList, requestData)
            .then((response) => {
                if (response && response.data) {
                    console.log("mani", response.data);

                    // Filter the data to include only items with node_level = 1
                    const filteredData = response.data.data;

                    // Transform the filtered data to match the Select component format
                    const transformedData = filteredData.map(item => ({
                        value: item.id,
                        label: item.flsi_master_name
                    }));

                    setFallingUnder(transformedData); // Set the filtered and transformed data as options
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching data:", error);
            });
    };

    const getAllPostionAfter = (currentFallingUnder) => {
        const requestData = {
            entity_id: EntityID,
            falling_under: 65,
        };

        commonService.add(apiUrlsService.getPostionAfter, requestData)
            .then((response) => {
                if (response && response.data) {
                    console.log("manifallingUnder", response.data);

                    // Filter the data to include only items with node_level = 1
                    const filteredData = response.data.data;

                    // Transform the filtered data to match the Select component format
                    const transformedData = filteredData.map(item => ({
                        value: item.node_sequence,
                        label: item.flsi_master_name
                    }));

                    setPostionAfter(transformedData); // Set the filtered and transformed data as options
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching data:", error);
            });
    };






    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    useEffect(() => {
        if (EntityID && Id) {
            getAllFssParamMap();
            getAllFallingUnder();
            getAllPostionAfter();
        }
    }, [EntityID, Id]);

    useEffect(() => {
        if (showActive) {
            getAllFssParamMap();  // Fetch active entities
        } else {
            getAllInactive();  // Fetch inactive entities
        }

    }, [showActive, pageno, records]);




    const getAllInactive = () => {

        const requestData = {
            entity_id: EntityID,
        }

        commonService.add(apiUrlsService.getAllInactiveFssParamMap, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setFssParamMap(response.data.data);
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

        commonService.update(`${apiUrlsService.getActiveFssParamMap}/${id}`)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setFssParamMap(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllFssParamMap();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllFssParamMap();
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
            framework_id: 1,
            falling_under: data.id,
            position_after: data.node_sequence,

        };

        if (ids) {
            requestData.is_active = true; // Add is_active for update only
        }

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssFSliMap, requestData)
                .then((res) => {
                    setFssParamMapAdd([...FssParamMapAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
                    getAllFssParamMap();
                })
                .catch((error) => {
                  
                    // console.error("Error Mani:", error.details);
                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsService.editFssParamMap}`, requestData)
                .then((res) => {
                    const updatedFssParamMap = FssParamMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setFssParamMap(updatedFssParamMap);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllFssParamMap();
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

        setShowDeleteButton(false);

    }

    const handleShowEdit = (id) => {
        console.log(FssParamMap, "this is the id for id");

        const itemToEdit = FssParamMap.find((item) => item.id === id);
        console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            setIsEditMode(true);
            // setShow(true);
            reset();


        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Add");
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
        setTitle("Add")
    }

    // const handleShowEdit = (id) => {
    //     const itemToEdit = FssParamMap.find((item) => item.id === id);
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
            setFssParamMap([]);
            getAllFssParamMap();
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
                            {/* <th>S.No</th> */}
                            {/* <th> node code</th> */}
                            <th> FSS Name</th>
                            <th> Custom Name</th>
                            {/* <th >GL Code</th> */}
                        </tr>
                    </thead>
                    {/* <tbody>
                        {Array.isArray(displayed) && displayed.length > 0 ? (
                            displayed.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr className="tr-hover-effect1" onClick={() => handleShowEdit(item.id)} key={item.id}>
                                        <td> {index + 1}</td>
                                        <td>{item.flsi_master_name}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="2">No data found</td>
                            </tr>
                        )}
                    </tbody> */}

                    <tbody>
                        {Array.isArray(FssParamMap) && FssParamMap.length > 0 ? (
                            renderRows(FssParamMap) // Render the hierarchical data
                        ) : (
                            <tr>
                                <td colSpan="2">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                        <Modal.Title> {isEditMode ? "Edit" : "Add"} </Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">

                                <div className="container">
                                    <div className="row pt-1 mt-1">
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Custom Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                className="form-control"
                                                {...register("custom_name", { required: true })}
                                                defaultValue={editData ? editData.custom_name : ""}
                                            />
                                            {errors.custom_name && <span className="text-danger"></span>}
                                            {/* {validationErrors.gl_name && <p className="text-danger">{validationErrors.gl_name}</p>} */}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Falling Under <span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="id"
                                                control={control}
                                                defaultValue={editData ? editData.id : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                        {...field}
                                                        options={fallingunder}
                                                        isSearchable={true} // Enables search functionality
                                                        placeholder="Select "
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"

                                                        onChange={selectedOption => (
                                                            field.onChange(selectedOption?.value),
                                                            getAllPostionAfter(selectedOption?.value)
                                                          )}
                                                          

                                                        value={fallingunder.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.id && <span className="text-danger">This field is required.</span>}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Postion After <span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="node_sequence"
                                                control={control}
                                                defaultValue={editData ? editData.node_sequence : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                        {...field}
                                                        options={positionafter}
                                                        isSearchable={true} // Enables search functionality
                                                        placeholder="Select "
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={positionafter.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.node_sequence && <span className="text-danger">This field is required.</span>}
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

export default ChartofAccountsData;
