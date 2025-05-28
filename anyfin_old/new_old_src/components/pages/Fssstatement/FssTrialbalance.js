
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

const FssTrialbalance = () => {
    const [FssTrialbalance, setFssTrialbalance] = useState([]); // Initialize as an empty array
    const [FssTrialbalanceUnload, setFssTrialbalanceUnload] = useState([]); // Initialize as an empty array
    const [wprData, setWprData] = useState(null);
    const [FssOptions, setFssOptions] = useState([]);
    const [navigation, setNavigation] = useState(null); // Initialize as null to handle loading state
    const [Show, setShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFormConfig] = useState([]);
    const [formData, setFormData] = useState({
        type: null,
        location: '',
        batch_name: ''
    });

    useEffect(() => {
        getAllWprHeader();
        getAllFssTrialbalanceload();
        getAllFssTrialbalanceUnload();
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
        commonService.getAll(apiUrlsService.getNavigation).then((response) => {
            if (response && response.data) {
                setNavigation(response.data); // Set the navigation data
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    // Fetching Trial Balance Data (Loaded)
    const getAllFssTrialbalanceload = () => {
        commonService.getAll(apiUrlsService.getAllFssTrialbalanceload).then((response) => {
            if (response && response.data) {
                setFssTrialbalance(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };
    // Uplaod TB function
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

    const handleCloseShow = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShow(false)
    }

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            type: e.target.files[0]
        });
    };

    // Handle dropdown change
    const handleLocationChange = (e) => {
        setFormData({
            ...formData,
            location: e.target.value
        });
    };

    // Fetching FSS Options
    const getAllFssOptions = () => {
        commonService.getAll(apiUrlsService.getAllFssOptions).then((response) => {
            if (response && response.data) {
                setFssOptions(response.data.upload_options);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    // Fetching Trial Balance Data (Unloaded)
    const getAllFssTrialbalanceUnload = () => {
        commonService.getAll(apiUrlsService.getAllFssTrialbalanceUnload).then((response) => {
            if (response && response.data) {
                setFssTrialbalanceUnload(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
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
                        <h5 className="text-center">Loaded Batches</h5>
                        <div className="table-responsive card">
                            <table className="table">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th>Type</th>
                                        <th>Batch Name</th>
                                        <th>Location</th>
                                        <th>Map</th>
                                        <th>Uploaded By</th>
                                        <th>Uploaded Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FssTrialbalance.length > 0 ? (
                                        FssTrialbalance.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.type}</td>
                                                <td>{item.batch_name}</td>
                                                <td>{item.location}</td>
                                                <td>{item.map}</td>
                                                <td>{item.uploaded_by}</td>
                                                <td>{item.uploaded_date}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    {item.actions && item.actions.map((action, idx) => (
                                                        <button key={idx} className="btns-btns" style={{ margin: '0 5px' }}>
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

                    {/* Unloaded Batches Table */}
                    <h5 className="text-center">Unloaded Batches</h5>
                    <div className="table-responsive card">
                        <table className="table">
                            <thead>
                                <tr className="border-btm-0">
                                    <th width="5%">S.No</th>
                                    <th>Type</th>
                                    <th>Batch Name</th>
                                    <th>Location</th>
                                    <th>Map</th>
                                    <th>Uploaded By</th>
                                    <th>Uploaded Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FssTrialbalanceUnload.length > 0 ? (
                                    FssTrialbalanceUnload.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.type}</td>
                                            <td>{item.batch_name}</td>
                                            <td>{item.location}</td>
                                            <td>{item.map}</td>
                                            <td>{item.uploaded_by}</td>
                                            <td>{item.uploaded_date}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.actions && item.actions.map((action, idx) => (
                                                    <button key={idx} className="btns-btns" style={{ margin: '0 5px' }}>
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

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> <h6> {isEditMode ? "Upload Tally Json File" : "Upload Tally Json File"} </h6></Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">
                                        {fields && fields.length > 0 ? (
                                            fields.map((field, index) => {
                                                if (field === "location") {
                                                    // Dropdown for 'location'
                                                    return (
                                                        <div key={index} className="col-md-4 mb-3">
                                                            <div className="field-container">
                                                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                            </div>
                                                            <div className="input-container">
                                                                <select id={field} name={field} className="form-control">
                                                                    <option value="">Select Location</option>
                                                                    {/* Add your location options here */}
                                                                    <option value="location1">Location 1</option>
                                                                    <option value="location2">Location 2</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                if (field === "type") {
                                                    // File input for 'type'
                                                    return (
                                                        <div key={index} className="col-md-4 mb-3">
                                                            <div className="field-container">
                                                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                            </div>
                                                            <div className="input-container">
                                                                <input
                                                                    type="file"
                                                                    id={field}
                                                                    name={field}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                if (field === "batch_name") {
                                                    // Text input for 'batch_name'
                                                    return (
                                                        <div key={index} className="col-md-4 mb-3">
                                                            <div className="field-container">
                                                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                            </div>
                                                            <div className="input-container">
                                                                <input
                                                                    type="text"
                                                                    id={field}
                                                                    name={field}
                                                                    className="form-control"
                                                                    placeholder={`Enter ${field}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null; // Default case if field does not match known types
                                            })
                                        ) : (
                                            <div className="col-md-12">
                                                <p>No fields available to display.</p>
                                            </div>
                                        )}

                                        <div className="col-md-12 text-right">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <p>
                        <b> Important Notice for Tally JSON Upload:</b>
                    </p>
                    <ul>
                        When preparing your Tally JSON file for upload, please note the following:
                        <li>If the vouchers in Tally contain negative amounts, there is a risk of mismatched balances during the upload process.</li>
                        <li> In such cases, it is recommended to either correct the entries in Tally to remove negative amounts or use the Excel upload option as an alternative.</li>
                    </ul>
                    <p> This warning is provided to help prevent issues and ensure data consistency during the upload process.</p>

                </Modal>
            </div>




        </div>
    );
};

export default FssTrialbalance;


