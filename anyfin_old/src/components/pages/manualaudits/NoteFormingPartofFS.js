
import React, { useEffect, useContext, useState } from "react";
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


const NoteFormingPartofFS = () => {
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
        commonService.getAll(apiUrlsService.getAllPpeformbook)
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
            particular: data.particular || "",
            gb_year_st: String(data.gb_year_st ?? 0),  
            gb_addition: String(data.gb_addition ?? 0),
            gb_deletions: String(data.gb_deletions ?? 0),
            gb_acquisition: String(data.gb_acquisition ?? 0),
            gb_change_due: String(data.gb_change_due ?? 0),
            gb_year_end: String(data.gb_year_end ?? 0),
            ad_year_st: String(data.ad_year_st ?? 0),
            ad_year_value: String(data.ad_year_value ?? 0),
            ad_schedule: String(data.ad_schedule ?? 0),
            ad_deletions: String(data.ad_deletions ?? 0),
            ad_year_end: String(data.ad_year_end ?? 0),
            nt_year_end: String(data.nt_year_end ?? 0),
            nt_year_st: String(data.nt_year_st ?? 0),
            entity_id: 1,
            created_by: auth.login_id,
        };

        console.log("Submitting Data:", JSON.stringify(requestData, null, 2));

        if (!ids) {
            commonService.add(apiUrlsService.addPpeformbook, requestData)
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
        // if (!id) {
        //     console.error("Invalid ID detected in update function:", id);
        //     return;
        // }

        const requestData = {
            entity_id: updatedData.entity_id || 1,
            created_by: auth.login_id,
            gb_year_st: updatedData.gb_year_st || "0.00",
            gb_addition: updatedData.gb_addition || "0.00",
            gb_deletions: updatedData.gb_deletions || "0.00",
            gb_acquisition: updatedData.gb_acquisition || "0.00",
            gb_change_due: updatedData.gb_change_due || "0.00",
            gb_year_end: updatedData.gb_year_end || "0.00",
            ad_year_st: updatedData.ad_year_st || "0.00",
            ad_year_value: updatedData.ad_year_value || "0.00",
            ad_schedule: updatedData.ad_schedule || "0.00",
            ad_deletions: updatedData.ad_deletions || "0.00",
            ad_year_end: updatedData.ad_year_end || "0.00",
            nt_year_end: updatedData.nt_year_end || "0.00",
            nt_year_st: updatedData.nt_year_st || "0.00",
        };

        // console.log(`Sending API request to: ${apiUrlsService.editPpeformbook}/${id}`, requestData);

        commonService.update(`${apiUrlsService.editPpeformbook}/${id}`, requestData)
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
    
        // Update state without calling the API
        setTableData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };
    
    // Function to handle blur (mouse moves out of input)
    const handleInputBlur = (id) => {
        const updatedItem = tableData.find(item => item.id === id);
        if (!updatedItem) return;
    
        updateShareReconciliation(id, updatedItem); // Call API when input loses focus
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


        <div className="card">
            <div className="card-body">
                <h5 className="text-center"> <b> ABC Limited, CIN:U12345AP2024PTC123456</b><br />
                    <p className="text-center"> Notes forming Part of Financial Statements for the year ended 31 st March,2024</p></h5>

                <div className="d-flex justify-content-between">
                <h6> <b> Note 10 - Fixed Assets </b></h6> 
                        <button
                            type="button"
                            className="ml-2 Addbutton Addhead text-right"
                            title="Add "
                            onClick={() => handleShow()}
                        >
                            ADD
                        </button>

                </div>
                <div className="table-responsive">
                    <table className="table-custom  table-regular totals-subtotals">
                        <thead>
                            <tr>
                                <th width="60%" rowSpan={4}> Particulars </th>
                                <th className="text-center" colSpan={6}> Gross Block</th>
                                <th className="text-center" colSpan={5}> Accumulated Description</th>
                                <th className="text-center" colSpan={6}> Net Block</th>

                            </tr>
                            <tr>
                                <th width="20%" className="text-center" > 01-04-23 </th>
                                <th className="text-center">Additions </th>
                                <th className="text-center" >Deletions /<br /> Adjustments </th>
                                <th className="text-center" >Acquistions through <br /> Business Combinations </th>
                                <th className="text-center" >Changes due <br />to Revaluation </th>
                                <th className="text-center" > 31-03-24 </th>
                                <th className="text-center" > 1-Apr-23 </th>
                                <th className="text-center" > Current Year </th>
                                <th className="text-center" > Schedule II Adjustments</th>
                                <th className="text-center" >Adjustments / Deletions </th>
                                <th className="text-center" >31-03-24</th>
                                <th className="text-center" >31-03-24</th>
                                <th className="text-center" >31-03-23</th>

                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr key={item.id} >
                                    <td>{item.particular}</td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_year_st}
                                            onChange={(e) => handleInputChange(item.id, "gb_year_st", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_addition}
                                            onChange={(e) => handleInputChange(item.id, "gb_addition", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_deletions}
                                            onChange={(e) => handleInputChange(item.id, "gb_deletions", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_acquisition}
                                            onChange={(e) => handleInputChange(item.id, "gb_acquisition", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_change_due}
                                            onChange={(e) => handleInputChange(item.id, "gb_change_due", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.gb_year_end}
                                            onChange={(e) => handleInputChange(item.id, "gb_year_end", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.ad_year_st}
                                            onChange={(e) => handleInputChange(item.id, "ad_year_st", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>
                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.ad_year_value}
                                            onChange={(e) => handleInputChange(item.id, "ad_year_value", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.ad_schedule}
                                            onChange={(e) => handleInputChange(item.id, "ad_schedule", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.ad_deletions}
                                            onChange={(e) => handleInputChange(item.id, "ad_deletions", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.ad_year_end}
                                            onChange={(e) => handleInputChange(item.id, "ad_year_end", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.nt_year_end}
                                            onChange={(e) => handleInputChange(item.id, "nt_year_end", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>

                                    <td className="text-right">
                                        <input
                                            type="text"
                                            value={item.nt_year_st}
                                            onChange={(e) => handleInputChange(item.id, "nt_year_st", e.target.value)}
                                            onBlur={() => handleInputBlur(item.id)}
                                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none" style={{ outline: 'none', boxShadow: 'none', }}
                                        />
                                    </td>


                                    

                                    
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div >

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
                                                {...register("particular", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.particular : ""} // Set initial value based on editData
                                            />
                                            {errors.particular && (
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

        </div >
    );
};

export default NoteFormingPartofFS;