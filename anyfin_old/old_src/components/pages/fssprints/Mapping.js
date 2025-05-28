

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { IconChevronRight, IconArrowLeftToArc, IconArrowRightToArc, IconHome } from "@tabler/icons-react";
import axios from "axios";
import { set } from "react-hook-form";

import Sharecapitals from "./Sharecapitals";
import Debenture from "./Debenture";
import Borrowings from "./Borrowings";
import Headergreen from "../../Headergreen";

const Mapping = () => {
    const [Mapping, setMapping] = useState([]);
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
            .get("http://demo.anyfinancials.in:1234/api/mapping")
            .then((response) => {

                if (response.data) {
                    console.log(response.data[0].mapping_json, "responseabc")
                    // const structuredNotes = processNotes(response.data);
                    setMapping(response.data[0].mapping_json);
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

    const navigate = useNavigate();

    const [selectedComponent, setSelectedComponent] = useState(null);



    const handleNoteClick = (argument) => {

        switch (argument) {
            case 1:
                //   setSelectedComponent(<Sharecapitals />);
                break;
            case 2:
                //   setSelectedComponent(<Debenture />);
                break;
            // case 3:
            //   setSelectedComponent(<Reserves />);
            //   break;
            case 4:
                //   setSelectedComponent(<Borrowings />);
                break;

            default:
                console.warn("Invalid sequence number:", argument);
                setSelectedComponent(null);
        }

    };



    return (
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

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 pl-0">
                                <div className="sidemenu-1">
                                    <div>
                                        <h6 onClick={handleAllClick}>Mapping</h6>
                                        {Mapping.length > 0 ? (
                                            Mapping.map((item, index) => (
                                                <div key={index} className="json-section">
                                                    <ul>
                                                        <li
                                                            key={item.Sequence}
                                                            onClick={() => handleNoteClick(item.Sequence)}
                                                            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                                        >
                                                            {item.name}
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </div>


                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 pl-0">

                                {/* <Sharecapitals /> */}

                                {selectedComponent}

                            </div>






















                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Mapping;
