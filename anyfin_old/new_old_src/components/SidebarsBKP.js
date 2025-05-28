import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Dashboard from "./listing/Dashboard";
import logodark2 from '../assets/images/logo.png';
import logoicon from '../assets/images/favicon.png';
import Header from "./Header";
import { IconHome, IconChevronDown, IconChevronRight, IconChevronLeft, IconUser, IconHeartHandshake, IconIcons, IconGavel, IconBuildingBank, IconSitemap, IconMoneybag, IconListDetails, IconUsers, IconSettingsCog, IconBuilding, IconUserShield } from "@tabler/icons-react";
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


const SidebarsBKP = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isIconOnly, setIconOnly] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const location = useLocation();

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      setIconOnly(!isIconOnly);
    } else {
      setSidebarVisible(true);
    }
  };

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



  return (

    <div className="main_body">

      <div className={`sidebar-panel ${isSidebarVisible ? '' : 'hidden'} ${isIconOnly ? 'icon-only' : ''}`}>


        <div className="headercollapse_icon" >
          <button onClick={toggleSidebar}>  {isSidebarVisible ? (isIconOnly ? <IconChevronRight /> : <IconChevronLeft />) : <IconChevronLeft />}   </button>
        </div>

        <Link className="logo_dark" to="/dashboard">
          {isIconOnly ? <img src={logoicon} alt="logo" className="logo-icon" /> : <img src={logodark2} alt="logo" className="logo-text-sample " />}
        </Link>



        <ul className="mcd-menu">


          <li>
            <Link id="dashboard" to="/dashboard">
              <IconHome />
              {isIconOnly ? null : <span className="menu_text"> Dashboard </span>}
            </Link>
          </li>


          {/* <li>
            <Link id="fssprints" to="/fssprints">
              <IconUser />
              {isIconOnly ? null : <span className="menu_text"> FSS Prints </span>}
            </Link>
          </li>
          <li>
            <Link id="masters" to="/masters">
              <IconHeartHandshake />
              {isIconOnly ? null : <span className="menu_text">  Masters </span>}
            </Link>
          </li>

          <li>
            <Link id="reports" to="/reports">
              <IconListDetails />
              {isIconOnly ? null : <span className="menu_text"> Reports </span>}
            </Link>
          </li>

          <li>
            <Link id="datacruds" to="/datacruds">
              <IconIcons />
              {isIconOnly ? null : <span className="menu_text"> Data Crud's </span>}
            </Link>
          </li> */}

         
          <li>
            <Link id="datacruds" to="/Entities">
              <IconIcons />
              {isIconOnly ? null : <span className="menu_text"> Entities </span>}
            </Link>
          </li>

          <li>
            <Link id="datacruds" to="/users">
              <IconIcons />
              {isIconOnly ? null : <span className="menu_text"> Users </span>}
            </Link>
          </li>

          <li>
            <Link id="datacruds" to="/masters">
              <IconIcons />
              {isIconOnly ? null : <span className="menu_text"> Masters </span>}
            </Link>
          </li>



        </ul>
      </div>

      <section className={`main_content ${isSidebarVisible ? '' : 'hidden'} ${isIconOnly ? 'icon-only' : ''}`}>

        <Header />


        <div className="content">

          {/* <Breadcrumbs /> */}
          {loading ? <LoaderReact /> : null}
          {/* <Routes>
              <Route element={<RequireAuth />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="fssprints" element={<Fssprints />} />
                <Route path="investment" element={<Investment />} />
                <Route path="GroupSummary" element={<GroupSummary />} />
                <Route path="masters" element={<Masters />} />
                <Route path="reports" element={<Reports />} />
                <Route path="datacruds" element={<Datacruds />} />
                <Route path="dummyx1" element={<Dummyx1 />} />


              </Route>
            </Routes> */}

          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="fssprints" element={<Fssprints />} />
            <Route path="investment" element={<Investment />} />
            <Route path="GroupSummary" element={<GroupSummary />} />
            <Route path="masters" element={<Masters />} />
            <Route path="reports" element={<Reports />} />
            <Route path="datacruds" element={<Datacruds />} />
            <Route path="dummyx1" element={<Dummyx1 />} />
            <Route path="balancesheet" element={<Balancesheet />} />
            <Route path="profitloss" element={<ProfitLoss />} />
            <Route path="cashflowstatement" element={<CashFlowStatement />} />
            <Route path="fssstatement" element={<FssStatements />} />
            <Route path="fssnotes" element={<FssNotes />} />
            <Route path="breakdown" element={<Breakdown />} />
            <Route path="fssstatements1" element={<FssStatements1 />} />
          </Routes>
        </div>

      </section>
    </div>
  );
};
export default SidebarsBKP;
