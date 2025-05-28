import React, { useEffect, useState } from "react";
import { Modal, Dropdown, Button } from "react-bootstrap";
import { Form, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IconBellRinging, IconListSearch, IconChevronRight, IconUserEdit, IconPassword, IconSettings, IconLogout, IconUserSquareRounded, IconSettingsStar, IconSettingsCog, IconDashboard, IconGridDots, IconFilter, IconUserCheck, IconChecklist, IconTableColumn, IconBrandOffice, IconBuilding } from '@tabler/icons-react';
import "../assets/css/custom_style.css";
import tokenService from "../services/token.service";
// import { useAuth } from "./context/AuthProvider";
import logodark2 from '../assets/images/logo.png';
import logoicon from '../assets/images/favicon.png';
import Select from 'react-select'; 
import CentralizedWidget from "./listing/Sumantri/Widgets/CentralizedWidget";
import DashboardGreen from "./listing/DashboardGreen";

const routes = [
  { name: "Business Entities", path: "/businessEntities" },
  { name: "Entities Profile", path: "/EntitiesProfile1" },
  { name: "Assets", path: "/assets" },
  { name: "Individual", path: "/individual" },
  { name: "Liability", path: "/liability" },
  { name: "Common Attachments", path: "/CommonAttachments" },
  { name: "Parent Component", path: "/ParentComponent" },
  { name: "Client", path: "/client" },
  { name: "Assignment", path: "/assignment" },
  { name: "Users", path: "/users" },
  { name: "Business Names", path: "/businessNames" },
  { name: "Business Locations", path: "/businessLocations" },
  { name: "Banks", path: "/banks" },
  // Add all other routes here
];

