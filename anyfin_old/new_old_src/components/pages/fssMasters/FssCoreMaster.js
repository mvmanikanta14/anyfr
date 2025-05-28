

import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes, FaFileAlt, FaStickyNote, FaCommentDots, FaEnvelope } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import Pagination from "../../../PaginationCommon";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import { useForm } from "react-hook-form";
// /import { useAuth } from './AuthContext'; 
// import { useAuth } from '../../context/AuthProvider';
import { IconHome, IconPencil, IconTrash } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthProvider";
// import AuthContext from "../../context/AuthProvider";
import Select from 'react-select';
import { ApiContext } from "../../../ApiProvider";
import { toast, ToastContainer } from "react-toastify";
import handleApiError from "../../utils/apiErrorHandler";


const FssCoreMaster = () => {
    const [LineMaster, setLineMaster] = useState([]);
    const [LineMasterAdd, setLineMasterAdd] = useState([]);
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
    const [fallingUnder, setFallingUnder] = useState([{ value: 0, label: "None" }]);



    // useEffect(() => {
    //     console.log("Auth Context:", auth);  // Debugging
    // }, [auth])

    useEffect(() => {
        getAllLineMaster();
        getAllFallingUnder();

    }, [pageno, records,]);


    // const { auth } = useAuth();



    const deleteLineMaster = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteLineMaster}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllLineMaster();
                    getAllFallingUnder();
                } else {
                    toast.error("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


    const getAllFallingUnder = () => {
        commonService.add(apiUrlsService.getLineMaster).then(
            (response) => {
                if (response && response.data) {
                    const FallingUnderData = response.data
                        .filter(item => item.is_active) // Filter only active items
                        .map(item => ({
                            value: item.id,
                            label: item.core_master_name
                        }));

                    console.log('Filtered Data:', FallingUnderData); // Debugging line
                    setFallingUnder(FallingUnderData);
                    getAllLineMaster();

                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };







    const getAllLineMaster = () => {
        commonService.add(apiUrlsService.getLineMaster).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setLineMaster(response.data);
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

    // const onSubmit = (data) => {

    //     // if (!auth || !auth.login_id) {
    //     //     console.error("Error: login_id is missing from auth context.");
    //     //     swal("Error", "User not logged in. Please log in first.", "error");
    //     //     return;
    //     // }

    //     const requestData = {
    //         ...data,
    //         created_by: auth.login_id,
    //         polarity: data.polarity,
    //         falling_under: data.falling_under !== undefined ? data.falling_under : 0, // ✅ Ensure correct value is passed
    //     };

    //     commonService.add(apiUrlsService.addLineMaster, requestData)
    //         .then((res) => {
    //             const newEntry = res.data;
    //             const updatedLineMaster = [...LineMasterAdd, newEntry];

    //             setLineMasterAdd(updatedLineMaster); // ✅ Add new entry to table

    //             setTimeout(() => {
    //                 getAllFallingUnder(); // ✅ Wait for state update, then refresh dropdown
    //             }, 100); // Short delay ensures state is updated before fetching new data

    //             swal("Success", "Added successfully!", "success");
    //             handleCloseShow();
    //             getAllLineMaster();
    //             reset();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    const onSubmit = (data) => {


        const requestData = {
            ...data,
            created_by: auth.login_id,
            polarity: data.polarity || editData.polarity,
            falling_under: data.falling_under !== undefined ? data.falling_under : 0,
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addLineMaster, requestData)
                .then((res) => {
                    setLineMasterAdd([...LineMasterAdd, res.data]);
                    toast.success("Added successfully!");
                    handleCloseShow();
                    getAllLineMaster();
                    getAllFallingUnder();
                    reset();
                })
                .catch((error) => {
                    handleApiError(error);
                });

        } else {
            // EDIT Operation
            commonService.update(`${apiUrlsService.editLineMaster}/${editData.id}`, requestData)
                .then((response) => {
                    if (response) {
                        const updatedLineMaster = LineMaster.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setLineMasterAdd(updatedLineMaster);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllLineMaster();
                        getAllFallingUnder();
                        reset();
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        }
    };

    const handleShowEdit = (id) => {
        const itemToEdit = LineMaster.find((item) => item.id === id)
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
    const activeShares = LineMaster.filter(item => item.is_active);
    const inactiveShares = LineMaster.filter(item => !item.is_active);

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
                                <h3 className="header-title"> Fss Core Master</h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Fss Core Master   </li>
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
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th>Core Master Name</th>
                                        <th>Fallling Under</th>
                                        <th>Polarity</th>
                                        <th>Description</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedShares.length > 0 ? (
                                        displayedShares.map((item, index) => {
                                            const sNo = index + 1;

                                            const parentItem = item.falling_under !== 0
                                                ? displayedShares.find(parent => parent.id === item.falling_under)
                                                : null;

                                            return (
                                                <tr key={item.id}>
                                                    <td>{sNo}</td>
                                                    <td>{item.core_master_name}</td>
                                                    {/* <td>{fallingUnder.find(option => option.value === item.falling_under)?.label || "Unknown"}</td> */}

                                                    {/* <td>
                                                        {item.falling_under === 0
                                                            ? ""
                                                            : fallingUnder.find(option => option.value === item.falling_under)?.label}
                                                    </td> */}

                                                    <td>{parentItem ? parentItem.core_master_name : ""}</td>
                                                    <td>{item.polarity === "+ve" ? "Debit" : "Credit"}</td>
                                                    <td>{item.description}</td>
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
                                                                    onClick={() => deleteLineMaster(item.id)}
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
                                                Core Master Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("core_master_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.core_master_name : ""} // Set initial value based on editData
                                            />
                                            {errors.core_master_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>
                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>Falling Under</label>
                                            <Select
                                                options={fallingUnder} // ✅ Updated dynamically after first entry
                                                isClearable={false} // ✅ Prevents clearing to ensure a value is always passed
                                                onChange={(selectedOption) => setValue("falling_under", selectedOption ? selectedOption.value : 0)}
                                                value={fallingUnder.find(option => option.value === (editData?.falling_under ?? 0)) || { value: 0, label: "None" }}
                                            />
                                        </div> */}

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Falling Under</label>

                                            <Select
                                                options={fallingUnder}
                                                onChange={(selectedOption) => setValue("falling_under", selectedOption.value)}
                                                defaultValue={fallingUnder.find(option => option.value === (editData ? editData.falling_under : ""))}
                                            />

                                            {/* <Select
                                                options={displayedShares
                                                    .filter(share => share.is_active)
                                                    .map(share => ({
                                                        value: share.id,
                                                        label: share.core_master_name
                                                    }))}
                                                isClearable={false}
                                                onChange={(selectedOption) => {
                                                    console.log("Selected:", selectedOption);
                                                    setValue("falling_under", selectedOption ? selectedOption.value : null);
                                                }}
                                                value={displayedShares
                                                    .filter(share => share.is_active)
                                                    .map(share => ({
                                                        value: share.id,
                                                        label: share.core_master_name
                                                    }))
                                                    .find(option => option.value === editData?.falling_under) || null}
                                            /> */}

                                            {/* <Select
                                                options={displayedShares
                                                    .filter(share => share.is_active)
                                                    .map(share => ({
                                                        value: share.id,
                                                        label: share.core_master_name
                                                    }))}
                                                isClearable={false}
                                                onChange={(selectedOption) => {
                                                    console.log("Selected:", selectedOption);
                                                    setValue("falling_under", selectedOption ? selectedOption.value : null);
                                                }}
                                                value={
                                                    editData?.falling_under
                                                        ? displayedShares
                                                            .filter(share => share.is_active)
                                                            .map(share => ({
                                                                value: share.id,
                                                                label: share.core_master_name
                                                            }))
                                                            .find(option => option.value === editData?.falling_under) || null
                                                        : null
                                                }
                                            /> */}





                                        </div>





                                        <div className="col-md-4 text-left mt-1">
                                            <label>Polarity <span className="text-danger">*</span></label>
                                            <Select
                                                options={polarityOptions} // Using predefined polarity options
                                                onChange={(selectedOption) => setValue("polarity", selectedOption.value)}
                                                defaultValue={polarityOptions.find(option => option.value === (editData ? editData.polarity : ""))}
                                            />
                                        </div>

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Description
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("description", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.description : ""} // Set initial value based on editData
                                            />
                                            {errors.description && (
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

export default FssCoreMaster;


