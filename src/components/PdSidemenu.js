import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";


function PdSidemenu({ isSidebarVisible }) {
    const [pdModule, setPdModule] = useState(null);
    const [moduleName, setModuleName] = useState("");

    useEffect(() => {
        getAllPdMenu();
    }, []);

    const getAllPdMenu = () => {
        commonService.getAll(apiUrlsService.getAlluploadingmenu)
            .then((response) => {
                console.log("PD API Response:", response);

                const allModules = response?.data?.data || response?.data || [];

                const pd = allModules.find(
                    (moduleItem) => moduleItem.module?.toLowerCase() === "pd"
                );

                if (pd) {
                    setPdModule(pd);
                    setModuleName(pd.module);
                } else {
                    swal("PD module not found");
                }
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

            <div className="sidebar-menu-content">


                {pdModule ? (
                    <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
                        {pdModule.sections
                            .filter((section) => section)
                            .map((section, index) => (
                                <li className="textmenu-item" key={index}>{section.title}</li>
                            ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default PdSidemenu;
