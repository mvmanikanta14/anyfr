

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
import ModulesSidebar from "./ModuleSidebar";
import CashFlowStatement from "./CashFlowStatement";
import FssNotes from "./FssNotes";
import Entities from "./Entities";
import ScReport from "./ScReport";
import DebentureReport from "./DebentureReport";
import BorrowingReport from "./BorrowingReport";
import BalancesheetBody from "./BalancesheetBody";
import FSSSidebar from "../../FSSSidebar";
import ProfitLossBody from "./ProfitLossBody";
import LongTermBorrowing from "./LongTermBorrowing";
import From1Promoter from "./Form1Promoter";
import Form2RelatedParty from "./Form2RelatedParty";
import StandardText1 from "./StandardText1";
import StandardText2 from "./StandardText4";
import StandardText4 from "./StandardText4";
import StandardText6 from "./StandardText6";
import BreakdownDeferredTax from "./BreakdownDeferredTax";
import BreakdownShortTermBorrowings from "./BreakdownShortTermBorrowings";
import handleApiError from "../../utils/apiErrorHandler";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";

const FssAll = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);


    const [Modules, setModules] = useState([]);
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
    const [activeTab, setActiveTab] = useState("Data");
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [SelectedReport, setSelectedReport] = useState(null);
    const [isTabEnabled, setIsTabEnabled] = useState(false); // Disable tabs initially


    useEffect(() => {
        fetchNotesData();
    }, []);


    const fetchNotesData = () => {
        commonService.getAll(apiUrlsService.getAllBreakdown).then((response) => {
            if (response.data) {
                console.log(response.data, "response")
                // const structuredNotes = processNotes(response.data);
                setModules(response.data.data);
            }
        }).catch((error) => {
            handleApiError(error);
        });
    };


    // Function to update selected component
    const handleNoteClick = (type, argument) => {
        console.log("Clicked Type:", type, "Argument:", argument);

        switch (type) {
            case "balancesheet":
                if (argument === "1") {
                    setSelectedComponent(<BalancesheetBody />);
                }
                break;

            case "profitLoss":
                if (argument === "2") {
                    setSelectedComponent(<ProfitLossBody />);
                }
                break;

            case "cashflow":
                if (argument === "3") {
                    setSelectedComponent(<CashFlowStatement />);
                }
                break;


            case "breakdown":
                if (argument === "4") {
                    setSelectedComponent(<LongTermBorrowing />);
                }
                else if (argument === "24") {
                    setSelectedComponent(<BreakdownDeferredTax />);
                }
                else if (argument === "25") {
                    setSelectedComponent(<BreakdownShortTermBorrowings />);
                }
                break;

            case "form":
                if (argument === "1") {
                    setSelectedComponent(<From1Promoter />);
                } else if (argument === "92") {
                    setSelectedComponent(<Form2RelatedParty />);
                } else {
                    console.warn("Unknown argument for form:", argument);
                    setSelectedComponent(null);
                }
                break;

            case "standardtext":
                if (argument === "1") {
                    setSelectedComponent(<StandardText1 />);
                }
                else if (argument === "4") {
                    setSelectedComponent(<StandardText4 />);
                }
                else if (argument === "6") {
                    setSelectedComponent(<StandardText6 />);
                }
                break;

            default:
                console.warn("Invalid type or argument:", type, argument);
                setSelectedComponent(null);
        }

        setIsTabEnabled(true); // Enable tabs after selection
        setActiveTab("Data");  // Switch to "Data" tab on selection
    };

    return (
        <div>
            {/* Sidebar */}

            <div className="d-flex">

                <FSSSidebar handleNoteClick={handleNoteClick} isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />



                <div className="inside-container">
                    <div className=" ">

                        <div className="bread_crumb">
                            <div className=" ">
                                <h3 className="header-title"> FSS  </h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> FSS  </li>
                                </ul>
                            </div>
                        </div>


                        <div className="card">


                            <div className="card-body">


                                <div>
                                    {activeTab === "Data" && (
                                        <div >
                                            {selectedComponent ? (
                                                selectedComponent
                                            ) : (
                                                <div className="text-center my-5">
                                                    <h5 className="mt-3 text-center"> Select a Module from the Sidebar</h5>

                                                    <img
                                                        src="https://img.freepik.com/premium-vector/search-found-no-data-found-data-empty_1249780-8.jpg"
                                                        alt="No Data Found"
                                                        className="img-fluid"
                                                        style={{ maxWidth: "300px", margin: "auto" }}
                                                    />

                                                </div>
                                            )}
                                        </div>

                                    )}
                                    {activeTab === "Reports" && SelectedReport}
                                    {activeTab === "Parameters" && <Entities />}
                                </div>



                                <div>   </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>



    );
};

export default FssAll;
