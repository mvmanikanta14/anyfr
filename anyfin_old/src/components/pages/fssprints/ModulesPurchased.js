

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
import { FaBeer, FaEye, FaPaperclip, FaPencilAlt, FaPills, FaRadiation, FaTimes } from "react-icons/fa";



const ModulesPurchased = () => {
    const [Entities, setEntities] = useState([]);
    const [Framework, setFramework] = useState([]);
    const [EntitiesAdd, setEntitiesAdd] = useState([]);
    const [TanAdd, setTanAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    // const [totalElements, setTotalElements] = useState(0);
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
        // getAllFrameworkMaster();


    }, [pageno, records, searchTerm]);
    const [showActive, setShowActive] = useState(true);

    const activeShares = Entities.filter(item => item.is_active);
    const inactiveShares = Entities.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;

    // const displayedShares = Array.isArray(entities) ? entities.filter(...) : [];




    const getAllEntities = () => {
        const status = showActive ? 1 : 0;

        commonService
            .getAll(`${apiUrlsService.getAllpurchased}`)
            .then((response) => {
                console.log("API madhu Response:", response.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setEntities(response.data);
                        // setTotalElements(response.data.total); // Set total records
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








    const navigate = useNavigate(); // Initialize navigation




    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false)
        setShowList(false)
    }

    const handleCloseTan = () => {
        setShowTan(false);  // Hide modal
        setEditData(null);  // Clear form data
        setTitle("");  // Reset title
        // setSelectedId(null);  // Clear selected ID
    };








    return (

        <div className="">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Modules Purchased </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Modules Purchased  </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">

                        <div className="col-md-12 mb-2">

                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        {/* <th width="5%">S.No</th> */}
                                        <th width="20%">Module</th>
                                        <th width="20%">Sections</th>
                                        <th width="10%">Enabled</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(Entities) && Entities.length > 0 ? (
                                        Entities.map((item, index) => {
                                            const sNo = (pageno - 1) * records + index + 1;
                                            return (
                                                <React.Fragment key={item.module}>
                                                    {/* Parent Row (Module) */}
                                                    <tr>
                                                        {/* <td>{sNo}</td> */}
                                                        <td rowSpan={item.sections.length + 1}>{item.module}</td>
                                                        
                                                      
                                                    </tr>
                                                    {/* Child Rows (Sections) */}
                                                    {item.sections.map((section, idx) => (
                                                        <tr key={idx}>
                                                            
                                                            <td>{section.title} </td>
                                                            
                                                            <td>
                                                            {section.enabled}
                                                            </td>
                                                            <td>
                                                            {section.enabled === "no" && <button>Purchase</button>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>







                    </div>
                </div>
            </div>








        </div>
    );
};

export default ModulesPurchased;



