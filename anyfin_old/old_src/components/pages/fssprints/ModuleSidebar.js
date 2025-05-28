import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import "perfect-scrollbar/css/perfect-scrollbar.css"; // Import CSS
import PerfectScrollbar from "perfect-scrollbar";


const ModulesSidebar = ({ handleNoteClick, isOpen, toggleSidebar }) => {
    const [modulesData, setModulesData] = useState([]); // State to store fetched data
    const API_URL = "http://demo.anyfinancials.in:1234/api/modules"; // Replace with your API URL

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    setModulesData(result.data); // Set API data into state
                } else {
                    console.error("No data received from API");
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        fetchModules();
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
