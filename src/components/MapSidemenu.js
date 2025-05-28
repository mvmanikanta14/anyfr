import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Dropdown icons
import { Link } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";


function MapSidemenu({ isSidebarVisible }) {
  const [isMenu1Open, setIsMenu1Open] = useState(true);
  const [isMenu2Open, setIsMenu2Open] = useState(true);
  const [isMenu3Open, setIsMenu3Open] = useState(true);

  const toggleMenu1 = () => setIsMenu1Open(!isMenu1Open);
  const toggleMenu2 = () => setIsMenu2Open(!isMenu2Open);
  const toggleMenu3 = () => setIsMenu3Open(!isMenu3Open);


  const renderDropdownIcon = (isOpen) => {
    return isOpen ? <FiChevronUp className="dropdown-icon" /> : <FiChevronDown className="dropdown-icon" />;
  };

  const [Sidemenu, setSidemenu] = useState([]); // Stores API data
  const [mapModule, setMapModule] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    getAllmapmenu();
  }, []);



  const getAllmapmenu = () => {
    commonService.getAll(apiUrlsService.getAlluploadingmenu)
      .then((response) => {
        const allModules = response?.data || [];

        const Map = allModules.find(
          (moduleItem) => moduleItem.module === "Map"
        );

        if (Map) {
          setMapModule(Map);
          setModuleName(Map.module);
        } else {
          swal("Map module not found");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
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
        <b> {moduleName} </b>
      </div>

      <div className="sidebar-menu-content">
        {mapModule ? (
          <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
            {mapModule.sections
              .filter((section) => section.enabled === "yes")
              .map((section, index) => (
                <li className="textmenu-item" key={index}>
                  {section.title === "chart-of-accounts" ? (
                    <Link to="/map/Fssmap">{section.title}</Link> 
                  ) : (
                    <Link to={`/map/${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {section.title}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
}

export default MapSidemenu;
