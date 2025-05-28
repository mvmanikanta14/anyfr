import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";
import { Dot } from "lucide-react";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

function FrSidemenu({ isSidebarVisible }) {
    const [frModule, setFrModule] = useState(null);
    const [moduleName, setModuleName] = useState("");
    const location = useLocation();

    useEffect(() => {
        getAllFrMenu();
    }, []);

    const getAllFrMenu = () => {
        commonService.getAll(apiUrlsService.getAlluploadingmenu)
            .then((response) => {
                console.log("FR API Response:", response);

                const allModules = response?.data?.data || response?.data || [];

                const fr = allModules.find(
                    (moduleItem) => moduleItem.module?.toLowerCase() === "fr"
                );

                if (fr) {
                    setFrModule(fr);
                    setModuleName(fr.module);
                } else {
                    swal("FR module not found");
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

            <SimpleBar style={{ maxHeight: "calc(100vh - 100px)" }}>

                <div className="sidebar-menu-content">

                    {frModule ? (
                        <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
                            {frModule.sections

                                .filter((section) => section)
                                .map((section, index) => {
                                    const slug = section.title.toLowerCase().replace(/\s+/g, "-");
                                    const fullPath = `/sds/${slug}`;
                                    const isActive = location.pathname === fullPath;

                                    return (
                                        <li
                                            className={`textmenu-item ${isActive ? "active" : ""}`}
                                            key={index}
                                        >
                                            <Link to={fullPath}> <Dot size={20} /> {section.title}</Link>
                                        </li>
                                    );
                                })}


                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </SimpleBar>
        </div>
    );
}

export default FrSidemenu;
