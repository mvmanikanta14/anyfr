import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Form, Modal, Table } from "react-bootstrap";
import swal from "sweetalert";
import { IconBook2, IconCheck, IconHome, IconLink, IconListDetails, IconMessage2, IconPaperclip, IconSend, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import "../../../css/custom_style.css";
import "jspdf-autotable";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";
import { FaBook, FaCheck, FaLink, FaList, FaPaperclip, FaPaperPlane, FaRegComment, FaTimes, FaUser } from "react-icons/fa";
import Select from 'react-select';


const ChecklistSubjectAnswersValues = () => {

    const [smapleChecklist, setSampleChecklist] = useState();
    const [sampleNode, setSampleNode] = useState();
    const [Show, setShow] = useState();
    const [ShowBulkAnswer, setShowBulkAnswer] = useState();
    const [ShowBulkStatus, setShowBulkStatus] = useState();
    const [ShowStatusApproved, setShowStatusApproved] = useState();
    const [ShowStatusRejected, setShowStatusRejected] = useState();
    const location = useLocation();
    console.log(location, "ggg");
    const queryParams = new URLSearchParams(location.search);
    const sampleName = queryParams.get("sampleName");
    const { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         getAllSampleChecklist(id);
    //     }

    // }, [id]);

    const [checkedNodes, setCheckedNodes] = useState([]);

    const handleCheckboxChange = (nodeId) => {
        setCheckedNodes((prevChecked) => {
            if (prevChecked.includes(nodeId)) {
                return prevChecked.filter((id) => id !== nodeId);
            } else {
                return [...prevChecked, nodeId];
            }
        });
    };

    const isAnyChecked = checkedNodes.length > 0;

    useEffect(() => {
        getAllSampleNode();
        getAllSampleChecklist(id);

    }, []);

    const getAllSampleChecklist = (id) => {
        const url = `${apiUrlsService.getAllSampleChecklist}/${id}`;
        commonService.getAll(url).then((response) => {
            setSampleChecklist([response.data.checklist_subject]);

        }).catch((error) => {
            handleApiError(error);
        });
    };




    const getAllSampleNode = () => {

        commonService.getAll(apiUrlsService.getAllSampleNode).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data.data.checklist_subjects_nodes)
                    setSampleNode(response.data.data.checklist_subjects_nodes);
                    // alert(JSON.stringify(response.data.data, null, 2));
                    // setSearchResults(response.data.prefil.search_username);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };

    const handleCloseShow = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShow(false)
    }

    const handleShow = () => {
        // reset();
        setShow(true);
        // setTitle("Add")
    }

    const handleCloseBulkAnswer = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowBulkAnswer(false)
    }

    const handleShowBulkAnswer = () => {
        // reset();
        setShowBulkAnswer(true);
        // setTitle("Add")
    }

    const handleCloseBulkStatus = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowBulkStatus(false)
    }

    const handleCloseStatusApproved = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowStatusApproved(false)
    }

    const handleShowStatusApproved = () => {
        // reset();
        setShowStatusApproved(true);
        // setTitle("Add")
    }

    const handleCloseStatusRejected = () => {
        // setEditData(null); // Reset editData
        // setId(""); // Reset the ID
        setShowStatusRejected(false)
    }

    const handleShowStatusRejected = () => {
        // reset();
        setShowStatusRejected(true);
        // setTitle("Add")
    }


    const handleShowBulkStatus = () => {
        // reset();
        setShowBulkStatus(true);
        // setTitle("Add")
    }




    return (
        <div className="container col-md-12">
            <div className="bread_crumb my-3">
                <div>
                    <h3 className="header-title"> List of Samples{sampleName && <span>- {sampleName}</span>}
                    </h3>
                </div>
                <div>
                    <ul>
                        <li className="active">
                            <Link to="">
                                <IconHome />
                            </Link>
                        </li>
                        <li> List of Samples
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card mb-3">

                <div className="card-body">
                    {/* {Array.isArray(header) && header.map((item, index) => (
                        <div key={index}>{item.scheduler_id}</div>
                    ))} */}WPR:1234
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <form className="text-right formtext p-0 mr-0">
                            <div className="row">
                                <div className="col-md-6">
                                    {/* <label className="mb-0">
                                    Show&nbsp;
                                    <select
                                        className="form-control d-inline w-auto"
                                        value={records}
                                        onChange={handleRecordsChange}
                                    >
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    &nbsp; entries
                                </label> */}
                                </div>
                                {/* <div className="col-md-6">

                                    <button
                                        type="button"
                                        className="btn-sm Addhead mr-1"
                                        title="Add "
                                    // onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button>


                                </div> */}

                            </div>
                        </form>
                    </div>

                    <div className="cards">
                        <div className="card-bodys">
                            <div className="table-responsive mb-3">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr className="border-btm-0">
                                            <th width="5%">S.No</th>
                                            <th>Population	</th>
                                            <th>Sample</th>
                                            <th>As a Maker	</th>
                                            <th>As a Checker</th>
                                            <th>As a </th>
                                            <th>As a </th>
                                            <th>As a </th>
                                            <th>As a </th>
                                            <th>As a </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {smapleChecklist && smapleChecklist.length > 0 ? (
                                            smapleChecklist.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.execution_id}</td>
                                                    <td>{item.element_name || "—"}</td>
                                                    <td>{item.subject_name || "—"}</td>
                                                    <td>{item.pending_for_approval || "—"}</td>
                                                    <td>{item.approved_count || "—"}</td>
                                                    <td>{item.rejected || "—"}</td>
                                                    <td>{item.qid || "—"}</td>
                                                    <td>{item.checker}</td>
                                                    <td>{item.maker}</td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row mb-2">
                        <div className="col-md-6">
                            <button
                                type="button"
                                onClick={() => handleShow()}
                                className="btns-btns btn-success mr-1"
                                disabled={!isAnyChecked}
                            >
                                <FaUser size={16} stroke={2} />
                            </button>
                            <button
                                onClick={() => handleShowBulkStatus()}
                                type="button"
                                className="btns-btns btn-success mr-1"
                                disabled={!isAnyChecked}
                            >
                                <FaCheck size={16} stroke={2} />
                            </button>
                            <button
                                onClick={() => handleShowBulkAnswer()}
                                type="button"
                                className="btns-btns btn-success mr-1"
                                disabled={!isAnyChecked}
                            >
                                Bulk Answer
                            </button>
                            <button
                                type="button"
                                className="btns-btns btn-success"
                                disabled={!isAnyChecked}
                            >
                                Auto Fill
                            </button>
                        </div>
                        <div className="col-md-6">
                            {/* Other content can go here */}
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr className="border-btm-0">
                                    <th width="3%"><input
                                        type="checkbox"
                                        className="checklist-checkbox"
                                        onChange={() => {
                                            if (isAnyChecked) {
                                                setCheckedNodes([]); // uncheck all
                                            } else {
                                                setCheckedNodes(sampleNode.map(node => node.id)); // check all
                                            }
                                        }}
                                        checked={isAnyChecked}
                                    /></th>
                                    <th width="5%">S.No</th>
                                    <th width="40%">Name - Question	</th>
                                    <th width="10%">Answer</th>
                                    <th>Remarks	</th>
                                </tr>
                            </thead>

                            {/* <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Is there a documented inventory count policy?-Has the company established and communicated a policy outlining the procedures for inventory counting?</td>
                                    <td>
                                        <select className="checklist-select">
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </td>
                                    <td> <input className="checklist-input" type="text" />
                                        <sapn className="mb-2"> WPR : </sapn>  <br />
                                        <sapn > Status :   <IconCheck className="check-iocn" size={20} stroke={2} color="green" /> 
                                        <IconX className="check-iocn" size={20} stroke={2} color="red" /></sapn>
                                        <div className="float-right">
                                        <IconLink className="" size={20} stroke={2} color="blue" />
                                        <IconListDetails size={20} stroke={2} color="gray" />
                                        <IconMessage2 size={20} stroke={2} color="teal" />
                                        <IconSend size={20} stroke={2} color="blue" />
                                        <IconBook2 size={20} stroke={2} color="indigo" />
                                        <IconPaperclip size={20} stroke={2} color="gray" />

                                        </div>
                                         <br/>
                                        <label> Checker Notes :</label>
                                        <input className="checklist-input" type="text" /><br/>
                                        <sapn>Checker : Manikanta</sapn> <sapn className="float-right">Maker : Manikanta</sapn>
                                    </td>
                                </tr>

                            </tbody> */}

                            {/* <tbody>
                                {smapleNode && smapleNode.length > 0 ? (
                                    smapleNode.map((node, index) => (
                                        <tr key={node.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {node.short_checklist} - {node.full_checklist}</td>

                                            <td>
                                                <select className="checklist-select">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td> <input className="checklist-input" type="text" />
                                                <sapn className="mb-2"> WPR : </sapn>  <br />
                                                <sapn > Status :   <IconCheck className="check-iocn" size={20} stroke={2} color="green" />
                                                    <IconX className="check-iocn" size={20} stroke={2} color="red" /></sapn>
                                                <div className="float-right">
                                                    <IconLink className="" size={20} stroke={2} color="blue" />
                                                    <IconListDetails size={20} stroke={2} color="gray" />
                                                    <IconMessage2 size={20} stroke={2} color="teal" />
                                                    <IconSend size={20} stroke={2} color="blue" />
                                                    <IconBook2 size={20} stroke={2} color="indigo" />
                                                    <IconPaperclip size={20} stroke={2} color="gray" />

                                                </div>
                                                <br />
                                                <label> Checker Notes :</label>
                                                <input className="checklist-input" type="text" /><br />
                                                <sapn>Checker : Manikanta</sapn> <sapn className="float-right">Maker : Manikanta</sapn>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody> */}

                            <tbody>
                                {sampleNode && sampleNode.length > 0 ? (
                                    sampleNode.map((node, index) => (
                                        <tr key={node.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="checklist-checkbox"
                                                    onChange={() => handleCheckboxChange(node.id)}
                                                    checked={checkedNodes.includes(node.id)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>

                                                {console.log(sampleNode, "madhukant")}
                                                <b> {node.short_checklist} </b> <br /> {node.full_checklist}
                                            </td>
                                            <td>
                                                <select className="checklist-select">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input className="checklist-input" type="text" />
                                                <span className="mb-2"> WPR : </span><br />
                                                <span>
                                                    Status :
                                                    <button onClick={() => handleShowStatusApproved()} type="button" class="btns-btns btn-success mr-1">
                                                        <FaCheck className="check-icon" size={16} stroke={2} color="green" /></button>
                                                    <button onClick={() => handleShowStatusRejected()} type="button" class="btns-btns btn-danger mr-1"><FaTimes className="check-icon" size={16} stroke={2}
                                                        color="red" /></button>
                                                </span>
                                                <div className="float-right">
                                                    <button type="button" class="btns-btns btn-success mr-1"><FaLink className="check-icon" size={16} stroke={2} color="blue" /></button>
                                                    <button type="button" class="btns-btns btn-secondary mr-1"> <FaList className="check-icon" size={16} stroke={2} color="gray" /></button>
                                                    <button type="button" class="btns-btns btn-warning mr-1">  <FaRegComment className="check-icon" size={16} stroke={2} color="teal" /></button>
                                                    <button type="button" class="btns-btns btn-info mr-1">   <FaPaperPlane className="check-icon" size={16} stroke={2} color="blue" /></button>
                                                    <button type="button" class="btns-btns btn-primary mr-1">  <FaBook className="check-icon" size={16} stroke={2} color="indigo" /></button>
                                                    <button type="button" class="btns-btns btn-primary mr-1">  <FaPaperclip className="check-icon" size={16} stroke={2} color="gray" /></button>
                                                </div>
                                                <br />
                                                <label>Checker Notes :</label>
                                                <input className="checklist-input" type="text" /><br />
                                                <span>Checker : Manikanta</span>
                                                <span className="float-right">Maker : Manikanta</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>



                        </table>
                    </div>

                </div>
            </div>
            {/* //CheckerMakerpopup */}
            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6> Change Checker and Maker</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-6 text-left mt-1">
                                            <label>Checkers   <span className="text-danger">*</span></label>
                                            <Select
                                            // options={polarityOptions} // Using predefined polarity options
                                            // onChange={(selectedOption) => setValue("polarity", selectedOption.value)}
                                            // defaultValue={polarityOptions.find(option => option.value === (editData ? editData.polarity : ""))}
                                            />
                                        </div>

                                        <div className="col-md-6 text-left mt-1">
                                            <label>Makers     <span className="text-danger">*</span></label>
                                            <Select
                                            // options={polarityOptions} // Using predefined polarity options
                                            // onChange={(selectedOption) => setValue("polarity", selectedOption.value)}
                                            // defaultValue={polarityOptions.find(option => option.value === (editData ? editData.polarity : ""))}
                                            />
                                        </div>

                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">Updated
                                                {/* {title} */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* //Bulk Status */}
            <div className="model_box">
                <Modal
                    show={ShowBulkStatus}
                    onHide={handleCloseBulkStatus}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6> Bulk Status</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-12 text-left mt-1">
                                            <label>Status   <span className="text-danger">*</span></label>
                                            <Select
                                            // options={polarityOptions} // Using predefined polarity options
                                            // onChange={(selectedOption) => setValue("polarity", selectedOption.value)}
                                            // defaultValue={polarityOptions.find(option => option.value === (editData ? editData.polarity : ""))}
                                            />
                                        </div>

                                        <div className="col-md-12 text-left mt-1">
                                            <label>Approve/Reject Notes     <span className="text-danger">*</span></label>
                                            <textarea
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                            // {...register("framework_name", {
                                            //     required: true,
                                            // })}

                                            // defaultValue={editData ? editData.framework_name : ""} // Set initial value based on editData
                                            />
                                            {/* {errors.framework_name && (
                                                <span className="text-danger">This is required</span>
                                            )} */}
                                        </div>

                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">Update
                                                {/* {title} */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* Bulk Answer */}

            <div className="model_box">
                <Modal
                    show={ShowBulkAnswer}
                    onHide={handleCloseBulkAnswer}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6> Bulk Answer</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-12 text-left mt-1">
                                            <label>Bulk Answer   <span className="text-danger">*</span></label>
                                            <Select
                                            // options={polarityOptions} // Using predefined polarity options
                                            // onChange={(selectedOption) => setValue("polarity", selectedOption.value)}
                                            // defaultValue={polarityOptions.find(option => option.value === (editData ? editData.polarity : ""))}
                                            />
                                        </div>

                                        <div className="col-md-12 text-left mt-1">
                                            <label>Remarks     <span className="text-danger">*</span></label>
                                            <textarea
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                            // {...register("framework_name", {
                                            //     required: true,
                                            // })}

                                            // defaultValue={editData ? editData.framework_name : ""} // Set initial value based on editData
                                            />
                                            {/* {errors.framework_name && (
                                                <span className="text-danger">This is required</span>
                                            )} */}
                                        </div>

                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">Update
                                                {/* {title} */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* Status Approved */}

            <div className="model_box">
                <Modal
                    show={ShowStatusApproved}
                    onHide={handleCloseStatusApproved}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6> Status Approve</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        <div className="col-md-12 text-left mt-1">
                                            <label>Note     <span className="text-danger">*</span></label>
                                            <textarea
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                            // {...register("framework_name", {
                                            //     required: true,
                                            // })}

                                            // defaultValue={editData ? editData.framework_name : ""} // Set initial value based on editData
                                            />
                                            {/* {errors.framework_name && (
                                                <span className="text-danger">This is required</span>
                                            )} */}
                                        </div>

                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">Update
                                                {/* {title} */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* Status rejected */}

            <div className="model_box">
                <Modal
                    show={ShowStatusRejected}
                    onHide={handleCloseStatusRejected}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><h6> Status Rejected</h6> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        <div className="col-md-12 text-left mt-1">
                                            <label>Note     <span className="text-danger">*</span></label>
                                            <textarea
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                            // {...register("framework_name", {
                                            //     required: true,
                                            // })}

                                            // defaultValue={editData ? editData.framework_name : ""} // Set initial value based on editData
                                            />
                                            {/* {errors.framework_name && (
                                                <span className="text-danger">This is required</span>
                                            )} */}
                                        </div>

                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">Update
                                                {/* {title} */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        </div >
    );
};

export default ChecklistSubjectAnswersValues;
