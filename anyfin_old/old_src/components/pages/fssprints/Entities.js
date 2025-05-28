

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



const Entities = () => {
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

        let pagedata = {

            active_page: pageno,
            page_size: records,
            searchTerm: searchTerm

        };
        axios
            .get('http://abs.anyfinancials.in:1234/api/entities',pagedata) // Corrected URL
            .then((response) => {
                console.log("mani", response.data);

                if (Array.isArray(response.data.data) && Array.isArray(response.data.data[0])) {
                    setEntities(response.data.data[0]); // Extract the first nested array
                    setTotalElements(response.data.totalRecords);
                } else {
                    setEntities(response.data.data);
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

    const handleShowAssign = (id,company_id,company_name) => {
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
        doc.text('Complete Entities List', 14, 22);

        doc.setFontSize(12);
        doc.text('page 1', 180, 10);

        doc.autoTable({
            startY: 30,
            head: [['S.No', 'Entitie Name'
            ]],
            body: Entities.map((Entities, index

            ) => {
                const sNo = index + 1;
                return [sNo.toString(), Entities.entity_name || ""]
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
        const worksheetData = Entities.map((Entities, index) => ({
            'S.No': (pageno - 1) * records + (index + 1),
            'Entitie Name': Entities.entity_name || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Entities');

        XLSX.writeFile(workbook, 'government_list.xlsx');
    };






    return (

        <div className="">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Entities </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Entities  </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">


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
                                        <th width="">Name</th>
                                        <th width="">Reporting Frequency</th>
                                        <th width="">Financial Year</th>
                                        <th width="">PAN</th>
                                        <th width="">CIN</th>
                                        <th width="">Constitution</th>
                                        <th width="">Framework</th>
                                        <th width="">CFS is Applicable</th>
                                        <th width="10%">Action</th>
                                    </tr>


                                </thead>
                                <tbody>
                                    {Entities && Entities.length > 0 ? (
                                        Entities.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}>
                                                    <td>{sNo}</td>
                                                    <td>
                                                        <button onClick={() => handleShowRep(item.s_no)}>
                                                            {item.entity_name || "-"}
                                                        </button>
                                                    </td>
                                                    <td>{item.reporting_frequency || "-"}</td>
                                                    <td>{item.financial_year || "-"}</td>
                                                    <td>{item.pan || "-"}</td>
                                                    <td>{item.cin || "-"}</td>
                                                    <td>{item.constitution || "-"}</td>
                                                    <td>{item.framework || "-"}</td>
                                                    <td>{item.cfs_applicable || "-"}</td>
                                                    <td className="inline-btns">
                                                        <button className="btn-primary-outlined" onClick={() => handleShowEdit(item.id)} title="Edit">
                                                            <IconPencil />
                                                        </button>
                                                        <button className="btn-danger-outlined" title="Delete" onClick={() => deleteEntities(item.id)}>
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
                                                                    <button onClick={() => handleShowAssign(item.s_no, datalist?.company_id,datalist?.company_name)}>
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

export default Entities;



