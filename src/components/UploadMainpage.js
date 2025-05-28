import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import UploadingSidemenu from "./UploadingSidemenu";
import Breadcrumbs from "../Breadcrumb";

const UploadMainpage = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);


  return (
    <div className="d-flex">
      <Container fluid>
        <UploadingSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="breadcrumb-area-inside"><Breadcrumbs /></div>
        <div className="page-content-inside">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default UploadMainpage;

