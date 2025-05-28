import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import swal from "sweetalert";
import { IconHome } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import "../../css/custom_style.css";
import "jspdf-autotable";
import apiUrlsService from "../../services/apiUrls.service";
import commonService from "../../services/common.service";
import tokenService from "../../services/token.service";

const Tribalance = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [editData, setEditData] = useState(null);
    const [entityId, setEntityId] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        const Eid = tokenService.getEID();
        console.log("Retrieved entity ID:", Eid);
        setEntityId(Eid);
    }, [entityId]);

    // Handle form submission
    const handleUpload = (data) => {
        if (!selectedFile) {
            swal("Please select a file to upload.");
            return;
        }

        // Creating form data for API request
        const formData = new FormData();
        formData.append("File", selectedFile);
        formData.append("closing_balance", data.closing_balance);
        formData.append("entity_id", entityId);

        setUploading(true);

        commonService.add(apiUrlsService.uploadFile, formData)
            .then((response) => {

                // console.log(response.data.success,"true data")
                 if (response.data.success == true) {
                    setUploadResponse(response.data);
                    swal("Success", response.data.message || "File uploaded successfully.", "success");
                } else if (response.data.success == false) { 
                    swal("Error", response.data.message, "error");
                } 
        
            })
            .catch((response) => {
                console.error("Upload error:", response);
                swal("Error", response.error || "File upload failed.", "error");
            })
            .finally(() => {
                setUploading(false);
            });
    };

    return (
        <div className="container col-md-12">
            <div className="bread_crumb my-3">
                <div>
                    <h3 className="header-title">Tribalance</h3>
                </div>
                <div>
                    <ul>
                        <li className="active">
                            <Link to="">
                                <IconHome />
                            </Link>
                        </li>
                        <li>Tribalance</li>
                    </ul>
                </div>
            </div>

            {/* File Upload Section */}

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleUpload)}>
                        <div className="row">

                            <div className="col-md-4 text-left mt-1">
                                <label>
                                    Closing Balance <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Closing Balance"
                                    className="accordiantext"
                                    {...register("closing_balance", { required: "Closing balance is required" })}
                                    defaultValue={editData ? editData.closing_balance : ""}
                                />
                                {errors.closing_balance && <span className="text-danger">{errors.closing_balance.message}</span>}
                            </div>

                            <div className="col-md-4 text-left mt-1">
                                <label>Select Excel File</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".xlsx, .xls"
                                />

                            </div>

                        </div>
                        <div className="col-md-12 text-right mt-1">

                            <button className="mt-1 text-white accordianbutton" type="submit" disabled={uploading}>
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>

                    </form>

                </div>
            </div >


            {
                uploadResponse && uploadResponse.data && Array.isArray(uploadResponse.data) && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5>Upload Response:</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        {Object.keys(uploadResponse.data[0]).map((key, index) => (
                                            <th key={index}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploadResponse.data.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Object.values(row).map((value, colIndex) => (
                                                <td key={colIndex}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Tribalance;
