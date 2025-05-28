import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
 



const CoaGLView = () => {
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageNo] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page



    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };


    return (
        <div className="">



            <div className="table-responsive">

                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th>S.No2</th>
                            {/* <th> node code</th> */}
                            <th> Name</th>
                            <th> Custom Name</th>
                            {/* <th >GL Code</th> */}
                        </tr>
                    </thead>


                    <tbody>
                        {/* {Array.isArray(FssParamMap) && FssParamMap.length > 0 ? (
                            renderRows(FssParamMap) // Render the hierarchical data
                        ) : (
                            <tr>
                                <td colSpan="2">No data found</td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between custom-pagination">
                <div class="show-records">
                    <span>
                        Showing {(pageno - 1) * records + 1} to{" "}
                        {totalElements < pageno * records ? totalElements : pageno * records} of {totalElements} entries
                    </span>
                </div>
                <div>
                    <Pagination
                        totalElements={totalElements}
                        recordsPerPage={records}
                        pageNumber={pageno}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>


        </div>
    );
};

export default CoaGLView;
