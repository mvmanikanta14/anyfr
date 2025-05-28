import React, { useEffect, useState } from "react";
import "../../../css/custom_style.css";
import "jspdf-autotable";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import handleApiError from "../../utils/apiErrorHandler";


const PreviousAssignmentFindings = () => {

    const [PreviousAssignmentFindings, setPreviousAssignmentFindings] = useState();

    useEffect(() => {
        getAllPreviousAssignmentFindings();

    }, []);

    const getAllPreviousAssignmentFindings = () => {

        commonService.getAll(apiUrlsService.getAllPreviousAssignmentFindings).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setPreviousAssignmentFindings(response.data);

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };



    return (

        <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table_custom_1">
                <thead>
                    <tr>
                        <th width="5%">S.No</th>
                        <th>Maker Name</th>
                        <th>Observation Date   </th>
                        <th> Location Name  </th>
                        <th> Memo Code  </th>
                        <th> Memo Description  </th>
                        <th>  Status Finalisation Name </th>
                        {/* <th width="10%">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {PreviousAssignmentFindings?.map((finding, index) => (
                        <tr key={finding.memo_id}>
                            <td>{index + 1}</td>
                            <td>{finding.maker_name}</td>
                            <td>{finding.observation_date}</td>
                            <td>{finding.location_name}</td>
                            <td>{finding.memo_code}</td>
                            <td>{finding.memo_description}</td>
                            <td>{finding.status_finalisation_name}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

    );
};

export default PreviousAssignmentFindings;
