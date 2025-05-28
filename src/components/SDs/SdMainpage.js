import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SdSidemenu from "../SdSidemenu";
import Breadcrumbs from "../../Breadcrumb";
import { Outlet } from "react-router-dom";

const SdMainpage = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);


  return (
    <div className="d-flex">
      <Container fluid>
        <SdSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="breadcrumb-area-inside"><Breadcrumbs /></div>
        <div className="page-content-inside">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default SdMainpage;

