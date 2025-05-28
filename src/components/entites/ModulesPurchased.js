import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../Breadcrumb";
import { Check, DownloadCloud, Edit, Eye, Plus, Trash2, Upload, X } from "lucide-react";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import swal from "sweetalert";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";



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
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);


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

    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [selectAll, setSelectAll] = useState(false);


    return (
        <div className="d-flex">
            <Container fluid>

                <div className="breadcrumb-area"> <Breadcrumbs /> </div>

                <div className="page-content-full">
                    {/* Top: All Modules + Purchase button */}
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6>
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectAll(checked);

                                        if (checked) {
                                            // Select all non-enabled checkboxes
                                            const newSelected = {};
                                            Entities.forEach((mod) => {
                                                mod.sections.forEach((sec) => {
                                                    if (sec.enabled !== 'yes') {
                                                        const key = `${mod.module}-${sec.title}`;
                                                        newSelected[key] = true;
                                                    }
                                                });
                                            });
                                            setSelectedCheckboxes(newSelected);
                                        } else {
                                            // Clear all selections
                                            setSelectedCheckboxes({});
                                        }
                                    }}
                                />
                                <span className="checkmark"></span> All Modules
                            </label>
                        </h6>

                        <button
                            className={`btn btn-sm ${Object.keys(selectedCheckboxes).length > 0 ? 'btn-success' : 'btn-secondary'}`}
                            disabled={Object.keys(selectedCheckboxes).length === 0}
                        >
                            Purchase
                        </button>
                    </div>

                    {/* Module Tree */}
                    <Row className="g-2">
                        {Entities.map((mod, index) => (
                            <Col key={index} md={3}>
                                <div className="tree modules-style1 mb-3">
                                    <ul className="before-none">
                                        <li className="before-none module-title">
                                            <strong>{mod.module}</strong>
                                            <ul className="tree-data">
                                                {mod.sections.map((sec, idx) => {
                                                    const isEnabled = sec.enabled === 'yes';
                                                    const key = `${mod.module}-${sec.title}`;
                                                    const isChecked = isEnabled || !!selectedCheckboxes[key];

                                                    return (
                                                        <li key={idx} className={isChecked ? 'moduleactive' : ''}>
                                                            <label className="custom-checkbox d-flex align-items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    disabled={isEnabled}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        setSelectedCheckboxes((prev) => {
                                                                            const updated = { ...prev };
                                                                            if (checked) {
                                                                                updated[key] = true;
                                                                            } else {
                                                                                delete updated[key];
                                                                            }

                                                                            // Sync "select all"
                                                                            const totalAvailable = Entities.flatMap((m) =>
                                                                                m.sections.filter((s) => s.enabled !== 'yes')
                                                                            ).length;
                                                                            const totalChecked = Object.keys(updated).length;
                                                                            setSelectAll(totalChecked === totalAvailable);

                                                                            return updated;
                                                                        });
                                                                    }}
                                                                />
                                                                <span className="checkmark"></span>
                                                                <span className="ml-2">{sec.title}</span>
                                                            </label>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        ))}
                    </Row>

                   
                </div>


            </Container>


        </div>
    );
};

export default ModulesPurchased;
