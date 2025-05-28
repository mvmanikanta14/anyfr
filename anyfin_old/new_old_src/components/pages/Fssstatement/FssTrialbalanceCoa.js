
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

const FssTrialbalanceCoa = () => {
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
    const [filterData, setFilterData] = useState(null);
    const [progressData, setProgressData] = useState(null);


    useEffect(() => {
        getAllWprHeader();
        getAllFssTrialbalanceCoa();
        getAllFssOptions();
        getAllNavigation();
        getAllFssTrialbalanceFilter();
        getAllFssTrialbalanceProgress();
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

    const getAllFssTrialbalanceFilter = () => {
        commonService.getAll(apiUrlsService.getFssTrialbalanceloadFilter).then((response) => {
            if (response && response.data) {
                setFilterData(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    const getAllFssTrialbalanceProgress = () => {
        commonService.getAll(apiUrlsService.getFssTrialbalanceloadProgress).then((response) => {
            if (response && response.data) {
                setProgressData(response.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };

    // Fetching Trial Balance Data (Loaded)
    const getAllFssTrialbalanceCoa = () => {
        commonService.getAll(apiUrlsService.getFssTrialbalanceloadCoa).then((response) => {
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
        commonService.getAll(apiUrlsService.getFssCoaOptions).then((response) => {
            if (response && response.data) {
                setFssOptions(response.data.actions);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };



    // Handle upload action
    function handleUpload(action) {
        console.log(`Uploading with action: ${action}`);
    }

    // Handle action click (button click)
    const handleActionClickfilter = (action) => {
        switch (action) {
            case "open_error_log_modal":
                console.log("Open Error Log Modal");
                // Add your logic for opening error log modal here
                break;
            case "refresh_table":
                console.log("Refresh Table");
                // Add your logic for refreshing table here
                break;
            case "download_pdf":
                console.log("Download PDF");
                // Add your logic for downloading PDF here
                break;
            case "toggle_currency_display":
                console.log("Toggle Currency Display");
                // Add your logic for toggling currency display here
                break;
            case "toggle_view_fss":
                console.log("Toggle View FSS");
                // Add your logic for toggling view FSS here
                break;
            case "view_chart_of_accounts":
                console.log("View Chart of Accounts");
                // Add your logic for viewing chart of accounts here
                break;
            case "open_upload_modal":
                console.log("Open Upload Modal");
                // Add your logic for opening the upload modal here
                break;
            default:
                console.log("Unknown action");
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleActionClick = (action) => {
        switch (action) {
            case 'reset_filters':
                // Reset the filters logic here
                console.log("Reset filters clicked");
                break;
            default:
                console.log("Unknown action");
        }
    };

    if (!filterData) {
        return <p>Loading...</p>; // Show loading until data is fetched
    }


    if (!progressData) {
        return <p>Loading progress...</p>;
    }
    const { status, color } = progressData;
    const percentage = parseInt(status.replace('% completed', '').trim(), 10);
    const remaining = 100 - percentage;


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
                        <div className="col-md-3">
                            {wprData ? (
                                <>
                                    <p><b>WPR ID: {wprData.wpr_id} </b></p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="col-md-9">
                            <div>
                                {FssOptions && FssOptions.length > 0 ? (
                                    FssOptions.map((option) => (
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
                                    ))
                                ) : (
                                    <p>No options available.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Loaded Batches Table */}
            <div className="card">
                <div className="card-body">
                    <div className="mb-2">
                        <div className="">
                            <div className="row">
                                {/* Render Tabs */}
                                <div className="col-md-4">

                                    <div className="tabs">
                                        {filterData.tabs.map((tab, index) => (
                                            <button key={index} className="tab-button">
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    {/* Render Search Fields */}
                                    <div className="search-fields">
                                        {filterData.search_fields.map((field, index) => (
                                            <div key={index} className="search-field">
                                                <label>{field.placeholder}</label>
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    className="search-input"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-4">


                                    {/* Render Actions (e.g., reset) */}
                                    <div className="actions">
                                        {filterData.actions.map((action, index) => (
                                            <button
                                                key={index}
                                                className="action-button"
                                                onClick={() => handleActionClick(action.action)}
                                                style={{
                                                    backgroundColor: 'rgb(188 130 224)',
                                                    color: '#fff',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <i className={`icon-${action.icon}`} /> {action.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="progress-container">
                                        <p>Progress: {status}</p>
                                        <div className="progress-bar-container" style={{ width: '100%', backgroundColor: '#e0e0e0', height: '30px', borderRadius: '5px' }}>
                                            {/* Completed Part of Progress Bar */}
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: color, // Green color for completed portion
                                                    height: '100%',
                                                    borderRadius: '5px 0 0 5px',
                                                }}
                                            ></div>
                                            {/* Remaining Part of Progress Bar */}
                                            <div
                                                className="remaining-bar"
                                                style={{
                                                    width: `${remaining}%`,
                                                    backgroundColor: 'grey', // Grey color for remaining portion
                                                    height: '100%',
                                                    borderRadius: '0 5px 5px 0',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive card">
                            <table className="table">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width=""> <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        /></th>
                                        <th width="">S.No</th>
                                        <th>Gl Name</th>
                                        <th>Mapped To</th>
                                        <th>Opening</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Closing</th>
                                        <th>Rectification</th>
                                        <th>Iu</th>
                                        <th>Net</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FssTrialbalance.length > 0 ? (
                                        FssTrialbalance.map((item, index) => (
                                            <tr key={item.id}>
                                                <td><input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                /></td>
                                                <td>{index + 1}</td>
                                                <td>{item.gl_name}</td>
                                                <td>{item.mapped_to}</td>
                                                <td>{item.opening}</td>
                                                <td>{item.debit}</td>
                                                <td>{item.credit}</td>
                                                <td>{item.closing}</td>
                                                <td>{item.rectification}</td>
                                                <td>{item.iu}</td>
                                                <td>{item.net}</td>
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

export default FssTrialbalanceCoa;


