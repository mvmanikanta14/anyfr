import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import tokenService from "../../services/token.service";
import FinancialStatementAnalysisWidget from "./Sumantri/Widgets/FinancialStatementAnalysisWidget";
import AuditChecklistWidget from "./Sumantri/Widgets/AuditChecklistWidget";
import RiskAssessmentWidget from "./Sumantri/Widgets/RiskAssessmentWidget";
import SamplingToolWidget from "./Sumantri/Widgets/SamplingToolWidget";
import VarianceAnalysisWidget from "./Sumantri/Widgets/VarianceAnalysisWidget";
import { Diversity1TwoTone } from "@mui/icons-material";
import MarqueeWidgets from "./Sumantri/Widgets/MarqueeWidgets";
import AuditCalendarWidget from "./Sumantri/Widgets/AuditCalendarWidget";
import TrackerWidget from "./Sumantri/Widgets/TrackerWidget";
import ProjectWidgetStyle1 from "./Sumantri/Widgets/ProjectWidgetStyle1";
import ProjectionsWidget from "./Sumantri/Widgets/ProjectionsWidget";
import ActivityPlanner from "./Sumantri/Widgets/ActivityPlanner";
import PlannerApp from "./Sumantri/Widgets/ActivityPlanner";
import Headergreen from "../Headergreen";
const DashboardGreen = () => {

  return (
    <div className="">
      <div className=" row">
        {/* <Headergreen/> */}

        <div className="col-lg-12 col-md-12 mt-2">
          <ActivityPlanner />
        </div>

        {/* <div className="col-lg-6 col-md-6 mt-2">
          <ProjectionsWidget />

        </div> */}

        {/* <div className="col-lg-6 col-md-6 mt-2">
          <ProjectionsWidget />
        </div>  */}



      </div>
    </div>
  );
};
export default DashboardGreen;