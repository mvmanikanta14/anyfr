import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Dropdown, Form, InputGroup, FormControl, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar-react/dist/simplebar.min.css";
import "../index.css";
import { createPortal } from "react-dom";
import { Settings, User, LogOut, Bell, LogOutIcon, FileText, Building, Building2, Building2Icon, BuildingIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "react-feather";
import tokenService from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../services/ApiProvider";
import { Tooltip } from 'react-tooltip';


import swal from "sweetalert";
import { toast } from "react-toastify";

export default function EntityHeader() {
    const [userProfile, setProfileImage] = useState("%PUBLIC_URL%/logo.jpg"); // Default profile image
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [hovering, setHovering] = useState(false);

    const notifications = [
        { id: 1, message: 'New client added to your portfolio' },
        { id: 2, message: 'Audit file approved by reviewer' },
        { id: 3, message: 'Reminder: Team meeting at 5:00 PM' },
    ];
    const navigate = useNavigate();

    const logout = () => {
        tokenService.removeUser();
        tokenService.removeEntity();
        navigate('/login');
        window.location.reload();


    }

    const [companyId, setCompanyId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [PeriodName, setPeriodName] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);

    useEffect(() => {
        setCompanyId(tokenService.getEID());
        setCompanyName(tokenService.getEntityName());
        setPeriodName(tokenService.getPeriodName());
        setEntityID(tokenService.getEntityID());
    }, []);

    const logoutEntity = () => {
        swal({
            title: "Are you sure?",
            text: "You will be logged out of this entity.",
            icon: "warning",
            buttons: ["Cancel", "Yes, Logout"],
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                tokenService.removeEntity();
                toast.success("Entity Logout successfully!");
                navigate("/dashboard");
            }
        });
    }

    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const allItems = [
        { id: 1, name: "Entity Reports", type: "file" },
        { id: 2, name: "Audit Checklist", type: "file" },
        { id: 3, name: "Balance Sheet", type: "file" },
        { id: 4, name: "Client Details", type: "file" },
        { id: 5, name: "Financial Reports", type: "file" },

    ];

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredItems(
            allItems.filter((item) =>
                item.name.toLowerCase().includes(term.toLowerCase())
            )
        );
    };


    const getIcon = (type) => {
        // if (type === "folder") return <Folder size={20} className="me-2 text-warning" />; 
        if (type === "file") return <FileText size={16} className="me-2 theme-text2" />;
        return null;
    };


    return (
        <div className="top-header header-theme ">
            <Navbar expand="lg" className="p-0  header-theme " >
                <Container fluid className="d-flex align-items-left position-relative">
                    {/* Centered Text - ABC Limited */}
                    <div className="entity-body">
                        <div className="entity-title "> <Building size={18} className="opacity-9 me-1" /> {companyName} -- {PeriodName} </div>
                        {/* <div className="text-right"> </div> */}
                    </div>

                    {/* Right-Aligned Elements (Search, Notifications, Profile) */}
                    <div className="d-flex align-items-center ms-auto">
                        {/* Search Box */}

                        <span
                            data-tooltip-id="logout-tip"
                            data-tooltip-content="Entity Logout"
                            className="mx-2 just_link white-text"
                        >
                            <LogOutIcon size={22} onClick={logoutEntity} />
                        </span>

                        <Tooltip id="logout-tip" place="bottom" className="modern-tooltip"  />

                        <span
                            data-tooltip-id="search"
                            data-tooltip-content="Search"
                            className="mx-2 just_link white-text"
                        >

                        <Search size={22} className=" white-text" onClick={() => setShow(true)} style={{ cursor: "pointer" }} />
                        </span>
                        <Tooltip id="search" place="bottom" className="modern-tooltip" />


                        <Modal show={show} onHide={() => setShow(false)} centered size=" ">
                            <Modal.Header closeButton>
                                <Modal.Title>Search</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="text"
                                    placeholder="Type to search..."
                                    className="form-control mb-3 no-focus search-sticky"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    autoFocus
                                />

                                <div className="navigation-search">

                                    <ul className="p-0">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item) => (

                                                <li
                                                    key={item.id}
                                                    className="d-flex align-items-center px-3 py-2 rounded hover-shadow mb-2"
                                                    style={{
                                                        background: "#f8f9fa",
                                                        cursor: "pointer",
                                                        transition: "0.2s",
                                                    }}
                                                    onClick={() => alert(`Clicked: ${item.name}`)}
                                                >
                                                    {getIcon(item.type)}
                                                    <span>{item.name}</span>
                                                </li>

                                            ))
                                        ) : (
                                            <div className="text-muted text-center  px-3 py-2 rounded" style={{
                                                background: "#f8f9fa",
                                                cursor: "pointer",
                                                transition: "0.2s",
                                            }}>No results found</div>
                                        )}
                                    </ul>
                                </div>
                            </Modal.Body>

                        </Modal>

                        {/* Notification Dropdown */}
                        <div className="dropdown dropup mx-2 notification-dropdown ">
                            <span className="d-flex align-items-center"  role="button">
                                <Bell size={22} className="white-text" />
                            </span>
                            <ul className="dropdown-menu shadow-sm mt-0 ">
                                <li className="dropdown-header fw-bold py-0 px-2 text-center">Notifications</li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><span className="dropdown-item">✅ Audit checklist updated</span></li>
                                <li><span className="dropdown-item">📁 Files uploaded successfully</span></li>
                                <li><span className="dropdown-item">🔔 New client added</span></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a href="/notifications" className="dropdown-item text-center">
                                        View all notifications
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="organization-name  ms-5">  {auth.organisation_name ? auth.organisation_name : ""} </div>

                        {/* User Profile Dropdown */}
                        <div
                            className="position-relative ms-auto"
                            onMouseEnter={() => setShowProfileDropdown(true)}
                            onMouseLeave={() => setShowProfileDropdown(false)}
                        >
                            <img
                                src={userProfile}
                                alt="User Profile"
                                height="35"
                                className="rounded-circle"
                                style={{ cursor: "pointer" }}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevents infinite loop
                                    e.target.src = "https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"; // fallback user icon
                                }}
                            />
                            {showProfileDropdown &&
                                createPortal(
                                    <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="dropdown-menu show shadow border-0 p-2"
                                            style={{
                                                position: "absolute",
                                                top: 35,
                                                right: 20,
                                                backgroundColor: "white",
                                                borderRadius: "8px",
                                                zIndex: 9999,
                                            }}
                                        >
                                            <Dropdown.Item href="/profile">
                                                <User size={16} className="me-2" /> Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/settings">
                                                <Settings size={16} className="me-2" /> Settings
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={logout}>
                                                <LogOut size={16} className="me-2" /> Logout
                                            </Dropdown.Item>
                                        </motion.div>
                                    </AnimatePresence>,
                                    document.body
                                )}
                        </div>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}
