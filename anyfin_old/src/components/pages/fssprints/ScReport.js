

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





const ScReport = () => {
    const [ScReport, setScReport] = useState([]);
    const [ScReportAdd, setScReportAdd] = useState([]);
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
    const [breakdownData, setBreakdownData] = useState([]);
    const [balancesheet, setBalancesheet] = useState([]);
    const [profitloss, setProfitloss] = useState([]);
    const [cashflow, setCashFlow] = useState([]);
    const [formdata1, setFormData1] = useState([]);
    const [formdata2, setFormData2] = useState([]);
    const [error, setError] = useState(null);




    useEffect(() => {
        getAllScReport();
        getAllHeader();


    }, [pageno, records, searchTerm]);


    // const { auth } = useAuth();

    const deleteScReport = async (id) => {

    };




    const getAllScReport = () => {

        let pagedata = {

            active_page: pageno,
            page_size: records,
            searchTerm: searchTerm

        };
        commonService.getAll(apiUrlsService.getSCReport, pagedata)
            .then((response) => {
                console.log("mani", response.data);

                if (Array.isArray(response.data.data) && Array.isArray(response.data.data[0])) {
                    setScReport(response.data); // Extract the first nested array
                    setTotalElements(response.data.totalRecords);
                } else {
                    setScReport(response.data);
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
        const itemToEdit = ScReport.find(item => item.sl_no == id)

        // console.log(id, "this is the id for edit data check ")
        // console.log(ScReport, "this is the id for edit data hole data")
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

   

    const handleNoteClick = (argument, type) => {
        if (type == "standard text") {
            type = "standardtext";
        }

        let url = `/${type}/${argument}`;
        //  alert(type);
        commonService.getAll(url)
            .then((response) => {
                if (response.data) {
                    console.log(response.data, "response");
                    if (type == "form" && argument == 1) {
                        setShowList(true);
                        setFormData1(response.data || {});
                        setBreakdownData({});
                        setFormData2({});
                        setBalancesheet({});
                        setCashFlow({});
                        setProfitloss({});

                    }



                    else if (type == "form" && argument == 92) {
                        setShowList(true);
                        setFormData2(response.data || {});
                        setBreakdownData({});
                        setFormData1({});
                        setBalancesheet({});
                        setCashFlow({});
                        setProfitloss({});


                    }
                    else if (type == "balancesheet" && argument == 1) {
                        setShowList(true);
                        setBalancesheet(response.data.balance_sheet);
                        setFormData1({});
                        setFormData2({});
                        setBreakdownData({});
                        setProfitloss({});
                        setCashFlow({});


                    }
                    else if (type == "profitLoss" && argument == 2) {
                        setShowList(true);
                        setProfitloss(response.data[0].profit_loss);
                        setFormData1({});
                        setFormData2({});
                        setBalancesheet({});
                        setBreakdownData({});
                        setCashFlow({});


                    }
                    else if (type == "cashflow" && argument == 3) {
                        setShowList(true);
                        setCashFlow(response.data);
                        setFormData1({});
                        setFormData2({});
                        setBalancesheet({});
                        setBreakdownData({});
                        setProfitloss({});


                    }
                    else {
                        setFormData1({});
                        setFormData2({});
                        setBalancesheet({});
                        setShowList(true);
                        setBreakdownData(response.data || {}); // Store response dynamically
                    }
                }
            })
            .catch(() => {
                setError("Error fetching data");
            });
    };






    return (

        <div className=" ">
            <div className=" ">


                <div className=" ">
                    <div className="">


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
                                    {/* <button
                                        type="button"
                                        className="mt-2 Addbutton m-r-5"
                                        title="Add"
                                        onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button> */}
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
                                        <th width="">Report Name</th>
                                        <th width="">Description</th>

                                        {/* <th width="4%">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ScReport && ScReport.length > 0 ? (
                                        ScReport.map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}  onClick={() => handleNoteClick(item.argument, item.type)}>
                                                    <td>{sNo}</td>
                                                    <td onClick={() => handleNoteClick(item.argument, item.type)}>
                                                        {item.name || "-"}
                                                    </td>


                                                    {/* <td onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNoteClick(item?.argument, item?.type);
                                                    }}>
                                                        {item?.name || "-"}
                                                    </td> */}
                                                    {/* <td>

                                                    <button className="btn-primary-outlined" onClick={() => handleNoteClick(item.argument, item.type)} title="Edit">
                                                    {item.name || "-"}
                                                        </button>
                                                    </td> */}


                                                    <td>{item.description || "-"}</td>

                                                    {/* <td className="inline-btns">
                                                        <button className="btn-primary-outlined" onClick={() => handleShowEdit(item.seq)} title="Edit">
                                                            <IconPencil />
                                                        </button>
                                                        <button className="btn-danger-outlined" title="Delete" onClick={() => deleteScReport(item.sl_no)}>
                                                            <IconTrash />
                                                        </button>
                                                    </td> */}
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


                            {breakdownData ? (
                                Object.entries(breakdownData).map(([key, value], index) =>
                                    key !== "Argument" && (
                                        <div key={index} className="data-section">
                                            <h5 className="page-title1">{key.toUpperCase()}</h5>
                                            {Array.isArray(value) ? (
                                                <table className="table-custom table-regular">
                                                    <thead>
                                                        <tr>
                                                            {Object.keys(value[0] || {}).map((header, idx) => (
                                                                <th key={idx}>{header.replace(/_/g, " ")}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {value.map((item, idx) => (
                                                            <tr key={idx} className={item.style || ""}>
                                                                {Object.values(item).map((cell, cellIdx) => (
                                                                    <td key={cellIdx}>{cell || "-"}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>{JSON.stringify(value)}</p>
                                            )}
                                        </div>
                                    )
                                )
                            ) : (
                                <p>No Data</p>
                            )}

                            {formdata1 ? (
                                <div className="data-section">
                                    {/* Display Title */}
                                    <h5 class="page-title1">{formdata1.title}</h5>

                                    {/* Display Table */}
                                    {formdata1.data && Array.isArray(formdata1.data) ? (
                                        <table className="table-custom table-regular">
                                            <thead>
                                                <tr>
                                                    {formdata1.columns.map((header, idx) => (
                                                        <th key={idx}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formdata1.data.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.sl_no}</td>
                                                        <td>{item.particulars}</td>
                                                        <td>{item.no_of_shares_last_year}</td>
                                                        <td>{item.value_of_shares_last_year}</td>
                                                        <td>{item.no_of_shares_current_year}</td>
                                                        <td>{item.value_of_shares_current_year}</td>
                                                    </tr>
                                                ))}
                                                {/* Totals Row */}
                                                {formdata1.totals && (
                                                    <tr className="totals-row">
                                                        <td colSpan="2"><strong>Total</strong></td>
                                                        <td><strong>{formdata1.totals.total_no_of_shares_last_year}</strong></td>
                                                        <td><strong>{formdata1.totals.total_value_of_shares_last_year}</strong></td>
                                                        <td><strong>{formdata1.totals.total_no_of_shares_current_year}</strong></td>
                                                        <td><strong>{formdata1.totals.total_value_of_shares_current_year}</strong></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            ) : (
                                <p></p>
                            )}

                            {formdata2 ? (
                                <div className="data-section">
                                    {/* Title */}
                                    <h5 class="page-title1">{formdata2.title}</h5>

                                    {/* Table */}
                                    {formdata2.data && Array.isArray(formdata2.data) ? (
                                        <table className="table-custom table-regular">
                                            <thead>
                                                <tr>
                                                    {formdata2.columns.map((header, idx) => (
                                                        <th key={idx}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formdata2.data.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.party_name}</td>
                                                        <td>{item.relationship}</td>
                                                        <td>{item.transaction_type}</td>
                                                        <td>{item.transaction_value_last_year.toLocaleString()}</td>
                                                        <td>{item.transaction_value_current_year.toLocaleString()}</td>
                                                        <td>{item.outstanding_balance_last_year.toLocaleString()}</td>
                                                        <td>{item.outstanding_balance_current_year.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                                {/* Totals Row */}
                                                {formdata2.totals && (
                                                    <tr className="totals-row">
                                                        <td colSpan="3"><strong>Total</strong></td>
                                                        <td><strong>{formdata2.totals.total_transaction_value_last_year.toLocaleString()}</strong></td>
                                                        <td><strong>{formdata2.totals.total_transaction_value_current_year.toLocaleString()}</strong></td>
                                                        <td><strong>{formdata2.totals.total_outstanding_balance_last_year.toLocaleString()}</strong></td>
                                                        <td><strong>{formdata2.totals.total_outstanding_balance_current_year.toLocaleString()}</strong></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </Modal.Body>

                </Modal>
            </div>

        </div>
    );
};

export default ScReport;



