

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalculatorIcon, LayoutDashboardIcon, Network, Upload, Layers, NotebookPenIcon, MonitorCogIcon, List, Settings2 } from "lucide-react";
import { Tooltip } from 'react-tooltip';

function EntitySideIconsmenu() {
  const location = useLocation();

 

  const menuItems = [
    { href: "/entitydashboard", icon: <LayoutDashboardIcon size={21} />, label: "Dashboard" },
    { href: "/data", icon: <Upload size={21} />, label: "Data" },   
    { href: "/jvs/", icon: <CalculatorIcon size={21} />, label: "Jvs" },
    { href: "/sds/", icon: <NotebookPenIcon size={21} />, label: "SDs" },
    { href: "/fr", icon: <Layers size={21} />, label: "FR" },
    { href: "/module", icon: <MonitorCogIcon size={21} />, label: "Modules" },
    { href: "/settings", icon: <Settings2 size={21} />, label: "Settings" },
  ];

  return (
    <div className="vh-100">
      <ul className="nav flex-column side-icon-menu">
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.href); // ✅ INSIDE map()

          return (
            <li key={index} className="nav-item">
              <Link
                to={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {item.icon}
              </Link>
              <label className={isActive ? " fw-bold" : ""}>
                {item.label} 
              </label>
            </li>
          );
        })}
      </ul>


    </div>
  );
}

export default EntitySideIconsmenu;
