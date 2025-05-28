import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";
import tokenService from "../services/token.service";
import { ApiContext } from "../services/ApiProvider";
import { Dot } from "lucide-react";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

function SdSidemenu({ isSidebarVisible }) {
    const [isOpen, setIsOpen] = useState(true);
    const [sdsModule, setSdsModule] = useState(null);
    const [moduleName, setModuleName] = useState("");
    const location = useLocation();


    useEffect(() => {
        if (!sdsModule) {
            getAllSdsMenu();
        }
    }, []);


    const getAllSdsMenu = () => {
        commonService.getAll(apiUrlsService.getAlluploadingmenu)
            .then((response) => {
                console.log("SDS API Response:", response);

                const allModules = response?.data?.data || response?.data || [];

                const sds = allModules.find(
                    (moduleItem) => moduleItem.module?.toLowerCase() === "sds"
                );

                if (sds) {
                    setSdsModule(sds);
                    setModuleName(sds.module);
                } else {
                    swal("SDS module not found");
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);


    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
    }, []);

    useEffect(() => {
        if (EntityID && Id) {
            getSectionSP();
            getSectionQu();
        }
    }, [EntityID, Id]);

    const getSectionSP = () => {
        const requestData = {
            p_entity_id: EntityID,
            p_period_id: Id,
            p_org_id: auth.organisation_id,
        };

        commonService.add(apiUrlsService.getAllSectionSP, requestData)
            .then((response) => {
                console.log("API Response:", response.data); // Debugging

                if (response.data.message === "Section add successfully") {
                    const entityData = response.data.entity;
                    if (entityData && entityData.length > 0 && entityData[1]?.rows?.length > 0) {
                        console.log("Section data:", entityData[1].rows); // Your actual data
                    } else {
                        console.log("No data available for sections");
                    }
                } else {
                    console.log("Unexpected message:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getSectionQu = () => {
        const requestData = {
            p_entity_id: EntityID,
            p_period_id: Id,
            p_org_id: auth.organisation_id,
        };

        commonService.add(apiUrlsService.getAllSectionQue, requestData)
            .then((response) => {
                console.log("API Response:", response.data); // Debugging

                if (response.data.message === "Section add successfully") {
                    const entityData = response.data.entity;
                    if (entityData && entityData.length > 0 && entityData[1]?.rows?.length > 0) {
                        console.log("Section data:", entityData[1].rows); // Your actual data
                    } else {
                        console.log("No data available for sections");
                    }
                } else {
                    console.log("Unexpected message:", response.data.message);
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

                    {sdsModule ? (
                        <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
                            {sdsModule.sections
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

export default SdSidemenu;
