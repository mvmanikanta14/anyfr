

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import Pagination from "../../../PaginationCommon";
// import commonService from "../../../../services/common.service";
import { IconHome, IconPencil, IconTrash, IconRefresh } from '@tabler/icons-react';
// import apiUrlsService from "../../../../services/apiUrls.service";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

// import { useAuth } from '../../../context/AuthProvider';
import '../../../css/custom_style.css';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Base64 } from 'js-base64';
import Header from "../../Header";
import SidebarsBKP from "../../SidebarsBKP";
import apiUrlsService from "../../../services/apiUrls.service";
import commonService from "../../../services/common.service";
import { ApiContext } from "../../../ApiProvider";
import { toast } from "react-toastify";
import handleApiError from "../../utils/apiErrorHandler";
import { FaBeer, FaCheck, FaEye, FaPaperclip, FaPencilAlt, FaPills, FaRadiation, FaTimes } from "react-icons/fa";



const Entities = () => {
    const [Entities, setEntities] = useState([]);
    const [Framework, setFramework] = useState([]);
    const [EntitiesAdd, setEntitiesAdd] = useState([]);
    const [TanAdd, setTanAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [datalist, setDatalist] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [ShowList, setShowList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(ApiContext);
    const [Errors, setErrors] = useState([]);
    const [ShowTan, setShowTan] = useState(false);


    useEffect(() => {
        getAllEntities();
        getAllHeader();
        getAllFrameworkMaster();


    }, [pageno, records, searchTerm]);

    
    const [showActive, setShowActive] = useState(true);

    const activeShares = Entities.filter(item => item.is_active);
    const inactiveShares = Entities.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;

    // const displayedShares = Array.isArray(entities) ? entities.filter(...) : [];


    const deleteEntities = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteEntities}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Deleted successfully!", "success");
                    getAllEntities(); // Refresh the list
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    getAllEntities();
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

    const getAllEntities = () => {
        const status = showActive ? 1 : 0;

        commonService
            .getAll(`${apiUrlsService.getAllEntities}?page=${pageno}&limit=${records}&is_active=${status}`)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setEntities(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        console.error("Unexpected response format:", response.data);
                        setEntities([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const getAllFrameworkMaster = () => {
        commonService.getAll(apiUrlsService.getFrameworkDropdown).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data);
                    // Transform the data to match the Select component format
                    const transformedData = response.data.map(item => ({
                        value: item.id,
                        label: item.framework_name
                    }));
                    setFramework(transformedData); // Set transformed data as options
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };


    const getAllHeader = () => {

        axios
            .get('http://demo.anyibc.com/api/apiRoutes/header')
            .then((response) => {
                console.log("mani", response.data); // Set the data from response

            })
            .catch((error) => {

            });
    };


    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    const handleRecordsChange = (event) => {
        setRecords(event.target.value);
        setPageNo(1); // Reset to first page
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

    const [validationErrors, setValidationErrors] = useState({});




    const formEntity = useForm({
        mode: "onChange",
    });

    const onSubmit = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            is_active: "true",
            financial_framework_id: 1,
            financial_year_style: "Financial Year",
            is_cfs_applicable: "true"
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addEntities, requestData)
                .then((res) => {
                    setEntitiesAdd([...EntitiesAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseShow();
                    getAllEntities();
                    resetAllForms();
                })
                .catch((error) => {
                    handleApiError(error);
                });
        }

    };

    const formTan = useForm({
        mode: "onChange",
    });

    const { setValue: setTanValue } = formTan;

    const resetAllForms = () => {
        formTan.reset();
        formEntity.reset();

    };


    const onSubmitEntityDetails = (data, selectedId) => {
        const requestData = {
            ...data,
            financial_framework_id: data.financial_framework_id
        };

        commonService.update(`${apiUrlsService.addParamEntityEditTan}/${selectedId}`, requestData)
            .then((res) => {
                // Use a functional update to ensure you're working with the most recent state
                setTanAdd((prevTanAdd) => {
                    const updatedTanAdd = [...prevTanAdd, res.data];
                    // Optionally, you can log or check the updated state here
                    return updatedTanAdd;
                });

                swal("Success", "Added successfully!", "success");

                // Close modal
                handleCloseTan();

                // Explicitly fetch the updated data after submission
                getAllEntities();
                window.location.reload();

                // Reset form state
                resetAllForms();
                reset();
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


    const handleApiError = (error) => {
        console.log("Error", error.error[0], "error");
        if (error.error[0]) {
            const errors = error.error;

            // Extract API errors
            if (Array.isArray(errors)) {
                // Assuming error messages come in a fixed order
                const errorMessages = {
                    entity_pan: errors[0] || "",
                    financial_year_style: errors[1] || "",
                    is_cfs_applicable: errors[2] || "",
                    end_year: errors[3] || "",
                };
                console.log(errorMessages, "maninama");

                // Display errors in UI (Assuming you're using a state variable)
                setValidationErrors(errorMessages);

                // Show first error in an alert
                swal("Error", errors[0], "error");
            }
            else {
                swal("Error", "Unexpected response format.", "error");
            }
        }
        else {
            swal("Error", "Server error. Please try again later.", "error");
        }
    };

    const [editingRow, setEditingRow] = useState(null);
    const [editingData, setEditingData] = useState(null);

    const handleEditRow = (item) => {
        setEditingRow(item.id);
        setEditingData({
            entity_name: item.entity_name || '',
            entity_pan: item.entity_pan || '',
            reporting_frequency: item.reporting_frequency || '',
            financial_year_style: item.financial_year_style || '',
            financial_framework_id: item.financial_framework_id || 1,
            is_cfs_applicable: item.is_cfs_applicable !== undefined ? item.is_cfs_applicable : true,
            is_active: item.is_active !== undefined ? item.is_active : true,
            created_by: item.created_by || 1
        });
    };


    const handleDataChange = (e, field) => {
        setEditingData({
            ...editingData,
            [field]: e.target.value
        });
    };

    // Handle blur (when user clicks outside the input, update the data)
    const handleSaveEdit = (field) => {
        // Immediately save the data on blur
        const updatedEntity = { ...editingData, };
        commonService.update(`${apiUrlsService.editEntities}/${editingRow}`, updatedEntity)
            .then((response) => {
                const updatedEntities = displayedShares.map((item) =>
                    item.id === editingRow ? response.data : item
                );
                setEntitiesAdd(updatedEntities);
                swal("Success", "Updated successfully!", "success");
                getAllEntities();
            })
            .catch((error) => {
                swal("Error", "Failed to update data", "error");
            });
    };


    const handleCancelEdit = () => {
        setEditingRow(null);
        setEditingData(null);
    };




    const handleShowEdit = (id, entity_name) => {
        const itemToEdit = Entities.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Edit");
            setId(itemToEdit.id);
        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setFramework([]); // Reset framework options
            setTitle("Add");
            setId(null);
        }

        reset(); // Reset the form state
        setShowTan(true); // Show the modal
        setSelectedId(id);
        setSelecteTan(entity_name); // Assuming this is for entity name
    };


    const handleShowRep = (id) => {


        console.log("data of adpi", id);
        axios
            .get(`http://demo.anyibc.com/api/apiRoutes/reporting/${id}`)
            .then((response) => {
                console.log("data of adpi", response.data);

                setDatalist(response.data);

                setShowList(true);

                reset();
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    const navigate = useNavigate(); // Initialize navigation

    const handleShowAssign = (id, company_id, company_name) => {
        // const id = localStorage.getItem("id");
        // const company_id = localStorage.getItem("company_id");
        // const company_name = localStorage.getItem("company_name");

        sessionStorage.setItem("id", id);
        sessionStorage.setItem("company_id", company_id);
        sessionStorage.setItem("company_name", company_name);

        // console.log("Stored values:", id, company_id,company_name);
        navigate("/fssNotes");
        // axios
        //     .get(`http://demo.anyfinancials.in:1234/api/reporting/${company_id}`)
        //     .then((response) => {
        //         console.log("API Response:", response.data);
        //         setDatalist(response.data);
        //         setShowList(true);
        //         reset();

        //         // ✅ Navigate to FSS Note component
        //         navigate("/fssNotes");
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data: ", error);
        //     });
    };


    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false)
        setShowList(false)
    }

    const handleCloseTan = () => {
        setShowTan(false);  // Hide modal
        setEditData(null);   // Clear form data
        setTitle("");  // Reset title
        setSelectedId(null); // Clear selected ID
        // setFramework([]);  // Ensure Framework is reset to an empty array
        reset();  // Reset the form to its initial state
        resetAllForms();  // Additional reset if needed
    };


    useEffect(() => {
        if (editData) {
            // Ensure Framework is an array before using .find
            if (Array.isArray(Framework)) {
                formTan.setValue("fid", Framework.find(option => option.value === editData.fid) || null);
            }
            formTan.setValue("entity_tan", editData.entity_tan || "");
            formTan.setValue("entity_cin", editData.entity_cin || "");
        }
    }, [editData, Framework, formTan]);  // Dependencies


    const [selectedId, setSelectedId] = useState(null);
    const [selecteTan, setSelecteTan] = useState(null);

    const handleShowTan = async (id, entity_tan) => {
        reset();
        setShowTan(true);
        setTitle("Add")
        setSelectedId(id);
        setSelecteTan(entity_tan);
    }

    const handleShow = async () => {

        reset();
        setShow(true);
        setTitle("Add")
    }

    const handleSelectChange = (selectedOption) => {
        console.log("Selected Framework:", selectedOption);
        setTanValue("financial_framework_id", selectedOption.value);
    };

    // Assuming 'Entities' contains the response data
    // const frameworkOptions = Framework.map((item) => ({

    //     value: item.id,          // The value will be the 'id' of the entity
    //     label: item.framework_name // The label will be the 'framework_name' to be displayed
    // }));



    return (

        <div className="">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Entities </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Entities  </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">

                        <div className="col-md-12 mb-2">
                            <form className="text-right formtext p-0 mr-0">
                                <div className="row">
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-6">

                                        <button
                                            type="button"
                                            className="btn-sm Addhead mr-1"
                                            title="Add "
                                            onClick={() => handleShow()}
                                        >
                                            ADD
                                        </button>
                                        <select
                                            className="Addbutton activehead text-center"
                                            // style={{ width: "200px", height: "40px", fontSize: "16px" }} // Adjust size here
                                            value={showActive ? "active" : "inactive"}
                                            onChange={(e) => setShowActive(e.target.value === "active")}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>

                                    </div>

                                </div>
                            </form>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th width="5%">ID</th>
                                        <th>Name</th>
                                        <th>PAN</th>
                                        <th>Reporting Frequency</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                                        displayedShares.map((item, index) => {
                                            const sNo = (pageno - 1) * records + index + 1;
                                            return (
                                                <tr key={item.id}>
                                                    <td>{sNo}</td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        {editingRow === item.id ? (
                                                            <input
                                                                type="text"
                                                                value={editingData.entity_name}
                                                                onChange={(e) => handleDataChange(e, 'entity_name')}
                                                            />
                                                        ) : (
                                                            item.entity_name
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingRow === item.id ? (
                                                            <input
                                                                type="text"
                                                                value={editingData.entity_pan}
                                                                onChange={(e) => handleDataChange(e, 'entity_pan')}
                                                            />
                                                        ) : (
                                                            item.entity_pan
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingRow === item.id ? (
                                                            <select
                                                                value={editingData.reporting_frequency} // Dropdown value
                                                                onChange={(e) => handleDataChange(e, 'reporting_frequency')}
                                                                onBlur={handleSaveEdit} // Save when blurred
                                                            >
                                                                {/* Dropdown options */}
                                                                <option value="Monthly">Monthly</option>
                                                                <option value="Quarterly">Quarterly</option>
                                                                <option value="Half-Yearly">Half-Yearly</option>
                                                                <option value="Yearly">Yearly</option>
                                                            </select>
                                                        ) : (
                                                            item.reporting_frequency
                                                        )}
                                                    </td>
                                                    {/* <td width={"10%"} className="inline-btns">


                                                        <button
                                                            className="btn-primary-outlined"
                                                            title=""
                                                            onClick={() => handleShowEdit(item.id,item.entity_name)}
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {editingRow === item.id ? (
                                                            <>
                                                                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                                                                <button onClick={handleCancelEdit}>Cancel</button>
                                                            </>
                                                        ) : (
                                                            <button className="btn-primary-outlined" onClick={() => handleEditRow(item)}><FaPencilAlt /></button>
                                                        )}

                                                        {showActive ? (

                                                            <>
                                                                <button
                                                                    className="btn-danger-outlined"
                                                                    title="Delete"
                                                                    onClick={() => deleteEntities(item.id)}
                                                                >
                                                                    <IconTrash />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="btn-success-outlined"
                                                                title="Activate"
                                                            // onClick={() => activateShare(item.id)}
                                                            >
                                                                Activate
                                                            </button>
                                                        )}

                                                    </td> */}

                                                    <td width={"10%"} className="inline-btns">
                                                        {/* Only show this when not editing */}
                                                        {editingRow !== item.id && (
                                                            <button
                                                                className="btn-primary-outlined"
                                                                title=""
                                                                onClick={() => handleShowEdit(item.id, item.entity_name)}
                                                            >
                                                                <FaEye />
                                                            </button>
                                                        )}

                                                        {editingRow === item.id ? (
                                                            <>
                                                                <button className="btn-primary-outlined" title="Save" onClick={() => handleSaveEdit(item.id)}><FaCheck /></button>
                                                                <button className="btn-danger-outlined" title="Cancel" onClick={handleCancelEdit}><FaTimes /></button>
                                                            </>
                                                        ) : (
                                                            <button className="btn-primary-outlined" title="Delete" onClick={() => handleEditRow(item)}>
                                                                <FaPencilAlt />
                                                            </button>
                                                        )}

                                                        {/* Only show this when not editing */}
                                                        {editingRow !== item.id && (
                                                            <>
                                                                {showActive ? (
                                                                    <button
                                                                        className="btn-danger-outlined"
                                                                        title="Delete"
                                                                        onClick={() => deleteEntities(item.id)}
                                                                    >
                                                                        <IconTrash />
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn-success-outlined"
                                                                        title="Activate"
                                                                    // onClick={() => activateShare(item.id)}
                                                                    >
                                                                        Activate
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>



                        {/* Pagination */}
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
                    </div>
                </div>
            </div>

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit Entities" : "Add Entities"}</Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={formEntity.handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Entity Name */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Entity Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Entity Name"
                                                className="accordiantext"
                                                {...formEntity.register("entity_name", { required: true })}
                                                defaultValue={editData ? editData.entity_name : ""}
                                            />
                                            {errors.entity_name && <span className="text-danger"></span>}
                                        </div>

                                        {/* PAN */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                PAN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter PAN"
                                                className="accordiantext"
                                                {...formEntity.register("entity_pan", { required: true })}
                                                defaultValue={editData ? editData.entity_pan : ""}
                                            />
                                            {/* {errors.entity_pan && <span className="text-danger">This is required</span>} */}
                                            {validationErrors.entity_pan && <p className="text-danger">{validationErrors.entity_pan}</p>}

                                        </div>



                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Reporting Frequency <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...formEntity.register("reporting_frequency", { required: true })}
                                                defaultValue={editData ? editData.reporting_frequency : ""}
                                            >
                                                <option value="">Select </option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                                <option value="Half-Yearly">Half-Yearly</option>
                                                <option value="Yearly">Yearly</option>
                                            </select>
                                            {errors.reporting_frequency && <span className="text-danger">This is required</span>}
                                        </div>



                                        <div className="col-md-12 text-right">
                                            <button className="mt-1 text-white accordianbutton">
                                                {title}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>

            <div className="model_box">
                <Modal
                    show={ShowList}
                    onHide={handleCloseShow}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >


                    <Modal.Header closeButton>
                        <Modal.Title>{`Reporting List of ${datalist?.company_name || "Company"}`}</Modal.Title>
                    </Modal.Header>




                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        {/* Table for Details */}
                                        <div className="col-md-12 mt-3">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {datalist && datalist.details ? (
                                                        datalist.details.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.s_no}</td>
                                                                {/* <td>{item.name}</td> */}
                                                                <td>
                                                                    <button onClick={() => handleShowAssign(item.s_no, datalist?.company_id, datalist?.company_name)}>
                                                                        {item.name || "-"}
                                                                    </button>
                                                                </td>


                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="2">No data available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Submit Button */}
                                        {/* <div className="col-md-12 text-right">
                                            <button className="mt-1 text-white accordianbutton">
                                                {title}
                                            </button>
                                        </div> */}

                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>

            {/* Tan pop up */}
            <div className="model_box">
                <Modal
                    show={ShowTan}
                    onHide={handleCloseTan}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Details - {selecteTan}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={formTan.handleSubmit((data) => onSubmitEntityDetails(data, selectedId))} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Entity Name */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Tan<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Entity Name"
                                                className="accordiantext"
                                                {...formTan.register("entity_tan", { required: true })}
                                                defaultValue={editData ? editData.entity_tan : ""}

                                            />
                                            {errors.entity_tan && <span className="text-danger"></span>}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                CIN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter "
                                                className="accordiantext"
                                                {...formTan.register("entity_cin", { required: true })}
                                                defaultValue={editData ? editData.entity_cin : ""}
                                            />
                                            {/* {errors.entity_pan && <span className="text-danger">This is required</span>} */}
                                            {validationErrors.entity_cin && <p className="text-danger">{validationErrors.entity_cin}</p>}

                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Framework Work <span className="text-danger">*</span>
                                            </label>

                                            <Controller
                                                control={formTan.control}
                                                name="financial_framework_id"
                                                rules={{ required: true }}
                                                defaultValue={editData ? editData.fid : null}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={Framework}
                                                        onChange={(selectedOption) => {
                                                            field.onChange(selectedOption?.value);
                                                        }}
                                                        value={Framework.find(option => option.value === field.value)}
                                                    />
                                                )}
                                            />
                                            {errors.financial_framework_id && (
                                                <span className="text-danger">This is required</span>
                                            )}

                                            {/* <Select
                                                options={Framework}
                                                onChange={handleSelectChange}
                                                defaultValue={
                                                    editData
                                                        ? Framework.find(option => option.value === editData.fid) // For edit case
                                                        : null // For new record, set to null or empty
                                                }
                                            />
                                            {errors.framework_name && <span className="text-danger">This is required</span>} */}
                                        </div>


                                        <div className="col-md-12 text-right ">
                                            <button className="mt-1 mr-2 text-white accordianbutton">
                                                {title}
                                            </button>

                                            {/* <button className="mt-1 text-white accordianbutton">
                                                Cancel
                                            </button> */}
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

export default Entities;



