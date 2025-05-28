// import React, { useEffect, useState } from "react";
//  import {Link,  Navigate,  useLocation, useNavigate } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import { BsPersonCircle } from "react-icons/bs";

// import GlobalSearch from "react-global-search";
// import tokenService from "../services/token.service";
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import Form from "react-bootstrap/Form";
// // import AuditPlanningMemorandum from "../pages/Greenpages/AuditPlanningMemorandum";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";

// const Headergreen = (props) => {
//   const [Searchblue, setSearchblue] = useState(false)
//   const [assignment, setAssignment] = useState(false)
//   const [assignmentname, setAssignmentname] = useState(false)
//   const [client, setClient] = useState(false)
//   const [clientname, setClientName] = useState(false)



//   const handleCloseSearchblue = () => setSearchblue(false);
//   const handleSearchblue = () => setSearchblue(true);
//   // const navigate = useNavigate();

//   // const gotoBlue = () => {
//   //   navigate("/dashboard")
//   // };
//   const options = [
//     { label: 'Change Profile', value: 'Change Profile' },
//     { label: 'Change Password', value: 'anotherAction' },
//     { label: 'Change Domain Logo', value: 'somethingElse' }, 
//     { label: 'Announcements', value: 'somethingElse' },
//     { label: 'Logout', value: 'somethingElse' }
//   ];

//   const handleSelect = (selectedValue) => {
//     console.log('Selected Option:', selectedValue);
//   };
//   const navigate = useNavigate();

//   const Assignmentlogout = () => {
//     tokenService.removeAssignement();
//     navigate('/dashboard');
//     window.location.reload();
//   }

//   const GetAssignmentClient = () => {
//     setAssignment(tokenService.getAssignement())
//     setAssignmentname(tokenService.getAssignmentname())
//     setClient(tokenService.getClient())
//     setClientName(tokenService.getClientname())
//   };

//   useEffect(() => {
//     GetAssignmentClient();
//   }, []); 

//   return (
//     <>
//       {/* {showmenu && */}
//       <div className="header-green">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-4 col-lg-4 col-sm-12  ">
//             <Link className="navbar-brand logo" to="/dashboard">
//                 {" "}
//                 <img src="../logo-icona.png" alt="logo" />{" "}
//               </Link>
//               <Link className="navbar-brand" to="/dashboard">
//                 {" "}
//                 <img src="../text_logos.png" alt="logo" className="logo-text-sample" />{" "}
//               </Link>
//               <div className="notify">
//                 <img
//                   src="https://old.anyaudit.co.in/img/notify_bell.png"
//                   class="svg-icons"
//                 ></img>
//                 <span class="count"> 678 </span>
//                 <FaSearch className="header-search" onClick={handleSearchblue} />
//                 <div className="model_box">
//                   <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="headerSearch-Modal" centered show={Searchblue}
//                     onHide={handleCloseSearchblue} backdrop="static" keyboard={false}>
//                     <Modal.Header closeButton className="border-0">
//                       <Modal.Title id="contained-modal-title-vcenter">
//                         Menu Search
//                       </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <div className='p-0 '>
//                         <form className=''>
//                           <div className='container'>
//                             <div className="row">
//                               <div className="col-md-12">
//                                 <input type="text" className="header-input-inside-search text-control mt-2" placeholder="What are you searching for?"></input>
//                                 <label><FaSearch className="search-inside-modal-inside-headersearch"/></label>
//                               </div>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </Modal.Body>
//                   </Modal>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-5 col-lg-5 col-xs-6 col-sm-6  col-sm-5  top-head pr-0 m-t-5">
//               <span class="col-white ">
//                 {" "}
//                 <small class="indigo f-12"> Client </small>{" "}
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
//                 {assignmentname}({assignment})
//               </span>
//               <div class="w-100">
//                 <span class="col-white">
//                   {" "}
//                   <small class="indigo f-12" ><a onClick={Assignmentlogout}>Assignment </a> </small> : &nbsp; {clientname} ({client}){" "}
//                 </span>
//               </div>
//             </div>

