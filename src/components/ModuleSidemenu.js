import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";
import tokenService from "../services/token.service";
import { Dot } from "lucide-react";
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

function ModuleSidemenu({ isSidebarVisible }) {
    const [modulesData, setModulesData] = useState([]);
    const [moduleName, setModuleName] = useState("");
    const [EntityID, setEntityID] = useState("");
    const location = useLocation();


    useEffect(() => {
     
       setEntityID(tokenService.getEntityID());
     

        if (EntityID) {
            getAllModulesMenu();
        }
    }, [EntityID]);


    const getAllModulesMenu = () => {
        const requestData = {
            entities_id: EntityID,
        };

        commonService.add(apiUrlsService.getAllMasterConfigModules, requestData)
            .then((response) => {
                console.log("Modules API Response:", response);

                const allModules = response?.data?.data?.data || [];

                // Check if any module is Not Configured
                const hasNotConfigured = allModules.some(module => module.status === "Not Configured");

                if (hasNotConfigured) {
                    // swal("Alert", "Some modules are Not Configured!", "warning");
                }

                // Set all modules for display (both Configured + Not Configured)
                setModulesData(allModules);

                setModuleName(response?.data?.module || "Modules");

            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


 




    return (
        <div
            className="sidebar-textmenu"
            style={{
                transform: isSidebarVisible ? "translateX(0)" : "translateX(-250px)", // Sidebar slide effect
                transition: "transform 0.3s ease", // Smooth transition
            }}
        >
            
            <div className="sidemenu-header heads-font border-bottom-light">
                <b>  {moduleName} </b>
            </div>

            <SimpleBar  style={{ maxHeight: "calc(100vh - 100px)" }}>
            <div className="sidebar-menu-content">

            
                {modulesData.length > 0 ? (
                    <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
                        {modulesData.map((module, index) => {
                            const slug = module.module_name.toLowerCase().replace(/\s+/g, "-");
                            const fullPath = `/module/${module.path_name}`;
                            const isActive = location.pathname === fullPath;

                            return (
                                <li
                                    className={`textmenu-item ${isActive ? "active" : ""}`}
                                    key={index}
                                >
                                    {module.status === "Configured" ? (
                                        <Link to={ `/module/${module.path_name}`}>
                                            <Dot size={20} /> {module.module_name}
                                        </Link>

                                        
                                    ) : (
                                        <Link
                                            style={{ cursor: "pointer", color: "red" }}
                                            onClick={() => swal("Alert", `${module.module_name} is Not Configured!`, "warning")}
                                        >
                                            {/* If Not Configured, show as text and alert on click */}
                                            <Dot size={20} /> {module.module_name}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                ) : (
                    <p>Loading modules...</p>
                )}


            </div>

            </SimpleBar>
        </div>
    );
}

export default ModuleSidemenu;
