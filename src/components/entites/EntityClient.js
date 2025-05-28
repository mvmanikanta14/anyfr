import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../Breadcrumb";
import { ArrowDown, ArrowUp, Check, ChevronUp, Edit, Eye, Plus, Search, SearchCode, Trash2, X } from "lucide-react";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import swal from "sweetalert";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import Select from 'react-select';
import Pagination from "../../components/PaginationCommon";
import tokenService from "../../services/token.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModulesPurchased from "./ModulesPurchased";
import ModulesPurchasedList from "./ModulesPurchasedList";
import ModulesMasterList from "./ModulesMasterList";
import LocationList from "./LocationList";
import PeriodList from "./PeriodList";


const EntityClient = () => {

    const [data, setData] = useState([]); // Stores API data
    const [searchTerm, setSearchTerm] = useState("");
    const [currentYear, setCurrentYear] = useState(""); // Store Current Year
    const [previousYear, setPreviousYear] = useState(""); // Store Previous Year

    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    const [Entities, setEntities] = useState([]);
    const [Framework, setFramework] = useState([]);
    const [EntitiesAdd, setEntitiesAdd] = useState([]);
    const [TanAdd, setTanAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [datalist, setDatalist] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [ShowList, setShowList] = useState(false);
    const { auth } = useContext(ApiContext);
    const [Errors, setErrors] = useState([]);
    const [ShowTan, setShowTan] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const [selecteTan, setSelecteTan] = useState(null);
    const [showActive, setShowActive] = useState(true);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [searchEntityName, setSearchEntityName] = useState('');
    const [searchReportingfrequency, setSearchReportingfrequency] = useState('');
    const [searchFinancialyearstyle, setSearchFinancialyearstyle] = useState('');
    const [searchFrameworkname, setSearchFrameworkname] = useState('');
    const [isManualPaging, setIsManualPaging] = useState(false);
    const [searchColObj, setsearchColObj] = useState("");


    useEffect(() => {
        if (showActive) {
            if (!isManualPaging) {
                getAllEntities();
            }
        } else {
            getAllInactiveEntities();  // Fetch inactive entities
        }
        getAllFrameworkMaster();


    }, [showActive, pageno, records]);

    const handleDeleteConfirm = () => {
        if (itemToDelete) {
            deleteEntities(itemToDelete.id); // Call the delete function
            setShowTan(false); // Close the modal after deletion
        }
    };


    const activeShares = Entities.filter(item => item.is_active);
    const inactiveShares = Entities.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);

    const handleSort = (column) => {
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';
        setSortOn(column);
        setSortDir(newSortDir);

        getAllEntities(); // call API again after sort change
    };

    // Sorting icon (example basic function)
    const getSortingIcon = (column) => {
        if (sortOn !== column) return <ChevronUp size={16} />;
        return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    };


    const handlePageChange = (newPageNumber) => {
        setIsManualPaging(true);
        setPageNo(newPageNumber);
        const status = showActive ? 1 : 0;

        commonService.add(`${apiUrlsService.getAllEntities}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setEntities(response.data.data);
                        setTotalElements(response.data.total);
                        setIsManualPaging(false); // ✅ After success, allow default API again
                    } else {
                        swal(response.data.error);
                        setEntities([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const deleteEntities = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteEntities}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Inactive successfully!", "success");
                    getAllEntities(); // Refresh the list
                    handleCloseTan();
                } else {
                    swal("Success", "Inactive successfully!", "success");
                    getAllEntities();
                    handleCloseTan();

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

    const handleShowToggle = () => {
        setShowActive(!showActive);
    };


    const getAllEntities = (key = "", value = "") => {

        const requestData = {
            key: key,
            value: value,
            sortOn: sortOn,
            sortDir: sortDir
        };


        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsService.getAllEntities}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setEntities(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        swal(response.data.error);
                        setEntities([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllInactiveEntities = () => {

        commonService.getAll(apiUrlsService.getAllInactiveEntities)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setEntities(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        swal(response.data.error);
                        setEntities([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllactiveEntities = (id) => {
        commonService.update(`${apiUrlsService.getAllactiveEntities}/${id}`)
            .then((response) => {
                console.log("API Response:", response);

                if (response && response.data && response.data.success) { // your success condition
                    swal("Success", "Activated successfully!", "success").then(() => {
                        setShowActive(true);
                        handleCloseTan();
                        resetAllForms();
                        getAllEntities();
                    });
                } else {
                    swal("Error", response.data.error || "Activation failed", "error");
                }
            })
            .catch((error) => {
                console.error("Network/API call failed: ", error);
                if (error.response) {
                    // API gave some error response
                    swal("Error", error.response.data?.error || "Something went wrong!", "error");
                } else {
                    // true network error
                    swal("Error", "Network error. Please check your connection!", "error");
                }
            });

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


    const handleInputChange = (e, field) => {
        const { value } = e.target; // Get the value from the input field
        setEditingData((prevData) => ({
            ...prevData,
            [field]: value, // Update the respective field in editingData
        }));
    };


    const handleDataChange = (selectedOption, field) => {
        // If selectedOption is an object, extract its value
        if (selectedOption && selectedOption.value) {
            setEditingData((prevData) => ({
                ...prevData,
                [field]: selectedOption.value
            }));
        }
    };

    const FinancialYearhandleDataChange = (selectedOption, field) => {
        // If selectedOption is an object, extract its value
        if (selectedOption && selectedOption.value) {
            setEditingData((prevData) => ({
                ...prevData,
                [field]: selectedOption.value
            }));
        }
    };

    const ReportingPeriodhandleDataChange = (selectedOption, field) => {
        // If selectedOption is an object, extract its value
        if (selectedOption && selectedOption.value) {
            setEditingData((prevData) => ({
                ...prevData,
                [field]: selectedOption.value
            }));
        }
    };

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
                setEditingRow(null);

            })
            .catch((error) => {
                swal("Error", "Failed to update data", "error");
            });
    };


    const handleCancelEdit = () => {
        setEditingRow(null);
        setEditingData(null);
    };

    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false);
        setShowList(false);
        reset();
        resetAllForms();
    }


    const formEntity = useForm({
        mode: "onChange",
    });

    const resetAllForms = () => {
        // formTan.reset();
        formEntity.reset();

    };

    const handleShow = async () => {

        // reset();
        setShow(true);
        setTitle("Create")
        setShowDeleteButton(false);
    }

    // const onSubmit = (data) => {
    //     const requestData = {
    //         ...data,
    //         created_by: auth.login_id,
    //         is_active: "true",
    //         financial_framework_id: 1,
    //         // financial_year_style: "Financial Year",
    //         is_cfs_applicable: "true"
    //     };

    //     if (!ids) {
    //         // ADD Operation
    //         commonService.add(apiUrlsService.addEntities, requestData)
    //             .then((res) => {
    //                 setEntitiesAdd([...EntitiesAdd, res.data]);
    //                 swal("Success", "Added successfully!", "success");
    //                 handleCloseShow();
    //                 getAllEntities();
    //                 resetAllForms();
    //             })
    //             .catch((error) => {
    //                 handleApiError(error);
    //             });
    //     }

    // };


    const onSubmitAdd = (data) => {
        // console.log("Inside Submit, ids is:", ids);
        const requestData = {
            ...data,
            created_by: auth.login_id,
            is_active: "true",
            financial_year_style: data.financial_year_style,
            financial_framework_id: data.financial_framework_id,
            is_cfs_applicable: "true",
            reporting_period: "2024-25"
        };

        if (!ids) {
            commonService.add(apiUrlsService.addEntities, requestData)
                .then((res) => {
                    setEntitiesAdd([...EntitiesAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    getAllEntities();
                    handleCloseShow();
                    resetAllForms();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    swal("Error", error.error, "error");

                });
        }

    };


    const onSubmitUpdate = (data) => {
        // console.log("Inside Submit, ids is:", ids);
        const requestData = {
            ...data,
            created_by: auth.login_id,
            is_active: "true",
            financial_year_style: data.financial_year_style,
            financial_framework_id: data.financial_framework_id,
            is_cfs_applicable: "true",
            reporting_period: "2024-25"
        };
        // UPDATE Operation
        commonService.update(`${apiUrlsService.editEntities}/${ids}`, requestData)
            .then((res) => {
                const updatedEntities = Entities.map((item) =>
                    item.id === ids ? res.data : item
                );
                setEntities(updatedEntities);
                swal("Success", "Updated successfully!", "success");
                handleCloseTan();
                getAllEntities();
                resetAllForms();
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


    const getAllFrameworkMaster = () => {
        commonService.getAll(apiUrlsService.getFrameworkDropdown).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data);
                    // Transform the data to match the Select component format
                    const transformedData = response.data.data.map(item => ({
                        value: item.id,
                        label: item.framework_name
                    }));
                    setFramework(transformedData); // Set transformed data as options
                }
            }
        ).catch((error) => {
            // handleApiError(error);
        });
    };



    const onSubmitEntityDetails = (data, selectedId) => {
        const requestData = {
            ...data,
            financial_framework_id: 1,
            // fid:1
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
                // window.location.reload();

                // Reset form state
                resetAllForms();
                reset();
            })
            .catch((error) => {
                // handleApiError(error);
            });
    };


    const handleCloseTan = () => {
        setShowTan(false);  // Hide modal
        setEditData(null);   // Clear form data
        setTitle("");  // Reset title
        setSelectedId(null); // Clear selected ID
        // setFramework([]);  // Ensure Framework is reset to an empty array
        reset();  // Reset the form to its initial state
        resetAllForms();  // Additional reset if needed
    };




    const formTan = useForm({
        mode: "onChange",
    });
    const { setValue: setTanValue } = formTan;

    const handleShowEdit = (id, entity_name) => {
        const itemToEdit = Entities.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setId(itemToEdit.id);
            setShowDeleteButton(true);
        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setFramework([]); // Reset framework options
            setTitle("Add");
            setId(null);
            setShowDeleteButton(false);
        }

        reset(); // Reset the form state
        setShowTan(true); // Show the modal
        setSelectedId(id);
        setSelecteTan(entity_name); // Assuming this is for entity name
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


    const periodOptions = [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Half-Yearly', label: 'Half-Yearly' },
        { value: 'Yearly', label: 'Yearly' },
    ];

    const FinancialYearStyleOptions = [
        { value: 'Calendar Year', label: 'Calendar Year' },
        { value: 'Financial Year', label: 'Financial Year' },

    ];

    const ReportingPeriodOptions = [
        { value: '2024-25', label: '2024-25' },
        { value: '2025-26', label: '2025-26' },
        { value: '2026-27', label: '2026-27' },

    ];


    const [showYears, setShowYears] = useState(false);

    const handleClick = () => {
        setShowYears(!showYears);
    };
    const navigate = useNavigate();

    const handleShowRep = (id, entity_name) => {
        tokenService.setEID(id);
        tokenService.setEntityName(entity_name);
        toast.success("Entity Login successfully!");
        navigate("/entitydashboard");
    };

    return (
        <div className="d-flex">
            <Container fluid>

                <div className="breadcrumb-area"> <Breadcrumbs /> </div>

                <div className="page-content-full" >

                    {/* Search Box */}
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <Plus size={15} /> Create </button>
                            </div>
                        </div>




                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered  table-design-1">
                            <thead>
                                <tr className="bg-light">
                                    <th width="8%" onClick={() => handleSort('sno')}>S.No {getSortingIcon('sno')}</th>
                                    <th onClick={() => handleSort('entity_name')}> Entity Name {getSortingIcon('entity_name')}</th>
                                    <th onClick={() => handleSort('reporting_frequency')} width={'15%'}>Reporting Frequency {getSortingIcon('reporting_frequency')} </th>
                                    <th onClick={() => handleSort('financial_year_style')} width={'15%'} >AY/FY {getSortingIcon('financial_year_style')} </th>
                                    <th onClick={() => handleSort('framework_name')} width={'15%'}> Framework  {getSortingIcon('framework_name')} </th>
                                </tr>

                                <tr className="inline-col-search">

                                    <th> </th>
                                    <th>
                                        <div className="data-search input-group">
                                            <input
                                                type="text"
                                                value={searchEntityName}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchEntityName(value);
                                                    getAllEntities('entity_name', value);
                                                }}
                                                className="form-control table-col-search"
                                            />
                                            <div className="input-search-icon">
                                                <Search className="" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div className="data-search input-group">
                                            <input
                                                type="text"
                                                value={searchReportingfrequency}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchReportingfrequency(value);
                                                    getAllEntities('reporting_frequency', value);
                                                }}
                                                className="form-control table-col-search"
                                            />
                                            <div className="input-search-icon">
                                                <Search className="" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div className="data-search input-group">
                                            <input
                                                type="text"
                                                value={searchFinancialyearstyle}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchFinancialyearstyle(value);
                                                    getAllEntities('financial_year_style', value);
                                                }}
                                                className="form-control table-col-search"
                                            />
                                            <div className="input-search-icon">
                                                <Search className="" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div className="data-search input-group">
                                            <input
                                                type="text"
                                                value={searchFrameworkname}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchFrameworkname(value);
                                                    getAllEntities('framework_name', value);


                                                }}
                                                className="form-control table-col-search"
                                            />
                                            <div className="input-search-icon">
                                                <Search className="" />
                                            </div>
                                        </div>
                                    </th>


                                </tr>
                            </thead>


                            <tbody>
                                {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                                    displayedShares.map((item, index) => {
                                        const sNo = (pageno - 1) * records + index + 1;
                                        return (
                                            <tr onClick={() => handleShowEdit(item.id, item.entity_name)} key={item.id} className="tr-hover-effect1">
                                                <td>{sNo}</td>
                                                <td>{item.entity_name} </td>
                                                <td>{item.reporting_frequency}</td>
                                                <td>
                                                    {editingRow === item.id ? (
                                                        <Select
                                                            value={
                                                                FinancialYearStyleOptions.find(
                                                                    (option) => option.value === (editingData?.financial_year_style || '')
                                                                ) || null
                                                            }
                                                            onChange={(e) => FinancialYearhandleDataChange(e, 'financial_year_style')}
                                                            options={FinancialYearStyleOptions}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    ) : (
                                                        item.financial_year_style
                                                    )}


                                                </td>
                                                <td>{item.framework_name}</td>
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
                </div>
            </Container>

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size=""
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="md-width-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit Entities" : "Create a New Entity"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formEntity.handleSubmit(onSubmitAdd)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className=" container">
                                    <div className="row">

                                        {/* Entity Name */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Name of the Entity <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Entity Name"
                                                    className="form-control"
                                                    {...formEntity.register("entity_name", { required: true })}
                                                // defaultValue={editData ? editData.entity_name : ""}
                                                />
                                            </div>
                                            {validationErrors.entity_name && (
                                                <small className="text-danger ms-3">{validationErrors.entity_name}</small>
                                            )}
                                        </div>

                                        {/* Reporting Frequency */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Reporting Frequency <span className="text-danger">*</span>
                                                </label>
                                                <Controller
                                                    name="reporting_frequency"
                                                    control={formEntity.control}
                                                    // defaultValue={editData?.reporting_frequency || ''}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={periodOptions}
                                                            isSearchable
                                                            placeholder="Select"
                                                            className="react-select-container flex-grow-1"
                                                            classNamePrefix="custom-select"
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                            value={periodOptions.find(option => option.value === field.value)}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.reporting_frequency && (
                                                <small className="text-danger ms-3">This field is required.</small>
                                            )}
                                        </div>

                                        {/* AY/FY */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    AY/FY <span className="text-danger">*</span>
                                                </label>
                                                <Controller
                                                    name="financial_year_style"
                                                    control={formEntity.control}
                                                    // defaultValue={editData?.financial_year_style || ''}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={FinancialYearStyleOptions}
                                                            isSearchable
                                                            placeholder="Select"
                                                            className="react-select-container flex-grow-1"
                                                            classNamePrefix="custom-select"
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                            value={FinancialYearStyleOptions.find(option => option.value === field.value)}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.financial_year_style && (
                                                <small className="text-danger ms-3">This field is required.</small>
                                            )}
                                        </div>

                                        {/* Framework */}
                                        <div className=" ">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3"  >
                                                    Framework <span className="text-danger">*</span>
                                                </label>
                                                <Controller
                                                    name="financial_framework_id"
                                                    control={formEntity.control}
                                                    // defaultValue={editData?.financial_framework_id || ''}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={Framework}
                                                            isSearchable
                                                            placeholder="Select"
                                                            className="react-select-container flex-grow-1"
                                                            classNamePrefix="custom-select"
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                            value={Framework.find(option => option.value === field.value)}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.financial_framework_id && (
                                                <small className="text-danger ms-3">This field is required.</small>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>



                        <Modal.Footer>
                            <button className="btn btn-primary btn-sm">
                                {title}
                            </button>
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>

            {/* Tan pop up */}
            <div className="model_box ">
                <Modal
                    show={ShowTan}
                    onHide={handleCloseTan}

                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise custom-modal-popup-1" // corrected: `className` not `ClassName`
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Details of <span className="theme-text2"> ({selecteTan} {selectedId}) </span> </Modal.Title>

                    </Modal.Header>

                    <Modal.Body className="custom-modal-body p-0">

                        <Tabs defaultActiveKey="period" id="entity-tabs" className="popup-tabs">
                            {/* === TAB 1: BASIC DETAILS === */}


                            <Tab eventKey="period" title="Periods">
                                <div className="tab-form-body">
                                    <PeriodList selectedEntityId={selectedId} />
                                </div>
                            </Tab>

                            <Tab eventKey="basic" title="Basic Details">
                                <div className="tab-form-body">
                                    <form onSubmit={formEntity.handleSubmit(onSubmitUpdate)} className="formtext modalform">
                                        <div className=" ">
                                            <div className="row pt-1 mt-1">

                                                {/* Entity Name */}
                                                <div className="col-md-4 text-left mt-1">
                                                    <label>
                                                        Entity Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Entity Name"
                                                        className="form-control"
                                                        {...formEntity.register("entity_name", { required: true })}
                                                        defaultValue={editData ? editData.entity_name : ""}
                                                    />
                                                    {errors.entity_name && <span className="text-danger"> This is required</span>}
                                                    {/* {validationErrors.entity_name && <p className="text-danger">{validationErrors.entity_name}</p>} */}
                                                </div>


                                                <div className="col-md-4 text-left mt-1">
                                                    <label>
                                                        Reporting Frequency <span className="text-danger">*</span>
                                                    </label>
                                                    <Controller
                                                        name="reporting_frequency"
                                                        control={formEntity.control}
                                                        defaultValue={editData ? editData.reporting_frequency : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={periodOptions}
                                                                isSearchable={true} // Enables search functionality
                                                                placeholder="Select "
                                                                className="react-select-container"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={periodOptions.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"

                                                            />
                                                        )}
                                                    />
                                                    {errors.reporting_frequency && <span className="text-danger">This field is required.</span>}
                                                </div>

                                                <div className="col-md-4 text-left mt-1">
                                                    <label>
                                                        AY/FY<span className="text-danger">*</span>
                                                    </label>
                                                    <Controller
                                                        name="financial_year_style"
                                                        control={formEntity.control}
                                                        defaultValue={editData ? editData.financial_year_style : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={FinancialYearStyleOptions}
                                                                isSearchable={true} // Enables search functionality
                                                                placeholder="Select "
                                                                className="react-select-container"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={FinancialYearStyleOptions.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"

                                                            />
                                                        )}
                                                    />
                                                    {errors.reporting_frequency && <span className="text-danger">This field is required.</span>}
                                                </div>

                                                <div className="col-md-4 text-left mt-1">
                                                    <label>
                                                        Framework <span className="text-danger">*</span>
                                                    </label>
                                                    <Controller
                                                        name="financial_framework_id"
                                                        control={formEntity.control}
                                                        defaultValue={editData ? editData.fid : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={Framework}
                                                                isSearchable={true} // Enables search functionality
                                                                placeholder="Select "
                                                                className="react-select-container"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={Framework.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"

                                                            />
                                                        )}
                                                    />
                                                    {errors.reporting_frequency && <span className="text-danger">This field is required.</span>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12 text-right my-3">
                                                {showActive ? (
                                                    <>
                                                        {showDeleteButton && (
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteEntities(editData?.id)}
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
                                                    <button type="button" onClick={() => getAllactiveEntities(editData?.id)} className="btn btn-sm btn-success">
                                                        Active
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Tab>


                            <Tab eventKey="location" title="Locations">
                                <div className="tab-form-body">
                                    <LocationList selectedEntityId={selectedId} />
                                </div>
                            </Tab>


                            {/* === TAB 3: ADDITIONAL DETAILS === */}
                            <Tab eventKey="additional" title="Additional Details">
                                <div className="tab-form-body">
                                    <form onSubmit={formTan.handleSubmit((data) => onSubmitEntityDetails(data, selectedId))} className="formtext modalform">
                                        <div className=" ">
                                            <div className="row ">
                                                <div className="col-md-4 text-left mt-1">
                                                    <label>PAN <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter PAN"
                                                        className="form-control"
                                                        {...formTan.register("entity_pan", { required: true })}
                                                        defaultValue={editData?.entity_pan || ""}
                                                    />
                                                </div>

                                                <div className="col-md-4 text-left mt-1">
                                                    <label>TAN <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter TAN"
                                                        className="form-control"
                                                        {...formTan.register("entity_tan", { required: true })}
                                                        defaultValue={editData?.entity_tan || ""}
                                                    />
                                                </div>

                                                <div className="col-md-4 text-left mt-1">
                                                    <label>CIN <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter CIN"
                                                        className="form-control"
                                                        {...formTan.register("entity_cin", { required: true })}
                                                        defaultValue={editData?.entity_cin || ""}
                                                    />
                                                    {validationErrors.entity_cin && <p className="text-danger">{validationErrors.entity_cin}</p>}
                                                </div>

                                                <div className="col-md-12 text-right">
                                                    <button className="border-0 mt-2 mb-2 btn btn-primary btn-sm">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Tab>

                            {/* === TAB 4: RANDOM TAB === */}
                            <Tab eventKey="random" title="Modules">
                                <div className="tab-form-body">
                                    <ModulesMasterList selectedEntityId={selectedId} />
                                    {/* Add your inputs / logic for Random tab here */}
                                </div>
                            </Tab>


                        </Tabs>
                    </Modal.Body>
                </Modal>
            </div>


        </div>
    );
};

export default EntityClient;
