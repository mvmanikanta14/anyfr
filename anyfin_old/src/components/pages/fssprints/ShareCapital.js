import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { IconPencil, IconTrash, IconHome } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import '../../../css/custom_style.css';


const ShareCapital = () => {
    const [shareCapital, setShareCapital] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    
    useEffect(() => {
        fetchShareCapital();
    }, [pageno, records]);
    
    const fetchShareCapital = () => {
        axios
        .get('http://abs.anyfinancials.in:1234/api/sharecaptial') // Corrected URL
        .then((response) => {
            console.log("mani", response.data);

             if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
                setShareCapital(response.data[0]); // Extract the first nested array
            } else {
                setShareCapital(response.data); 
            }
        })
        .catch((error) => {
            console.error("API call failed: ", error);
        });
    };
    
    const handleShowModal = (record = null) => {
        setEditData(record);
        setEditMode(!!record);
        setShowModal(true);
    };
    
    
    const handleCloseModal = () => {
        setShowModal(false);
        setEditData(null);
    };
    
    const handleDelete = (id) => {
        // Placeholder for delete API call
        console.log("Deleting record with ID:", id);
    };
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        if (editMode) {
            console.log("Updating record:", data);
        } else {
            console.log("Adding new record:", data);
        }
        handleCloseModal();
    };
    
    return (
        <div>
            <div className="bread_crumb">
                <h3 className="header-title">Share Capital Listing</h3>
                <ul>
                    <li className="active"> <Link to={""}><IconHome /></Link> </li>
                    <li>Share Capital</li>
                </ul>
            </div>
            <div className="card">
                <div className="card-body">
                    <button className="Addbutton" onClick={() => handleShowModal()}>ADD</button>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Shareholder Name</th>
                                    <th>No. of Shares</th>
                                    <th>Date of Issue</th>
                                    <th>Instrument No. From</th>
                                    <th>Instrument No. To</th>
                                    <th>Mode of Issue</th>
                                    <th>Is Promoter</th>
                                    <th>Consideration</th>
                                    <th>Issue Value</th>
                                    <th>Face Value</th>
                                    <th>Type of Capital</th>
                                    <th>Class of Capital</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shareCapital.length > 0 ? (
                                    shareCapital.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(pageno - 1) * records + (index + 1)}</td>
                                            <td>{item.shareholder_name}</td>
                                            <td>{item.no_of_shares}</td>
                                            <td>{item.date_of_issue}</td>
                                            <td>{item.instrument_no_from}</td>
                                            <td>{item.instrument_no_to}</td>
                                            <td>{item.mode_of_issue}</td>
                                            <td>{item.is_promoter}</td>
                                            <td>{item.consideration}</td>
                                            <td>{item.issue_value_per_share}</td>
                                            <td>{item.face_value}</td>
                                            <td>{item.type_of_capital}</td>
                                            <td>{item.class_of_capital}</td>
                                            <td>
                                                <button className="btn-primary" title="edit one" onClick={() => handleShowModal(item)}>
                                                    <IconPencil />
                                                </button>

                                                <button className="btn-primary" title="edit two " onClick={() => handleShowModal(item)}>
                                                    <IconPencil />
                                                </button>
                                                <button className="btn-danger" onClick={() => handleDelete(item.id)}>
                                                    <IconTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="14" className="text-center">No data available</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Share Capital" : "Add Share Capital"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Shareholder Name</label>
                            <input type="text" className="form-control" {...register("shareholder_name", { required: true })} />
                            {errors.shareholder_name && <span className="text-danger">Required</span>}
                        </div>
                        <div className="form-group">
                            <label>No. of Shares</label>
                            <input type="text" className="form-control" {...register("No_of_Shares", { required: true })} />
                            {errors.No_of_Shares && <span className="text-danger">Required</span>}
                        </div>

                        <div className="form-group">
                            <label>Date of Issue</label>
                            <input type="text" className="form-control" {...register("Date_of_Issue", { required: true })} />
                            {errors.Date_of_Issue && <span className="text-danger">Required</span>}
                        </div>
                        <button className="btn btn-primary" type="submit">{editMode ? "Update" : "Add"}</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ShareCapital;
