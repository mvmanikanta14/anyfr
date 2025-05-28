import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Form, InputGroup, FormControl, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar-react/dist/simplebar.min.css";
import "../index.css";
import { createPortal } from "react-dom";
import { Settings, User, LogOut, Bell, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "react-feather";
import tokenService from "../services/token.service";
import { ApiContext } from "../services/ApiProvider";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const [userProfile, setProfileImage] = useState("%PUBLIC_URL%/logo.jpg"); // Default profile image
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [hovering, setHovering] = useState(false);
    const { auth } = useContext(ApiContext);

    const notifications = [
        { id: 1, message: 'New client added to your portfolio' },
        { id: 2, message: 'Audit file approved by reviewer' },
        { id: 3, message: 'Reminder: Team meeting at 5:00 PM' },
    ];


    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsSticky(scrollTop > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [companyId, setCompanyId] = useState("");
    const [companyName, setCompanyName] = useState("");


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
    const navigate = useNavigate();

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


      const logout = () => {
            tokenService.removeUser();
            navigate('/login');
            window.location.reload();
    
    
        }

    return (
        <div className="top-header header-theme ">
            <Navbar expand="lg" className="p-0  ">
                <Container fluid className="d-flex align-items-center position-relative">
                    {/* Centered Text - ABC Limited */}
                    <div className="assignment-title position-absolute">
                        {/* <span>E_ID_{companyId} - E_Name_{companyName}</span> */}
                    </div>

                    {/* Right-Aligned Elements (Search, Notifications, Profile) */}
                    <div className="d-flex align-items-center ms-auto">
                        {/* Search Box */}

                        <Search size={22} className="mx-2 white-text" onClick={() => setShow(true)} style={{ cursor: "pointer" }} />

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
                        <div className="dropdown dropup mx-3 notification-dropdown ">
                            <span className="d-flex align-items-center" role="button">
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
                                    <a href="/notifications" className="dropdown-item theme-text text-center">
                                        View all notifications
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="organization-name">  {auth.organisation_name ? auth.organisation_name : ""} </div>

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
                                                right: 10,
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
                                                <LogOut   size={16} className="me-2" /> Logout
                                            </Dropdown.Item>
                                        </motion.div>
                                    </AnimatePresence>,
                                    document.body
                                )}
                        </div>
                    </div>
                </Container>
            </Navbar>
        </div >
    );
};
