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
import { useNavigate } from "react-router-dom";



const ReportingPeriod = () => {

    const [PortingPeriod, setPortingPeriod] = useState([]);
    const [Entity, setEntity] = useState([]);
    const [PortingPeriodAdd, setPortingPeriodAdd] = useState([]);
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
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const [Framework, setFramework] = useState([]);

    useEffect(() => {
        getAllPortingPeriod();
        getAllEntities();


    }, [pageno, records, searchTerm]);
    const [showActive, setShowActive] = useState(true);

    const activeShares = PortingPeriod.filter(item => item.is_active);
    const inactiveShares = PortingPeriod.filter(item => !item.is_active);

    const displayedShares = showActive ? inactiveShares : activeShares;

    // const displayedShares = Array.isArray(PortingPeriod) ? PortingPeriod.filter(...) : [];


    const deletePortingPeriod = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deletePortingPeriod}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Deleted successfully!", "success");
                    getAllPortingPeriod(); // Refresh the list
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    getAllPortingPeriod();
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

    const getAllPortingPeriod = () => {
        const status = showActive ? 1 : 0;

        commonService
            .getAll(`${apiUrlsService.getAllPortingPeriod}?page=${pageno}&limit=${records}&is_active=${status}`)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setPortingPeriod(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        console.error("Unexpected response format:", response.data);
                        setPortingPeriod([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const getAllEntities = () => {
        commonService.getAll(apiUrlsService.getAllEntitiesDropdown).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data);
                    const transformedData = response.data.data.map(item => ({
                        value: item.id,
                        label: item.entity_name
                    }));
                    setEntity(transformedData);
                }
            }
        ).catch((error) => {
            // handleApiError(error);
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
            entity_id: data.entity_id
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addPortingPeriod, requestData)
                .then((res) => {
                    setPortingPeriodAdd([...PortingPeriodAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseShow();
                    getAllPortingPeriod();
                    resetAllForms();
                })
                .catch((error) => {
                    // handleApiError(error);
                });
        }

    };

    const formTan = useForm({
        mode: "onChange",
    });

    const { setValue: setTanValue } = formTan;
    const { setValue: setEntityValue } = formEntity;

    const resetAllForms = () => {
        formTan.reset();
        formEntity.reset();

    };


    const onSubmitEntityDetails = (data, selectedId) => {


        commonService.update(`${apiUrlsService.editPortingPeriod}/${selectedId}`, data)
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
                getAllPortingPeriod();
                // window.location.reload(); // Reload the page to reflect changes

                // Reset form state
                resetAllForms();
                reset();
            })
            .catch((error) => {
                // handleApiError(error);
            });
    };


    // const onSubmitEntityDetails = (data, selectedId) => {
    //     commonService.update(`${apiUrlsService.editPortingPeriod}/${selectedId}`, data)
    //         .then((res) => {
    //             if (res.data.updatedPeriod && res.data.updatedPeriod.length > 0) {
    //                 const updatedPeriod = res.data.updatedPeriod[0];

    //                 // Check if updatedPeriod exists
    //                 console.log("Updated Period:", updatedPeriod);

    //                 setTanAdd((prevTanAdd) => {
    //                     const updatedTanAdd = [...prevTanAdd, updatedPeriod];
    //                     return updatedTanAdd;
    //                 });

    //                 swal("Success", "Added successfully!", "success");

    //                 handleCloseTan();
    //                 getAllPortingPeriod();
    //                 window.location.reload(); // Reload the page
    //                 resetAllForms();
    //                 reset();
    //             } else {
    //                 console.error("No updated period found in response");
    //             }
    //         })
    //         .catch((error) => {
    //             handleApiError(error);
    //         });
    // };


    // const handleApiError = (error) => {
    //     console.log("Error", error.error[0], "error");
    //     if (error.error[0]) {
    //         const errors = error.error;

    //         // Extract API errors
    //         if (Array.isArray(errors)) {
    //             // Assuming error messages come in a fixed order
    //             const errorMessages = {
    //                 entity_pan: errors[0] || "",
    //                 financial_year_style: errors[1] || "",
    //                 is_cfs_applicable: errors[2] || "",
    //                 end_year: errors[3] || "",
    //             };
    //             console.log(errorMessages, "maninama");

    //             // Display errors in UI (Assuming you're using a state variable)
    //             setValidationErrors(errorMessages);

    //             // Show first error in an alert
    //             swal("Error", errors[0], "error");
    //         }
    //         else {
    //             swal("Error", "Unexpected response format.", "error");
    //         }
    //     }
    //     else {
    //         swal("Error", "Server error. Please try again later.", "error");
    //     }
    // };

    const [editingRow, setEditingRow] = useState(null);
    const [editingData, setEditingData] = useState(null);

    const handleEditRow = (item) => {
        setEditingRow(item.id);
        setEditingData({
            period: item.period || '',
            entity_id: item.entity_id || '',
            // is_active: item.is_active !== undefined ? item.is_active : true,
            // created_by: item.created_by || 1
        });
    };


    // const handleDataChange = (e, field) => {
    //     setEditingData({
    //         ...editingData,
    //         [field]: e.target.value
    //     });
    // };

    const handleDataChange = (selectedOption, field) => {
        // If selectedOption is an object, extract its value
        if (selectedOption && selectedOption.value) {
            setEditingData((prevData) => ({
                ...prevData,
                [field]: selectedOption.value
            }));
        }
    };


    // Handle blur (when user clicks outside the input, update the data)
    const handleSaveEdit = (field) => {
        // Immediately save the data on blur
        const updatedEntity = { ...editingData, };
        commonService.update(`${apiUrlsService.editPortingPeriodEdit}/${editingRow}`, updatedEntity)
            .then((response) => {
                const updatedPortingPeriod = displayedShares.map((item) =>
                    item.id === editingRow ? response.data : item
                );
                setPortingPeriodAdd(updatedPortingPeriod);
                swal("Success", "Updated successfully!", "success");
                getAllPortingPeriod();
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




    const handleShowEdit = (id, period) => {
        const itemToEdit = PortingPeriod.find((item) => item.id === id)
        setEditData(itemToEdit);
        console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        reset();
        setShowTan(true);
        setTitle("Add")
        setSelectedId(id);
        setSelecteTan(period);
    }



    const navigate = useNavigate(); // Initialize navigation




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

    const [selectedId, setSelectedId] = useState(null);
    const [selecteTan, setSelecteTan] = useState(null);

    const handleShowTan = async (id, entity_tan) => {
        reset();
        setShowTan(true);
        setTitle("Add")
        setSelectedId(id);
        // setSelecteTan(period);
    }

    const handleShow = async () => {

        reset();
        setShow(true);
        setTitle("Add")
    }

    const handleSelectChange = (selectedOption) => {
        console.log("Selected Framework:", selectedOption);
        setEntityValue("entity_id", selectedOption.value);
    };

    const fontSizeOptions = [
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16', label: '16' },
    ];

    const fontOptions = [
        { value: 'Serif', label: 'Serif' },
        { value: 'Monospace', label: 'Monospace' },
        { value: 'Cursive', label: 'Cursive' },
    ];

    const noteNumberingOptions = [
        { value: 'Option A', label: 'Option A' },
        { value: 'Option B', label: 'Option B' },
        { value: 'Option C', label: 'Option C' },
    ];

    const periodOptions = [
        { value: 'AY 2024-25', label: 'AY 2024-25' },
        { value: 'AY 2025-26', label: 'AY 2025-26' },
        { value: 'AY 2026-27', label: 'AY 2026-27' },
    ];




    return (
        <div className="d-flex">
            <Container fluid>
                <div className="breadcrumb-area"> <Breadcrumbs /> </div>

                <div
                    className="page-content-full">


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
                    </div>

                    {/* Balance Sheet Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered  table-design-1">
                            <thead>
                                <tr className="bg-light">
                                    <th width="5%">S.No</th>
                                    <th>Entity Name</th>
                                    <th colSpan={2}>Period</th>
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
                                                        <Select
                                                            value={Entity.find((entityItem) => entityItem.value === editingData.entity_id)}
                                                            onChange={(selectedOption) => handleDataChange(selectedOption, 'entity_id')}
                                                            options={Entity}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    ) : (

                                                        item.entity_name

                                                    )}
                                                </td>

                                                <td colSpan={2}>
                                                    {editingRow === item.id ? (
                                                        <Select
                                                            value={periodOptions.find((option) => option.value === editingData.period)}
                                                            onChange={(e) => handleDataChange(e, 'period')}
                                                            options={periodOptions}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    ) : (
                                                        item.period
                                                    )}

                                                    <div className="action-buttons">
                                                        {/* Show "Save" and "Cancel" buttons when editing */}
                                                        {editingRow === item.id ? (
                                                            <>
                                                                <button className="btn-primary-outlined border-0" title="Save" onClick={() => handleSaveEdit(item.id)}>
                                                                    <Check size={18} color="green" />
                                                                </button>
                                                                <button className="btn-danger-outlined border-0" title="Cancel" onClick={handleCancelEdit}>
                                                                    <X size={18} color="gray" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            // Show "Edit", "Eye" and "Delete" buttons when not editing
                                                            <>
                                                                <button
                                                                    className="btn-primary-outlined border-0"
                                                                    title="Edit"
                                                                    onClick={() => handleEditRow(item)}
                                                                >
                                                                    <Edit size={18} color="blue" />
                                                                </button>
                                                                <button
                                                                    className="btn-primary-outlined border-0"
                                                                    title="View"
                                                                    onClick={() => handleShowEdit(item.id, item.entity_name)}
                                                                >
                                                                    <Eye size={18} color="green" />
                                                                </button>
                                                                {showActive ? (
                                                                    <button
                                                                        className="btn-danger-outlined border-0"
                                                                        title="Delete"
                                                                        onClick={() => deletePortingPeriod(item.id)}
                                                                    >
                                                                        <Trash2 size={18} color="red" />
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
                                                    </div>
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
                        <Modal.Title>{isEditMode ? "Edit Reporting Period" : "Add Reporting Period"}</Modal.Title>
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
                                            <Select
                                                options={Entity}  // Using transformed options
                                                onChange={handleSelectChange}

                                            />

                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Period<span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="period"
                                                control={formEntity.control}
                                                defaultValue={editData ? editData.period : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={periodOptions}
                                                        isSearchable={true}
                                                        placeholder="Select Font Size"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={periodOptions.find(option => option.value === field.value)}

                                                    />
                                                )}
                                            />
                                            {errors.period && <span className="text-danger">This field is required.</span>}
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
                        <Modal.Title>Reporting Period -{selecteTan}</Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={formTan.handleSubmit((data) => onSubmitEntityDetails(data, selectedId))} className="formtext modalform">

                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Font Size<span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="font_size"
                                                control={formTan.control}
                                                defaultValue={editData ? editData.font_size : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={fontSizeOptions}
                                                        isSearchable={true}
                                                        placeholder="Select Font Size"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={fontSizeOptions.find(option => option.value === field.value)}

                                                    />
                                                )}
                                            />
                                            {errors.font_size && <span className="text-danger">This field is required.</span>}
                                        </div>


                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Font <span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="font"
                                                control={formTan.control}
                                                defaultValue={editData ? editData.font : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={fontOptions}
                                                        isSearchable={true} // Enables search functionality
                                                        placeholder="Select Font"
                                                        className="react-select-container"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={fontOptions.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.font && <span className="text-danger">This field is required.</span>}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Note Numbering Style <span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="note_numbering_style"
                                                control={formTan.control}
                                                defaultValue={editData ? editData.note_numbering_style : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={noteNumberingOptions}
                                                        isSearchable={true} // Enables search functionality
                                                        placeholder="Select Font"
                                                        className="react-select-container"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={noteNumberingOptions.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.note_numbering_style && <span className="text-danger">This field is required.</span>}
                                        </div>







                                        <div className="col-md-12 text-right ">
                                            <button className="border-0 mt-2 mb-2 btn btn-primary">
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

export default ReportingPeriod;
