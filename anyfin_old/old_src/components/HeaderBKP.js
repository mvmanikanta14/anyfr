import React, { useEffect, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IconBellRinging, IconListSearch, IconChevronRight, IconUserEdit, IconPassword, IconSettings, IconLogout, IconUserSquareRounded } from '@tabler/icons-react';
import "../assets/css/custom_style.css";
import tokenService from "../services/token.service";
import { useAuth } from "./context/AuthProvider";


const routes = [
  { name: "Business Entities", path: "/businessEntities" },
  { name: "Entities Profile", path: "/EntitiesProfile1" },
  { name: "Assets", path: "/assets" },
  { name: "Individual", path: "/individual" },
  { name: "Liability", path: "/liability" },
  { name: "Common Attachments", path: "/CommonAttachments" },
  { name: "Parent Component", path: "/ParentComponent" },
  { name: "Client", path: "/client" },
  { name: "Assignment", path: "/assignment" },
  { name: "Users", path: "/users" },
  { name: "Business Names", path: "/businessNames" },
  { name: "Business Locations", path: "/businessLocations" },
  { name: "Banks", path: "/banks" },
  // Add all other routes here
];

const Header = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [Searchblue, setSearchblue] = useState(false);
  const navigate = useNavigate();

  const handleCloseSearchblue = () => {
    setSearchblue(false);
    setSearchQuery("");
  };
  const { auth } = useAuth();


  const handleSearchblue = () => setSearchblue(true);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoutes(
      routes.filter((route) => route.name.toLowerCase().includes(query))
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSearchblue(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setSearchblue(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const logout = () => {
    tokenService.removeUser();
    navigate('/login');
    window.location.reload();


  }

  const options = [
    {
      label: (
        <Link className="links-links " to={"/Change_Profile"}>
          {" "}
          <IconUserEdit className="profile-dropdown" /> &nbsp; Change Profile{" "}
        </Link>
      ),
      value: "Change Profile",
    },
    {
      label: (
        <Link className="links-links" to={"/Change_Password"}>
          <IconPassword className="profile-dropdown" />&nbsp;
          Change Password{" "}
        </Link>
      ),
      value: "anotherAction",
    },
    {
      label: (
        <Link className="links-links" to={"/Domainlogo"}>
          {" "}
          <IconSettings className="profile-dropdown" />&nbsp;
          Domain logo{" "}
        </Link>
      ),
      value: "somethingElse",
    },

    {
      label: (
        <Link className="links-links" onClick={logout}>
          <IconLogout className="profile-dropdown" />&nbsp;
          Logout{" "}
        </Link>
      ),
      value: "somethingElse",
    },
  ];

  const handleSelect = (selectedValue) => {
    // Do something with the selected option value (optional)
    console.log("Selected Option:", selectedValue);
  };

  return (
    <>
      <div className="header">
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="notify">
              <Link to={"/PendingAsMaker"}>
                <IconBellRinging className="header-icon" />
              </Link>
              <span className="count"> 15 </span>
              <IconListSearch className="header-icon" onClick={handleSearchblue} />
              <Modal
                {...props}
                size="mx"
                aria-labelledby="contained-modal-title-vcenter"
                className="modalcustomise"
                centered
                show={Searchblue}
                onHide={handleCloseSearchblue}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton className="border-0">
                  <Modal.Title id="contained-modal-title-vcenter">
                    Menu Search
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                  <div className="p-0 border modalstart">
                    <form className="formtext modalform">
                      <div className="container">
                        <div className="row pt-1 mt-1">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="header-input-inside-search text-control mt-2"
                            placeholder="What are you searching for?"
                          />
                        </div>
                      </div>
                    </form>
                    <div className="search-results mt-3">
                      <ul className="search-list">
                        {filteredRoutes.length > 0 ? (
                          filteredRoutes.map((route) => (
                            <li key={route.path}>
                              <button
                                className="btn btn-link"
                                onClick={() => handleNavigation(route.path)}
                              >
                                {route.name}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li>No results found</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div className=" company_name">
              {auth.name}

            </div>
            <div className="profile-logo">
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <IconUserSquareRounded />
                </Dropdown.Toggle>
                <Dropdown.Menu className="profile-dropdown-style" alignRight>
                  {options.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      eventKey={option.value}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
