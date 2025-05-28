// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import NewSidebar from "./components/NewSidebar";
// import Header from "./components/Header";
// import Navapp from "./components/Navapp";
// import Entities from "./components/pages/fssprints/Entities";
// import Sharecapitals from "./components/pages/fssprints/Sharecapitals";
// import Debenture from "./components/pages/fssprints/Debenture";
// import ShareCapital from "./components/pages/fssprints/ShareCapital";
// import Dashboard from "./components/listing/Dashboard";
// import FssNotes from "./components/pages/fssprints/FssNotes";


// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="d-flex">
//       {/* {!isLoginPage && !isLoginPageforget && ( */}
//       <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       {/* )} */}

//       <div className={`content-container ${isSidebarOpen ? "content-expanded" : "content-full"}`}>
//         {/* {!isLoginPage && !isLoginPageforget &&  */}
//         <Header />
//         {/* } */}
//         <div className="page-content flex-grow-1">
//           <Routes>

//             {/* <Route path="/fssNotes" element={<Navapp />} /> */}
//             <Route path="/Entities" element={<Entities />} />
//             <Route path="/Debenture" element={<Debenture />} />
//             <Route path="/Sharecapitals" element={<Sharecapitals />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/fssNotes" element={<FssNotes />} />

//             {/* <Route path="/dummyx1" element={<Dummyx1 />} /> */}

//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import NewSidebar from "./components/NewSidebar";
// import Header from "./components/Header";
// import Entities from "./components/pages/fssprints/Entities";
// import Sharecapitals from "./components/pages/fssprints/Sharecapitals";
// import Debenture from "./components/pages/fssprints/Debenture";
// import Dashboard from "./components/listing/Dashboard";
// import FssNotes from "./components/pages/fssprints/FssNotes";
// import DashboardGreen from "./components/listing/DashboardGreen";
// import Headergreen from "./components/Headergreen";

// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const location = useLocation();

//   // Hide sidebar only for the "/fssNotes" route
//   const hideSidebarRoutes = ["/dashboardGreen"];
//   const isSidebarHidden = hideSidebarRoutes.includes(location.pathname);

//   return (
//     <div className="d-flex">
//       {!isSidebarHidden && (
//         <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       )}

//       <div className={`content-container ${isSidebarOpen && !isSidebarHidden ? "content-expanded" : "content-full"}`}>
//         <Header />
//         <div className="page-content">
//           <Routes>
//             <Route path="/Entities" element={<Entities />} />
//             <Route path="/Debenture" element={<Debenture />} />
//             <Route path="/Sharecapitals" element={<Sharecapitals />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/fssNotes" element={<FssNotes />} />
//             <Route path="/dashboardGreen" element={<Headergreen />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import NewSidebar from "./components/NewSidebar";
// import Header from "./components/Header";
// import Entities from "./components/pages/fssprints/Entities";
// import Sharecapitals from "./components/pages/fssprints/Sharecapitals";
// import Debenture from "./components/pages/fssprints/Debenture";
// import Dashboard from "./components/listing/Dashboard";
// import FssNotes from "./components/pages/fssprints/FssNotes";
// import DashboardGreen from "./components/listing/DashboardGreen";
// import Headergreen from "./components/Headergreen";import Users from "./components/pages/Users";
// import Masters from "./components/pages/masters/Masters";


// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const location = useLocation();

//   // Define paths where Sidebar & Header should be hidden
//   const hideLayoutPaths = ["/dashboardGreen"];

//   const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

//   return (
//     <div className="d-flex">
//       {/* Conditionally render Sidebar */}
//       {!isLayoutHidden && (
//         <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       )}

//       <div className={`content-container ${isSidebarOpen && !isLayoutHidden ? "content-expanded" : "content-full"}`}>
//         {/* Conditionally render Header */}
//         {isLayoutHidden ? <Headergreen /> : <Header />}        


