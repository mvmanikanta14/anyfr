import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import swal from "sweetalert";
import { IconHome } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import "../../../css/custom_style.css";
import "jspdf-autotable";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";


const ListofSamplesChecklist = () => {

    const [smapleChecklist, setSampleChecklist] = useState();
    const [header, setHeader] = useState();

    useEffect(() => {
        getAllSampleChecklist();

    }, []);

    const getAllSampleChecklist = () => {


        commonService.getAll(apiUrlsService.getAllSampleChecklist).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data.checklist_subjects)
                    setSampleChecklist(response.data.checklist_subjects);
                    setHeader(response.data.header);
                    // setTotalElements(response.data.prefil.sql_records_count_new);
                    // setSearchResults(response.data.prefil.search_username);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };


    return (
        <div className="container col-md-12">
            <div className="bread_crumb my-3">
                <div>
                    <h3 className="header-title"> List of Samples
                    </h3>
                </div>
                <div>
                    <ul>
                        <li className="active">
                            <Link to="">
                                <IconHome />
                            </Link>
                        </li>
                        <li> List of Samples
                        </li>
                    </ul>
                </div>
            </div>

            {/* <div className="card">

                <div className="card-body">
                    {Array.isArray(header) && header.map((item, index) => (
                        <div key={index}>{item.scheduler_id}</div>
                    ))}
                </div>
            </div> */}


            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <form className="text-right formtext p-0 mr-0">
                            <div className="row">
                                <div className="col-md-6">
                                    {/* <label className="mb-0">
                                    Show&nbsp;
                                    <select
                                        className="form-control d-inline w-auto"
                                        value={records}
                                        onChange={handleRecordsChange}
                                    >
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    &nbsp; entries
                                </label> */}
                                </div>
                                <div className="col-md-6">

                                    <button
                                        type="button"
                                        className="btn-sm Addhead mr-1"
                                        title="Add "
                                    // onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button>


                                </div>

                            </div>
                        </form>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover table_custom_1">
                            <thead>
                                <tr className="border-btm-0">
                                    <th width="5%">S.No</th>
                                    <th>Population	</th>
                                    <th>Sample</th>
                                    <th>As a Maker	</th>
                                    <th>As a Checker</th>
                                </tr>
                            </thead>

                            <tbody>
                                {smapleChecklist && smapleChecklist.length > 0 ? (
                                    smapleChecklist.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>  <Link className="btn-primary-outlined" to={`/ChecklistSubjectAnswersValues/${item.id}?sampleName=${encodeURIComponent(item.element_name)}`} title="">
                                                {item.element_name}</Link> </td>
                                            <td>{item.subject_name || "—"}</td>
                                            <td>{item.maker}</td>
                                            <td>{item.checker}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>


                        </table>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ListofSamplesChecklist;
