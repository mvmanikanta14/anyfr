

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import Pagination from "../../../PaginationCommon";
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
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";



const Sharecapitals = () => {
    const [Sharecapitals, setSharecapitals] = useState([]);
    const [SharecapitalsAdd, setSharecapitalsAdd] = useState([]);
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
        getAllSharecapitals();
        getAllHeader();


    }, [pageno, records, searchTerm]);


    // const { auth } = useAuth();

    const deleteSharecapitals = async (id) => {

    };




    const getAllSharecapitals = () => {

        let pagedata = {

            active_page: pageno,
            page_size: records,
            searchTerm: searchTerm

        };
        commonService.getAll(apiUrlsService.getModules1, pagedata)
            .then((response) => {
                console.log("mani", response.data);

                if (Array.isArray(response.data.data) && Array.isArray(response.data.data[0])) {
                    setSharecapitals(response.data.data[0]); // Extract the first nested array
                    setTotalElements(response.data.totalRecords);
                } else {
                    setSharecapitals(response.data.data);
                    setTotalElements(response.data.totalRecords);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };




    const getAllHeader = () => {
        commonService.getAll(apiUrlsService.balancesheetHead)
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
        const itemToEdit = Sharecapitals.find(item => item.sl_no == id)

        // console.log(id, "this is the id for edit data check ")
        // console.log(Sharecapitals, "this is the id for edit data hole data")
        setEditData(itemToEdit);
        // console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        // console.log(ids);
        setShow(true);
        // setShowList(true);
        setIsEditMode(true);
        reset();
    }

    const handleShowRep = (id) => {


        console.log("data of adpi", id);
        axios
            .get(`http://demo.anyibc.com/api/apiRoutes/reporting/${id}`)
            .then((response) => {
                console.log("data of adpi", response.data);
                setDatalist(response.data);
                setShowList(true);
                reset();
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    const navigate = useNavigate(); // Initialize navigation

    const handleShowAssign = (id, company_id, company_name) => {
        // const id = localStorage.getItem("id");
        // const company_id = localStorage.getItem("company_id");
        // const company_name = localStorage.getItem("company_name");

        sessionStorage.setItem("id", id);
        sessionStorage.setItem("company_id", company_id);
        sessionStorage.setItem("company_name", company_name);

        // console.log("Stored values:", id, company_id,company_name);
        navigate("/fssNotes");
        // axios
        //     .get(`http://demo.anyfinancials.in:1234/api/reporting/${company_id}`)
        //     .then((response) => {
        //         console.log("API Response:", response.data);
        //         setDatalist(response.data);
        //         setShowList(true);
        //         reset();

        //         // ✅ Navigate to FSS Note component
        //         navigate("/fssNotes");
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data: ", error);
        //     });
    };


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
              <div className="w-100">


                            <div className="d-flex justify-content-between align-items-center  ">
                                <label className="mb-0 d-flex show-result">
                                    Show&nbsp;
                                    <select
                                        className="form-control"
                                        value={records}
                                        onChange={handleRecordsChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </label>
                                <div className="group-buttons">
                                    {/* <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    /> */}
                                    <button
                                        type="button"
                                        className="mt-2 Addbutton m-r-5"
                                        title="Add"
                                        onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button>
                                    {/* <button type="button" className="mt-2  m-r-5 Addbutton" title="Download PDF" onClick={downloadPDF}> PDF</button> */}

                                    {/* <button type="button" className="mt-2 Addbutton" title="Download Excel" onClick={downloadExcel}> Excel</button> */}
                                </div>
                            </div>
                        </div>



                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th width="">Shareholder Name</th>
                                        <th width="">Type of Capital</th>
                                        <th width="">Class of Capital</th>
                                        <th width="">Mode of Issue</th>
                                        <th width="">Consideration</th>
                                        <th width="">Date of Issue</th>
                                        <th width="">Face Value</th>
                                        <th width="">Face Value per Share</th>
                                        <th width="">Issue Value per Share</th>
                                        <th width="">No of Shares</th>
                                        <th width="">Total Issue Value</th>
                                        <th width="">Instrument No (From - To)</th>
                                        <th width="">Is Promoter</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Sharecapitals && Sharecapitals.length > 0 ? (
                                        Sharecapitals.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}>
                                                    <td>{sNo}</td>
                                                    <td>
                                                        {/* <button onClick={() => handleShowRep(item.sl_no)}> */}
                                                        {item.shareholder_name || "-"}
                                                        {/* </button> */}
                                                    </td>
                                                    <td>{item.type_of_capital || "-"}</td>
                                                    <td>{item.class_of_capital || "-"}</td>
                                                    <td>{item.mode_of_issue || "-"}</td>
                                                    <td>{item.consideration || "-"}</td>
                                                    <td>{item.date_of_issue || "-"}</td>
                                                    <td>{item.face_value || "-"}</td>
                                                    <td>{item.face_value_per_share || "-"}</td>
                                                    <td>{item.issue_value_per_share || "-"}</td>
                                                    <td>{item.no_of_shares || "-"}</td>
                                                    <td>{item.total_issue_value || "-"}</td>
                                                    <td>{item.instrument_no_from} - {item.instrument_no_to}</td>
                                                    <td>{item.is_promoter || "-"}</td>
                                                    <td className="inline-btns"  nowrap>
                                                        <button className="btn-primary-outlined" onClick={() => handleShowEdit(item.sl_no)} title="Edit">
                                                            <IconPencil />
                                                        </button>
                                                        <button className="btn-danger-outlined" title="Delete" onClick={() => deleteSharecapitals(item.sl_no)}>
                                                            <IconTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="15" className="text-center">
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>




                        <div className="d-flex justify-content-between">

                            <div className=" ">
                                <span className="float-right">
                                    Showing {(pageno - 1) * records + 1} to{" "}
                                    {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                                    of {totalElements} entries
                                </span>
                            </div>

                            <div className=" ">
                                <Pagination
                                    totalElements={totalElements}
                                    recordsPerPage={records}
                                    pageNumber={pageno}
                                    onPageChange={handlePageChange}
                                />
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
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit Share Capitals" : "New Share Capitals"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Serial Number */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Serial Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Serial Number"
                                                className="accordiantext"
                                                {...register("sl_no", { required: true })}
                                                defaultValue={editData ? editData.sl_no : ""}
                                            />
                                            {errors.sl_no && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Shareholder Name */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Shareholder Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Shareholder Name"
                                                className="accordiantext"
                                                {...register("shareholder_name", { required: true })}
                                                defaultValue={editData ? editData.shareholder_name : ""}
                                            />
                                            {errors.shareholder_name && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Number of Shares */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Number of Shares <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Number of Shares"
                                                className="accordiantext"
                                                {...register("no_of_shares", { required: true })}
                                                defaultValue={editData ? editData.no_of_shares : ""}
                                            />
                                            {errors.no_of_shares && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Date of Issue */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Date of Issue <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="accordiantext"
                                                {...register("date_of_issue", { required: true })}
                                                defaultValue={editData ? editData.date_of_issue : ""}
                                            />
                                            {errors.date_of_issue && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Instrument No. From - To */}
                                        <div className="col-md-6 text-left mt-1">
                                            <label>
                                                Instrument No. From <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Instrument No. From"
                                                className="accordiantext"
                                                {...register("instrument_no_from", { required: true })}
                                                defaultValue={editData ? editData.instrument_no_from : ""}
                                            />
                                            {errors.instrument_no_from && <span className="text-danger">This is required</span>}
                                        </div>

                                        <div className="col-md-6 text-left mt-1">
                                            <label>
                                                Instrument No. To <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Instrument No. To"
                                                className="accordiantext"
                                                {...register("instrument_no_to", { required: true })}
                                                defaultValue={editData ? editData.instrument_no_to : ""}
                                            />
                                            {errors.instrument_no_to && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Mode of Issue (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Mode of Issue <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("mode_of_issue", { required: true })}
                                                defaultValue={editData ? editData.mode_of_issue : ""}
                                            >
                                                <option value="">Select Mode of Issue</option>
                                                <option value="Allotment">Allotment</option>
                                                <option value="Transfer">Transfer</option>
                                            </select>
                                            {errors.mode_of_issue && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Is Promoter (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Is Promoter? <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("is_promoter", { required: true })}
                                                defaultValue={editData ? editData.is_promoter : ""}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            {errors.is_promoter && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Consideration (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Consideration <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("consideration", { required: true })}
                                                defaultValue={editData ? editData.consideration : ""}
                                            >
                                                <option value="">Select Consideration</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Conversion">Conversion</option>
                                            </select>
                                            {errors.consideration && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Issue Value Per Share */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Issue Value Per Share <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Issue Value Per Share"
                                                className="accordiantext"
                                                {...register("issue_value_per_share", { required: true })}
                                                defaultValue={editData ? editData.issue_value_per_share : ""}
                                            />
                                            {errors.issue_value_per_share && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Total Issue Value */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Total Issue Value <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Total Issue Value"
                                                className="accordiantext"
                                                {...register("total_issue_value", { required: true })}
                                                defaultValue={editData ? editData.total_issue_value : ""}
                                            />
                                            {errors.total_issue_value && <span className="text-danger">This is required</span>}
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
                        <Modal.Title>{`Reporting List of ${datalist?.company_name || "Company"}`}</Modal.Title>
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
                                                                <td>{item.s_no}</td>
                                                                {/* <td>{item.name}</td> */}
                                                                <td>
                                                                    <button onClick={() => handleShowAssign(item.s_no, datalist?.company_id, datalist?.company_name)}>
                                                                        {item.name || "-"}
                                                                    </button>
                                                                </td>


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

export default Sharecapitals;



