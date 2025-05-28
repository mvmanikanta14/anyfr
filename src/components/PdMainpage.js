import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumb";
import UploadingSidemenu from "./UploadingSidemenu";
import MapSidemenu from "./MapSidemenu";
import ModuleSidemenu from "./ModuleSidemenu";
import PdSidemenu from "./PdSidemenu";
 

const PdMainpage = () => {
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default

    const [searchTerm, setSearchTerm] = useState("");
    const [currentYear, setCurrentYear] = useState(""); // Store Current Year
    const [previousYear, setPreviousYear] = useState(""); // Store Previous Year
 

  return (
    <div className="d-flex">
      <Container fluid>
      <PdSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      <div className="breadcrumb-area-inside"> <Breadcrumbs /> </div>

      <div
        className="page-content-inside" >

        
        {/* Search Box */}
        <div className=" d-flex justify-content-end custom-table-search">
          <input
            type="text"
            placeholder="Search..."
            className="form-control w-25"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Balance Sheet Table */}
        <table className="table table-bordered  table-design-1">
          <thead>
            <tr className="bg-light">
              <th> Particulars </th>

              <th className="text-right">Current Year ({currentYear})</th>
              <th className="text-right">Previous Year ({previousYear})</th>
            </tr>
          </thead>
          <tbody>
            

          </tbody>

           
        </table>
      </div>
      </Container>
    </div>
  );
};

export default PdMainpage;
