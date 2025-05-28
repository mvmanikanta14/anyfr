import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumb";
import UploadingSidemenu from "./UploadingSidemenu";
import MapSidemenu from "./MapSidemenu";
import JvSidemenu from "./JvSidemenu";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import { FaStroopwafel } from "react-icons/fa6";
import swal from "sweetalert";
import FrSidemenu from "./FrSidemenu";

const FrMainpage = () => {
  const [data, setData] = useState([]); // Stores API data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentYear, setCurrentYear] = useState(""); // Store Current Year
  const [previousYear, setPreviousYear] = useState(""); // Store Previous Year

  const apiUrl = "http://demo.anyibc.com/api/testApis/financials/balance-sheet";
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar is visible by default
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.success && response.data.fsli_sections) {
          setData(response.data.fsli_sections);

          // Set Current Year and Previous Year dynamically
          if (response.data.fsli_sections.length > 0) {
            setCurrentYear(response.data.fsli_sections[0].current_year);
            setPreviousYear(response.data.fsli_sections[0].previous_year);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [jvModule, setJvModule] = useState(null);

  const getAllJvMenu = () => {
    commonService.getAll(apiUrlsService.getAlljvmenu)
      .then((response) => {
        const allModules = response?.data || [];

        const jvs = allModules.find(
          (moduleItem) => moduleItem.module === "jvs"
        );

        if (jvs) {
          setJvModule(jvs);
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
      <FrSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

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

export default FrMainpage;
