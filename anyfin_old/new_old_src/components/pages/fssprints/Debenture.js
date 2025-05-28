

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



const Debenture = () => {
    const [Debenture, setDebenture] = useState([]);
    const [DebentureAdd, setDebentureAdd] = useState([]);
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
        getAllDebenture();
        getAllHeader();


    }, [pageno, records, searchTerm]);


    // const { auth } = useAuth();

    const deleteDebenture = async (id) => {

    };




    const getAllDebenture = () => {

        let pagedata = {

            active_page: pageno,
            page_size: records,
            searchTerm: searchTerm

        };
        axios
            .get(`http://demo.anyibc.com/api/apiRoutes/modules/2`, pagedata)
            .then((response) => {
                console.log("mani", response.data);

                if (Array.isArray(response.data.data) && Array.isArray(response.data.data[0])) {
                    setDebenture(response.data.data[0]); // Extract the first nested array
                    setTotalElements(response.data.totalRecords);
                } else {
                    setDebenture(response.data.data);
                    setTotalElements(response.data.totalRecords);
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
        const itemToEdit = Debenture.find((item) => item.id === id)
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

    const downloadPDF = async () => {
        //permission check
        //  const user_id = parseInt(auth.user_id);
        //  const hasPermission = await PermissionCheck(25,user_id); 
        //  if(!hasPermission){
        //  return false;
        //  }
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Complete Debenture List', 14, 22);

        doc.setFontSize(12);
        doc.text('page 1', 180, 10);

        doc.autoTable({
            startY: 30,
            head: [['S.No', 'Entitie Name'
            ]],
            body: Debenture.map((Debenture, index

            ) => {
                const sNo = index + 1;
                return [sNo.toString(), Debenture.entity_name || ""]
            }),
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            columnStyles: {
                0: { cellWidth: 12 },
                1: { cellWidth: 'auto' },
            }
        });

        // Saving the PDF
        doc.save('complete_Government_list.pdf');
    }

    // Function to download Excel
    const downloadExcel = async () => {
        //permission check
        //  const user_id = parseInt(auth.user_id);
        //  const hasPermission = await PermissionCheck(25,user_id); 
        //  if(!hasPermission){
        //  return false;
        //  }
        const worksheetData = Debenture.map((Debenture, index) => ({
            'S.No': (pageno - 1) * records + (index + 1),
            'Entitie Name': Debenture.entity_name || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Debenture');

        XLSX.writeFile(workbook, 'government_list.xlsx');
    };






    return (

        <div className=" ">
            <div className=" ">

                {/* <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Debenture </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Debenture  </li>
                        </ul>
                    </div>
                </div> */}

                <div className=" ">
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
                                        <th width="">Debenture Holder Name</th>
                                        <th width="">Class of Debenture</th>
                                        <th width="">Accumulation Type</th>
                                        <th width="">Rate of Interest</th>
                                        <th width="">Amount</th>
                                        <th width="">Instrument No</th>
                                        <th width="">Redeemability Type</th>
                                        <th width="">Due Date of Redemption</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Debenture && Debenture.length > 0 ? (
                                        Debenture.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}>
                                                    <td>{sNo}</td>
                                                    <td>
                                                        {/* <button onClick={() => handleShowRep(item.s_no)}> */}
                                                        {item.debenture_holder_name || "-"}
                                                        {/* </button> */}
                                                    </td>
                                                    <td>{item.class_of_debenture || "-"}</td>
                                                    <td>{item.accumulation_type || "-"}</td>
                                                    <td>{item.rate_of_interest || "-"}</td>
                                                    <td>{item.amount || "-"}</td>
                                                    <td>{item.instrument_no || "-"}</td>
                                                    <td>{item.redeemability_type || "-"}</td>
                                                    <td>{item.due_date_of_redemption || "-"}</td>
                                                    <td className="inline-btns">
                                                        <button className="btn-primary-outlined" onClick={() => handleShowEdit(item.id)} title="Edit">
                                                            <IconPencil />
                                                        </button>
                                                        <button className="btn-danger-outlined" title="Delete" onClick={() => deleteDebenture(item.id)}>
                                                            <IconTrash />
                                                        </button>
                                                    </td>
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
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit Debenture" : "New Debenture"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Debenture Holder Name */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Debenture Holder Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Debenture Holder Name"
                                                className="accordiantext"
                                                {...register("debenture_holder_name", { required: true })}
                                                defaultValue={editData ? editData.debenture_holder_name : ""}
                                            />
                                            {errors.debenture_holder_name && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Accumulation Type (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Accumulation Type <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("accumulation_type", { required: true })}
                                                defaultValue={editData ? editData.accumulation_type : ""}
                                            >
                                                <option value="">Select Accumulation Type</option>
                                                <option value="Cumulative">Cumulative</option>
                                                <option value="Non-Cumulative">Non-Cumulative</option>
                                            </select>
                                            {errors.accumulation_type && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Redeemability Type (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Redeemability Type <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("redeemability_type", { required: true })}
                                                defaultValue={editData ? editData.redeemability_type : ""}
                                            >
                                                <option value="">Select Redeemability Type</option>
                                                <option value="Redeemable">Redeemable</option>
                                                <option value="Irredeemable">Irredeemable</option>
                                            </select>
                                            {errors.redeemability_type && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Amount */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Amount <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Amount"
                                                className="accordiantext"
                                                {...register("amount", { required: true })}
                                                defaultValue={editData ? editData.amount : ""}
                                            />
                                            {errors.amount && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Rate of Interest */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Rate of Interest (%) <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Rate of Interest"
                                                className="accordiantext"
                                                {...register("rate_of_interest", { required: true })}
                                                defaultValue={editData ? editData.rate_of_interest : ""}
                                            />
                                            {errors.rate_of_interest && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Instrument Number */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Instrument Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Instrument Number"
                                                className="accordiantext"
                                                {...register("instrument_no", { required: true })}
                                                defaultValue={editData ? editData.instrument_no : ""}
                                            />
                                            {errors.instrument_no && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Class of Debenture */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Class of Debenture <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Class of Debenture"
                                                className="accordiantext"
                                                {...register("class_of_debenture", { required: true })}
                                                defaultValue={editData ? editData.class_of_debenture : ""}
                                            />
                                            {errors.class_of_debenture && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Due Date of Redemption */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Due Date of Redemption <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="accordiantext"
                                                {...register("due_date_of_redemption", { required: true })}
                                                defaultValue={editData ? editData.due_date_of_redemption : ""}
                                            />
                                            {errors.due_date_of_redemption && <span className="text-danger">This is required</span>}
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

export default Debenture;



