import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Dashboard from "./listing/Dashboard";
import logodark2 from '../assets/images/logo.png';
import logoicon from '../assets/images/favicon.png';
import Header from "./Header";
import { IconHome, IconChevronDown, IconChevronRight, IconChevronLeft, IconUser, IconHeartHandshake, IconIcons, IconGavel, IconBuildingBank, IconSitemap, IconMoneybag, IconListDetails, IconUsers, IconSettingsCog, IconBuilding, IconUserShield, IconLibrary } from "@tabler/icons-react";
import LoaderReact from "./LoaderReact";
import Masters from "./pages/masters/Masters";
import Fssprints from "./pages/fssprints/Fssprints";
import Reports from "./pages/reports/Reports";
import Datacruds from "./pages/data-cruds/Datacruds";
import Dummyx1 from "./pages/Dummy-x1";
import Investment from "./pages/investment/Investment";
import { ChevronRight, Group } from "@mui/icons-material";
import GroupSummary from "./pages/investment/GroupSummary";
import Balancesheet from "./pages/fssprints/Balancesheet";
import ProfitLoss from "./pages/fssprints/ProfitLoss";
import CashFlowStatement from "./pages/fssprints/CashFlowStatement";
import FssStatements from "./pages/fssprints/FssStatements";
import FssNotes from "./pages/fssprints/FssNotes";
import Breakdown from "./pages/fssprints/Breakdown";
import FssStatements1 from "./pages/fssprints/FssStatements1";
import PerfectScrollbar from "perfect-scrollbar";


const NewSidebar = ({ isOpen, toggleSidebar }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isIconOnly, setIconOnly] = useState(false);
    const [loading, setLoading] = useState(false); // Track loading state
    const location = useLocation();



    // Detect route changes to show loader
    useEffect(() => {
        setLoading(true);  // Show loader when navigating
        const timeoutId = setTimeout(() => setLoading(false), 1000); // Simulate loading delay

        return () => {
            clearTimeout(timeoutId); // Cleanup timeout when component unmounts
        };
    }, [location]);


    // const handleLinkClick = (breadcrumb) => {
    //   onLinkClick(breadcrumb);
    // };


    const sidebarRef = useRef(null);

    useEffect(() => {
        if (sidebarRef.current) {
            const ps = new PerfectScrollbar(sidebarRef.current, {
                wheelSpeed: 1,
                suppressScrollX: true, // Hide horizontal scroll
            });

            return () => {
                ps.destroy(); // Clean up when component unmounts
            };
        }
    }, []);

    return (

        <>


            <aside className={`outside-sidebar sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>



                <div class="app-brand sidebar-header">
                    <Link className="logo_dark" to="/dashboard">
                        <img src={isOpen ? logodark2 : logoicon} alt="logo" className="logo" />
                    </Link>

                    <button className="toggle-btn" onClick={toggleSidebar}>
                        {isOpen ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
                    </button>
                </div>


                <div className="h-100 w-100" ref={sidebarRef}>

                    <ul className="mcd-menu">


                        <li>
                            <Link id="dashboard" to="/dashboard">
                                <IconHome />
                                {isIconOnly ? null : <span className="menu_text"> Dashboard </span>}
                            </Link>
                        </li>



                        <li>
                            <Link id="datacruds" to="/entities">
                                <IconIcons />
                                {isIconOnly ? null : <span className="menu_text"> Entities </span>}
                            </Link>
                        </li>

                        <li>
                            <Link id="users" to="/users">
                                <IconUsers />
                                {isIconOnly ? null : <span className="menu_text"> Users </span>}
                            </Link>
                        </li>

                        <li>
                            <Link id="datacruds" to="/masters">
                                <IconLibrary />
                                {isIconOnly ? null : <span className="menu_text"> Masters </span>}
                            </Link>
                        </li>

                         


                    </ul>
                </div>
            </aside >

        </>

    );
};
export default NewSidebar;
