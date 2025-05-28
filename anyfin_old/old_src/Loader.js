// import React from 'react';
// import ReactLoading from "react-loading";

// const Loader = () => {
//   return (
//     <div className="loader-container">
//       <div className="loader-logo">
//         <img src="web-logo.png" alt="Logo" />
//       </div>
//       <div className="loader-text"> <ReactLoading className='spin' type="bubbles" color="#0000FF"
//                 height={100} width={50} /></div>
//     </div>
//   );
// };

// export default Loader;


import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navapp from "./components/Navapp";
import NavappGreen from "./components/NavappGreen";
import LoginPageAudit from "./components/LoginPageAudit";
import ForgetPageAudit from "./components/ForgetPageAudit";
import { useLocation } from "react-router-dom";
import tokenService from "./services/token.service";
import Entities from "./components/pages/fssprints/Entities";
import ShareCapital from "./components/pages/fssprints/ShareCapital";
import Dashboard from "./components/listing/Dashboard";
import SidebarsBKP from "./components/SidebarsBKP";

function App() {

  const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);

  console.log(showAdditionalHeader, "showAdditionalHeader");

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
    checkAssignment();
  }, []);

  useEffect(() => {
    checkAssignment();
  }, [location.pathname]);


  return (
    <>


      {/* {showAdditionalHeader && !isLoginPage && !isLoginPageforget && (
        <NavappGreen />
      )}
      {!showAdditionalHeader && !isLoginPage && !isLoginPageforget ? (
        <>
          <Navapp />

          <button onClick={handleButtonClick}>
            <RequireAuth>
              <Route
                path="/dashboardGreen"
                element={
                  <div>
                    <NavappGreen />
                  </div>
                }
              />
            </RequireAuth>
          </button>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPageAudit />} />
          <Route path="/forget_password" element={<ForgetPageAudit />} />
        </Routes>
      )} */}
      <Routes>
        <Route path="/fssNotes" element={<Navapp />} />
        <Route path="/Entities" element={<Entities />} />
        <Route path="/ShareCapital" element={<ShareCapital />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route  element={<SidebarsBKP />} />
      </Routes>

    </>
  );
}

export default App;



