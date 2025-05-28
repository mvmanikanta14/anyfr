

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
// import Pagination from "../../../../PaginationCommon";
// import commonService from "../../../../services/common.service";
import { IconHome, IconPencil, IconTrash, IconRefresh } from '@tabler/icons-react';
// import apiUrlsService from "../../../../services/apiUrls.service";
import { useForm } from "react-hook-form";

// import { useAuth } from '../../../context/AuthProvider';
import '../../../css/custom_style.css';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Base64 } from 'js-base64';
import Header from "../../Header";
import SidebarsBKP from "../../SidebarsBKP";
import tokenService from "../../../services/token.service";
import apiUrlsService from "../../../services/apiUrls.service";
import commonService from "../../../services/common.service";
import { toast } from "react-toastify";



const EntitiesDashborad = () => {
    const [Entities, setEntities] = useState([]);
    const [EntitiesAdd, setEntitiesAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [datalist, setDatalist] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [ShowList, setShowList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        getAllEntities();
        getAllHeader();


    }, [pageno, records, searchTerm]);


    // const { auth } = useAuth();

    const deleteEntities = async (id) => {

    };

    const getAllEntities = () => {
        commonService.getAll(apiUrlsService.getAllEntities)
            .then((response) => {
                if (response && response.data) {
                    // console.log("Response Data:", response.data);
    
                    // Filter only active entities (assuming `is_active` is the field)
                    const activeEntities = response.data.data.filter(item => item.is_active === true);
    
                    setEntities(activeEntities);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllHeader = () => {

        axios
            .get('http://demo.anyibc.com/api/apiRoutes/header')
            .then((response) => {
                console.log("mani", response.data); // Set the data from response

            })
            .catch((error) => {

            });
    };


    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    const handleRecordsChange = (event) => {
        setRecords(event.target.value);
        setPageNo(1); // Reset to first page
    };


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });



    const onSubmit = (data) => {
        if (!ids) {

        }

    }

    const handleShowEdit = (id) => {
        const itemToEdit = Entities.find((item) => item.id === id)
        setEditData(itemToEdit);
        console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        // console.log(ids);
        setShow(true);
        // setShowList(true);
        setIsEditMode(true);
        reset();
    }

    // const handleShowRep = (id) => {


    //     console.log("data of adpi", id);
    //     axios
    //         .get(`http://demo.anyibc.com/api/apiRoutes/reporting/${id}`)
    //         .then((response) => {
    //             console.log("data of adpi", response.data);

    //             setDatalist(response.data);

    //             setShowList(true);

    //             reset();
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data: ", error);
    //         });
    // }

    // const handleShowRep = (id) => {
        
    
    //     commonService.getAll(`${apiUrlsService.getAllEntities}/${id}`)
    //         .then((response) => {
    //             console.log("data of adpi", response.data);
    //             setDatalist(response.data);
    //             setShowList(true);
    //             reset();
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data: ", error);
    //         });
      

    // };

      const handleShowRep = (id,entity_name) => {
        tokenService.setEID(id);
        tokenService.setEntityName(entity_name);
        toast.success("Entity Login successfully!");
        navigate("/dashboardGreen");
    };
    

    const navigate = useNavigate(); 

    // const handleShowAssign = (id, company_id, company_name) => {

    //     tokenService.setEID(company_id);
    //     tokenService.setEntityName(company_name);
    //     navigate("/dashboardGreen");
        
    // };


    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false)
        setShowList(false)
    }

    const handleShow = async () => {
        //permission check
        // const user_id = parseInt(auth.user_id);
        // const hasPermission = await PermissionCheck(22,user_id); 
        // if(!hasPermission){
        // return false;
        // }
        reset();
        setShow(true);
        setTitle("Add")
    }

    return (

        <div className=" ">
            <div className=" ">

                {/* <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Entities </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Entities  </li>
                        </ul>
                    </div>
                </div> */}

                <div className="card">
                    <div className="card-body">






                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th width="">Name</th>
                                        <th width="">Constitution</th>
                                        <th width="">Framework</th>

                                    </tr>


                                </thead>
                                <tbody>
                                    {Entities && Entities.length > 0 ? (
                                        Entities.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}  onClick={() => handleShowRep(item.id,item.entity_name)}>
                                                    <td>{sNo}</td>
                                                    <td>{item.entity_name || "-"} </td>
                                                    <td>{item.reporting_frequency || "-"}</td>
                                                    <td>{item.financial_year_style || "-"}</td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <div className="d-flex justify-content-between">

                            <div className=" ">
                                {/* <span className="float-right">
                                    Showing {(pageno - 1) * records + 1} to{" "}
                                    {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                                    of {totalElements} entries
                                </span> */}
                            </div>

                            <div className=" ">
                                {/* <Pagination
                                    totalElements={totalElements}
                                    recordsPerPage={records}
                                    pageNumber={pageno}
                                    onPageChange={handlePageChange}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <Modal.Title>{isEditMode ? "Edit " : "Entities"}</Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Entity Name */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Entity Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Entity Name"
                                                className="accordiantext"
                                                {...register("entity_name", { required: true })}
                                                defaultValue={editData ? editData.entity_name : ""}
                                            />
                                            {errors.entity_name && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Reporting Frequency */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Reporting Frequency <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Reporting Frequency"
                                                className="accordiantext"
                                                {...register("reporting_frequency", { required: true })}
                                                defaultValue={editData ? editData.reporting_frequency : ""}
                                            />
                                            {errors.reporting_frequency && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Financial Year (Dropdown with Static Data) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Financial Year <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("financial_year", { required: true })}
                                                defaultValue={editData ? editData.financial_year : ""}
                                            >
                                                <option value="">Select Financial Year</option>
                                                <option value="2024-25">2024-25</option>
                                                <option value="2023-24">2023-24</option>
                                                <option value="2022-23">2022-23</option>
                                                <option value="2021-22">2021-22</option>
                                                <option value="2020-21">2020-21</option>
                                            </select>
                                            {errors.financial_year && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* PAN */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                PAN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter PAN"
                                                className="accordiantext"
                                                {...register("pan", { required: true })}
                                                defaultValue={editData ? editData.pan : ""}
                                            />
                                            {errors.pan && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* CIN */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                CIN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter CIN"
                                                className="accordiantext"
                                                {...register("cin", { required: true })}
                                                defaultValue={editData ? editData.cin : ""}
                                            />
                                            {errors.cin && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Constitution */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Constitution <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Constitution"
                                                className="accordiantext"
                                                {...register("constitution", { required: true })}
                                                defaultValue={editData ? editData.constitution : ""}
                                            />
                                            {errors.constitution && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Framework (Dropdown with Static Data) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Framework <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("framework", { required: true })}
                                                defaultValue={editData ? editData.framework : ""}
                                            >
                                                <option value="">Select Framework</option>
                                                <option value="IFRS">IFRS</option>
                                                <option value="GAAP">GAAP</option>
                                                <option value="Ind AS">Ind AS</option>
                                                <option value="AS">AS</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.framework && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* CFS is Applicable (Yes/No) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                CFS is Applicable <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("cfs_applicable", { required: true })}
                                                defaultValue={editData ? editData.cfs_applicable : ""}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            {errors.cfs_applicable && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-md-12 text-right">
                                            <button className="mt-1 text-white accordianbutton">
                                                {title}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>

            <div className="model_box">
                <Modal
                    show={ShowList}
                    onHide={handleCloseShow}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    {/* <Modal.Header closeButton>
                        <Modal.Title>{"Reporting List"}</Modal.Title>
                    </Modal.Header> */}

                    <Modal.Header closeButton>
                    <Modal.Title>{`Reporting List of ${datalist?.entity_name || "Company"}`}</Modal.Title>
                    </Modal.Header>




                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        {/* Table for Details */}
                                        <div className="col-md-12 mt-3">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {datalist && datalist.details ? (
                                                        datalist.details.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.id}</td>
                                                                {/* <td>{item.name}</td> */}
                                                                {/* <td>
                                                                    <button onClick={() => handleShowAssign(item.id, datalist?.company_id, datalist?.financial_year_style)}>
                                                                        {item.name || "-"}
                                                                    </button>
                                                                </td> */}


                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="2">No data available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Submit Button */}
                                        {/* <div className="col-md-12 text-right">
                                            <button className="mt-1 text-white accordianbutton">
                                                {title}
                                            </button>
                                        </div> */}

                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>

        </div>
    );
};

export default EntitiesDashborad;



