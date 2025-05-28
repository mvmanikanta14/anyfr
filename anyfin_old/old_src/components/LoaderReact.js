// Loader.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
// import logodark2 from '../images/logodark2.png';
// import { SyncLoader } from 'react-spinners';

const LoaderReact = () => {
  return (
    <div className="loader">
      <div className="">
        {/* <SyncLoader color="#911dd7" size={15} /> */}
        {/* <img src={logodark2} alt="Loading..." className="loader-icon" /> */}
        <div className="loader-container">
          {/* First set of spinners */}
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />

          {/* Centered text */}
          {/* <span className="loader-text">Any Financials...</span> */}

          {/* Last set of spinners */}
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
        </div>
      </div>
    </div>
  );
};

export default LoaderReact;


// return (
//   <div className="d-flex">



//     {showAdditionalHeader && !isLoginPage && !isLoginPageforget && (
//       <DashboardGreen />
//     )}
//     {!showAdditionalHeader && !isLoginPage && !isLoginPageforget ? (
//       <>
//         {!isLayoutHidden && (
//           <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

//         )}

//         {/* <button onClick={handleButtonClick}>
//             <RequireAuth>
//               <Route
//                 path="/dashboardGreen"
//                 element={
//                   <div>
//                     {location.pathname === "/dashboardGreen" ? <DashboardGreen /> :
//                       location.pathname === "/fss-statements" ? <FSS /> : <Header /> &&
//                         location.pathname === "/modules" ? <Modules /> : <Header /> &&
//                           location.pathname === "/mapping" ? <Mapping /> : <Header />
//                     }
//                   </div>
//                 }
//               />
//             </RequireAuth>
//           </button> */}
//       </>
//     ) : (
//       <Routes>
//         <Route path="/login" element={<LoginPageAudit />} />
//         <Route path="/forget_password" element={<ForgetPageAudit />} />
//       </Routes>
//     )}
//     {/* {!isLayoutHidden && (
//         <NewSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       )} */}

//     {!showAdditionalHeader && !isLoginPage && !isLoginPageforget &&

//       <div className={`content-container ${isSidebarOpen && !isLayoutHidden ? "content-expanded" : "content-full"}`}>




//         <Header />

//         <div className="page-content">
//           <Routes>
//             <Route path="/Entities" element={<Entities />} />
//             <Route path="/Sharecapitals" element={<Sharecapitals />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/masters" element={<Masters />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </div>
//       </div>
//     }
//   </div>


// );