//             {/* <div className="col-md-2 col-lg-2 col-sm-12  header-icons"> */}

//             {/* <span>
//             {" "}

//             <BsBell />{" "}
//           </span>
//           <span>
//             {" "}
//             <BsArrowsFullscreen />{" "}
//           </span>
//           <span>
//             {" "}
//             <BsUiChecksGrid />{" "}
//           </span> */}

//             {/* </div> */}

//             <div className="col-md-3 col-lg-2 col-sm-12 profile">
//               <div className="">
//                 <div class="logo-texts"> RA and Associates </div>
//                 <span class="logo-text">
//                   {" "}
//                   Chartered Accountants || rka.com
//                   {/* <img
//                     src="./images/login-bg.jpg"
//                     className="profile-img"
//                     alt="login-bg"
//                   />{" "} */}
//                 </span>
//                 {/* <div className="profile-logogreen">
//                   <BsPersonCircle />
//                 </div> */}

//                 <div className="profile-logogreen">
//                   <Dropdown onSelect={handleSelect}>
//                     <Dropdown.Toggle variant="link" id="dropdown-basic" >
//                       <BsPersonCircle />
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu alignRight>
//                       {options.map((option) => (
//                         <Dropdown.Item key={option.value} eventKey={option.value}>
//                           {option.label}
//                         </Dropdown.Item>
//                       ))}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </div>
//                 {/* <Dropdown className="d-inline-flex profile-bg">
//               <img src="./images/login-bg.jpg" className="profile-img"  alt="login-bg"/> 
//               <Dropdown.Toggle>
//                 <div className="text-left float-left">
//                   <span className="d-block"> seshasai@anyaudit </span>
//                   <span> Partner </span>
//                 </div>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item href="#"> Profile Page </Dropdown.Item>
//                 <Dropdown.Item href="#"> Settings </Dropdown.Item>
//                 <Dropdown.Item href="#">  <NavLink className=""  to="/">
//                       Logout
//                     </NavLink> </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown> */}
//               </div>
//             </div>
//           </div>
//           <div class="log-name-green">
//             <span> User : &nbsp; Admin </span>
//           </div>
//         </div>
//       </div>
//       {/* } */}
//     </>
//   );
// };

// export default Headergreen;


import React, { useEffect, useState } from "react";
//  import {  useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { BsUiChecksGrid, BsArrowsFullscreen, BsBell } from "react-icons/bs";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import GlobalSearch from "react-global-search";
import tokenService from "../services/token.service";
import { BsPersonCircle } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaFile, FaFileAlt, FaLock, FaNewspaper, FaPenAlt, FaPencilAlt, FaSearch, FaSignOutAlt } from "react-icons/fa";
import DropdownButton from "react-bootstrap";
import { IconBellRinging, IconListSearch, IconChevronRight, IconUserEdit, IconPassword, IconSettings, IconLogout, IconUserSquareRounded } from '@tabler/icons-react';
import { useAuth } from "./context/AuthProvider";



//import Appp from "../Appp";
// import { Link, useLocation, useNavigate } from "react-router-dom";

