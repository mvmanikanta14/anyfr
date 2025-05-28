import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import Select from 'react-select';

const LongTermBorrowing = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ShowFN, setShowFN] = useState(false);
    const handleShowFN = () => setShowFN(true);
    const handleCloseShowFN = () => setShowFN(false);

    const [ShowRN, setShowRN] = useState(false);
    const handleShowRN = () => setShowRN(true);
    const handleCloseShowRN = () => setShowRN(false);
    const API_URL = "http://demo.anyfinancials.in:1234/api/breakdown/4"; // Replace with actual API URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setData(response.data); // Set API response data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h6>{data.Title}</h6>
            <table className="table-custom table-regular">
                <thead>
                    <tr>
                        <th>Particular</th>
                        <th>Note No</th>
                        <th>Current Year</th>
                        <th>Previous Year</th>
                    </tr>
                </thead>
                <tbody>
                    {data.Details.map((item, index) => (
                        <tr key={index}>
                            <td className="particular-cell">
                                <span>{item.particular}</span>
                                <span className="clickable-rn">
                                    <span
                                        className="clickable-r"
                                        onClick={() => handleShowRN(item.particular)}
                                    >
                                        R
                                    </span> &nbsp;&nbsp;&nbsp;
                                    <span
                                        className="clickable-r"
                                        onClick={() => handleShowFN(item.particular)}
                                    >
                                        N
                                    </span>
                                </span>
                            </td>
                            <td>{item.note_no}</td>
                            <td>{item.current_year !== "" ? item.current_year : "-"}</td>
                            <td>{item.previous_year !== "" ? item.previous_year : "-"}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {/* FN Popup */}
            <div className="model_box">
                <Modal
                    show={ShowFN}
                    onHide={handleCloseShowFN}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> ADD</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="border modalstart">
                            <form className="formtext modalform">
                                <div className="container">
                                    <div className="row form-group">
                                        {/* Name Field */}
                                        <div className="col-md-4">
                                            <label>
                                                Root Note <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8 pt-1">
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                className="form-control accordiantext"
                                            />
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        {/* Name Field */}
                                        <div className="col-md-4">
                                            <label>
                                                Remarks<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8 pt-1">
                                            <textarea
                                                type="text"
                                                placeholder="Enter Name"
                                                className="form-control accordiantext"
                                            />
                                        </div>
                                    </div>


                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    {/* Submit Button */}
                    <Modal.Footer>
                        <button type="submit" className="btn-sm btn-theme"> Submit </button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* End FN Popup */}


            {/* RN Popup */}
            <div className="model_box">
                <Modal
                    show={ShowRN}
                    onHide={handleCloseShowRN}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> ADD</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="border modalstart">
                            <form className="formtext modalform">
                                <div className="container">


                                    <div className="row form-group">

                                        {/* Note Ref Dropdown */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                R Note <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                isMulti
                                                options={[
                                                    { value: 'ref1', label: 'Reference 1' },
                                                    { value: 'ref2', label: 'Reference 2' },
                                                    { value: 'ref3', label: 'Reference 3' },
                                                    { value: 'ref4', label: 'Reference 4' },
                                                ]}
                                                className="accordiantext"
                                                placeholder="Select Note Ref"
                                            />
                                        </div>

                                    </div>

                                    {/* Submit Button */}

                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn-sm btn-theme"> Submit </button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* End RN Popup */}
        </div>


    );
};

export default LongTermBorrowing;
