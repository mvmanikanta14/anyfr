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


const PreviousAssignment = () => {

    const [PreviousAssignment, setPreviousAssignment] = useState();
    const [header, setHeader] = useState();

    useEffect(() => {
        getAllPreviousAssignment();

    }, []);

    const getAllPreviousAssignment = () => {


        commonService.getAll(apiUrlsService.getAllPreviousAssignment).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setPreviousAssignment(response.data);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };



    return (


        <div className="table-responsive card">
            <table className="table">
                <thead>
                    <tr className="border-btm-0">
                        <th width="5%">S.No</th>
                        <th>Description	</th>

                    </tr>
                </thead>

                <tbody>
                    {PreviousAssignment?.PreviousAssignment?.map((question, index) => (
                        <tr key={question.question_id}>
                            <td>{index + 1}</td>
                            <td>{question.answer_description}</td>
                        </tr>
                    ))}

                    
                </tbody>


            </table>
        </div>

    );
};

export default PreviousAssignment;
