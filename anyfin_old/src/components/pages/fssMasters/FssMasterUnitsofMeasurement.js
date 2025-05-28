import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import Pagination from "../../../PaginationCommon";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import { useForm } from "react-hook-form";
import { IconHome, IconPencil, IconTrash } from "@tabler/icons-react";
import Select from 'react-select';
import { ApiContext } from "../../../ApiProvider";
import { toast } from "react-toastify";
import handleApiError from "../../utils/apiErrorHandler";

const FssMasterUnitsofMeasurement = () => {
    const [FssMasterUnitsofMeasurement, setFssMasterUnitsofMeasurement] = useState([]);
    const [FssMasterUnitsofMeasurementAdd, setFssMasterUnitsofMeasurementAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [unitTypes, setUnitTypes] = useState([]);





    useEffect(() => {
        getAllFssMasterUnitsofMeasurement();
        getAllUnitTypes();

    }, [pageno, records,]);



    const { auth } = useContext(ApiContext);





    const deleteFssMasterUnitsofMeasurement = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteFssMasterUnitsofMeasurement}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllFssMasterUnitsofMeasurement(); // Refresh the list
                } else {
                    toast.error("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


    const getAllUnitTypes = () => {

        commonService.add(apiUrlsService.getFssMasterUnitTypes).then(
            (response) => {
                if (response && response.data) {
                    const UnitTypesData = response.data.map(item => ({
                        value: item.id,
                        label: item.unit_type_name
                    }));
                    console.log(' Data:', UnitTypesData); // Debugging line
                    setUnitTypes(UnitTypesData);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });

    };



    const getAllFssMasterUnitsofMeasurement = () => {
        let pagedata = {
        };

        commonService.add(apiUrlsService.getFssMasterUnitsofMeasurement, pagedata).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setFssMasterUnitsofMeasurement(response.data);
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





    const onSubmit = (data) => {


        const requestData = {
            ...data,
            created_by: auth.login_id,

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssMasterUnitsofMeasurement, requestData)
                .then((res) => {
                    setFssMasterUnitsofMeasurementAdd([...FssMasterUnitsofMeasurementAdd, res.data]);
                    toast.success("Added successfully!");
                    handleCloseShow();
                    getAllFssMasterUnitsofMeasurement();
                    reset();
                })
                .catch((error) => {
                    handleApiError(error);
                });
        } else {
            // EDIT Operation with ID in URL
            commonService.update(`${apiUrlsService.editFssMasterUnitsofMeasurement}/${editData.id}`, requestData)
                .then((response) => {
                    if (response) {
                        const updatedFssMasterUnitsofMeasurement = FssMasterUnitsofMeasurement.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        console.log("Updated Data:", updatedFssMasterUnitsofMeasurement);
                        setFssMasterUnitsofMeasurementAdd(updatedFssMasterUnitsofMeasurement);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllFssMasterUnitsofMeasurement();
                        reset();
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        }
    };


    const handleShowEdit = (id) => {
        const itemToEdit = FssMasterUnitsofMeasurement.find((item) => item.id === id)
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
    const activeShares = FssMasterUnitsofMeasurement.filter(item => item.is_active);
    const inactiveShares = FssMasterUnitsofMeasurement.filter(item => !item.is_active);

    // Decide which data to show
    const displayedShares = showActive ? activeShares : inactiveShares;


    return (
        <div className="">
            <div className="">
                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title"> Unit of Measurements</h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li>Unit of Measurements   </li>
                        </ul>
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
                                            className="Addbutton btn-sm text-center"
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
                                    <tr>
                                        <th width="5%">S.No</th>
                                        <th>Unit Name</th>
                                        <th>Unit Types</th>
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
                                                    <td>{item.unit_name}</td>
                                                    <td>{item.unit_type_name}</td>
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
                                                                    onClick={() => deleteFssMasterUnitsofMeasurement(item.id)}
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

                        {/* <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                totalElements={totalElements}
                                recordsPerPage={records}
                                pageNumber={pageno}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <span className="float-right">
                                Showing {(pageno - 1) * records + 1} to{" "}
                                {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                                of {totalElements} entries
                            </span>
                        </div>
                    </div> */}
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

                                        <div className="col-md-4 text-left mt-1">
                                            <label className="">
                                                Unit Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("unit_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.unit_name : ""} // Set initial value based on editData
                                            />
                                            {errors.unit_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Unit Type  <span className="text-danger">*</span></label>
                                            <Select
                                                options={unitTypes}
                                                onChange={(selectedOption) => setValue("unit_type_id", selectedOption.value)}
                                                defaultValue={unitTypes.find(option => option.value === (editData ? editData.unit_type_id : ""))}
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

export default FssMasterUnitsofMeasurement;


