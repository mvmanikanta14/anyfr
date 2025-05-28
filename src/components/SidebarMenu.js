import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Dropdown icons
import { Link } from "react-router-dom";

function SidebarMenu({ isSidebarVisible }) {
  const [isMenu1Open, setIsMenu1Open] = useState(true);
  const [isMenu2Open, setIsMenu2Open] = useState(true);
  const [isMenu3Open, setIsMenu3Open] = useState(true);

  const toggleMenu1 = () => setIsMenu1Open(!isMenu1Open);
  const toggleMenu2 = () => setIsMenu2Open(!isMenu2Open);
  const toggleMenu3 = () => setIsMenu3Open(!isMenu3Open);

  const renderDropdownIcon = (isOpen) => {
    return isOpen ? <FiChevronUp className="dropdown-icon" /> : <FiChevronDown className="dropdown-icon" />;
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
        <b>Financial Statements</b>
      </div>

      <div className="sidebar-menu-content">
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li onClick={toggleMenu1} className="textmenu-item">
            <div className="textmenu-item-content">
              <span className="menu-item-head"> Menu Item 1 </span>
              {renderDropdownIcon(isMenu1Open)}
            </div>
          </li>
          {isMenu1Open && (
            <div className="textmenu-submenu">
              <ul>
                <li> <Link to="/entityClient"> Entity  </Link> </li>
                <li> <Link to="/reportingPeriod"> Reporting Period </Link> </li>
                <li> <Link to="/modulesPurchased"> Modules Purchased </Link> </li>
              </ul>
            </div>
          )}

          <li onClick={toggleMenu2} className="textmenu-item">
            <div className="textmenu-item-content">
              <span>Menu Item 2</span>
              {renderDropdownIcon(isMenu2Open)}
            </div>
          </li>
          {isMenu2Open && (
            <div className="textmenu-submenu">
              <ul>
                <li>Submenu Item 2.1</li>
                <li>Submenu Item 2.2</li>
              </ul>
            </div>
          )}

          <li onClick={toggleMenu3} className="textmenu-item">
            <div className="textmenu-item-content">
              <span>Menu Item 3</span>
              {renderDropdownIcon(isMenu3Open)}
            </div>
          </li>
          {isMenu3Open && (
            <div className="textmenu-submenu">
              <ul>
                <li>Submenu Item 3.1</li>
                <li>Submenu Item 3.2</li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SidebarMenu;
