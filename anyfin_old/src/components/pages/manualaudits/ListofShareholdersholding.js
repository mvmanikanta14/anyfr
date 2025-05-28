
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
import apiUrlsService from "../../../services/apiUrls.service";
import commonService from "../../../services/common.service";
import { ApiContext } from "../../../ApiProvider";
import { useForm } from "react-hook-form";


const ListofShareholdersholding = () => {
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState("Add");
    const [ids, setId] = useState("");
    const [Show, setShow] = useState(false);
    const [ListofShareholderAdd, setListofShareholderAdd] = useState([]);


    useEffect(() => {
        getAllShareFormReconciliation();

    }, []);
    const { auth } = useContext(ApiContext);




    const getAllShareFormReconciliation = () => {
        commonService.getAll(apiUrlsService.getAllShareHolding)
            .then((response) => {
                console.log("Raw API Response:", response);

                if (response && response.data && Array.isArray(response.data)) {
                    setTableData(response.data);

                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
                setTableData([]);
            });
    };



    const onSubmit = (data) => {
        const requestData = {
            name_of_shareholder: data.name_of_shareholder || "",
            previous_year: "31-03-24",
            previous_year_amt: String(data.previous_year_amt ?? 0),  // Convert to string
            previous_year_percentage: String(data.previous_year_percentage ?? 0),
            current_year: "31-03-25",
            current_year_amt: String(data.current_year_amt ?? 0),
            current_year_percentage: String(data.current_year_percentage ?? 0),
            entity_id: 1,
            created_by: auth.login_id,
        };

        console.log("Submitting Data:", JSON.stringify(requestData, null, 2));

        if (!ids) {
            commonService.add(apiUrlsService.addShareHolding, requestData)
                .then((res) => {
                    console.log("API Response:", res);

                    if (res && (res.success || res.status === 200)) {
                        setListofShareholderAdd([...ListofShareholderAdd, res.data]);
                        swal("Success", "Added successfully!", "success");
                        handleClose();
                        getAllShareFormReconciliation();
                        reset();
                    } else {
                        console.error("API Error:", res);
                        swal("Error", res.message || "Failed to add shareholder.", "error");
                    }
                })
                .catch((error) => {
                    console.error("API call failed:", error);
                    swal("Error", "API request failed. Please try again.", "error");
                });

        }
    };




    const updateShareReconciliation = (id, updatedData) => {
        if (!id) {
            console.error("Invalid ID detected in update function:", id);
            return;
        }

        const requestData = {
            entity_id: updatedData.entity_id || 1,
            created_by: auth.login_id,
            //   current_year_shares: updatedData.current_year_shares || 0,
            current_year_amt: updatedData.current_year_amt || "0.00",
            current_year_percentage: updatedData.current_year_percentage || "0.00"
        };

        console.log(`Sending API request to: ${apiUrlsService.editShareHolding}/${id}`, requestData);

        commonService.update(`${apiUrlsService.editShareHolding}/${id}`, requestData)
            .then(response => {
                if (response && response.success) {
                    console.log("Update Successful:", response);
                    swal("Updated!", "Data has been successfully updated.", "success");
                } else {
                    console.error("Update Failed:", response);
                    swal("Updated!", "Data has been successfully updated.", "success");

                }
            })
            .catch(error => {
                console.error("API call failed: ", error);
                swal("Error", "Failed to update data.", "error");
            });
    };




    const handleInputChange = (id, field, value) => {
        console.log(`Updating ID: ${id}, Field: ${field}, New Value: ${value}`);

        if (!id) {
            console.error("Invalid ID detected:", id);
            swal("Error", "Invalid record ID, cannot update.", "error");
            return;
        }

        setTableData(prevData =>
            prevData.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    updateShareReconciliation(id, updatedItem); // Call API immediately
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });








    const handleClose = () => {
        setEditData(null);
        setId("");
        setShow(false)
    }



    const handleShow = () => {
        reset();
        setShow(true);
        setTitle("Add")
    }

    return (

        <div className=" ">
            <div className=" ">




                <div className="card">
                    <div className="card-body">

                        <div className="d-flex justify-content-between">

                            <h6> <b> Reconciliation of Share Capital at the beginning and end of the reporting period</b></h6>

                            <button
                                type="button"
                                className="ml-2 Addbutton text-right"
                                title="Add "
                                onClick={() => handleShow()}
                            >
                                ADD
                            </button>

                        </div>
                        <div className="table-responsive">
                            <table className="table-custom table-regular totals-subtotals">
                                <thead>
                                    <tr>
                                        <th width="5%" rowSpan={4}>S.No</th>
                                        <th width="45%" rowSpan={4}> Particulars </th>
                                        <th width="25%" className="text-center" colSpan={2}> For the Year ending  31-03-2024 </th>
                                        <th width="25%" className="text-center" colSpan={2}> For the Year ending 31-03-2023 </th>

                                    </tr>
                                    <tr>
                                        <th className="text-center" colSpan={1}> No.of Shares </th>
                                        <th className="text-center" colSpan={1}> % of Holding </th>


                                        <th className="text-center" colSpan={1}> No.of Shares </th>
                                        <th className="text-center" colSpan={1}> % of Holding </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData && tableData.length > 0 ? (
                                        tableData.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name_of_shareholder || "N/A"}</td>

                                                {/* Current Year Shares */}
                                                <td className="text-right">
                                                    <input
                                                        type="text"
                                                        value={item.current_year_amt || ""}
                                                        onChange={(e) => handleInputChange(item.id, "current_year_amt", e.target.value)}
                                                        className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none"
                                                        style={{ outline: "none", boxShadow: "none" }}
                                                    />
                                                </td>

                                                {/* Current Year Amount */}
                                                <td className="text-right">
                                                    <input
                                                        type="text"
                                                        value={item.current_year_percentage || ""}
                                                        onChange={(e) => handleInputChange(item.id, "current_year_percentage", e.target.value)}
                                                        className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none"
                                                        style={{ outline: "none", boxShadow: "none" }}
                                                    />
                                                </td>

                                                <td>{item.previous_year_amt || "N/A"} </td>
                                                <td>{item.previous_year_shares || "N/A"} </td>
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
            </div>

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleClose}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Add</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-6 text-left mt-1 ">
                                            <label className="">
                                                Particulars{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("name_of_shareholder", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.name_of_shareholder : ""} // Set initial value based on editData
                                            />
                                            {errors.name_of_shareholder && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>


                                        <div className="col-md-12 text-right">

                                            <button type="submit" className=" mt-1 text-white accordianbutton">
                                                {title}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        </div>




    );
};

export default ListofShareholdersholding;