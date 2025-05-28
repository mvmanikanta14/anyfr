import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import Pagination from "../../../PaginationCommon";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import { useForm } from "react-hook-form";
import { IconHome, IconPencil, IconTrash } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";
import Select from 'react-select';
import { ApiContext } from "../../../ApiProvider";
import handleApiError from "../../utils/apiErrorHandler";
import { toast } from "react-toastify";


const FssParamEntityVouchers = () => {
    const [FssParamEntityVouchers, setFssParamEntityVouchers] = useState([]);
    const [FssParamEntityVouchersAdd, setFssParamEntityVouchersAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [voucherTypes, setVoucherTypes] = useState([]);





    useEffect(() => {
        getAllFssParamEntityVouchers();
        getAllVoucherTypes();
    }, [pageno, records,]);


    // const { auth } = useAuth();



    const deleteFssParamEntityVouchers = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteFssParamEntityVouchers}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllFssParamEntityVouchers(); // Refresh the list
                } else {
                    toast.error("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


    const getAllVoucherTypes = () => {

        commonService.add(apiUrlsService.getFssMasterVoucherTypes).then(
            (response) => {
                if (response && response.data) {
                    const VoucherData = response.data.map(item => ({
                        value: item.id,
                        label: item.voucher_type_name
                    }));
                    console.log(' Data:', VoucherData); // Debugging line
                    setVoucherTypes(VoucherData);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });

    };

  

    const getAllFssParamEntityVouchers = () => {
        commonService.add(apiUrlsService.getFssParamEntityVouchers).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setFssParamEntityVouchers(response.data);
                    // setTotalElements(response.data.prefil.sql_records_count_new);
                    // setSearchResults(response.data.prefil.search_username);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };

    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    const handleRecordsChange = (event) => {
        setRecords(event.target.value);
        setPageNo(1); // Reset to first page
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



    const { auth } = useContext(ApiContext);



    const onSubmit = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            entity_id: 1,
            is_active: "true",
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssParamEntityVouchers, requestData)
                .then((res) => {
                    console.log("API Response (Add):", res); // Debugging

                    // Check if the API returns success in a non-standard format
                    if (res.success || (res.status >= 200 && res.status < 300)) {
                        setFssParamEntityVouchersAdd([...FssParamEntityVouchersAdd, res.data]);
                        toast.success("Added successfully!");
                        handleCloseShow();
                        getAllFssParamEntityVouchers();
                        reset();
                    } else {
                        throw new Error(res.message || "Unexpected response format");
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        } else {
            // EDIT Operation
            commonService.update(`${apiUrlsService.editFssParamEntityVouchers}/${editData.id}`, requestData)
                .then((response) => {
                    console.log("API Response (Edit):", response); // Debugging

                    if (response.success || (response.status >= 200 && response.status < 300)) {
                        const updatedFssParamEntityVouchers = FssParamEntityVouchers.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setFssParamEntityVouchersAdd(updatedFssParamEntityVouchers);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllFssParamEntityVouchers();
                        reset();
                    } else {
                        throw new Error(response.message || "Unexpected response format");
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        }
    };



    const handleShowEdit = (id) => {
        const itemToEdit = FssParamEntityVouchers.find((item) => item.id === id)
        setEditData(itemToEdit);
        console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        // console.log(ids);
        setShow(true);
        reset();
    }

    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false)
    }

    const handleShow = () => {
        reset();
        setShow(true);
        setTitle("Add")
    }

    const [showActive, setShowActive] = useState(true); // State to toggle Active/Inactive

    // Filter Active & Inactive Shares
    const activeShares = FssParamEntityVouchers.filter(item => item.is_active);
    const inactiveShares = FssParamEntityVouchers.filter(item => !item.is_active);

    // Decide which data to show
    const displayedShares = showActive ? activeShares : inactiveShares;

    const polarityOptions = [
        { value: "+ve", label: "Debit" },
        { value: "-ve", label: "Credit" }
    ];


    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        <div className="bread_crumb">
                            <div className=" ">
                                <h3 className="header-title"> Fss Entity Voucher</h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Fss Entity Voucher  </li>
                                </ul>
                            </div>
                        </div>
                        {/* <h3 className="header-title mt-2"> Shares Master </h3> */}
                    </div>
                </div>

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
                                            className="Addhead btn-sm mr-1"
                                            title="Add  Checklist "
                                            onClick={() => handleShow()}
                                        >
                                            ADD
                                        </button>
                                        <select
                                            className="  Addbutton btn-sm text-center"
                                            // style={{ width: "200px", height: "40px", fontSize: "16px" }} // Adjust size here
                                            value={showActive ? "active" : "inactive"}
                                            onChange={(e) => setShowActive(e.target.value === "active")}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>

                                    </div>

                                </div>
                            </form>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th>Custom Voucher Name</th>
                                        <th>Voucher Type</th>
                                        <th width="10%">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedShares.length > 0 ? (
                                        displayedShares.map((item, index) => {
                                            const sNo = index + 1;

                                            return (
                                                <tr key={item.id}>
                                                    <td>{sNo}</td>
                                                    <td>{item.custom_voucher_name}</td>
                                                    <td>{item.voucher_type_name}</td>

                                                    <td className="inline-btns">
                                                        {showActive ? (
                                                            // Show Edit & Delete buttons for Active items
                                                            <>
                                                                <button
                                                                    className="btn-primary-outlined"
                                                                    onClick={() => handleShowEdit(item.id)}
                                                                    title="Edit"
                                                                >
                                                                    <IconPencil />
                                                                </button>
                                                                <button
                                                                    className="btn-danger-outlined"
                                                                    title="Delete"
                                                                    onClick={() => deleteFssParamEntityVouchers(item.id)}
                                                                >
                                                                    <IconTrash />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            // Show Activate button for Inactive items
                                                            <button
                                                                className="btn-success-outlined"
                                                                title="Activate"
                                                            // onClick={() => activateShare(item.id)}
                                                            >
                                                                Activate
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No {showActive ? "active" : "inactive"} data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>


                        </div>


                        <div className="d-flex justify-content-between">


                        </div>
                    </div>
                </div>
            </div>

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit " : "Add "}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Custom Voucher Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("custom_voucher_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.custom_voucher_name : ""} // Set initial value based on editData
                                            />
                                            {errors.custom_voucher_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Voucher Type<span className="text-danger">*</span></label>
                                            <Select
                                                options={voucherTypes}
                                                onChange={(selectedOption) => setValue("standard_voucher_id", selectedOption.value)}
                                                defaultValue={voucherTypes.find(option => option.value === (editData ? editData.standard_voucher_id : ""))}
                                            />
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

export default FssParamEntityVouchers;


