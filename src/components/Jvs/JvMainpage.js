import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../Breadcrumb";
import JvSidemenu from "../JvSidemenu";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import { FaStroopwafel } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const JvMainpage = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility


  const [jvModule, setJvModule] = useState(null);

  const getAllJvMenu = () => {
    commonService.getAll(apiUrlsService.getAlljvmenu)
      .then((response) => {
        const allModules = response?.data || [];

        const jv = allModules.find(
          (moduleItem) => moduleItem.module === "jvs"
        );

        if (jv) {
          setJvModule(jv);
        } else {
          FaStroopwafel("JVs module not found");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
  };

  useEffect(() => {
    getAllJvMenu();
  }, []);

  return (
    <div className="d-flex">
      <Container fluid>
        <JvSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

        <div className="breadcrumb-area-inside"><Breadcrumbs /></div>
        <div className="page-content-inside">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default JvMainpage;
