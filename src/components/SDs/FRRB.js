import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Modal, Button, Form } from "react-bootstrap";


import swal from "sweetalert";
import SdSidemenu from "../SdSidemenu";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import Breadcrumbs from "../../Breadcrumb";
import { ApiContext } from "../../services/ApiProvider";
import tokenService from "../../services/token.service";
import { FaAngleLeft, FaAngleRight, FaRegPaperPlane } from "react-icons/fa6";

const FRRB = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentYear, setCurrentYear] = useState("2025"); // Example year
    const [previousYear, setPreviousYear] = useState("2024"); // Example year
    const [sp, setSp] = useState([]); // Store API response
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageno] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);


    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);


    const [showModal, setShowModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [responseText, setResponseText] = useState("");
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
    }, []);

    const handleRowClick = (question, questionId) => {
        const clickedItem = sp.find((item) => item.id === questionId);
        setSelectedQuestion(question);
        setSelectedQuestionId(questionId);
        setResponseText(clickedItem?.user_response || "");
        setActiveIndex(activeIndex);
        setShowModal(true);
    };
    const handlePrevious = () => {
        if (activeIndex > 0) {
            const prevItem = sp[activeIndex - 1];
            setSelectedQuestion(prevItem.question);
            setSelectedQuestionId(prevItem.id);
            setResponseText(prevItem.user_response || ""); // ✅ Prefill response
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleNext = () => {
        if (activeIndex < sp.length - 1) {
            const nextItem = sp[activeIndex + 1];
            setSelectedQuestion(nextItem.question);
            setSelectedQuestionId(nextItem.id);
            setResponseText(nextItem.user_response || ""); // ✅ Prefill response
            setActiveIndex(activeIndex + 1);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    // ✅ Submit response
    const handleSubmitResponse = () => {
        if (!selectedQuestionId || !responseText.trim()) {
            swal("Warning", "Both Question ID and Response are required.", "warning");
            return;
        }

        const payload = {
            user_response: responseText,

        };

        commonService.update(`${apiUrlsService.AddPartnership}/${selectedQuestionId}`, payload)

            .then((response) => {
                console.log("API Save Response:", response);
                if (response?.data?.success) {
                    swal("Success", "Response saved successfully!", "success");
                    setShowModal(false);
                    getAllSectionSpQueList(); // 🔁 Refresh table
                } else {
                    swal("Error", response?.data?.error || "Something went wrong", "error");
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
                swal("Error", "Failed to save response.", "error");
            });
    };

    const getAllSectionSpQueList = () => {
        const requestData = {
            entity_id: EntityID,
            period_id: Id,
            org_id: auth.organisation_id,
        };

        commonService
            .add(apiUrlsService.getAllSectionSpQueList, requestData)
            .then((response) => {
                if (response && response.data && Array.isArray(response.data.entity)) {
                    const filteredData = response.data.entity.filter(
                        (item) => item.section_id === 5
                    );
                    setSp(filteredData);
                    setTotalElements(filteredData.length);
                } else {
                    swal(response.data?.error || "Unexpected error");
                    setSp([]);
                }
            })
            .catch((error) => {
                console.error("API call failed:", error);
            });
    };

    useEffect(() => {
        if (EntityID && Id) {
            getAllSectionSpQueList();
        }
    }, [EntityID, Id]);


    // Handle search filter
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };



    return (
        <div className=" ">
            {/* Search Box */}
            <div className="d-flex justify-content-end custom-table-search">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control w-25"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Table for Section Questions */}
            <div className="table-responsive">
                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th width="5%">S.No.</th>
                            <th width="50%">Question</th>
                            <th width="15%">Reference</th>
                            <th> User Response </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(sp) && sp.length > 0 ? (
                            sp.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr key={item.id} onClick={() => handleRowClick(item.question, item.id, activeIndex)} className="tr-hover-effect1">
                                        <td>{sNo}</td>
                                        <td>{item.question}</td>
                                        <td>{item.reference || "Not answered"}</td>
                                        <td> {item.user_response} </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                show={showModal}
                size="lg"
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                className="modalcustomise custom-modal-popup-1"
                onHide={handleModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center flex-grow-1 mb-0">
                        Respond to Question
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="custom-modal-body">
                    <div className="mb-3 qus-bg rounded border-outline-light">
                        <Form.Label> <b> Question: </b> </Form.Label>
                        <br />  {selectedQuestion}
                    </div>
                    <Form.Group controlId="responseTextarea">
                        <Form.Label>  Respond to Question  </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Type your answer here..."
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>

                    <div className="w-100 d-flex justify-content-between align-items-center px-2">
                        <Button
                            variant="link"
                            onClick={handlePrevious}
                            disabled={activeIndex === 0}
                            className="btn-sm prev-btn-forpop"
                        >
                            <FaAngleLeft size={18} />
                        </Button>

                        <Button variant="primary" onClick={handleSubmitResponse} className="btn-sm">  <FaRegPaperPlane size={14} /> Submit  </Button>

                        <Button
                            variant="link"
                            onClick={handleNext}
                            disabled={activeIndex === sp.length - 1}
                            className="btn-sm next-btn-forpop"
                        >
                            <FaAngleRight size={18} />
                        </Button>
                    </div>


                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FRRB;

