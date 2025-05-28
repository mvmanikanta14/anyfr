import React, { useEffect, useRef, useState } from "react";
import { Container, Dropdown, Nav, Table } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import {
    Home,
    Grid,
    ShoppingCart,
    MessageSquare,
    Users,
    Folder,
    Bookmark,
    File,
    Briefcase,
    List,
    Search,
    FileText,
    Settings,
    LifeBuoy,
    PieChart,
    HelpCircle,
    Map,
    Book,
    BarChart,
    BookOpen,
    CheckSquare,
    Clipboard,
} from "react-feather";
import { ArrowLeftRight, Binoculars, Calculator, CalculatorIcon, Calendar, ChevronLeft, ChevronRight, FileSearch, Landmark, MountainSnowIcon, Network, NotebookPenIcon, Percent, ReceiptIndianRupee, Scale, Table2, Table2Icon, Upload } from "lucide-react";
import SimpleBar from "simplebar-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

function HeaderMenu() {

     
    const location = useLocation();

    const menuRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    let timeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
            }
        };

        if (menuRef.current) {
            menuRef.current.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            if (menuRef.current) {
                menuRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    // Enable scrolling using touchpad or mouse
    useEffect(() => {
        const handleWheelScroll = (event) => {
            if (menuRef.current && event.deltaY === 0) {
                menuRef.current.scrollBy({ left: event.deltaX * 2, behavior: "smooth" });
            }
        };

        const menuElement = menuRef.current;
        if (menuElement) {
            menuElement.addEventListener("wheel", handleWheelScroll);
        }

        return () => {
            if (menuElement) {
                menuElement.removeEventListener("wheel", handleWheelScroll);
            }
        };
    }, []);

    const scrollMenu = (direction) => {
        if (menuRef.current) {
            const scrollAmount = 500;
            menuRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    const handleMouseEnter = (event, menu) => {
        clearTimeout(timeoutRef.current);
        const rect = event.target.getBoundingClientRect();
        setActiveDropdown(menu);
        setDropdownPosition({
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

    return (
        <div>
            <div className=" shadow-sm position-relative menu-theme" style={{ zIndex: 1030 }}>
                <Container fluid>
                    {showLeftArrow && (
                        <button
                            className="btn btn-light position-absolute start-0 top-50 translate-middle-y px-2 shadow"
                            onClick={() => scrollMenu("left")}
                            style={{ zIndex: 10 }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    <div style={{ position: 'relative' }}>
                        <SimpleBar style={{ maxWidth: "100%", position: 'relative' }}>
                            <div
                                ref={menuRef}
                                style={{
                                    overflowX: "auto",
                                    whiteSpace: "nowrap",
                                    maxWidth: "100%",
                                    padding: "2px 40px 2px 20px",  // Adjust left padding
                                    scrollbarWidth: "none",
                                    display: "flex",
                                    gap: "10px",
                                    position: 'relative',
                                }}
                            >
                                <Nav className="justify-content-start flex-nowrap horizontal-bar">
                                    {/* 1. Dashboard */}
                                    <Nav.Item>
                                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Home size={16} /> Dashboard
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 2. Upload Data */}
                                    <div
                                        className="position-relative"
                                        onMouseEnter={(e) => handleMouseEnter(e, "uploaddata")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Nav.Item>
                                            <NavLink
                                                to="/uploaddata"
                                                className={({ isActive }) =>
                                                    isActive || window.location.pathname.startsWith("/daybook") ? "nav-link active" : "nav-link"
                                                }
                                            >
                                                <Upload size={16} /> Upload Data
                                            </NavLink>
                                        </Nav.Item>
                                    </div>

                                    {/* 3. Chart of Accounts */}
                                    <Nav.Item>
                                        <NavLink to="/chart-of-accounts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Network size={16} /> Chart of Accounts
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 4. Calculators */}
                                    <div
                                        className="position-relative"
                                        onMouseEnter={(e) => handleMouseEnter(e, "calculators")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Nav.Item>
                                            <NavLink
                                                to="/calculators"
                                                className={({ isActive }) =>
                                                    isActive || window.location.pathname.startsWith("/calculators") ? "nav-link active" : "nav-link"
                                                }
                                            >
                                                <CalculatorIcon size={16} /> Calculators
                                            </NavLink>
                                        </Nav.Item>
                                    </div>

                                    {/* 5. Balance Sheet */}
                                    <Nav.Item>
                                        <NavLink to="/balance-sheet" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Scale size={16} /> Balance Sheet
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 6. Profit and Loss */}
                                    <Nav.Item>
                                        <NavLink to="/profit-and-loss" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <ReceiptIndianRupee size={16} /> Profit and Loss
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 7. Cash Flow */}
                                    <Nav.Item>
                                        <NavLink to="/cash-flow" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <ArrowLeftRight size={16} /> Cash Flow
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 8. Notes to Accounts */}
                                    <div
                                        className="position-relative"
                                        onMouseEnter={(e) => handleMouseEnter(e, "notes")}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Nav.Item>
                                            <NavLink
                                                to="/notes-to-accounts"
                                                className={({ isActive }) =>
                                                    isActive || window.location.pathname.startsWith("/schedule") ? "nav-link active" : "nav-link"
                                                }
                                            >
                                                <NotebookPenIcon size={16} /> Notes to Accounts
                                            </NavLink>
                                        </Nav.Item>
                                    </div>

                                    {/* 9. Ratios */}
                                    <Nav.Item>
                                        <NavLink to="/ratios" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Percent size={16} /> Ratios
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 10. Business Overview */}
                                    <Nav.Item>
                                        <NavLink to="/business-overview" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Binoculars size={16} /> Business Overview
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 11. Accounting Policies */}
                                    <Nav.Item>
                                        <NavLink to="/accounting-policies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <Landmark size={16} /> Accounting Policies
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 12. Director’s Report */}
                                    <Nav.Item>
                                        <NavLink to="/directors-report" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <img
                                                src={process.env.PUBLIC_URL + "/chair.png"}
                                                alt="Director icon"
                                                height="18"
                                                className="rounded-circle"
                                                style={{ cursor: "pointer" }}
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevents infinite loop
                                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/4236/4236615.png"; // fallback user icon
                                                }}
                                            />  Director's Report
                                        </NavLink>
                                    </Nav.Item>

                                    {/* 13. Finalization */}
                                    <Nav.Item>
                                        <NavLink to="/finalization" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <CheckSquare size={16} /> Finalization
                                        </NavLink>
                                    </Nav.Item>
                                </Nav>

                            </div>
                        </SimpleBar>
                    </div>

                    {showRightArrow && (
                        <button
                            className="btn btn-light position-absolute end-0 top-50 translate-middle-y px-2 shadow"
                            onClick={() => scrollMenu("right")}
                            style={{ zIndex: 10 }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}
                </Container>
            </div>

            {/* Dropdown Menu Rendered Outside SimpleBar */}

            {/* Dropdown Menu Rendered Outside SimpleBar */}
            {activeDropdown &&
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
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                minWidth: dropdownPosition.width,
                                backgroundColor: "white",
                                borderRadius: "8px",
                                zIndex: 9999,
                            }}
                            onMouseEnter={() => clearTimeout(timeoutRef.current)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {activeDropdown === "uploaddata" && (
                                <>
                                    <Dropdown.Item as={NavLink} to="/daybook">
                                        Daybook
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/trial-balance">
                                        Trial Balance
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/ledger">
                                        Ledger
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/others">
                                        Others
                                    </Dropdown.Item>
                                </>
                            )}
                            {activeDropdown === "calculators" && (
                                <>
                                    <Dropdown.Item as={NavLink} to="/calculators/income-tax">
                                        Income Tax
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/calculators/deferred-tax">
                                        Deferred Tax
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/calculators/share-capital">
                                        Share Capital
                                    </Dropdown.Item>
                                </>
                            )}

                            {activeDropdown === "notes" && (
                                <>
                                    <Dropdown.Item as={NavLink} to="/notes-to-accounts/schedule-1">
                                        Schedule 1
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/notes-to-accounts/schedule-2">
                                        Schedule 2
                                    </Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/notes-to-accounts/schedule-3">
                                        Schedule 3
                                    </Dropdown.Item>
                                </>
                            )}


                        </motion.div>
                    </AnimatePresence>,
                    document.body
                )}
        </div>
    );
}


export default HeaderMenu;
