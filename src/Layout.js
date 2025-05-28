import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideIconsmenu";
import Dashboard from "./components/Dashboard";
import Datatables from "./components/Datatables";
import Datatable from "./components/Datatable";
import BalanceSheet from "./components/BalanceSheet";
import LoginPage from "./components/Login";
import EntityDashboard from "./components/EntityDashboard";
import EntityHeader from "./components/EntityHeader"; // Import EntityHeader component
import EntitySideIconsmenu from "./components/EntitySideIconsmenu";
import RequireAuth from "./components/RequireAuth";
import EntityClient from "./components/entites/EntityClient";
import ReportingPeriod from "./components/entites/ReportingPeriod";
import ModulesPurchased from "./components/entites/ModulesPurchased";
import UploadMainpage from "./components/UploadMainpage";
import MapMainpage from "./components/map/MapMainpage";
import SideIconsmenu from "./components/SideIconsmenu";
import PartnershipAct from "./components/SDs/PartnershipAct";
import ScheduleIII from "./components/SDs/ScheduleIII";
import { AcceleratedAnimation } from "framer-motion";
import AccountingStandards from "./components/SDs/AccountingStandards";
import FRRB from "./components/SDs/FRRB";
import ModuleMainpage from "./components/ModuleMainpage";
import PdMainpage from "./components/PdMainpage";
import FrMainpage from "./components/FrMainpage";
import SdMainpage from "./components/SDs/SdMainpage";
import tokenService from "./services/token.service";
import CompaniesAct from "./components/SDs/CompaniesAct";
import ChartofAccounts from "./components/data/ChartofAccounts";
import ChartofAccountsData from "./components/map/ChartofAccountsData";
import Interunit from "./components/Jvs/Interunit";
import Daybook from "./components/Jvs/Daybook";
import Rectification from "./components/Jvs/Rectification";
import JvMainpage from "./components/Jvs/JvMainpage";
import PreventManualRoute from "./components/PreventManualRoute";
import { EntityProvider } from "./components/context/EntityContext";
import swal from "sweetalert";
import FssParamMap from "./components/map/ChartofAccountsData";
import CoaFssView from "./components/map/CoaFssView";
import CoaGLView from "./components/map/CoaGLView";
import CoaGroupsView from "./components/map/CoaGroupsView";
import CoaCommonView from "./components/map/CoaCommonView";

import OthersMap from "./components/map/OthersMap";
import AutoRedirect from "./components/AutoRedirect";

import Trialbalance from "./components/map/Trialbalance";
import TrialbalanceBatchs from "./components/map/TrialbalanceBatchs";
import TbDbUploadBatches from "./components/data/TbDbUploadBatches";
import TBDBExcelUpload from "./components/map/TrialbalanceBatchs";
import Poc from "./components/entites/Poc";
import InvRegister from "./components/modules/InvRegister";
import Borrowings from "./components/modules/Borrowings";

import ShareCapital from "./components/modules/sharecapital";
import ArapApTranInvoices from "./components/modules/ArapApTranInvoices";
import CreditorsMainView from "./components/modules/CreditorsMainView";
import InventoryMainView from "./components/modules/Inventory/InventoryMainView";
import InvestmentsMainview from "./components/modules/Investments/InvestmentsMainview";
import Expenses from "./components/modules/Expenses";

import AssetsDepn from "./components/modules/AssetsDepn";


