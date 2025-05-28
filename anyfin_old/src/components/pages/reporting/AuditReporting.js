import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Form, Modal, Table } from "react-bootstrap";
import swal from "sweetalert";
import { IconBook2, IconHome, IconLink, IconListDetails, IconMessage2, IconPaperclip, IconSend } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import "../../../css/custom_style.css";
import "jspdf-autotable";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";
import Select from 'react-select';
import PreviousAssignment from "./PreviousAssignment";
import PreviousAssignmentFindings from "./PreviousAssignmentFindings";
import CurrentAssignmentFindings from "./CurrentAssignmentFindings";
import { FaBook, FaLink, FaList, FaPaperclip, FaPaperPlane, FaRegComment } from "react-icons/fa";


const AuditReporting = () => {

    const [AuditReporting, setAuditReporting] = useState();
    const [IndustryPractice, setIndustryPractice] = useState([]);
    const [Guidance, setGuidance] = useState([]);
    const [Show, setShow] = useState(false);
    const [ShowGuidance, setShowGuidance] = useState(false);
    const [ShowIndustryPracticeList, setShowIndustryPracticeList] = useState(false);
    const [GenerateReportDetails, setGenerateReportDetails] = useState();
    const [header, setHeader] = useState();
    const [AuditAnswer, setAuditAnswer] = useState();
    const [AuditVaribles, setAuditVaribles] = useState();
    const [selectedModelAnswer, setSelectedModelAnswer] = useState(null);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [description, setDescription] = useState('');
    const [modelAnswerDescription, setModelAnswerDescription] = useState('');
    const [variableDescription, setVariableDescription] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [currentQuestionName, setCurrentQuestionName] = useState("");
    const [currentAnswerName, setCurrentAnswerName] = useState("");

    useEffect(() => {
        getAllAuditReporting();

    }, []);

    const handleCloseShow = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShow(false)
    }

    const handleCloseGuidance = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowGuidance(false)
    }

    const handleShowGuidance = () => {
        commonService.getAll(apiUrlsService.getAllGuidance).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setGuidance(response.data);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
        setShowGuidance(true)
    }

    const handleCloseIndustryPracticeList = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowIndustryPracticeList(false)
    }


    const handleShow = (question_id, question_name, answer_name) => {
        // Set the state to hold dynamic data
        setShow(true);
        setCurrentQuestionId(question_id);
        setCurrentQuestionName(question_name);
        setCurrentAnswerName(answer_name);
    };

    const handleShowIndustryPracticeList = () => {

        commonService.getAll(apiUrlsService.getAllIndustryPractice).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setIndustryPractice(response.data);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
        setShowIndustryPracticeList(true);

    };


    const getAllAuditReporting = () => {

        commonService.getAll(apiUrlsService.getAllAuditReporting).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setAuditReporting(response.data);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };


    useEffect(() => {
        getAllGenerateReportDetails();
        getAllAnswer();
        getAllVaribles();

    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const getAllGenerateReportDetails = () => {


        commonService.getAll(apiUrlsService.getAllGenerateReportDetails).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data.checklist_subjects)
                    setGenerateReportDetails(response.data.checklist_subjects);
                    setHeader(response.data.header);
                    // setTotalElements(response.data.prefil.sql_records_count_new);
                    // setSearchResults(response.data.prefil.search_username);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };

    const getAllAnswer = () => {

        commonService.getAll(apiUrlsService.getAllAnswer).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setAuditAnswer(response.data);

                }

                if (response && response.data) {
                    const FallingUnderData = response.data
                        .map(item => ({
                            value: item.model_answer_id,
                            label: item.model_answer_description
                        }));

                    console.log('Filtered Data:', FallingUnderData); // Debugging line
                    setAuditAnswer(FallingUnderData);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };


    const getAllVaribles = () => {

        commonService.getAll(apiUrlsService.getAllVaribles).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setAuditVaribles(response.data);

                }

                if (response && response.data) {
                    const FallingUnderData = response.data
                        .map(item => ({
                            value: item.fact_id,
                            label: item.fact_name
                        }));

                    console.log('Filtered Data:', FallingUnderData); // Debugging line
                    setAuditVaribles(FallingUnderData);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };


    const updateCombinedDescription = (modelDesc, variableDesc) => {
        const combined = `${variableDesc ? `@{${variableDesc}}` : ''}${modelDesc || ''}`;
        setDescription(combined);
    };


    const handleModelAnswerChange = (selectedOption) => {
        setSelectedModelAnswer(selectedOption);
        const fetchedDescription = selectedOption?.label || '';
        setModelAnswerDescription(fetchedDescription);
        updateCombinedDescription(fetchedDescription, variableDescription);
    };

    // When Variable is selected
    const handleVariableChange = (selectedOption) => {
        setSelectedVariable(selectedOption);
        const fetchedDescription = selectedOption?.label || '';
        setVariableDescription(fetchedDescription);
        updateCombinedDescription(modelAnswerDescription, fetchedDescription);
    };




    return (
        <div className="container col-md-12">
            <div className="bread_crumb my-3">
                <div>
                    <h3 className="header-title"> Reporting
                    </h3>
                </div>
                <div>
                    <ul>
                        <li className="active">
                            <Link to="">
                                <IconHome />
                            </Link>
                        </li>
                        <li> Reporting
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card mb-2">

                <div className="card-body">
                    {/* {Array.isArray(header) && header.map((item, index) => (
                        <div key={index}>{item.scheduler_id}</div>
                    ))} */}

                    WPR 700-001-002 :
                </div>
            </div>


            <div className="card">
                <div className="card-body">

                    <div className="table-responsive card">
                        <table className="table">
                            <thead>
                                <tr className="border-btm-0">
                                    <th width="3%"><input type="checkbox" className="checklist-checkbox" /></th>
                                    <th width="5%">S.No</th>
                                    <th>Description	</th>
                                    <th>Maker</th>
                                    <th>Checker	</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {AuditReporting?.questions?.map((question, index) => (
                                    <tr key={question.question_id}>
                                        <td><input type="checkbox" className="checklist-checkbox" /></td>
                                        <td>{index + 1}</td>

                                        <td onClick={() => handleShow(question.question_id, question.question_name, question.answer_name)}><b>
                                            {question.question_id} - {question.question_name} </b><br /> {question.answer_name} </td>
                                        <td>{question.maker_id}</td>
                                        <td>{question.checker_id}</td>
                                        <td>{question.status_id}</td>
                                    </tr>
                                ))}
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
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6><strong>WPR: {`${currentQuestionId} - ${currentQuestionName}`}</strong> <br />{`${currentAnswerName}`}</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <div className="container col-md-12">
                                <div className="bread_crumb my-3">

                                </div>

                                {/* <div className="card mb-2">

                                    <div className="card-body">
                                        <strong>WPR: {`${currentQuestionId} - ${currentQuestionName}`}</strong> <br />{`${currentAnswerName}`}

                                    </div>
                                </div> */}


                                <div className="card">
                                    <div className="card-body">

                                        <div className="card ">
                                            <div className="card-body highlight_report">

                                                <div className="row">
                                                    <div className="col-md-10">
                                                        {`${currentQuestionId} - ${currentQuestionName}`}
                                                    </div>
                                                    <div className="col-md-2 text_right">
                                                        <button type="button" class="btns-btns btn-warning mr-1"> <FaList className="check-icon" onClick={() => handleShowIndustryPracticeList()} title="Industry practice" size={18} stroke={2} color="blue" /></button>


                                                    </div>
                                                </div>
                                                {`${currentAnswerName}`}

                                            </div>
                                        </div>



                                        <div className="card  dl_style">
                                            <div className="card-body">

                                                <form>
                                                    <h5> Answer</h5>

                                                    <div className="container">

                                                        <div className="row pt-1 mt-1">

                                                            <div className="col-md-4 text-left mt-1 ">
                                                                <label>
                                                                    Model Answer
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <Select
                                                                    options={AuditAnswer}
                                                                    onChange={handleModelAnswerChange}
                                                                />

                                                                <label>
                                                                    Include Variable
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <Select
                                                                    options={AuditVaribles}
                                                                    onChange={handleVariableChange}
                                                                />
                                                            </div>

                                                            <div className="col-md-8 text-left mt-1 ">
                                                                <label>
                                                                    Description
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    className="accordiantext"
                                                                    value={description} // Set description dynamically
                                                                    onChange={(e) => setDescription(e.target.value)} // Allow user to edit the description
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                                <div className="float-right">
                                                    <button type="button" class="btns-btns btn-success mr-1"><FaLink className="check-icon" size={16} stroke={2} color="blue" /></button>
                                                    <button type="button" class="btns-btns btn-secondary mr-1"> <FaList className="check-icon" size={16} stroke={2} color="gray" /></button>
                                                    <button type="button" class="btns-btns btn-warning mr-1">  <FaRegComment className="check-icon" size={16} stroke={2} color="teal" /></button>
                                                    <button type="button" class="btns-btns btn-info mr-1">   <FaPaperPlane className="check-icon" size={16} stroke={2} color="blue" /></button>
                                                    <button type="button" class="btns-btns btn-primary mr-1">  <FaBook className="check-icon" size={16} stroke={2} color="indigo" /></button>
                                                    <button type="button" class="btns-btns btn-primary mr-1">  <FaPaperclip className="check-icon" size={16} stroke={2} color="gray" /></button>

                                                    <button onClick={() => handleShowGuidance()} size={20} stroke={2} color="gray" type="button" class="btns-btns  btn-success  mr-1" Title="Guidance">  G</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="page-heading">
                                            Current Assignment Findings
                                        </div>

                                        <CurrentAssignmentFindings />

                                        <div className="page-heading">
                                            Previous Assignment Findings
                                        </div>

                                        <PreviousAssignmentFindings />

                                        <div className="page-heading">
                                            Previous Assignment
                                        </div>
                                        <PreviousAssignment />
                                    </div>
                                </div >
                            </div >
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            <div className="model_box">
                <Modal
                    show={ShowIndustryPracticeList}
                    onHide={handleCloseIndustryPracticeList}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> <h5> Industry Practice List </h5> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr>
                                        <th width="5%">S.No</th>
                                        <th>Company Name</th>
                                        <th>Period Name</th>
                                        <th>Industry Practice Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {IndustryPractice.length > 0 ? (
                                        IndustryPractice.map((practice, index) => (
                                            <tr key={practice.industry_practice_id}>
                                                <td>{index + 1}</td>
                                                <td>{practice.company_name}</td>
                                                <td>{practice.period_name}</td>
                                                <td>{practice.industry_practice_description}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No data available</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            <div className="model_box">
                <Modal
                    show={ShowGuidance}
                    onHide={handleCloseGuidance}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> <h6> Guidance  List - {`${currentQuestionId} - ${currentQuestionName}`} </h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr>
                                        <th width="5%">S.No</th>
                                        <th>Guidance Head</th>
                                        <th>Reference</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Guidance.length > 0 ? (
                                        Guidance.map((Guidance, index) => (
                                            <tr key={Guidance.guidance_note_id}>
                                                <td>{index + 1}</td>
                                                <td>{Guidance.guidance_head_name}</td>
                                                <td>{Guidance.guidance_note_reference}</td>
                                                <td>{Guidance.guidance_note_description}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No data available</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div >
    );
};

export default AuditReporting;
