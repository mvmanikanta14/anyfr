import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NewSidebar from "./components/NewSidebar";
import Header from "./components/Header";
import Entities from "./components/pages/fssprints/Entities";
import Sharecapitals from "./components/pages/fssprints/Sharecapitals";
import Debenture from "./components/pages/fssprints/Debenture";
import Dashboard from "./components/listing/Dashboard";
import FssNotes from "./components/pages/fssprints/FssNotes";
import DashboardGreen from "./components/listing/DashboardGreen";
import Headergreen from "./components/Headergreen";
import Users from "./components/pages/Users";
import Masters from "./components/pages/masters/Masters";
import FSS from "./components/FSS";
import Modules from "./components/pages/fssprints/Modules";
import Mapping from "./components/pages/fssprints/Mapping";
import tokenService from "./services/token.service";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import ForgetPageAudit from "./components/ForgetPageAudit";
import InvalidDomain from "./components/pages/InvalidDomain";
import FssAll from "./components/pages/fssprints/FssAll";

import { Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import LineMaster from "./components/pages/fssMasters/FssCoreMaster";
import FrameworkMaster from "./components/pages/fssMasters/FrameworkMaster";
import FssCoreMaster from "./components/pages/fssMasters/FssCoreMaster";
import FssMasterLineMaster from "./components/pages/fssMasters/FssMasterLineMaster";
import FssMastPartyTypes from "./components/pages/fssMasters/FssMastPartyTypes";
import FssMastPartyRelationshipTypes from "./components/pages/fssMasters/FssMastPartyRelationshipTypes";
import FssMasterUnitTypes from "./components/pages/fssMasters/FssMasterUnitTypes";
import FssMasterUnitsofMeasurement from "./components/pages/fssMasters/FssMasterUnitsofMeasurement";
import FssMasterVoucherTypes from "./components/pages/fssMasters/FssMasterVoucherTypes";
import FssEntityLineMaster from "./components/pages/fssMasters/FssEntityLineMaster";
import FssParamentityGls from "./components/pages/fssMasters/FssParamentityGls";
import FssParamEntityParties from "./components/pages/fssMasters/FssParamEntityParties";
import FssParanEntityPartyRelations from "./components/pages/fssMasters/FssParanEntityPartyRelations";
import FssParamEntitiesProducts from "./components/pages/fssMasters/FssParamEntitiesProducts";
import FssParamEntityVouchers from "./components/pages/fssMasters/FssParamEntityVouchers";
import FssParamEntityTransactionNature from "./components/pages/fssMasters/FssParamEntityTransactionNature";
import FssParamEntityLocations from "./components/pages/fssMasters/FssParamEntityLocations";
import Dummyx1 from "./components/pages/Dummy-x1";
import ReconciliationofShareCapital from "./components/pages/manualaudits/ReconciliationofShareCapital";
import ManualAuditSidebar from "./components/pages/manualaudits/ManualAuditSidebar";
import PreventManualRoute from "./components/PreventManualRoute";
import swal from "sweetalert";
import Tribalance from "./components/pages/Tribalance";
import ListofSamplesChecklist from "./components/pages/checklist/ListofSamplesChecklist";
import ChecklistSubjectAnswersValues from "./components/pages/checklist/ChecklistSubjectAnswersValues";
import AuditReporting from "./components/pages/reporting/AuditReporting";
import GenerateReportDetails from "./components/pages/reporting/GenerateReportDetails";
import FssTrialbalance from "./components/pages/Fssstatement/FssTrialbalance";
import FssTrialbalanceCoa from "./components/pages/Fssstatement/FssTrialbalanceCoa";
import Fssstatement from "./components/pages/Fssstatement/Fssstatement";
import Fssstatementlocwise from "./components/pages/Fssstatement/Fssstatementlocwise";
import FssTrialbalanceCashFlowStCashFlowSt from "./components/pages/Fssstatement/FSSCashflowSt";
import FSSCashflowSt from "./components/pages/Fssstatement/FSSCashflowSt";
import FssRatios from "./components/pages/Fssstatement/FssRatios";
import PrintFssSt from "./components/pages/Fssstatement/PrintFssSt";
import YeartoDateFSS from "./components/pages/Fssstatement/YeartoDateFSS";
import FSSCashofAcc from "./components/pages/Fssstatement/FSSCashofAcc";
import FssStList from "./components/pages/masters/FssStList";
import FinancialsMeta from "./components/pages/financials/FinancialsMeta";
import BalanceSheet from "./components/pages/financials/BalanceSheet";
import ProfitLoss from "./components/pages/financials/ProfitLoss";
import FsliDetails from "./components/pages/financials/FsliDetails";
import PortingPeriod from "./components/pages/fssprints/PortingPeriod";
import ModulesPurchased from "./components/pages/fssprints/ModulesPurchased";

const App = () => {


  const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(showAdditionalHeader, "showAdditionalHeader");

  const loadingBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const handleButtonClick = () => {
    setShowAdditionalHeader(true);
  };

  const isLoginPage = location.pathname === "/login";
  const isLoginPageforget = location.pathname === "/forget_password";
  const assignment = tokenService.getEntityName();



  useEffect(() => {

    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
      if (loadingBarRef.current) {
        loadingBarRef.current.complete(); // Finish loading animation
      }
    }, 100); // Adjust delay as needed


    // if (location.pathname === "/dashboard" && assignment) {
    //   swal({
    //     title: "Confirm Navigation",
    //     text: "Are you sure you want to leave this page?",
    //     icon: "warning",
    //     buttons: ["Cancel", "Yes, go to Dashboard"],
    //     dangerMode: true,
    //   }).then((willNavigate) => {
    //     if (!willNavigate) {
    //       navigate(-1); // Go back to previous route if canceled
    //     }
    //   });
    // }
    // return () => clearTimeout(timeoutId);


  }, [location.pathname, navigate, assignment]); // Runs on route change



  // navigate, assignment

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Define paths where Sidebar & Header should be hidden
  const hideLayoutPaths = ["/dashboardGreen", "/fss-statements", "/modules", "/mapping", "/data", "/checklist", "/ChecklistSubjectAnswersValues", "/reporting", "disclosures1"];
  // const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

  const isAuthenticated = localStorage.getItem("token");

  const isDynamicRoute = location.pathname.startsWith("/ChecklistSubjectAnswersValues/");

  const isLayoutHidden = hideLayoutPaths.some(path => {
    if (path === "/ChecklistSubjectAnswersValues") {
      return isDynamicRoute; 
    }
    return location.pathname === path; 
  });

  if (location.pathname === "/invalid-subdomain") {
    return <InvalidDomain />;
  }

  return (

    <div className="d-flex">


      <Routes>

        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

      </Routes>

      {isLoginPage || isLoginPageforget ? (

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPageAudit />} />
        </Routes>
      ) : (
        <>
          {!isLayoutHidden && (
            <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          )}

          <div className={`inside-container content-container ${isSidebarOpen && !isLayoutHidden ? "content-expanded" : "content-full"}`}>

            {/* Ensure only one header is rendered */}
            {hideLayoutPaths.includes(location.pathname) || isDynamicRoute ? <Headergreen /> : <Header />}

            <div className="page-content">
              <ToastContainer />
              <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={4} />
              <Routes>
                <Route element={<RequireAuth />}>
                  {/*Green  routes  protected routes */}
                  <Route path="/dashboardGreen" element={<PreventManualRoute> <DashboardGreen /></PreventManualRoute>} />
                  <Route path="/fssstatements" element={<PreventManualRoute>  <FSS /> </PreventManualRoute>} />
                  <Route path="/modules" element={<PreventManualRoute> <Modules /></PreventManualRoute>} />
                  <Route path="/fss-statements" element={<PreventManualRoute> <FssAll /></PreventManualRoute>} />
                  <Route path="/mapping" element={<PreventManualRoute> <Mapping /></PreventManualRoute>} />
                  {/* <Route path="/manual-audit" element={<ManualAuditSidebar />} /> */}
                  <Route path="/data" element={<PreventManualRoute> <Tribalance /> </PreventManualRoute>} />
                 
                  <Route path="/checklist" element={<PreventManualRoute> <ListofSamplesChecklist /> </PreventManualRoute>} />

                  <Route path="/reporting" element={<PreventManualRoute> <AuditReporting /> </PreventManualRoute>} />

                  <Route path="/ChecklistSubjectAnswersValues/:id" element={<PreventManualRoute> <GenerateReportDetails/> </PreventManualRoute>} /> 

                  {/*Blue  routes  protected routes */}
                  <Route path="/masters" element={<Entities />} />
                  <Route path="/Dummyx1" element={<Dummyx1 />} />
                  <Route path="/Sharecapitals" element={<Sharecapitals />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/masterss" element={<Masters />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/fssCoreMaster" element={<FssCoreMaster />} />
                  <Route path="/frameworkMaster" element={<FrameworkMaster />} />
                  <Route path="/fssLineMaster" element={<FssMasterLineMaster />} />
                  <Route path="/fssMasterPartyTypes" element={<FssMastPartyTypes />} />
                  <Route path="/fssMasterRelationshipTypes" element={<FssMastPartyRelationshipTypes />} />
                  <Route path="/fssMasterUnitTypes" element={<FssMasterUnitTypes />} />
                  <Route path="/fssMasterUnitsofMeasurement" element={<FssMasterUnitsofMeasurement />} />
                  <Route path="/fssMasterVoucherTypes" element={<FssMasterVoucherTypes />} />
                  <Route path="/fssEntityLineMaster" element={<FssEntityLineMaster />} />
                  <Route path="/fssParamentityGls" element={<FssParamentityGls />} />
                  <Route path="/fssParamentityParties" element={<FssParamEntityParties />} />
                  <Route path="/fssParamentityPartyRelations" element={<FssParanEntityPartyRelations />} />
                  <Route path="/fssParamEntitiesProducts" element={<FssParamEntitiesProducts />} />
                  <Route path="/fssParamEntityVouchers" element={<FssParamEntityVouchers />} />
                  <Route path="/fssParamEntityTransactionNature" element={<FssParamEntityTransactionNature />} />
                  <Route path="/fssParamEntityLocations" element={<FssParamEntityLocations />} />
                  <Route path="/ListofSamplesChecklist" element={<ListofSamplesChecklist />} />
                  <Route path="/ChecklistSubjectAnswersValues/:id" element={<ChecklistSubjectAnswersValues />} />
                  <Route path="/GenerateReportDetails/:id" element={<GenerateReportDetails />} />
                  <Route path="/fssTrialbalance" element={<FssTrialbalance />} />
                  <Route path="/fssTrialbalanceCoa" element={<FssTrialbalanceCoa />} />
                  <Route path="/Fssstatement" element={<Fssstatement />} />
                  <Route path="/Fssstatementlocwise" element={<Fssstatementlocwise />} />
                  <Route path="/FSSCashflowSt" element={<FSSCashflowSt />} />
                  <Route path="/FssRatios" element={<FssRatios />} />
                  <Route path="/PrintFssSt" element={<PrintFssSt />} />
                  <Route path="/YeartoDateFSS" element={<YeartoDateFSS />} />
                  <Route path="/FSSCashofAcc" element={<FSSCashofAcc />} />
                  <Route path="/FssStList" element={<FssStList />} />





                  <Route path="/FinancialsMeta" element={<FinancialsMeta />} />
                  <Route path="/BalanceSheet" element={<BalanceSheet />} />
                  <Route path="/ProfitLoss" element={<ProfitLoss />} />
                  <Route path="/FsliDetails" element={<FsliDetails />} />
                  <Route path="/PortingPeriod" element={<PortingPeriod />} />
                  <Route path="/ModulesPurchased" element={<ModulesPurchased />} />






                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>

  );

};

export default App;




