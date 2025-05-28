import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";


const FSSSidebar = ({handleBPCClick, handleNoteClick, isOpen, toggleSidebar }) => {
    const [modulesData, setModulesData] = useState([]); // State to store fetched data
    const API_URL = "http://demo.anyfinancials.in:1234/api/allheads"; // Replace with your actual API URL

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                if (Array.isArray(result)) {
                    setModulesData(result); // Set API data into state
                } else {
                    console.error("Invalid data structure received from API");
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
            <div class="app-brand sidebar-header">

                <h6 class="mb-0">    </h6> {/* Dynamic Menu Name */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
                </button>

            </div>

            {modulesData.length > 0 ? (
                modulesData.map((section, index) => (
                    <div key={index} className="json-section">


                        {/* Iterate over properties like FSs_statement, FCDE, policies, etc. */}
                        {Object.entries(section).map(([key, values]) =>
                            Array.isArray(values) ? (
                                <div key={key} className="json-subsection">

                                    <div className="h-100 w-100 fss-menus" ref={sidebarRef}>

                                        <h6 onClick={() =>  handleBPCClick(key)} className="side-header-2">{key.replace(/_/g, " ")}</h6> {/* Subsection Title */}
                                        <ul className="mcd-menu mcd-text-sidebar">
                                            {values.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => handleNoteClick(item.type, item.argument)} // Pass correct values
                                                    title={item.name}
                                                    data-tip={item.name} 
                                                    data-for={`tooltip-${idx}`}
                                                >
                                                    <IconChevronRight className="list-icon" /> {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                 </div>
                            ) : null
                        )}
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </aside>
    );
};

export default FSSSidebar;
