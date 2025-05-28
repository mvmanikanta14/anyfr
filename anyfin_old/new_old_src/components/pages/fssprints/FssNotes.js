

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronRight, IconArrowLeftToArc, IconArrowRightToArc, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { set } from "react-hook-form";
import Headergreen from "../../Headergreen";

const FssNotes = () => {
    const [notes, setNotes] = useState([]);
    const [breakdownData, setBreakdownData] = useState([]);
    const [balancesheet, setBalancesheet] = useState([]);
    const [profitloss, setProfitloss] = useState([]);
    const [cashflow, setCashFlow] = useState([]);
    const [formdata1, setFormData1] = useState([]);
    const [formdata2, setFormData2] = useState([]);
    const [formdata3, setFormData3] = useState([]);
    const [formdata4, setFormData4] = useState([]);
    const [formdata5, setFormData5] = useState([]);

    const [selectedArgument, setSelectedArgument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotesData();
        getAllHeader();
        getAllFooter();
    }, []);

    // Fetch Notes List
    const fetchNotesData = () => {
        axios
            .get("http://demo.anyibc.com/api/apiRoutes/allheads")
            .then((response) => {

                if (response.data) {
                    console.log(response.data, "response")
                    // const structuredNotes = processNotes(response.data);
                    setNotes(response.data);
                }
            })


            .catch(() => setError("Error fetching notes"));
    };
    const [header, setHeader] = useState(null);
    const [footerDataBS, setFooterDataBS] = useState(null);
    const [footerDataPL, setFooterDataPL] = useState(null);
    const [footerDataCF, setFooterDataCF] = useState(null);
    const [headerPNL, setHeaderPNL] = useState(null);
    const [headerCashflow, setHeaderCashFlow] = useState(null);

    const getAllHeader = () => {

        axios
            .get('http://demo.anyibc.com/api/apiRoutes/header')
            .then((response) => {



                if (response.data.balance.header) {
                    setHeader(response.data.balance.header);
                }
                if (response.data.PNL.header) {
                    setHeaderPNL(response.data.PNL.header);
                    // alert(JSON.stringify(response.data.PNL.header, null, 2));
                }
                if (response.data.cashFlow.header) {
                    setHeaderCashFlow(response.data.cashFlow.header);
                }
            })
            .catch((error) => {
                setError('Error fetching data');
            });
    };

    const getAllFooter = () => {

        axios
            .get("http://abs.anyfinancials.in:1234/api/balanceFooter")
            .then((response) => {
                if (response.data) {
                    setFooterDataBS(response.data);
                }
                if (response.data) {
                    setFooterDataPL(response.data);
                }
                if (response.data) {
                    setFooterDataCF(response.data);
                }
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

    };

    const handleAllClick = () => {
        let urls = [
            `http://abs.anyfinancials.in:1234/api/balancesheet/1`,
            `http://abs.anyfinancials.in:1234/api/profitloss/2`,
            `http://abs.anyfinancials.in:1234/api/cashflow/3`
        ];

        Promise.all(urls.map(url => axios.get(url)))
            .then(([balancesheetRes, profitlossRes, cashflowRes]) => {
                if (balancesheetRes.data) {
                    setBalancesheet(balancesheetRes.data.balance_sheet);
                    setProfitloss(profitlossRes.data[0].profit_loss);
                    setCashFlow(cashflowRes.data);

                }
            })
            .catch(() => {
                setError("Error fetching data");
            });
    };

    const onClickBreakdown = (argument) => {

        // axios
        //     .get(`http://abs.anyfinancials.in:1234/api/notes/${argument}`)
        //     .then((response) => {
        //         if (response.data.length > 0) {
        //             setBreakdownData(response.data);
        //         }
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //     });

     
         let type = "breakdown";
     

        let url = `http://abs.anyfinancials.in:1234/api/${type}/${argument}`;
        //  alert(type);
        axios
            .get(url)
            .then((response) => {
                if (response.data) {
                    console.log(response.data, "response");
                   
                    setBalancesheet({});    

                        setBreakdownData(response.data || {}); // Store response dynamically
                    

                }
            })
            .catch(() => {
                setError("Error fetching data");
            });


    };


    const handleNoteClick = (argument, type) => {
        if (type == "standard text") {
            type = "standardtext";
        }


        let url = `http://abs.anyfinancials.in:1234/api/${type}/${argument}`;
        //  alert(type);
        axios
            .get(url)
            .then((response) => {
                if (response.data) {
                    console.log(response.data, "response");
                    if (type == "form" && argument == 1) {
                        setFormData1(response.data || {});
                        setBreakdownData({});
                        setFormData2({});
                        setBalancesheet({});
                        setCashFlow({});
                        setProfitloss({});

                    }

                    else if (type == "form" && argument == 92) {
                        setFormData2(response.data || {});
                        setBreakdownData({});
                        setFormData1({});
                        setBalancesheet({});
                        setCashFlow({});
                        setProfitloss({});


                    }
                    else if (type == "balancesheet" && argument == 1) {
                        setBalancesheet(response.data.balance_sheet);
                        setFormData1({});
                        setFormData2({});
                        setBreakdownData({});
                        setProfitloss({});
                        setCashFlow({});


                    }
                    else if (type == "profitLoss" && argument == 2) {
                        setProfitloss(response.data[0].profit_loss);
                        setFormData1({});
                        setFormData2({});
                        setBalancesheet({});
                        setBreakdownData({});
                        setCashFlow({});


                    }
                    else if (type == "cashflow" && argument == 3) {
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
                        setBreakdownData(response.data || {}); // Store response dynamically
                    }
                }
            })
            .catch(() => {
                setError("Error fetching data");
            });
    };



    return (
        <div className="">

            {/* Sidebar */}
            <Headergreen/>

            <div className="bread_crumb">
                <div className=" ">
                    <h3 className="header-title">  Fss Notes </h3>
                </div>

                <div>
                    <ul>
                        <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                        <li> FSS Notes </li>
                    </ul>
                </div>
            </div>





            <div className="card">
                <div className="card-body">

                    <div className="main-body2">
                        <div className="d-flex">

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 pl-0">
                                <div className="sidemenu-1">
                                    {/* <h5>FSS Notes List</h5> */}
                                    <div>


                                        {notes.length > 0 ? (
                                            notes.map((section, index) => (
                                                <div key={index} className="json-section">
                                                    {/* <h3>Section {section.seq}</h3> */}
                                                    {Object.keys(section).map((key) => {
                                                        if (Array.isArray(section[key])) {
                                                            return (
                                                                <div key={key}>
                                                                    <h6 onClick={() => handleAllClick()}>{key}</h6>
                                                                    <ul>
                                                                        {section[key].map((item, idx) => (
                                                                            <li
                                                                                key={idx}
                                                                                onClick={() => handleNoteClick(item.argument, item.type)}
                                                                                style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                                                            >
                                                                                {item.name}
                                                                                {/* {item.type} */}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            ))
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 pl-0">
                                <div className="main-header-title">
                                    <div>
                                        <button className="btn-style-prev">
                                            <IconArrowLeftToArc />
                                        </button>
                                    </div>
                                    <h5>Home</h5>
                                    <div>
                                        <button className="btn-style-nxt">
                                            <IconArrowRightToArc />
                                        </button>
                                    </div>
                                </div>

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



                               

                                        {(header && footerDataBS && balancesheet.length > 0) && (
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                {header && (
                                                    <div className="company-details">
                                                        <h4 className="company-title">{header.company}</h4>
                                                        <p className="company-desc">CIN: {header.CIN_Address}</p>
                                                        <h6>
                                                            {header.title} <span className="regular-bold"> {header.date} </span>
                                                        </h6>
                                                    </div>
                                                )}

                                                <div className="amounts-label"> (Amounts Rs. in Lakhs) </div>
                                                <div className="table-responsive">
                                                    {/* Balance Sheet Table */}
                                                    {balancesheet.length > 0 && (
                                                        <table className="table-custom table-outerlines-col-lines totals-subtotals">
                                                            <thead>
                                                                <tr>
                                                                    <th>S No.</th>
                                                                    <th>Particulars</th>
                                                                    <th>Note No.</th>
                                                                    <th>Current Year</th>
                                                                    <th>Previous Year</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {balancesheet.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.s_no || "-"}</td>
                                                                        <td>{item.particular}</td>
                                                                        <td onClick={() => onClickBreakdown(item.note_no)}>{item.note_no || "-"}</td>
                                                                        <td>{item.current_year ? item.current_year.toLocaleString() : "-"}</td>
                                                                        <td>{item.previous_year ? item.previous_year.toLocaleString() : "-"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                                {/* Footer Section */}
                                                {footerDataBS && (
                                                    <div className="row mt-4">
                                                        <p className="italic">{footerDataBS?.left?.footer?.head}</p>

                                                        {/* Unified Footer Content */}
                                                        <div className="col-md-6">
                                                            {footerDataBS?.left?.footer?.data?.map((accountant, index) => (
                                                                <div key={index} className="mb-2 p-2 rounded">
                                                                    <p className="regular-bold">{accountant.ca_firm_name}</p>
                                                                    <p>{accountant.info}</p>
                                                                    <p>{accountant.ca_firm_reg_no}</p>
                                                                    <p className="regular-bold">{accountant.ca_name}</p>
                                                                    <p>{accountant.ca_title}</p>
                                                                    <p>{accountant.ca_no}</p>
                                                                </div>
                                                            ))}
                                                            <p>Place: {footerDataBS?.left?.footer?.place}</p>
                                                            <p>Date: {footerDataBS?.left?.footer?.date}</p>
                                                        </div>

                                                        <div className="col-md-6 float-right">
                                                            <p className="regular-bold">{footerDataBS?.right?.footer?.company}</p>
                                                            <ul>
                                                                {footerDataBS?.right?.footer?.directors?.map((director, index) => (
                                                                    <li key={index}>
                                                                        {director.designation}, (DIN: {director.directory_no})
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {(header && footerDataPL && profitloss.length > 0) && (
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                {console.log("headerPNL", headerPNL)}

                                                {/* Company Details (header) */}
                                                {headerPNL && (
                                                    <div className="company-details">
                                                        <h4 className="company-title">{headerPNL.company}</h4>
                                                        <p className="company-desc"> CIN : {headerPNL.CIN_Address}</p>
                                                        <h6 className="">
                                                            {headerPNL.title}
                                                            <span className="regular-bold"> {headerPNL.date} </span>
                                                        </h6>
                                                    </div>
                                                )}

                                                {/* Amounts Label */}
                                                <div className="amounts-label"> (Amounts Rs. in Lakhs) </div>
                                                <div className="table-responsive">
                                                    {/* Balance Sheet Table */}
                                                    {profitloss.length > 0 && (
                                                        <table className="table-custom table-outerlines-col-lines totals-subtotals">
                                                            <thead>
                                                                <tr>
                                                                    <th>Serial No.</th>
                                                                    <th>Particulars</th>
                                                                    <th>Note No.</th>
                                                                    <th>Current Year</th>
                                                                    <th>Previous Year</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {profitloss.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.s_no || "-"}</td>
                                                                        <td>{item.particular}</td>
                                                                        <td>{item.note_no || "-"}</td>
                                                                        <td>{item.current_year ? item.current_year.toLocaleString() : "-"}</td>
                                                                        <td>{item.previous_year ? item.previous_year.toLocaleString() : "-"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                    {footerDataPL && (
                                                        <div className="row mt-4">
                                                            <p className="italic">{footerDataPL?.left?.footer?.head}</p>

                                                            {/* Unified Footer Content */}
                                                            <div className="col-md-6">
                                                                {footerDataPL?.left?.footer?.data?.map((accountant, index) => (
                                                                    <div key={index} className="mb-2 p-2 rounded">
                                                                        <p className="regular-bold">{accountant.ca_firm_name}</p>
                                                                        <p>{accountant.info}</p>
                                                                        <p>{accountant.ca_firm_reg_no}</p>
                                                                        <p className="regular-bold">{accountant.ca_name}</p>
                                                                        <p>{accountant.ca_title}</p>
                                                                        <p>{accountant.ca_no}</p>
                                                                    </div>
                                                                ))}
                                                                <p>Place: {footerDataPL?.left?.footer?.place}</p>
                                                                <p>Date: {footerDataPL?.left?.footer?.date}</p>
                                                            </div>

                                                            <div className="col-md-6 float-right">
                                                                <p className="regular-bold">{footerDataPL?.right?.footer?.company}</p>
                                                                <ul>
                                                                    {footerDataPL?.right?.footer?.directors?.map((director, index) => (
                                                                        <li key={index}>
                                                                            {director.designation}, (DIN: {director.directory_no})
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}



                                        {(header && footerDataCF && cashflow.length > 0) && (
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                {/* Company Details (header) */}
                                                {headerCashflow && (
                                                    <div className="company-details">
                                                        <h4 className="company-title">{headerCashflow.company}</h4>
                                                        <p className="company-desc"> CIN : {headerCashflow.CIN_Address}</p>
                                                        <h6 className="">
                                                            {headerCashflow.title}
                                                            <span className="regular-bold"> {headerCashflow.date} </span>
                                                        </h6>
                                                    </div>
                                                )}

                                                {/* Amounts Label */}
                                                <div className="amounts-label"> (Amounts Rs. in Lakhs) </div>
                                                <div className="table-responsive">
                                                    {/* Balance Sheet Table */}
                                                    {cashflow.length > 0 && (
                                                        <table className="table-custom table-outerlines-col-lines totals-subtotals">
                                                            <thead>
                                                                <tr>
                                                                    <th>Particulars</th>
                                                                    <th>Note No.</th>
                                                                    <th>Serial No.</th>
                                                                    <th>Current Year</th>
                                                                    <th>Previous Year</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cashflow.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.note_no || "-"}</td>
                                                                        <td>{item.s_no || "-"}</td>
                                                                        <td>{item.current_year ? item.current_year.toLocaleString() : "-"}</td>
                                                                        <td>{item.previous_year ? item.previous_year.toLocaleString() : "-"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>

                                                {footerDataCF && (
                                                    <div className="row mt-4">
                                                        <p className="italic">{footerDataCF?.left?.footer?.head}</p>

                                                        {/* Unified Footer Content */}
                                                        <div className="col-md-6">
                                                            {footerDataCF?.left?.footer?.data?.map((accountant, index) => (
                                                                <div key={index} className="mb-2 p-2 rounded">
                                                                    <p className="regular-bold">{accountant.ca_firm_name}</p>
                                                                    <p>{accountant.info}</p>
                                                                    <p>{accountant.ca_firm_reg_no}</p>
                                                                    <p className="regular-bold">{accountant.ca_name}</p>
                                                                    <p>{accountant.ca_title}</p>
                                                                    <p>{accountant.ca_no}</p>
                                                                </div>
                                                            ))}
                                                            <p>Place: {footerDataCF?.left?.footer?.place}</p>
                                                            <p>Date: {footerDataCF?.left?.footer?.date}</p>
                                                        </div>

                                                        <div className="col-md-6 float-right">
                                                            <p className="regular-bold">{footerDataCF?.right?.footer?.company}</p>
                                                            <ul>
                                                                {footerDataCF?.right?.footer?.directors?.map((director, index) => (
                                                                    <li key={index}>
                                                                        {director.designation}, (DIN: {director.directory_no})
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}


                                   


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FssNotes;
