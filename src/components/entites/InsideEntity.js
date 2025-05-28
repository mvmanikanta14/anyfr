import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../Breadcrumb";
import { Check, Edit, Eye, Plus, Trash2, X } from "lucide-react";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import swal from "sweetalert";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';



const InsideEntity = () => {

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
    const [records, setRecords] = useState(10);
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



    useEffect(() => {
        getAllEntities();
        // getAllHeader();
        getAllFrameworkMaster();


    }, [pageno, records, searchTerm]);

    const [showActive, setShowActive] = useState(true);

    const activeShares = Entities.filter(item => item.is_active);
    const inactiveShares = Entities.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);

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

        commonService.getAll(`${apiUrlsService.getAllEntities}?page=${pageno}&limit=${records}&is_active=${status}`)
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
        setEntities([]); // Set to an empty array instead of null
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
        setTitle("Add")
    }

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
                // window.location.reload();

                // Reset form state
                resetAllForms();
                reset();
            })
            .catch((error) => {
                handleApiError(error);
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

    return (
        <div className="d-flex">
            <Container fluid>
                <SidebarMenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

                <div className="breadcrumb-area"> <Breadcrumbs /> </div>

                <div
                    className="page-content-inside" >


                    {/* Search Box */}
                    <div className=" d-flex justify-content-end custom-table-search">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control w-25"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="border-0"
                            title="Add "
                            onClick={() => handleShow()}
                        >
                            <Plus size={18} color="blue" />
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

                    {/* Balance Sheet Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered  table-design-1">
                            <thead>
                                <tr className="bg-light">
                                    <th width="5%">S.No</th>
                                    <th>Name</th>
                                    <th>Reporting Frequency</th>
                                    <th>Reporting Period</th>
                                    <th colSpan={2}>AY/FY</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                                    displayedShares.map((item, index) => {
                                        const sNo = (pageno - 1) * records + index + 1;
                                        return (
                                            <tr key={item.id}>
                                                <td>{sNo}</td>
                                                <td>
                                                    {editingRow === item.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingData.entity_name}
                                                            onChange={(e) => handleInputChange(e, 'entity_name')}
                                                        />
                                                    ) : (
                                                        item.entity_name
                                                    )}
                                                </td>
                                                <td>
                                                    {editingRow === item.id ? (
                                                        <Select
                                                            value={
                                                                periodOptions.find(
                                                                    (option) => option.value === (editingData?.reporting_frequency || '')
                                                                ) || null
                                                            }
                                                            onChange={(e) => handleDataChange(e, 'reporting_frequency')}
                                                            options={periodOptions}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    ) : (
                                                        item.reporting_frequency
                                                    )}
                                                </td>
                                                <td>
                                                    {editingRow === item.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingData.financial_year_style}
                                                            onChange={(e) => handleInputChange(e, 'financial_year_style')}
                                                        />
                                                    ) : (
                                                        item.financial_year_style
                                                    )}
                                                </td>

                                                <td colSpan={2}>
                                                    {editingRow === item.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingData.financial_year_style}
                                                            onChange={(e) => handleInputChange(e, 'financial_year_style')}
                                                        />
                                                    ) : (
                                                        item.financial_year_style
                                                    )}

                                                    {/* Action Buttons - Hidden by default, show on hover */}
                                                    <td className="action-buttons">
                                                        {/* Only show this when not editing */}
                                                        {editingRow !== item.id && (
                                                            <button
                                                                className="btn-primary-outlined border-0"
                                                                title=""
                                                                onClick={() => handleShowEdit(item.id, item.entity_name)}
                                                            >
                                                                <Eye size={18} color="green" />
                                                            </button>
                                                        )}

                                                        {editingRow === item.id ? (
                                                            <>
                                                                <button className="btn-primary-outlined border-0" title="Save" onClick={() => handleSaveEdit(item.id)}> <Check size={18} color="green" /></button>
                                                                <button className="btn-danger-outlined border-0" title="Cancel" onClick={handleCancelEdit}>  <X size={18} color="gray" /></button>
                                                            </>
                                                        ) : (
                                                            <button className="btn-primary-outlined border-0" title="Delete" onClick={() => handleEditRow(item)}>
                                                                <Edit size={18} color="blue" />
                                                            </button>
                                                        )}

                                                        {/* Only show this when not editing */}
                                                        {editingRow !== item.id && (
                                                            <>
                                                                {showActive ? (
                                                                    <button
                                                                        className="btn-danger-outlined border-0"
                                                                        title="Delete"
                                                                        onClick={() => deleteEntities(item.id)}
                                                                    >
                                                                        <Trash2 size={18} color="red" />
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn-success-outlined"
                                                                        title="Activate"
                                                                    >
                                                                        Activate
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
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
                </div>
            </Container>

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
                                            {errors.entity_pan && <span className="text-danger">This is required</span>}
                                            {validationErrors.entity_pan && <p className="text-danger">{validationErrors.entity_pan}</p>}

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
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={periodOptions.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.reporting_frequency && <span className="text-danger">This field is required.</span>}
                                        </div>



                                        <div className="col-md-12 text-right">
                                            <button className="border-0 mt-2 mb-2 btn btn-primary">
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
                        <Modal.Title>Additional Details - {selecteTan}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={formTan.handleSubmit((data) => onSubmitEntityDetails(data, selectedId))} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Entity Name */}

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                PAN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Entity Name"
                                                className="accordiantext"
                                                {...formTan.register("entity_pan", { required: true })}
                                                defaultValue={editData ? editData.entity_pan : ""}

                                            />
                                            {/* {errors.entity_tan && <span className="text-danger"></span>} */}
                                        </div>

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
                                            {/* {errors.entity_tan && <span className="text-danger"></span>} */}
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
                                            {/* {errors.financial_framework_id && (
                                                <span className="text-danger">This is required</span>
                                            )} */}

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
                                            <button className="border-0 mt-2 mb-2 btn btn-primary">
                                                {/* {title} */}
                                                Save
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

export default InsideEntity;
