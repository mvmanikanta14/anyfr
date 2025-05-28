import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Dropdown icons
import { Link, useLocation } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";
import { FaAngleRight } from "react-icons/fa6";
import { Circle, Dot, DotIcon, DotSquareIcon } from "lucide-react";
import SimpleBar from "simplebar-react";


function UploadingSidemenu({ isSidebarVisible }) {

    const [uploadModule, setUploadModule] = useState(null);
    const [moduleName, setModuleName] = useState("");
    const location = useLocation();
    const [isResizing, setIsResizing] = useState(false);


    useEffect(() => {
        getAlluploadingmenu();
    }, []);





    const getAlluploadingmenu = () => {
        commonService.getAll(apiUrlsService.getAlluploadingmenu)
            .then((response) => {
                const allModules = response?.data || [];

                const Data = allModules.find(
                    (moduleItem) => moduleItem.module === "Data"
                );

                if (Data) {
                    setUploadModule(Data);
                    setModuleName(Data.module);
                } else {
                    swal("Upload module not found");
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
                <b> {moduleName} </b>
            </div>

            <SimpleBar style={{ maxHeight: "calc(100vh - 100px)" }}>
                <div className="sidebar-menu-content">
                    {uploadModule ? (
                        <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
                            {uploadModule.sections
                                .filter((section) => section)
                                .map((section, index) => {
                                    const slug = section.title.toLowerCase().replace(/\s+/g, "-");
                                    const fullPath = `/data/${slug}`;
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

export default UploadingSidemenu;
