

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import Pagination from "../../../PaginationCommon";
// import commonService from "../../../../services/common.service";
import { IconHome, IconPencil, IconTrash, IconRefresh } from '@tabler/icons-react';
// import apiUrlsService from "../../../../services/apiUrls.service";
import { useForm } from "react-hook-form";

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



const Entities = () => {
    const [Entities, setEntities] = useState([]);
    const [EntitiesAdd, setEntitiesAdd] = useState([]);
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


    useEffect(() => {
        getAllEntities();
        getAllHeader();


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
                    swal("Error", "Something went wrong!", "error");
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
        const status = showActive ? 1 : 0; // 1 for active, 0 for inactive

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


    // const onSubmit = (data) => {
    //     const requestData = {
    //         ...data,
    //         created_by: auth.login_id,
    //         is_active: "true",
    //         financial_framework_id: 1,
    //     };

    //     if (!ids) {
    //         // ADD Operation
    //         commonService.add(apiUrlsService.addEntities, requestData)
    //             .then((res) => {
    //                 setEntitiesAdd([...EntitiesAdd, res.data]);
    //                 swal("Success", "Added successfully!", "success");
    //                 handleCloseShow();
    //                 getAllEntities();
    //                 reset();
    //             })
    //             .catch((error) => {
    //                 handleApiError(error);
    //             });
    //     } else {
    //         // EDIT Operation with ID in URL
    //         commonService.update(`${apiUrlsService.editEntities}/${editData.id}`, requestData)
    //             .then((response) => {
    //                 if (response) {
    //                     const updatedEntities = Entities.map((item) =>
    //                         item.id === editData.id ? response.data : item
    //                     );
    //                     // console.log("Updated Data:", updatedEntities);
    //                     setEntitiesAdd(updatedEntities);
    //                     swal("Success", "Updated successfully!", "success");
    //                     handleCloseShow();
    //                     getAllEntities();
    //                     reset();
    //                 }
    //             })
    //             .catch((error) => {
    //                 if (error.response && error.response.status === 403) {
    //                     // EventBus.dispatch("logout");
    //                 }
    //             });
    //     }
    // };

    const onSubmit = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            is_active: "true",
            financial_framework_id: 1,
        };
    
        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addEntities, requestData)
                .then((res) => {
                    setEntitiesAdd([...EntitiesAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseShow();
                    getAllEntities();
                    reset();
                })
                .catch((error) => {
                    handleApiError(error);
                });
        } else {
            // EDIT Operation with ID in URL
            commonService.update(`${apiUrlsService.editEntities}/${editData.id}`, requestData)
                .then((response) => {
                    if (response) {
                        const updatedEntities = Entities.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setEntitiesAdd(updatedEntities);
                        swal("Success", "Updated successfully!", "success");
                        handleCloseShow();
                        getAllEntities();
                        reset();
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        }
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
                console.log(errorMessages,"maninama");
    
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
    
    
    

    const handleShowEdit = (id) => {
        const itemToEdit = Entities.find((item) => item.id === id)
        setEditData(itemToEdit);
        console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        // console.log(ids);
        setShow(true);
        // setShowList(true);
        setIsEditMode(true);
        reset();
    }

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

    const handleShow = async () => {
        //permission check
        // const user_id = parseInt(auth.user_id);
        // const hasPermission = await PermissionCheck(22,user_id); 
        // if(!hasPermission){
        // return false;
        // }
        reset();
        setShow(true);
        setTitle("Add")
    }

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
                                        {/* <label className="mb-0">
                                    Show&nbsp;
                                    <select
                                        className="form-control d-inline w-auto"
                                        value={records}
                                        onChange={handleRecordsChange}
                                    >
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    &nbsp; entries
                                </label> */}
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

                        {/* <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th width="">Name</th>
                                        <th width="">PAN</th>
                                        <th width="">Reporting Frequency</th>
                                        <th width="">Financial Year</th>
                                        <th width="">Start Year</th>
                                        <th width="">End Year</th>
                                        <th width="10%">Action</th>
                                    </tr>


                                </thead>
                                <tbody>
                                    {displayedShares.length > 0 ? (
                                        displayedShares.map((item, index) => {
                                            const sNo = index + 1;
                                            return (
                                                <tr key={item.id}>
                                                    <td>{sNo}</td>
                                                    <td>
                                                        <button onClick={() => handleShowRep(item.s_no)}>
                                                            {item.entity_name || "-"}
                                                        </button>
                                                    </td>
                                                    <td>{item.entity_pan || "-"}</td>
                                                    <td>{item.reporting_frequency || "-"}</td>
                                                    <td>{item.financial_year_style || "-"}</td>
                                                    <td>{item.start_year || "-"}</td>
                                                    <td>{item.end_year || "-"}</td>

                                                    <td className="inline-btns">
                                                        {showActive ? (
                                                            // Show Edit & Delete buttons for Active items
                                                            <>
                                                                <button
                                                                    className="btn-primary-outlined"
                                                                    onClick={() => handleShowEdit(item.id)}
                                                                    title="Edit"
                                                                >
                                                                    <IconPencil />
                                                                </button>
                                                                <button
                                                                    className="btn-danger-outlined"
                                                                    title="Delete"
                                                                    onClick={() => deleteEntities(item.id)}
                                                                >
                                                                    <IconTrash />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            // Show Activate button for Inactive items
                                                            <button
                                                                className="btn-success-outlined"
                                                                title="Activate"
                                                            // onClick={() => activateShare(item.id)}
                                                            >
                                                                Activate
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No {showActive ? "active" : "inactive"} data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div> */}


                        {/* <div className="d-flex justify-content-between">

                            <div className=" ">
                                <span className="float-right">
                                    Showing {(pageno - 1) * records + 1} to{" "}
                                    {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                                    of {totalElements} entries
                                </span>
                            </div>

                            <div className=" ">
                                <Pagination
                                    totalElements={totalElements}
                                    recordsPerPage={records}
                                    pageNumber={pageno}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div> */}

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th>Name</th>
                                        <th>PAN</th>
                                        <th>Reporting Frequency</th>
                                        <th>Financial Year</th>
                                        <th>Start Year</th>
                                        <th>End Year</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedShares.length > 0 ? (
                                        displayedShares.map((item, index) => {
                                            const sNo = (pageno - 1) * records + index + 1;
                                            return (
                                                <tr key={item.id}>
                                                    <td>{sNo}</td>
                                                    <td>
                                                        <button onClick={() => handleShowRep(item.s_no)}>
                                                            {item.entity_name || "-"}
                                                        </button>
                                                    </td>
                                                    <td>{item.entity_pan || "-"}</td>
                                                    <td>{item.reporting_frequency || "-"}</td>
                                                    <td>{item.financial_year_style || "-"}</td>
                                                    <td>{item.start_year || "-"}</td>
                                                    <td>{item.end_year || "-"}</td>
                                                    <td className="inline-btns">
                                                        {showActive ? (
                                                            <>
                                                                <button
                                                                    className="btn-primary-outlined"
                                                                    onClick={() => handleShowEdit(item.id)}
                                                                    title="Edit"
                                                                >
                                                                    <IconPencil />
                                                                </button>
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
                                                                onClick={() => showActive(item.id)}
                                                            >
                                                                Activate
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No {showActive ? "active" : "inactive"} data found
                                            </td>
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
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
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
                                                {...register("entity_name", { required: true })}
                                                defaultValue={editData ? editData.entity_name : ""}
                                            />
                                            {errors.entity_name && <span className="text-danger"></span>}
                                        </div>

                                        {/* Reporting Frequency */}
                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Reporting Frequency <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Reporting Frequency"
                                                className="accordiantext"
                                                {...register("reporting_frequency", { required: true })}
                                                defaultValue={editData ? editData.reporting_frequency : ""}
                                            />
                                            {errors.reporting_frequency && <span className="text-danger">This is required</span>}
                                        </div> */}

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Reporting Frequency <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("reporting_frequency", { required: true })}
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

                                        {/* Financial Year (Dropdown with Static Data) */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Financial Year <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("financial_year_style", { required: true })}
                                                defaultValue={editData ? editData.financial_year_style : ""}
                                            >
                                                <option value="">Select Financial Year</option>
                                                <option value="2024-25">2024-25</option>
                                                <option value="2023-24">2023-24</option>
                                                <option value="2022-23">2022-23</option>
                                                <option value="2021-22">2021-22</option>
                                                <option value="2020-21">2020-21</option>
                                            </select>
                                            {validationErrors.financial_year_style && <p className="text-danger">{validationErrors.financial_year_style}</p>}
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
                                                {...register("entity_pan", { required: true })}
                                                defaultValue={editData ? editData.entity_pan : ""}
                                            />
                                            {/* {errors.entity_pan && <span className="text-danger">This is required</span>} */}
                                            {validationErrors.entity_pan && <p className="text-danger">{validationErrors.entity_pan}</p>}

                                        </div>

                                        {/* CIN */}


                                        {/* Framework (Dropdown with Static Data) */}
                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Framework <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("financial_framework_id", { required: true })}
                                                defaultValue={editData ? editData.financial_framework_id : ""}
                                            >
                                                <option value="">Select Framework</option>
                                                <option value="IFRS">IFRS</option>
                                                <option value="GAAP">GAAP</option>
                                                <option value="Ind AS">Ind AS</option>
                                                <option value="AS">AS</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.financial_framework_id && <span className="text-danger">This is required</span>}
                                        </div> */}

                                        {/* CFS is Applicable (Yes/No) */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                CFS is Applicable <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("is_cfs_applicable", { required: true })}
                                                defaultValue={editData ? editData.is_cfs_applicable : ""}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            {validationErrors.is_cfs_applicable && <p className="text-danger">{validationErrors.is_cfs_applicable}</p>}
                                        </div>


                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Start Year <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter "
                                                className="accordiantext"
                                                {...register("start_year", { required: true })}
                                                defaultValue={editData ? editData.start_year : ""}
                                            />
                                            {errors.start_year && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Constitution */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                End Year <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter "
                                                className="accordiantext"
                                                {...register("end_year", { required: true })}
                                                defaultValue={editData ? editData.end_year : ""}
                                            />
                                            {validationErrors.end_year && <p className="text-danger">{validationErrors.end_year}</p>}
                                        </div>

                                        {/* Submit Button */}
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
                    {/* <Modal.Header closeButton>
                        <Modal.Title>{"Reporting List"}</Modal.Title>
                    </Modal.Header> */}

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

        </div>
    );
};

export default Entities;



