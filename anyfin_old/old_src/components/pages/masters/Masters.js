

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
 import { IconHome, IconPencil, IconTrash, IconRefresh } from '@tabler/icons-react';
 import { useForm } from "react-hook-form";

// import { useAuth } from '../../../context/AuthProvider';
import '../../../css/custom_style.css';
import 'jspdf-autotable';
 
  


const Masters = () => {
 
  

    return (

        <div className="">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Masters List </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Masters List ABC  </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">

 

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th width=""> Page Name </th>
                                        <th width=""> Url </th>
                                     </tr>


                                </thead>
                                <tbody>
                                   
                                </tbody>



                            </table>
                        </div>


                        <div className="d-flex justify-content-between">

                             
                        </div>
                    </div>
                </div>
            </div>
 

        </div>
    );
};

export default Masters;



