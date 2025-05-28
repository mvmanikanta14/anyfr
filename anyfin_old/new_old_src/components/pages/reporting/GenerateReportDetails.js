import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import swal from "sweetalert";
import { IconBook2, IconHome, IconLink, IconListDetails, IconMessage2, IconPaperclip, IconSend } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import "../../../css/custom_style.css";
import "jspdf-autotable";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";
import Select from 'react-select';
import CurrentAssignmentFindings from "./CurrentAssignmentFindings";
import PreviousAssignmentFindings from "./PreviousAssignmentFindings";
import PreviousAssignment from "./PreviousAssignment";


const GenerateReportDetails = () => {

    const [GenerateReportDetails, setGenerateReportDetails] = useState();
    const [header, setHeader] = useState();
    const [AuditAnswer, setAuditAnswer] = useState();
    const [AuditVaribles, setAuditVaribles] = useState();
    const [selectedModelAnswer, setSelectedModelAnswer] = useState(null);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [description, setDescription] = useState('');

    const location = useLocation();
    console.log(location, "ggg");
    const queryParams = new URLSearchParams(location.search);
    const sampleName = queryParams.get("sampleName");
    const sampleAnswer = queryParams.get("sampleAnswer");
    const { id } = useParams();


    const [modelAnswerDescription, setModelAnswerDescription] = useState('');
    const [variableDescription, setVariableDescription] = useState('');




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
    // Fetch Description when Model Answer is selected
    // const handleModelAnswerChange = (selectedOption) => {
    //     setSelectedModelAnswer(selectedOption);

    //     if (selectedOption) {
    //         // Fetch the description for the selected Model Answer
    //         const fetchedDescription = selectedOption.label; // or any logic to get description based on selectedOption
    //         setDescription(fetchedDescription);
    //     }
    // };

    // // Fetch Description when Variable is selected
    // const handleVariableChange = (selectedOption) => {
    //     setSelectedVariable(selectedOption);

    //     if (selectedOption) {
    //         // Fetch the description for the selected Variable
    //         const fetchedDescription = selectedOption.label; // or any logic to get description based on selectedOption
    //         setDescription(fetchedDescription);
    //     }
    // };

    // When Model Answer is selected
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
               
            </div>

            <div className="card mb-2">

                <div className="card-body">
                    WPR : <b>{id} {sampleName && <span>- {sampleName}  </span>}</b>
                </div>
            </div>


            <div className="card">
                <div className="card-body">

                    <div className="card ">
                        <div className="card-body highlight_report">

                            <div className="">
                                {id} {sampleName && <span>- {sampleName}  </span>}
                            </div>
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
                            <button type="button" class="btn-sm btn-success mr-1"><IconLink size={20} stroke={2} color="blue" /></button>
                            <button type="button" class="btn-sm btn-secondary mr-1"> <IconListDetails   size={20} stroke={2} color="gray" /></button>
                            <button type="button" class="btn-sm btn-warning mr-1">  <IconMessage2    size={20} stroke={2} color="teal" /></button>
                            <button type="button" class="btn-sm btn-info mr-1">   <IconSend   size={20} stroke={2} color="blue" /></button>
                            <button type="button" class="btn-sm btn-primary mr-1">  <IconBook2   size={20} stroke={2} color="indigo" /></button>
                            <button type="button" class="btn-sm btn-primary mr-1">  <IconPaperclip size={20} stroke={2} color="gray" /></button>
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
    );
};

export default GenerateReportDetails;