const Headergreen = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [Searchblue, setSearchblue] = useState(false);
  const navigate = useNavigate();

  const handleCloseSearchblue = () => {
    setSearchblue(false);
    setSearchQuery("");
  };
  // const { auth } = useAuth();


  const [Showrm, setShowrm] = useState(false);
  const handleShowrm = () => setShowrm(true);
  const handleCloseShowrm = () => setShowrm(false);

  const [Showparameters, setShowparameters] = useState(false);
  const handleShowparameters = () => setShowparameters(true);
  const handleCloseShowparameters = () => setShowparameters(false);

  const [Showmodules, setShowmodules] = useState(false);
  const handleShowmodules = () => setShowmodules(true);
  const handleCloseShowmodules = () => setShowmodules(false);
  

  const [Showprofile, setShowprofile] = useState(false);
  const handleprofile = () => setShowprofile(true);
  const handleCloseprofile = () => setShowprofile(false);

  const [Showsubscription, setShowsubscription] = useState(false);
  const handlesubscription = () => setShowsubscription(true);
  const handleClosesubscription = () => setShowsubscription(false);


  
  const [isFormVisible, setIsFormVisible] = useState(false);
  
    // Toggle form visibility
    const toggleFormVisibility = () => {
      setIsFormVisible(!isFormVisible);
    };


  const handleSearchblue = () => setSearchblue(true);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoutes(
      routes.filter((route) => route.name.toLowerCase().includes(query))
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSearchblue(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setSearchblue(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const logout = () => {
    tokenService.removeUser();
    navigate('/login');
    window.location.reload();


  }

  const options = [
    {
      label: (
        <Link className="links-links " onClick={handleprofile}>
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

    {
      label: (
        <Link className="links-links" onClick={handlesubscription}>
          {" "}
          <IconGridDots className="profile-dropdown" />&nbsp;  Subscription 
        </Link>
      ),
      value: "somethingElse",
    },

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


  
  const Fsssettings = [

    
    {
      label: (
        <Link className="links-links " onClick={handleShowrm}> <IconGridDots className="profile-dropdown" />   Reporting Styles </Link>
      ),
       
    },
    {
      label: (
        <Link className="links-links"  onClick={handleShowparameters}>   <IconSettingsStar className="profile-dropdown" /> Parameters </Link>
      ),
       
    },
    {
      label: (
        <Link className="links-links" onClick={handleShowmodules}>  <IconChecklist className="profile-dropdown" /> Modules </Link>
      ),
       
    }
 
  ];

  const handleSelect = (selectedValue) => {
    // Do something with the selected option value (optional)
    console.log("Selected Option:", selectedValue);
  };

  
  


  return (
    <>
      <div className="header">
     
        <div className="w-100">

       

          <div className="d-flex justify-content-between align-items-center">

            
            <div className="d-flex justify-content-between align-items-center"> 
                <Link to={"/dashboardGreen"}><img src={logodark2} alt="logo" className="logo-2" /> </Link>

                <div className="notify">
                  <Link to={"/PendingAsMaker"}>
                    <IconBellRinging className="header-icon" />
                  </Link>
                  <span className="count"> 15 </span>
                  <IconListSearch className="header-icon" onClick={handleSearchblue} />
                  <Modal
                    {...props}
                    size="mx"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
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
                    
                    <Modal.Body className="custom-modal-body">
                      <div className="border modalstart">
                        <form className="formtext modalform">
                          <div className="container">
                            <div className="row pt-1 mt-1">
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="header-input-inside-search text-control mt-2"
                                placeholder="What are you searching for?"
                              />
                            </div>
                          </div>
                        </form>
                        <div className="search-results mt-3">
                          <ul className="search-list">
                            {filteredRoutes.length > 0 ? (
                              filteredRoutes.map((route) => (
                                <li key={route.path}>
                                  <button
                                    className="btn btn-link"
                                    onClick={() => handleNavigation(route.path)}
                                  >
                                    {route.name}
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li>No results found</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>

            </div>

            <div className="entity-name-header d-flex justify-content-between align-items-center"> 
              <h5> <IconBuilding className="opacity-8" /> Finance Solutions, 	Private Limited - 2021</h5>  
              <div className="entity-logout"> <Link className="Link-color" to={"/dashboard"}> <IconLogout /> </Link> </div>
            </div>

            {/* <div className=" company_name">
              {auth.name}

            </div> */}


            <div className="profile-logo d-flex justify-content-between align-items-center">
              
              <div className="user-inside-settings"> 
              
                  <Dropdown onSelect={handleSelect} >
                    <Dropdown.Toggle variant="link" id="dropdown-basic1">
                      <IconSettingsCog />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="profile-dropdown-style" alignRight>
                      {Fsssettings.map((option) => (
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

              <div className="user-profile-drop"> 
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
        
                    
        
      {/* Modal for Rounding Styles */}
     <Modal
        show={Showrm}
        onHide={handleCloseShowrm}
        backdrop="static"
        size="lg"
        centered
      >

        <Modal.Header closeButton> <Modal.Title> Reporting Styles </Modal.Title> </Modal.Header>

        <Modal.Body className="custom-modal-body">
        <div className="border modalstart">
          <form className="formtext modalform">
            <div className="container">
                             
              {/* Currency Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Currency</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="inr">INR</option>
                    <option value="usd">USD</option>
                  </select>
                </div>
              </div>
              
              {/* Decimals Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Decimals</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="0">0</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
              
              {/* Comma Styling */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Comma Styling</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="comma">With Commas</option>
                    <option value="no-comma">Without Commas</option>
                  </select>
                </div>
              </div>

              {/* Current Year Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Current Year</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value=""> Left </option>
                    <option value=""> Right </option>
                  </select>
                </div>
              </div>

              {/* Font Family Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Font Family</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>
              </div>

              {/* Font Size Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Font Size</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value=""> Small </option>
                    <option value=""> Medium </option>
                    <option value=""> Large </option>
                     
                  </select>
                </div>
              </div>

              {/* Rounding Off Dropdown */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label>Rounding Off</label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="none">None</option>
                    <option value="">  x1 </option>
                    <option value="">  x2 </option>
                   
                  </select>
                </div>
              </div>


               {/* Note number Dropdown */}
               <div className="row form-group">
                <div className="col-md-4">
                  <label> Note No Level </label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="none">None</option>
                    <option value="">  Level 1 </option>
                    <option value="">  Level 2 </option>
                    <option value="">  Level 3 </option>
                    <option value="">  Level 4 </option>
                  </select>
                </div>
              </div>


              {/* Foot No numbers */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label> Foot Note No </label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="none">None</option>
                  </select>
                </div>
              </div>

              {/* Bordering Styles */}
              <div className="row form-group">
                <div className="col-md-4">
                  <label> Bordering Style </label>
                </div>
                <div className="col-md-8">
                  <select className="form-control">
                    <option value="none"> All Borders </option>
                  </select>
                </div>
              </div>

               
            </div>
          </form>
        </div>
        </Modal.Body>

        
        <Modal.Footer>
          <button type="submit" className="btn-sm btn-theme"> Submit </button>
        </Modal.Footer>
      </Modal>




      {/* Modal for Parameters */}
      <Modal 
       show={Showparameters}
       onHide={handleCloseShowparameters}
       backdrop="static"
        size="lg"
        centered>
        <Modal.Header closeButton> <Modal.Title>Parameters</Modal.Title>  </Modal.Header>
         
        <Modal.Body className="custom-modal-body">
          <div className="border modalstart">
            <form className="formtext modalform">
              <div className="container">
                
                {/* Name Input */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Name <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Address Textarea */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Address</label>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      placeholder="Enter Address"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                {/* Place Input */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Place</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Enter Place"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Date</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Notice to Shareholder Yes/No */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Notice to Shareholder</label>
                  </div>
                  <div className="col-md-8">
                    <select className="form-control">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                {/* Date of Board Meeting */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Date of Board Meeting</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* AGM Date Picker */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>AGM Date</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Short Note Yes/No */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Shorter Note</label>
                  </div>
                  <div className="col-md-8">
                    <select className="form-control">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div class="form-subheadings"> 
                  <h5> UDIN of Audit Report </h5>
                </div>

                {/* report */}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label> If Report <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                    />
                  </div>
                </div>


                {/* ICOFAR Dropdown */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>ICOFAR <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8">
                      <select className="form-control">
                        <option value="">Select ICOFAR</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>


              </div>
            </form>
          </div>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Modules */}
      <Modal

        show={Showmodules}
        onHide={handleCloseShowmodules}
        backdrop="static"
        size="lg"
        centered >
        <Modal.Header closeButton>
          <Modal.Title>Modules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Content for Modules.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>


       {/* Modal for Change Profile */}
        <Modal
          show={Showprofile}
          onHide={handleCloseprofile}
          backdrop="static"
          size="md"
          centered>
          <Modal.Header closeButton> <Modal.Title> Change Profile </Modal.Title>  </Modal.Header>

          <Modal.Body className="custom-modal-body">
            <div className="border modalstart">
              <form className="formtext modalform">
                <div className="container">

                  <div className="d-flex justify-items-center align-items-center profile-body">
                      <div>  <img src="https://i.pinimg.com/736x/ef/fc/e7/effce7a3535e233600a99e3c3c534861.jpg" className="profile-dp"></img> </div>
                      <div> 
                        <h5> Sesha Sai Akana </h5> 
                        <p> seshasaias0909@gmail.com </p>
                      </div>
                  </div>

                  {/* Name Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label> User Name <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        placeholder="Enter Name"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Login ID Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Login ID <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        placeholder="Enter Login ID"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Password <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Email <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="tel"
                        placeholder="Enter Phone"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Secret Question Input */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Secret Question</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        placeholder="Enter Secret Question"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Answer to Secret Question */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Answer to Secret Question</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        placeholder="Enter Answer"
                        className="form-control"
                      />
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button type="submit" className="btn-sm btn-theme"> Submit </button>
          </Modal.Footer>
        </Modal>



         {/* Modal for Subscription */}
         <Modal
          show={Showsubscription}
          onHide={handleClosesubscription}
          backdrop="static"
          size="lg"
          centered>
          <Modal.Header closeButton> <Modal.Title> Subscription </Modal.Title>  </Modal.Header>

          <Modal.Body className="custom-modal-body">
            <div className="border modalstart">
              <form className="formtext modalform">
                <div className=" ">


                  {/* Name Input */}
                  <div className="row form-group">
                      <div className="col-lg-4 col-md-4">
                          <div> <label> License <span className="text-danger">*</span> </label> </div>
                          <div>  <input   type="text" placeholder="Enter Answer" value="#12484"  className="form-control" disabled /> </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                          <div> <label> Start Date <span className="text-danger">*</span> </label> </div>
                          <div>  <input   type="text" placeholder="Enter Answer" value="12/06/2024"  className="form-control" disabled /> </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                          <div> <label> End Date <span className="text-danger">*</span> </label> </div>
                          <div>  <input   type="text" placeholder="Enter Answer" value="12/06/2024"  className="form-control" disabled /> </div>
                      </div>
                      
                  </div>

                  <div class="form-subheadings"> 
                    <h5> Frameworks </h5>
                  </div>

                  <div>
                    <ul class="three-column-list">
                      <li><input type="checkbox" id="item1"  checked disabled/> <label for="item1">Item 1 - x1 data</label></li>
                      <li><input type="checkbox" id="item2" checked disabled/> <label for="item2">Item 2 - x1 data</label></li>
                      <li><input type="checkbox" id="item3" checked disabled/> <label for="item3">Item 3 - x1 data</label></li>
                      <li><input type="checkbox" id="item4" checked disabled/> <label for="item4">Item 4 - x1 data</label></li>
                      <li><input type="checkbox" id="item5" checked disabled/> <label for="item5">Item 5 - x1 data</label></li>
                      <li><input type="checkbox" id="item6" checked disabled/> <label for="item6">Item 6 - x1 data</label></li>
                      <li><input type="checkbox" id="item7" checked disabled/> <label for="item7">Item 7 - x1 data</label></li>
                      <li><input type="checkbox" id="item8" checked disabled/> <label for="item8">Item 8 - x1 data</label></li>
                      <li><input type="checkbox" id="item9" checked disabled /> <label for="item9">Item 9 - x1 data</label></li>
                     </ul>
                  </div>
                  


                  <div class="form-subheadings"> 
                    <h5> Modules </h5>
                  </div>

                  <div>
                    <ul class="three-column-list">
                      <li><input type="checkbox" id="item1"  checked disabled/> <label for="item1">Item 1 - x1 data</label></li>
                      <li><input type="checkbox" id="item2" checked disabled/> <label for="item2">Item 2 - x1 data</label></li>
                      <li><input type="checkbox" id="item3" checked disabled /> <label for="item3">Item 3 - x1 data</label></li>
                      <li><input type="checkbox" id="item4" checked disabled/> <label for="item4">Item 4 - x1 data</label></li>
                      <li><input type="checkbox" id="item5" checked disabled/> <label for="item5">Item 5 - x1 data</label></li>
                      <li><input type="checkbox" id="item6" checked disabled/> <label for="item6">Item 6 - x1 data</label></li>
                      <li><input type="checkbox" id="item7" checked disabled/> <label for="item7">Item 7 - x1 data</label></li>
                      <li><input type="checkbox" id="item8" checked disabled/> <label for="item8">Item 8 - x1 data</label></li>
                      </ul>
                  </div>

                 
                


                <div className="d-flex separator-top form-group">
                    <div className="col-lg-4">
                      <p className="mb-2"> No.of User </p>
                      <h5 className="theme-text"> 6 </h5>
                    </div>
 
                    <div className="col-lg-4">
                      <div>
                        <p className="mb-2"> Database Stroage </p>
                        <h5 className="theme-text"> 250MB/1GB </h5>
                      </div>
                    </div>


                    <div className="col-lg-4">
                      <div>
                        <p className="mb-2"> Mass Stroage </p>
                        <h5 className="theme-text"> 3GB/10GB </h5>
                      </div>
                    </div>



                </div>

                <div className="mt-4">
                  <h6 className=""> Contact Administrator.. &nbsp; &nbsp;  
                    <Link onClick={toggleFormVisibility}>    Click    </Link>  </h6>
                  {/* Form Section (Collapsible) */}
                  {isFormVisible && (
                    <form>
                      
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
                      </div>

                      {/* Submit Button */}
                     <div className="text-right w-100">  <button type="submit" className="btn-sm btn-theme mr-0">Submit</button> </div>
                    </form>
                  )}
                </div>

                </div>
              </form>
            </div>
          </Modal.Body>

           
        </Modal>

 
      </div>
      {/* <CentralizedWidget/> */}

      {/* <div className="dashboard">
        
          <DashboardGreen />
      
      </div> */}

    </>
  );
};
export default Headergreen;
