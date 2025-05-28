
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";
import { IconHome } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";

// StepNavigation Component
const StepNavigation = ({ stepsData }) => {
    const { steps, active_step, navigation } = stepsData || {};

    // Helper function to render the navigation links
    const getStepNavigation = (step) => {
        return (
            <div className="step-navigation">
                <Link to={step.href} className="navigation-link">
                    {step.label}
                </Link>
            </div>
        );
    };

    return (
        <div>
            {/* Show all steps as a sequence */}
            <div className="steps-sequence d-flex justift-content-between align-items-center">
                <div className="previous-step">
                    {/* Display previous step if navigation and previous are defined */}
                    {navigation?.previous ? getStepNavigation(navigation.previous) : null}
                </div>
                <div className="step-navigation-container">

                    <ul>
                        {steps && steps.map((step, index) => (
                            <li key={index}>
                                <Link to={`/audit/300001000/${step.replace(" ", "-").toLowerCase()}`} className="navigation-link">
                                    {step}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>



                {/* <div className="current-step">
                <span className="step-label">{active_step}</span>
            </div> */}
                <div className="next-step">
                    {/* Display next step if navigation and next are defined */}
                    {navigation?.next ? getStepNavigation(navigation.next) : null}
                </div>
            </div>
        </div>
    );
};

const FssRatios = () => {
    const [FssRatios, setFssRatios] = useState([]); // Initialize as an empty array
    const [FssRatiosUnload, setFssRatiosUnload] = useState([]); // Initialize as an empty array
    const [wprData, setWprData] = useState(null);
    const [FssOptions, setFssOptions] = useState([]);
    const [navigation, setNavigation] = useState(null); // Initialize as null to handle loading state
    const [Show, setShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFormConfig] = useState([]);
    const [formData, setFormData] = useState();

    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);

    useEffect(() => {
        getAllWprHeader();
        getAllFssRatios();
        getAllFssOptions();
        getAllNavigation();
    }, []);

    // Fetching WPR Header Data
    const getAllWprHeader = () => {
        commonService.getAll(apiUrlsService.getAllWprHeader).then((response) => {
            if (response && response.data) {
                setWprData(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    // Fetching Navigation Data
    const getAllNavigation = () => {
        commonService.getAll(apiUrlsService.getNavigationRatios).then((response) => {
            if (response && response.data) {
                setNavigation(response.data); // Set the navigation data
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    // Fetching Trial Balance Data (Loaded)
    const getAllFssRatios = () => {
        commonService.getAll(apiUrlsService.getRatios).then((response) => {
            if (response && response.data) {
                setFssRatios(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    const getAllRMC = (action, rowData) => {
        commonService.getAll(apiUrlsService.getRMC).then((response) => {
            if (response && response.data) {
                setFormConfig(response.data); 
                setFormConfig(response.data[action]);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    
        setCurrentModal(action);
        setFormData(rowData);  // Pre-populate form data with current row data
        setShowModal(true);  // Show the modal
    };

    const handleActionClick = (action, item) => {
        switch (action) {
          case 'Edit':
            // Open edit modal or perform edit action
            console.log('Editing item:', item);
            break;
          case 'Delete':
            // Perform delete action
            console.log('Deleting item:', item);
            break;
          case 'View':
            // Open view modal or perform view action
            console.log('Viewing item:', item);
            break;
          default:
            console.log('Unknown action:', action);
        }
      };
      
    

    const handleCloseShow = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowModal(false)
    }

    const getModalFields = () => {
        if (!modalData || !modalData[currentModal]) return {};
        return modalData[currentModal];
    };

    const currentModalData = getModalFields();

    // Fetching FSS Options
    const getAllFssOptions = () => {
        commonService.getAll(apiUrlsService.getFSSRatiosActions).then((response) => {
            if (response && response.data) {
                setFssOptions(response.data.actions);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    const getAllUploadTb = () => {
        commonService.getAll(apiUrlsService.getUploadTb).then((response) => {
            if (response && response.data) {
                setFormConfig(response.data.fields);
            }
        }).catch((error) => {
            handleApiError(error);
        });

        setShow(true);

    };

    // Handle upload action
    function handleUpload(action) {
        console.log(`Uploading with action: ${action}`);
    }

    return (
        <div className="container col-md-12">
            {/* Breadcrumb Navigation */}
            <div className="bread_crumb my-0">
                <div>
                    {navigation ? (
                        <StepNavigation stepsData={navigation} />
                    ) : (
                        <p>Loading navigation...</p>
                    )}
                </div>
            </div>

            {/* WPR Information */}
            <div className="card mb-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-5">
                            {wprData ? (
                                <>
                                    <p><b>WPR ID: {wprData.wpr_id} </b></p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="col-md-7">
                            <div>
                                {FssOptions.map((option) => (
                                    <span key={option.id} style={{ margin: '0px 8px 0px 0px' }}>
                                        <button onClick={() => handleUpload(option.action)}
                                            style={{
                                                textTransform: 'uppercase',
                                                backgroundColor: 'rgb(188 130 224)',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '2px 7px',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }} >
                                            <span onClick={() => getAllUploadTb()}>{option.label}</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loaded Batches Table */}
            <div className="card">
                <div className="card-body">
                    <div className="mb-2">
                        <div className="table-responsive card">
                            <table className="table">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Previous</th>
                                        <th>Current</th>
                                       
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FssRatios.length > 0 ? (
                                        FssRatios.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.category}</td>
                                                <td>{item.name}</td>
                                                <td>{item.previous}</td>
                                                <td>{item.current}</td>
                                                
                                                <td>
                                                    {item.actions && item.actions.map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            className="btns-btns"
                                                            style={{ margin: '0 5px' }}
                                                            onClick={() => getAllRMC(action, item)}
                                                        >
                                                            {action}
                                                        </button>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="8">No data available</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>

            <div className="model_box">
                <Modal
                    show={showModal}
                    onHide={handleCloseShow}
                    centered
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{currentModalData ? currentModalData.modal_title : ''}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            {currentModalData && currentModalData.fields ? (
                                <form
                                    // onSubmit={handleSubmit(onSubmit)}
                                    className="formtext modalform"
                                >
                                    <div className="container">
                                        <div className="row pt-1 mt-1">
                                            {currentModalData.fields.map((field, index) => (
                                                <div key={index} className="col-md-6 text-left mt-1">
                                                    <label>
                                                        {field}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder={`Enter ${field}`}
                                                        name={field}
                                                        value={formData[field] || ''}
                                                    // onChange={handleFieldChange} // If you need to handle input change
                                                    />
                                                </div>
                                            ))}

                                            <div className="col-md-12 text-right">
                                                {/* Add any button here if needed */}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <p>No fields available for this modal.</p> // Fallback message
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>



        </div>
    );
};

export default FssRatios;


