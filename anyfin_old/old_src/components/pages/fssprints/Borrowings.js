

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



const Borrowings = () => {
    const [Borrowings, setBorrowings] = useState([]);
    const [BorrowingsAdd, setBorrowingsAdd] = useState([]);
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
        getAllBorrowings();
        getAllHeader();


    }, [pageno, records, searchTerm]);


    // const { auth } = useAuth();

    const deleteBorrowings = async (id) => {

    };




    const getAllBorrowings = () => {

        let pagedata = {

            active_page: pageno,
            page_size: records,
            searchTerm: searchTerm

        };
        axios
            .get(`http://abs.anyfinancials.in:1234/api/modules/4`, pagedata)
            .then((response) => {
                console.log("mani", response.data);

                if (Array.isArray(response.data.data) && Array.isArray(response.data.data[0])) {
                    setBorrowings(response.data.data[0]); // Extract the first nested array
                    setTotalElements(response.data.totalRecords);
                } else {
                    setBorrowings(response.data.data);
                    setTotalElements(response.data.totalRecords);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };




    const getAllHeader = () => {

        axios
            .get('http://demo.anyfinancials.in:1234/api/header')
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
        const itemToEdit = Borrowings.find((item) => item.id === id)
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
            .get(`http://demo.anyfinancials.in:1234/api/reporting/${id}`)
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
        doc.text('Complete Borrowings List', 14, 22);

        doc.setFontSize(12);
        doc.text('page 1', 180, 10);

        doc.autoTable({
            startY: 30,
            head: [['S.No', 'Entitie Name'
            ]],
            body: Borrowings.map((Borrowings, index

            ) => {
                const sNo = index + 1;
                return [sNo.toString(), Borrowings.entity_name || ""]
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
        const worksheetData = Borrowings.map((Borrowings, index) => ({
            'S.No': (pageno - 1) * records + (index + 1),
            'Entitie Name': Borrowings.entity_name || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Borrowings');

        XLSX.writeFile(workbook, 'government_list.xlsx');
    };






    return (

        <div className=" ">
            <div className=" ">

                {/* <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Borrowings </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Borrowings  </li>
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
                                        <th width="">Borrowal Code</th>
                                        <th width="">Date of Borrowing</th>
                                        <th width="">Lender Name</th>
                                        <th width="">Sanctioned Amount</th>
                                        <th width="">Secured/Unsecured</th>
                                        <th width="">Loan Type</th>
                                        <th width="">Rate of Interest</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Borrowings && Borrowings.length > 0 ? (
                                        Borrowings.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}>
                                                    <td>{sNo}</td>
                                                    <td>{item.borrowal_code || "-"}</td>
                                                    <td>{item.date_of_borrowing || "-"}</td>
                                                    <td>{item.lender_name || "-"}</td>
                                                    <td>{item.sanctioned_amount || "-"}</td>
                                                    <td>{item.secured || "-"}</td>
                                                    <td>{item.loan_type || "-"}</td>
                                                    <td>{item.rate_of_interest || "-"}</td>
                                                    <td className="inline-btns">
                                                        <button className="btn-primary-outlined" onClick={() => handleShowEdit(item.borrowal_code)} title="Edit">
                                                            <IconPencil />
                                                        </button>
                                                        <button className="btn-danger-outlined" title="Delete" onClick={() => deleteBorrowings(item.borrowal_code)}>
                                                            <IconTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
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
                        <Modal.Title>{isEditMode ? "Edit Borrowing" : "New Borrowing"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* Borrowal Code */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Borrowal Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Borrowal Code"
                                                className="accordiantext"
                                                {...register("borrowal_code", { required: true })}
                                                defaultValue={editData ? editData.borrowal_code : ""}
                                            />
                                            {errors.borrowal_code && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Date of Borrowing */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Date of Borrowing <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="accordiantext"
                                                {...register("date_of_borrowing", { required: true })}
                                                defaultValue={editData ? editData.date_of_borrowing : ""}
                                            />
                                            {errors.date_of_borrowing && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Lender Name */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Lender Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Lender Name"
                                                className="accordiantext"
                                                {...register("lender_name", { required: true })}
                                                defaultValue={editData ? editData.lender_name : ""}
                                            />
                                            {errors.lender_name && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Sanctioned Amount */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Sanctioned Amount <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Sanctioned Amount"
                                                className="accordiantext"
                                                {...register("sanctioned_amount", { required: true })}
                                                defaultValue={editData ? editData.sanctioned_amount : ""}
                                            />
                                            {errors.sanctioned_amount && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Secured (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Secured <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("secured", { required: true })}
                                                defaultValue={editData ? editData.secured : ""}
                                            >
                                                <option value="">Select</option>
                                                <option value="Secured">Secured</option>
                                                <option value="Unsecured">Unsecured</option>
                                            </select>
                                            {errors.secured && <span className="text-danger">This is required</span>}
                                        </div>

                                        {/* Loan Type (Dropdown) */}
                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Loan Type <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="accordiantext"
                                                {...register("loan_type", { required: true })}
                                                defaultValue={editData ? editData.loan_type : ""}
                                            >
                                                <option value="">Select Loan Type</option>
                                                <option value="Term Loan">Term Loan</option>
                                                <option value="Overdraft">Overdraft</option>
                                                <option value="Cash Credit">Cash Credit</option>
                                            </select>
                                            {errors.loan_type && <span className="text-danger">This is required</span>}
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

export default Borrowings;



