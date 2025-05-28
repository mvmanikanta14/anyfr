
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Select from 'react-select';
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";



const BalancesheetBody = () => {

    const [header, setHeader] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [Show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleCloseShow = () => setShow(false);

    const [ShowFN, setShowFN] = useState(false);
    const handleShowFN = () => setShowFN(true);
    const handleCloseShowFN = () => setShowFN(false);

    const [ShowRN, setShowRN] = useState(false);
    const handleShowRN = () => setShowRN(true);
    const handleCloseShowRN = () => setShowRN(false);
    const [footerData, setFooterData] = useState(null);


    useEffect(() => {
        getAllHeader();
        getAllBody();
        getAllFooter();
    }, []);

     const getAllHeader = () => {
            commonService.getAll(apiUrlsService.balancesheetHead).then(
                (response) => {
                    if (response && response.data) {
                        console.log("mani", response.data)
                        setHeader(response.data.balance.header);
                        setLoading(false);
                        // setTotalElements(response.data.prefil.sql_records_count_new);
                        // setSearchResults(response.data.prefil.search_username);
                    }
                }
            ).catch((error) => {
                handleApiError(error);
            });
        };

        const getAllBody = () => {
            commonService.getAll(apiUrlsService.balancesheetBody).then((response) => {
                if (response.data.length > 0) {
                    setData(response.data[0].balance_sheet);
                }
                setLoading(false);
            }).catch((error) => {
                handleApiError(error);
            });
        };

        const getAllFooter = () => {
            commonService.getAll(apiUrlsService.balancesheetFooter).then((response) => {
                setFooterData(response.data);
                setLoading(false);
            }).catch((error) => {
                handleApiError(error);
            });
        };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (

        <div className="main-body2">

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                {/* Start Company Details */}
                <div className="company-details">
                    {header ? (
                        <>
                            <h4 className="company-title"> {header.company} </h4>
                            <p className="company-desc"> CIN : {header.CIN_Address} </p>
                            <h6 className=""> {header.title}
                                <span className="regular-bold"> {header.date} </span>
                            </h6>
                        </>
                    ) : (
                        <p></p>
                    )}
                </div>

                <div className="amounts-label"> (Amounts Rs. in Lakshs) </div>

                {/* End Company Details */}
            </div>

            <div className="table-responsive">

                <table className="table-custom table-outerlines-col-lines totals-subtotals">
                    <thead>
                        <tr>
                            <th width="5%" rowSpan={2}> S.No </th>
                            <th width="50%" rowSpan={2}> Particulars </th>
                            <th width="5%" rowSpan={2} className="text-center"> Note No </th>
                            <th className="text-center" colSpan={2}> Figures as at </th>
                        </tr>

                        <tr>
                            <th className="text-right"> 31-Mar-2024 </th>
                            <th className="text-right"> 31-Mar-2023 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`${item.style === "style1" ? "style1" :
                                    item.style === "style2" ? "style2" :
                                        item.style === "style3" ? "style3" : ""
                                    }`}
                            >
                                <td>{item.s_no}</td>
                                <td className="clickable-r" onClick={() => handleShow()}> {item.particular} </td>
                                <td className="text-center">{item.note_no}</td>
                                <td className="text-right">{item.current_year || "-"}</td>
                                <td className="text-right">{item.previous_year || "-"}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>

            </div>

            <p className="italic">{footerData?.left?.footer?.head}</p>

            <div className="row">

                {/* Left Section */}
                <div className="col-md-6">
                    {footerData?.left?.footer?.data?.map((accountant, index) => (
                        <div key={index} className="mb-2  p-2 rounded">
                            <p className="regular-bold">{accountant.ca_firm_name}</p>
                            <p> {accountant.info}</p>
                            <p> {accountant.ca_firm_reg_no}</p>
                            <p className="regular-bold"> {accountant.ca_name}</p>
                            <p> {accountant.ca_title}</p>
                            <p> {accountant.ca_no}</p>
                        </div>
                    ))}
                    <p>Place:{footerData?.left?.footer?.place}</p>
                    <p> Date:  {footerData?.left?.footer?.date}</p>
                </div>

                {/* Right Section */}
                <div className="col-md-6 float-right">
                    <p className="regular-bold"> {footerData?.right?.footer?.company}</p>
                    <ul>
                        {footerData?.right?.footer?.directors?.map((director, index) => (
                            <li key={index}>
                                {director.designation}, (DIN: {director.directory_no})
                            </li>
                        ))}
                    </ul>
                </div>



            </div>

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

            {/* BS Popup */}
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
                        <Modal.Title> ADD</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form className="formtext modalform">
                                <div className="container">
                                    <div className="row form-group ">
                                        {/* Name Field */}
                                        <div className="col-md-4">
                                            <label>
                                                Name <span className="text-danger">*</span>
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


                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Show FD<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex">
                                                <div className="form-check me-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="showOption"
                                                        id="showYes"
                                                        value="yes"
                                                    />
                                                    <label className="form-check-label " htmlFor="showYes">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check pr-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="showOption"
                                                        id="showNo"
                                                        value="no"
                                                    />
                                                    <label className="form-check-label" htmlFor="showNo">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row form-group">

                                        {/*  ST (Yes/No) Radio Buttons */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Show ST <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex">
                                                <div className="form-check me-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="fdstOption"
                                                        id="fdstYes"
                                                        value="yes"
                                                    />
                                                    <label className="form-check-label" htmlFor="fdstYes">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="fdstOption"
                                                        id="fdstNo"
                                                        value="no"
                                                    />
                                                    <label className="form-check-label" htmlFor="fdstNo">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row form-group">

                                        {/* Note Ref Dropdown */}
                                        <div className="col-md-4 text-left mt-1">
                                            <label>
                                                Note Ref <span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <div className="col-md-8">
                                            <Select
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
            {/* End BS Popup */}

        </div>
    );
};

export default BalancesheetBody;