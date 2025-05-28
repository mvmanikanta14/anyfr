import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import "perfect-scrollbar/css/perfect-scrollbar.css"; // Import CSS
import PerfectScrollbar from "perfect-scrollbar";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";


const ModulesSidebar = ({ handleNoteClick, isOpen, toggleSidebar }) => {
    const [modulesData, setModulesData] = useState([]); // State to store fetched data
    // const API_URL = commonService.getAll(apiUrlsService.getAllModules); // Replace with your API URL

    const getAllModules = () => {
        commonService.getAll(apiUrlsService.getAllModules)
            .then((response) => {
                if (
                    response.data &&
                    Array.isArray(response.data.data) &&
                    response.data.data.length > 0 &&
                    Array.isArray(response.data.data.data)
                ) {
                    // Extracting the nested 'data' array from the first object
                    console.log("sidebar", response.data.data.data)
                    setModulesData(response.data.data.data);
                } else {
                    console.error("Invalid data structure received from API");
                    setModulesData([]);
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };

    useEffect(() => {
        
        getAllModules();
    }, []);

    const sidebarRef = useRef(null);

    useEffect(() => {
        if (sidebarRef.current) {
            const ps = new PerfectScrollbar(sidebarRef.current, {
                wheelSpeed: 1,
                suppressScrollX: true, // Hide horizontal scroll
            });

            return () => {
                ps.destroy(); // Clean up when component unmounts
            };
        }
    }, []);

    return (
        <aside ref={sidebarRef} className={`inside-text-sidebar sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>

            {modulesData.length > 0 ? (
                modulesData.map((menu, index) => (
                    <div key={index} className="json-section">
                        <div class="app-brand sidebar-header">

                            <h6 class="mb-0">{menu.menu_name}</h6> {/* Dynamic Menu Name */}
                            <button className="toggle-btn" onClick={toggleSidebar}>
                                {isOpen ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
                            </button>

                        </div>

                        <div className="h-100 w-100" ref={sidebarRef}>

                            <ul class="mcd-menu mcd-text-sidebar">
                                {menu.data.map((item, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleNoteClick(item.Sequence)}
                                        title={item.name}  // Tooltip on hover
                                        
                                    >
                                        <IconChevronRight className="list-icon" /> {item.name}
                                    </li>

                                ))}
                            </ul>

                            {/* <ul className="mcd-menu mcd-text-sidebar">
                                {menu?.data?.length > 0 ? (
                                    menu.data.flatMap(section =>
                                        section.data.map((item, idx) => (
                                            <li key={idx} onClick={() => handleNoteClick(item.Sequence)} title={item.name}>
                                                <IconChevronRight className="list-icon" /> {item.name}
                                            </li> 
                                        ))
                                    )
                                ) : (
                                    <li>No menu items available</li>
                                )}
                            </ul> */}
<ul className="mcd-menu mcd-text-sidebar">
    {modulesData && modulesData.length > 0 ? (
        modulesData.map((item, idx) => (
            <li
                key={idx}
                onClick={() => handleNoteClick(item.Sequence)}
                title={item.name}  // Tooltip on hover
            >
                <IconChevronRight className="list-icon" /> {item.name}
            </li>
        ))
    ) : (
        <li>No modules available</li> // You can show a fallback message
    )}
</ul>



                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </aside >
    );
};

export default ModulesSidebar;
