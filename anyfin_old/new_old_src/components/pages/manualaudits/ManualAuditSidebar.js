import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logodark2 from '../../../assets/images/logo.png';
import logoicon from '../../../assets/images/favicon.png';
import { IconHome, IconChevronDown, IconChevronRight, IconChevronLeft, IconUser, IconHeartHandshake, IconIcons, IconGavel, IconBuildingBank, IconSitemap, IconMoneybag, IconListDetails, IconUsers, IconSettingsCog, IconBuilding, IconUserShield, IconLibrary } from "@tabler/icons-react";
import PerfectScrollbar from "perfect-scrollbar";


const ManualAuditSidebar = ({ isOpen, toggleSidebar }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isIconOnly, setIconOnly] = useState(false);
    const [loading, setLoading] = useState(false); // Track loading state
    const location = useLocation();



    // Detect route changes to show loader
    useEffect(() => {
        setLoading(true);  // Show loader when navigating
        const timeoutId = setTimeout(() => setLoading(false), 1000); // Simulate loading delay

        return () => {
            clearTimeout(timeoutId); // Cleanup timeout when component unmounts
        };
    }, [location]);


    // const handleLinkClick = (breadcrumb) => {
    //   onLinkClick(breadcrumb);
    // };


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

        <>


            <aside className={`outside-sidebar sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>



                


                <div className="h-100 w-100" ref={sidebarRef}>

                    <ul className="mcd-menu">


                        <li>
                            <Link id="manual-audit" to="/manual-audit">
                                <IconHome />
                                {isIconOnly ? null : <span className="menu_text"> Reconciliation of ShareCapital </span>}
                            </Link>
                        </li>



                        <li>
                            <Link id="datacruds" to="/entities">
                                <IconIcons />
                                {isIconOnly ? null : <span className="menu_text"> List of Shareholders Holding </span>}
                            </Link>
                        </li>

                        <li>
                            <Link id="users" to="/users">
                                <IconUsers />
                                {isIconOnly ? null : <span className="menu_text"> Share Holding of Promoters </span>}
                            </Link>
                        </li>

                        <li>
                            <Link id="datacruds" to="/masters">
                                <IconLibrary />
                                {isIconOnly ? null : <span className="menu_text"> Note Forming Part of FSS </span>}
                            </Link>
                        </li>

                         


                    </ul>
                </div>
            </aside >

        </>

    );
};
export default ManualAuditSidebar;
