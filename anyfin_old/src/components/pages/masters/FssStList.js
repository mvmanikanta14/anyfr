

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




const FssStList = () => {



    return (

        <div className="">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> FSS List </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> Masters List  </li>
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
                                    </tr>


                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>  <Link to={"/fssTrialbalance"}>Fss Trialbalance </Link></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td> <Link to={"/fssTrialbalanceCoa"}>Fss Trialbalance COA</Link></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td> <Link to={"/Fssstatement"}>Fss Statement</Link></td>
                                    </tr>

                                    <tr>
                                        <td>4</td>
                                        <td> <Link to={"/Fssstatementlocwise"}>Fss Statement loc wise</Link></td>
                                    </tr>

                                    <tr>
                                        <td>5</td>
                                        <td> <Link to={"/FSSCashflowSt"}>FSS Cash flow St</Link></td>
                                    </tr>

                                    <tr>
                                        <td>6</td>
                                        <td> <Link to={"/FssRatios"}>FssvRatios</Link></td>
                                    </tr>

                                    <tr>
                                        <td>7</td>
                                        <td> <Link to={"/PrintFssSt"}>Print Fss St</Link></td>
                                    </tr>

                                    <tr>
                                        <td>8</td>
                                        <td> <Link to={"/YeartoDateFSS"}>Year to Date FSS</Link></td>
                                    </tr>

                                    <tr>
                                        <td>9</td>
                                        <td> <Link to={"/FSSCashofAcc"}>FSS Cash of Acc</Link></td>
                                    </tr>
                                    

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

export default FssStList;