const Headergreen = (props) => {
  const [assignment, setAssignment] = useState(false)
  const [assignmentname, setAssignmentname] = useState(false)
  const [assignmentID, setAssignmentID] = useState(false)
  const [entityId, setEntityID] = useState(false)
  const [client, setClient] = useState(false)
  const [clientname, setClientName] = useState(false)


  const [Searchblue, setSearchblue] = useState(false);
  const handleCloseSearchblue = () => setSearchblue(false);
  const handleSearchblue = () => setSearchblue(true);

  const logout = () => {
    tokenService.removeUser();
    tokenService.removeAssignement();
    localStorage.removeItem('activeTab');
    navigate('/login');
    window.location.reload();

  }
  const options = [
    {
      label: (
        <Link className="links-links " to={"/Change_Profile"}>
          {/* <label className="nav-icon-dropdown"><FaPencilAlt/></label> */}
          {" "}
          <IconUserEdit className="profile-dropdown" /> &nbsp; Change Profile{" "}
        </Link>
      ),
      value: "Change Profile",
    },
    {
      label: (
        <Link className="links-links" to={"/Change_Password"}>
          <IconPassword className="profile-dropdown" />&nbsp;
          Change Password{" "}
        </Link>
      ),
      value: "anotherAction",
    },
    {
      label: (
        <Link className="links-links" to={"/Domainlogo"}>
          {" "}
          <IconSettings className="profile-dropdown" />&nbsp;
          Domain logo{" "}
        </Link>
      ),
      value: "somethingElse",
    },
    // {
    //   label: (
    //     <Link className="links-links" to={"/PendingAsMaker"}>
    //       {" "}
    //       <FaNewspaper className="profile-dropdown"/>&nbsp;
    //       Pending AsMaker{" "}
    //     </Link>
    //   ),
    //   value: "somethingElse",
    // },
    {
      label: (
        <Link className="links-links" onClick={logout}>
          <IconLogout className="profile-dropdown" />&nbsp;
          Logout{" "}
        </Link>
      ),
      value: "somethingElse",
    },
  ];

  const handleSelect = (selectedValue) => {
    // Do something with the selected option value (optional)
    console.log("Selected Option:", selectedValue);
  };

  const { auth } = useAuth();



  const navigate = useNavigate();

  const Assignmentlogout = () => {
    tokenService.removeAssignement();
    localStorage.removeItem('activeTab');
    navigate('/dashboard');
    window.location.reload();
  }

  const GetAssignmentClient = () => {
    setAssignment(tokenService.getAssignement())
    setAssignmentname(tokenService.getAssignmentname())
    setAssignmentID(tokenService.getAssignmentID())
    setEntityID(tokenService.getAssignmentEID())
    setClient(tokenService.getClient())
    setClientName(tokenService.getClientname())
  };

  useEffect(() => {
    GetAssignmentClient();
  }, []);


  return (
    <>
      {/* {showmenu && */}
      <div className="header">



        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="">

              <div className="notify">
                <Link to={"/PendingAsMaker"}> <IconBellRinging className="header-icon" /> </Link>
                <span class="count"> 15 </span>

                <IconListSearch className="header-icon" onClick={handleSearchblue} />
                <div className="model_box">
                  <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="headerSearch-Modal"
                    centered
                    show={Searchblue}
                    onHide={handleCloseSearchblue}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton className="border-0">
                      <Modal.Title id="contained-modal-title-vcenter">
                        Menu Search
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="p-0 ">
                        <form className="">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  className="header-input-inside-search text-control mt-2"
                                  placeholder="What are you searching for?"
                                ></input>
                                <label>
                                  <FaSearch className="search-inside-modal-inside-headersearch" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className=""></div>
            </div>

            <div className="select_assignemt">
              {/* {selectedAssignment ? selectedAssignment.assignment_name: ""} */}
              <div className="">
                <span class="col-white " >
                  A{assignmentID}_E{entityId}_{assignmentname}

                  <IconLogout onClick={Assignmentlogout} className="logout_assignment" />
                </span>
                <div class="w-100">
                  <span class="col-white">
                    {/* <small class="indigo f-12" ><a onClick={Assignmentlogout}>Assignment </a> </small> : &nbsp; {clientname} ({client}){" "} */}
                  </span>
                </div>
              </div>

            </div>








            <div className="user-name">
              {auth.name}
            </div>

              <div>
                {/* <div class="logo-texts"> RA and Associates </div> */}
                {/* <span class="logo-text">
                  {" "}
                  Chartered Accountants || rka.com
                  <img
                    src="./images/login-bg.jpg"
                    className="profile-img"
                    alt="login-bg"
                  />{" "}
                </span> */}
              </div>

              <div className="profile-logo">
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <IconUserSquareRounded />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="profile-dropdown-style" alignRight>
                    {options.map((option) => (
                      <Dropdown.Item
                        key={option.value}
                        eventKey={option.value}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>


          </div>

        </div>
      </div>

      {/* } */}
    </>
  );
};

export default Headergreen;
