
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
import handleApiError from "../../utils/apiErrorHandler";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";


const ProfitLossBody = () => {

    const [header, setHeader] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        commonService.getAll(apiUrlsService.getAllProfitLoss)
            .then((response) => {
                if (response.data.length > 0) {
                    setData(response.data[0].profit_loss);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
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
                            <th className="text-center" colSpan={2}> For the Year Ending </th>
                        </tr>

                        <tr>
                            <th> 31-Mar-2024 </th>
                            <th> 31-Mar-2023 </th>
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
                                <td>{item.particular}</td>
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
        </div>


    );
};

export default ProfitLossBody;