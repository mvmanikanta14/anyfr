import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../SidebarMenu";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../Breadcrumb";
import UploadingSidemenu from "../UploadingSidemenu";
import MapSidemenu from "../MapSidemenu";
import { Outlet } from "react-router-dom";

// Function to convert numbers to Roman numerals
const toRoman = (num) => {
  const romanMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  for (let i = 0; i < romanMap.length; i++) {
    while (num >= romanMap[i].value) {
      result += romanMap[i].numeral;
      num -= romanMap[i].value;
    }
  }
  return result;
};

const MapMainpage = () => {
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

  // **Global Search Logic**
  const filteredData = data
    .map((section) => {
      const matchesSection = section.section.toLowerCase().includes(searchTerm.toLowerCase());

      const filteredLines = section.lines.filter((line) => {
        return (
          line.fsli_name.toLowerCase().includes(searchTerm.toLowerCase()) || // GL Name
          line.current_year.toString().includes(searchTerm) || // Current Year Amount
          line.previous_year.toString().includes(searchTerm) // Previous Year Amount
        );
      });

      return matchesSection || filteredLines.length > 0
        ? { ...section, lines: filteredLines }
        : null;
    })
    .filter(Boolean); // Remove empty sections

  return (


    <div className="d-flex">
      <Container fluid>
        <MapSidemenu isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

        <div className="breadcrumb-area-inside"><Breadcrumbs /></div>
        <div className="page-content-inside">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default MapMainpage;
