
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import BalancesheetBody from "./BalancesheetBody";
import CashFlowStatement from "./CashFlowStatement";
import FssNotes from "./FssNotes";


const FssStatements1 = () => {


    const [activeTab, setActiveTab] = useState('Financial Statements');

    const tabs = ['Financial Statements', 'FCDE', 'Polices', 'Notes' ];


    return (

        <div className=" ">
        <div className=" ">
  
          <div className="bread_crumb">
            <div className=" ">
              <h3 className="header-title">  Fss Prints </h3>
            </div>
  
            <div>
              <ul>
                <li className="active"> <a href="">  <IconHome />  </a> </li>
                <li>  Fss Prints </li>
                <li> {activeTab} </li>
  
              </ul>
            </div>
          </div>
  
  
          <div className="card">
  
            <div className="custom_tabs_list">
              <div>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
  
  
            <div className="card-body">
              {activeTab === 'Financial Statements' && (
  
                <FssNotes />
  
              )}

               {activeTab === 'FCDE' && (
  
                <CashFlowStatement />
  
              )}
              
  
   
            </div>
          </div>
        </div>
  
  
      </div>
    );
};

export default FssStatements1;