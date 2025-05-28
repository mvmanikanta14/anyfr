
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
import Headergreen from "../../Headergreen";


const Balancesheet = () => {


    return (

        <div className=" ">
            <div className=" ">
                <Headergreen/>

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title">Balance Sheet  </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Balance Sheet  </li>
                        </ul>
                    </div>
                </div>


                <div className="card">
                    <div className="card-body">

                     <BalancesheetBody/>
                      
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Balancesheet;