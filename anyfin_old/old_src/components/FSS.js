import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Dashboard from "./listing/Dashboard";
import logodark2 from '../assets/images/logo.png';
import logoicon from '../assets/images/favicon.png';
import Header from "./Header";
import { IconHome, IconChevronDown, IconChevronRight, IconChevronLeft, IconUser, IconHeartHandshake, IconIcons, IconGavel, IconBuildingBank, IconSitemap, IconMoneybag, IconListDetails, IconUsers, IconSettingsCog, IconBuilding, IconUserShield, IconArrowLeftToArc, IconArrowRightToArc, IconSquareChevronDownFilled } from "@tabler/icons-react";
import LoaderReact from "./LoaderReact";
import Masters from "./pages/masters/Masters";
import Fssprints from "./pages/fssprints/Fssprints";
import Reports from "./pages/reports/Reports";
import Datacruds from "./pages/data-cruds/Datacruds";
import Dummyx1 from "./pages/Dummy-x1";
import Investment from "./pages/investment/Investment";
import { Group } from "@mui/icons-material";
import GroupSummary from "./pages/investment/GroupSummary";
import Balancesheet from "./pages/fssprints/Balancesheet";
import ProfitLoss from "./pages/fssprints/ProfitLoss";
import CashFlowStatement from "./pages/fssprints/CashFlowStatement";
import FssStatements from "./pages/fssprints/FssStatements";
import FssNotes from "./pages/fssprints/FssNotes";
import Breakdown from "./pages/fssprints/Breakdown";
import FssStatements1 from "./pages/fssprints/FssStatements1";
import axios from "axios";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import Select from 'react-select';
import Headergreen from "./Headergreen";



const FSS = () => {
  const location = useLocation();

  

  // Detect route changes to show loader
 

  const [Show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleCloseShow = () => setShow(false);

  const [ShowPF, setShowPF] = useState(false);
  const handleShowPF = () => setShowPF(true);
  const handleCloseShowPF = () => setShowPF(false);

  const [ShowCS, setShowCS] = useState(false);
  const handleShowCS = () => setShowCS(true);
  const handleCloseShowCS = () => setShowCS(false);

  const [ShowFN, setShowFN] = useState(false);
  const handleShowFN = () => setShowFN(true);
  const handleCloseShowFN = () => setShowFN(false);

  const [ShowRN, setShowRN] = useState(false);
  const handleShowRN = () => setShowRN(true);
  const handleCloseShowRN = () => setShowRN(false);




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


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedArgument, setSelectedArgument] = useState(null);
  const [selectedType, setSelectedType] = useState(null);



  useEffect(() => {
    fetchNotesData();
    getAllHeader();
    getAllFooter();
  }, []);



  // Fetch Notes List
  const fetchNotesData = () => {
    axios
      .get("http://demo.anyfinancials.in:1234/api/allheads")
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
      .get('http://demo.anyfinancials.in:1234/api/header')
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
            setBreakdownData(response.data || {});

          }
        }
      })
      .catch(() => {
        setError("Error fetching data");
      });
  };



  return (

    <div className="">


      <div className="">

        {/* Sidebar */}

        {/* <div className="bread_crumb">
              <div className=" ">
                <h3 className="header-title">  Fss Notes </h3>
              </div>

              <div>
                <ul>
                  <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                  <li> FSS Notes </li>
                </ul>
              </div>
            </div> */}



        <div className="card">
          <div className="card-body">

            <div className="main-body2">
              <div className="d-flex">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pl-0">
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
                <div className="scroll-container">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0">
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
                                      {Object.entries(item).map(([key, cell], cellIdx) => (
                                        <td key={cellIdx}>
                                          {key === "particular" ? (
                                            <>
                                              {cell}
                                              <span
                                                className="text-right"
                                                style={{ float: "right" }}
                                              >
                                                <Link onClick={() => handleShowRN()}>  R </Link>
                                              </span>
                                              &nbsp;&nbsp;
                                              <span
                                                className="text-right"
                                                style={{ float: "right" }}
                                              >
                                                <Link onClick={() => handleShowFN()}  > F </Link>
                                              </span>
                                            </>
                                          ) : (
                                            cell || "-"
                                          )}


                                        </td>


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
                                    <td> <Link onClick={() => handleShow()}> {item.particular} </Link> </td>
                                    <td className="highlighted" onClick={() => onClickBreakdown(item.note_no)}>{item.note_no || "-"}</td>
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
                                    <td>- <Link onClick={() => handleShowPF()}>{item.particular} </Link></td>
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
                                    <td> <Link onClick={() => handleShowCS()}> {item.name} </Link></td>
                                    <td> {item.note_no || "-"}</td>
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
      </div>

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

      {/* PF Popup */}
      <div className="model_box">
        <Modal
          show={ShowPF}
          onHide={handleCloseShowPF}
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

                    {/* ST (Yes/No) Radio Buttons */}
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
      {/* End PF Popup */}

      {/* CS Popup */}
      <div className="model_box">
        <Modal
          show={ShowCS}
          onHide={handleCloseShowCS}
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

                    {/* ST (Yes/No) Radio Buttons */}
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
      {/* End CS Popup */}


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



                       


    </div>
  );
};
export default FSS;
