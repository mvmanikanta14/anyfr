

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

const Modules = () => {

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

    useEffect(() => {
        fetchNotesData();
    }, []);





    // Fetch Notes List
    const fetchNotesData = () => {
        axios
            .get("http://demo.anyfinancials.in:1234/api/modules")
            .then((response) => {

                if (response.data) {
                    console.log(response.data, "response")
                    // const structuredNotes = processNotes(response.data);
                    setModules(response.data.data);
                }
            })


            .catch(() => setError("Error fetching notes"));
    };

    const [activeTab, setActiveTab] = useState("Data");
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [SelectedReport, setSelectedReport] = useState(null);
    const [isTabEnabled, setIsTabEnabled] = useState(false); // Disable tabs initially

    // Function to update selected component
    const handleNoteClick = (argument) => {
        
        switch (argument) {
            case 1:
                setSelectedComponent(<Sharecapitals />);
                setSelectedReport(<ScReport />);
                break;
            case 2:
                setSelectedComponent(<Debenture />);
                setSelectedReport(<DebentureReport />);
                break;
            case 4:
                setSelectedComponent(<Borrowings />);
                setSelectedReport(<BorrowingReport />);

                break;
            default:
                console.warn("Invalid sequence number:", argument);
                setSelectedComponent(null);
                setSelectedReport(null);
        }
        setIsTabEnabled(true); // Enable tabs after selection
        setActiveTab("Data");  // Switch to "Data" tab on selection
    };


    return (
        <div>
            {/* Sidebar */}

            <div className="d-flex">

                <ModulesSidebar handleNoteClick={handleNoteClick} isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />



                <div className="inside-container">
                    <div className=" ">

                        
                        <div className="bread_crumb">
                            <div className=" ">
                                <h3 className="header-title"> Modules </h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Modules  </li>
                                </ul>
                            </div>
                        </div>


                        <div className="card">

                            <div className="custom_tabs_list">
                                <div>
                                    {["Data", "Reports", "Parameters"].map((tab) => (
                                        <button
                                            key={tab}
                                            className={activeTab === tab ? "active" : ""}
                                            onClick={() => isTabEnabled && setActiveTab(tab)}
                                            disabled={!isTabEnabled} // Disable tabs until a component is selected
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

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
                                                        style={{ maxWidth: "250px", margin: "auto" }}
                                                    />

                                                </div>
                                            )}
                                        </div>

                                    )}
                                    {activeTab === "Reports" && SelectedReport }
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

export default Modules;
