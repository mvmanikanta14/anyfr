import { CalculatorIcon, Home, MonitorCogIcon, Network, NotebookPenIcon, ToggleRightIcon, Upload } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function SideIconsmenu() {
  const location = useLocation(); // Get the current location
  const menuItems = [
    { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    // { href: "/", icon: <Upload size={20} />, label: "Upload" },
    { href: "/entityClient", icon: <Network size={20} />, label: "Entities" },
    // { href: "/Dummy2", icon: <CalculatorIcon size={20} />, label: "Dummy" },
    // { href: "/", icon: <NotebookPenIcon size={20} />, label: "Notes" },
    // { href: "/modulesPurchased", icon: <ToggleRightIcon size={20} />, label: "Toggle" },
    // { href: "/", icon: <MonitorCogIcon size={20} />, label: "Monitor" },
  ];

  return (
    <div className="vh-100">
      <ul className="nav flex-column side-icon-menu">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <li key={index} className="nav-item">
              <Link
                to={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                data-tooltip-id={item.label}
                data-tooltip-content={item.label}
              >
                {item.icon}
              </Link>
              <label> {item.label} </label>
              <Tooltip id={item.label} place="bottom" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideIconsmenu;
