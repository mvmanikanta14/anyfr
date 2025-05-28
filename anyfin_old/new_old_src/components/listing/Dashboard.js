

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import tokenService from "../../services/token.service";
import FinancialStatementAnalysisWidget from "./Sumantri/Widgets/FinancialStatementAnalysisWidget";
import AuditChecklistWidget from "./Sumantri/Widgets/AuditChecklistWidget";
import RiskAssessmentWidget from "./Sumantri/Widgets/RiskAssessmentWidget";
import SamplingToolWidget from "./Sumantri/Widgets/SamplingToolWidget";
import VarianceAnalysisWidget from "./Sumantri/Widgets/VarianceAnalysisWidget";
import MarqueeWidgets from "./Sumantri/Widgets/MarqueeWidgets";
import AuditCalendarWidget from "./Sumantri/Widgets/AuditCalendarWidget";
import Header from "../Header";
import SidebarsBKP from "../SidebarsBKP";
import EntitiesDashborad from "../pages/fssprints/EntitiesDashborad";
import { IconHome } from "@tabler/icons-react";

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    // getAllAssignments();
  }, []);

  const getAllAssignments = () => {
    const pagedata = {
      active_page: pageno,
      page_size: records,
    };
    commonService.add(apiUrlsService.getAssignmentLogin, pagedata).then(
      (response) => {
        setAssignments(response.data.result);
      },
      (error) => { }
    );
  };

  const handleRecordsChange = (event) => {
    setRecords(event.target.value);
    setPageNo(1); // Reset to first page
  };

  const NavigatetoGreen = (selectedassignment) => {
    tokenService.setAssignmentname(selectedassignment.assignment_name);
    tokenService.setAssignmentID(selectedassignment.id);
    tokenService.setAssignmentEID(selectedassignment.e_id);

    // Navigate to dashboardGreen
    navigate("/Tracker", { replace: true });
    window.location.reload();

  };


  const options = (assignments || []).map((assignment) => ({
    value: assignment.id,
    label: assignment.full_name,
    assignment_name: assignment.assignment_name,
    e_id: assignment.e_id,
  }));

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const selectedassignment = { 
        assignment_name: selectedOption.assignment_name,
        id: selectedOption.value,
        e_id: selectedOption.e_id,
      };
      NavigatetoGreen(selectedassignment);
    }
  };

  // Custom styles for the react-select component
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "#4CAF50",
      backgroundColor: "#dabfec", // Custom background color
      minHeight: "40px",
      display: "flex",
      alignItems: "center", // Centers the content vertically
      "&:hover": {
        borderColor: "#45a049",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4CAF50" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#e6f4ea",
        color: "#333",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      marginTop: "0",
      zIndex: 100,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "16px",
      textAlign: "center", // Center-aligns the placeholder text
      width: "100%", // Ensures the text is centered within the select box
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      textAlign: "center", // Center-aligns the selected value
      width: "100%", // Ensures the text is centered within the select box
    }),
  };

  return (


    <div className="">

      <div className="bread_crumb">
        <div className=" ">
          <h3 className="header-title"> Select Entity </h3>
        </div>

         
      </div>

      <div className="row">
        <div className="col-lg-8 col-md-8 mt-12 ">
          <EntitiesDashborad />
        </div>

        <div className="col-lg-4 col-md-4 mt-2">
          <RiskAssessmentWidget />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-4 mt-2 ">
          <VarianceAnalysisWidget />
        </div>
        <div className="col-lg-4 col-md-4 mt-2">
          <SamplingToolWidget />
        </div>
        <div className="col-lg-4 col-md-4 mt-2">
          <AuditCalendarWidget />
        </div>
      </div>

    </div>

  );
};
export default Dashboard;