function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";
  const assignment = tokenService.getEntityName();

  const navigate = useNavigate();


  const isEntityHeaderPage = /\/(entitydashboard|chart-of-accounts|map|jvs|sd|fr|module|pd|companies-act|partnership-act|schedule-iii|accounting-standards|frrb|data|Jvs|rectification|settings)/.test(location.pathname);

  const isHeaderPage = /\/(dashboard|reportingPeriod|entityClient|Dummy|modulesPurchased)/.test(location.pathname);

  useEffect(() => {
    // If on a protected page and the user has selected an entity
    if (isHeaderPage && assignment) {
      swal({
        title: "Confirm Navigation",
        text: "Are you sure you want to leave this page?",
        icon: "warning",
        buttons: ["Cancel", "Yes, log out and go to Dashboard"],
        dangerMode: true,
      }).then((willNavigate) => {
        if (willNavigate) {
          tokenService.removeEntity();
          navigate("/dashboard");
        } else {
          navigate(-1);
        }
      });
    }
  }, [isHeaderPage, assignment, navigate]);

  useEffect(() => {
    if (isEntityHeaderPage && !assignment) {
      // If no entity is selected, show a SweetAlert warning
      swal({
        title: "Entity Required",
        text: "You need to select an entity to proceed. Would you like to go to the dashboard to select one?",
        icon: "warning",
        buttons: {
          confirm: {
            text: "Yes, go to Dashboard",
            value: true,
            visible: true,
            className: "btn btn-primary",
          }
        },
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((willNavigate) => {
        if (willNavigate) {
          navigate("/dashboard");
        }
      });
    }
  }, [isEntityHeaderPage, assignment, navigate]);







  return (
    <div className="layout-container">
      {/* Left Sidebar */}
      {!isLoginPage && (
        <div className="sidebar">
          <div className="sidebar-logo logo-text"> AFS </div>

          {!isLoginPage && !isEntityHeaderPage ? <SideIconsmenu /> : null}
          {!isLoginPage && !isHeaderPage ? <EntitySideIconsmenu /> : null}
        </div>
      )}

      <div className="content-container">
        {/* Top Header */}
        {!isLoginPage && !isEntityHeaderPage ? <Header /> : null}
        {!isLoginPage && !isHeaderPage ? <EntityHeader /> : null}
        {/* {hideLayoutPaths.includes(location.pathname)  ?  <Header /> : null} */}


        {/* Main Content */}
        <div className="">
          {/* <Breadcrumb1 /> */}

          
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/datatables" element={<Datatables />} />
              <Route path="/datatable" element={<Datatable />} />
              <Route path="/balance-sheet" element={<BalanceSheet />} />
              <Route path="/entityClient" element={<EntityClient />} />
              <Route path="/reportingPeriod" element={<ReportingPeriod />} />
              <Route path="/modulesPurchased" element={<ModulesPurchased />} />
              <Route path="/Poc" element={<Poc />} />

              {/* Add Route for EntityHeader */}

              {/* <Route path="/entitydashboard" element={<EntityHeader />} /> */}
              {/* <Route path="/chart-of-accounts" element={<UploadMainpage />} /> */}
              <Route path="/entitydashboard" element={<EntityDashboard />} />
              <Route path="/module" element={<ModuleMainpage />} />
              <Route path="/pd" element={<PdMainpage />} />
              <Route path="fr" element={<FrMainpage />} />
            </Route>


            <Route path="/data" element={<UploadMainpage />}>
              <Route index element={<AutoRedirect to="/data/chart-of-accounts" />} />
              <Route path="chart-of-accounts" element={<CoaCommonView />} />
              <Route path="fsli-master" element={<ChartofAccountsData />} />
              <Route path="trial-balance" element={<TrialbalanceBatchs />} />
              <Route path="upload-excel" element={<TbDbUploadBatches />} />
              <Route path="tb/:id" element={<TrialbalanceBatchs />} />
              

            </Route>





            {/* <Route path="/map" element={<MapMainpage />}>

              <Route index path="Fssmap" element={<FssParamMap />} />
              <Route index path="other" element={<OthersMap />} />

            </Route> */}


            <Route path="/jvs" element={<JvMainpage />}>
              <Route index element={<AutoRedirect to="/jvs/rectification" />} />
              <Route path="rectification" element={<Rectification />} />
              <Route path="interunit" element={<Interunit />} />
              <Route path="daybook" element={<Daybook />} />
            </Route>

            <Route path="/module" element={<ModuleMainpage />}>
              <Route index element={<AutoRedirect to="/module/inv-register" />} />
              <Route path="inv-register" element={<InvRegister />} /> 
              <Route path="assets-depn" element={<AssetsDepn />} /> 
                     
              <Route index element={<AutoRedirect to="/module/sharecapital" />} />
              <Route path="sharecapital" element={<ShareCapital />} />             
              <Route path="inv-register" element={<InvestmentsMainview/>} />             
              <Route path="borrowings" element={<Borrowings />} />             
              <Route path="sharecapital" element={<ShareCapital />} />             
              <Route path="credit-aging" element={<CreditorsMainView />} />             
              <Route path="inventory" element={<InventoryMainView />} />             
              <Route path="expenses" element={<Expenses />} />             
            </Route>
           



            <Route path="/sds" element={<SdMainpage />}>
            
              <Route index element={<AutoRedirect to="/sds/companies-act" />} />
              <Route path="companies-act" element={<CompaniesAct />} />
              <Route path="partnership-act" element={<PartnershipAct />} />
              <Route path="schedule-iii" element={<ScheduleIII />} />
              <Route path="accounting-standards" element={<AccountingStandards />} />
              <Route path="frrb" element={<FRRB />} />
            </Route>

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Layout;
