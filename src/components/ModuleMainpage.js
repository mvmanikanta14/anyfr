import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumb";
import UploadingSidemenu from "./UploadingSidemenu";
import MapSidemenu from "./MapSidemenu";
import ModuleSidemenu from "./ModuleSidemenu";
import { Outlet } from "react-router-dom";
 

const ModuleMainpage = () => {
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default

 

  return (
    <div className="d-flex">
    <Container fluid>
      <ModuleSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="breadcrumb-area-inside"><Breadcrumbs /></div>
      <div className="page-content-inside">
        <Outlet />
      </div>
    </Container>
  </div>
  );
};

export default ModuleMainpage;