//         <div className="page-content">
//           <Routes>
//             <Route path="/Entities" element={<Entities />} />
//             <Route path="/Debenture" element={<Debenture />} />
//             <Route path="/Sharecapitals" element={<Sharecapitals />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/masters" element={<Masters />} />

//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/fssNotes" element={<FssNotes />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import NewSidebar from "./components/NewSidebar";
// import Header from "./components/Header";
// import Entities from "./components/pages/fssprints/Entities";
// import Sharecapitals from "./components/pages/fssprints/Sharecapitals";
// import Debenture from "./components/pages/fssprints/Debenture";
// import Dashboard from "./components/listing/Dashboard";
// import FssNotes from "./components/pages/fssprints/FssNotes";
// import DashboardGreen from "./components/listing/DashboardGreen";
// import Headergreen from "./components/Headergreen";
// import Users from "./components/pages/Users";
// import Masters from "./components/pages/masters/Masters";
// import FSS from "./components/FSS";

// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const location = useLocation();

//   // Define paths where Sidebar & Header should be hidden
//   const hideLayoutPaths = ["/dashboardGreen" || "/FSS"];

//   const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

//   return (
//     <div className="d-flex">
//       {/* Conditionally render Sidebar */}
//       {!isLayoutHidden && (
//         <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       )}

//       <div className={`content-container ${isSidebarOpen && !isLayoutHidden ? "content-expanded" : "content-full"}`}>
//         {/* Conditionally render Header */}
//         {isLayoutHidden ? <DashboardGreen />  : <Header />}        

//         <div className="page-content">
//           <Routes>
//             <Route path="/Entities" element={<Entities />} />
//             <Route path="/Debenture" element={<Debenture />} />
//             <Route path="/Sharecapitals" element={<Sharecapitals />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/masters" element={<Masters />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/FSS" element={<FSS />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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


const App = () => {

  const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(showAdditionalHeader, "showAdditionalHeader");

  const loadingBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const handleButtonClick = () => {
    setShowAdditionalHeader(true);
  };

  const isLoginPage = location.pathname === "/login";
  const isLoginPageforget = location.pathname === "/forget_password";


  console.log(isLoginPage, "isLoginPage");

  const checkAssignment = () => {

    const assignment = tokenService.getAssignmentname();

    if (assignment) {
      console.log(assignment, "assignment of after");
      setShowAdditionalHeader(true);
    }
  };

  useEffect(() => {
    // Call checkAssignment() only on mount
    checkAssignment();

    // Start loading bar on route change
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    // Set loading state and stop loading after timeout
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
      if (loadingBarRef.current) {
        loadingBarRef.current.complete(); // Finish loading animation
      }
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timeoutId);
  }, [location.pathname]); // Runs on route change



  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Define paths where Sidebar & Header should be hidden
  const hideLayoutPaths = ["/dashboardGreen", "/fss-statements", "/modules", "/mapping"];
  const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

  const isAuthenticated = localStorage.getItem("token");


  // **🔹 If already on the invalid subdomain page, render only that page**
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
            {hideLayoutPaths.includes(location.pathname) ? <Headergreen /> : <Header />}

            <div className="page-content">
            <ToastContainer />
              <LoadingBar color="#f11946" ref={loadingBarRef} shadow={true} height={4} />
              <Routes>
                <Route element={<RequireAuth />}>
                  {/*Green  routes  protected routes */}
                  <Route path="/dashboardGreen" element={<DashboardGreen />} />
                  <Route path="/fssstatements" element={<FSS />} />
                  <Route path="/modules" element={<Modules />} />
                  <Route path="/fss-statements" element={<FssAll />} />
                  <Route path="/mapping" element={<Mapping />} />

                  {/*Blue  routes  protected routes */}
                  <Route path="/Entities" element={<Entities />} />
                  <Route path="/Sharecapitals" element={<Sharecapitals />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/masters" element={<Masters />} />
                  <Route path="/dashboard" element={<Dashboard />} />
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




