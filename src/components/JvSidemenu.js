import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import commonService from "../services/common.service";
import apiUrlsService from "../services/apiUrls.service";
import swal from "sweetalert";
import { Dot } from "lucide-react";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';


function JvSidemenu({ isSidebarVisible }) {
  const [isOpen, setIsOpen] = useState(true);
  const [jvModule, setJvModule] = useState(null);
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    getAllJvMenu(); // correct way to call
  }, []);

  const getAllJvMenu = () => {
    commonService.getAll(apiUrlsService.getAlluploadingmenu)
      .then((response) => {
        console.log("*VENKAT P******** API Response:", response);

        const allModules = response?.data || [];

        const jv = allModules.find(
          (moduleItem) => moduleItem.module?.toLowerCase() === "jvs"
        );

        if (jv) {
          setJvModule(jv);
          setModuleName(jv.module);
        } else {
          swal("JVs module not found");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
  };
  const location = useLocation();


  return (
    <div
      className="sidebar-textmenu"
      style={{
        transform: isSidebarVisible ? "translateX(0)" : "translateX(-250px)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="sidemenu-header heads-font border-bottom-light">
        <b>{moduleName}</b>
      </div>

      <SimpleBar  style={{ maxHeight: "calc(100vh - 100px)" }}>
        <div className="sidebar-menu-content">
          {jvModule ? (
            <ul style={{ listStyleType: "circle", paddingLeft: "0rem" }}>
              {jvModule.sections
                .filter((section) => section)
                .map((section, index) => {
                  const slug = section.title.toLowerCase().replace(/\s+/g, "-");
                  const fullPath = `/Jvs/${slug}`;
                  const isActive = location.pathname === fullPath;

                  return (
                    <li
                      className={`textmenu-item ${isActive ? "active" : ""}`}
                      key={index}
                    >
                      <Link to={fullPath}> <Dot size={20} /> {section.title}</Link>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </SimpleBar>
    </div>
  );
}

export default JvSidemenu;
