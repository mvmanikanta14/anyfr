

import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes, FaFileAlt, FaStickyNote, FaCommentDots, FaEnvelope } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import Pagination from "../../../PaginationCommon";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";
import { useForm } from "react-hook-form";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ApiContext }   from "../../../ApiProvider";

const SharesMaster = () => {
    const [SharesMaster, setSharesMaster] = useState([]);
    const [SharesMasterAdd, setSharesMasterAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchLastName, setSearchLastName] = useState('');
    const [searchSharesMasterName, setSearchSharesMasterName] = useState('');
    const [searchemail, setSearchEmail] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [searchFirstName, setSearchFirstName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ username: "", email: "", title: "", content: "" });
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);




    useEffect(() => {
        getAllSharesMaster();
        if (searchTerm !== '') {
            getAllSharesMaster();
        } else {
            getAllSharesMaster();
        }
    }, [pageno, records,]);


    const { auth } = useContext(ApiContext); 



    const deleteSharesMaster = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteSharesMaster}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Deleted successfully!", "success");
                    getAllSharesMaster(); // Refresh the list
                } else {
                    swal("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    swal("Error", "You don't have permission to delete this item!", "error");
                } else {
                    swal("Error", "Something went wrong!", "error");
                }
            });
    };



    const getAllSharesMaster = () => {
        let pagedata = {
        };

        commonService.getAll(apiUrlsService.getSharesMaster, pagedata).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setSharesMaster(response.data);
                    // setTotalElements(response.data.prefil.sql_records_count_new);
                    // setSearchResults(response.data.prefil.search_username);
                }
            }
        ).catch((error) => {
            console.error("API call failed: ", error);
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



    // const onSubmit = (data) => {
    //     const requestData = {
    //         ...data,
    //         created_by: auth.login_id,  
    //     };
    //     if (!ids) {
    //         commonService.add(apiUrlsService.addSharesMaster, requestData)
    //             .then((res) => {
    //                 setSharesMasterAdd([...SharesMasterAdd, res.data])
    //                 swal("Success", " added succesfully..!", "success");
    //                 handleCloseShow();
    //                 getAllSharesMaster();
    //                 reset();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    //     else {
    //         data.id = editData.id;
    //         commonService.add(apiUrlsService.editSharesMaster, data)
    //             .then(
    //                 (response) => {
    //                     if (response) {
    //                         const updatedSharesMaster = SharesMaster.map((item) =>
    //                             item.id === editData.id ? response.data : item
    //                         );
    //                         console.log("manikanta", updatedSharesMaster)
    //                         setSharesMasterAdd(updatedSharesMaster);
    //                         swal("Success", " Updated succesfully..!", "success");
    //                         handleCloseShow();
    //                         getAllSharesMaster();
    //                         reset();
    //                     }
    //                 },
    //                 (error) => {
    //                     if (error.response && error.response.status === 403) {
    //                         // EventBus.dispatch("logout");
    //                     }
    //                 }
    //             );
    //     }
    // }
    // const { auth } = useAuth(); // Get auth context
    // if (!auth || !auth.login_id) {
    //     console.error("Auth is undefined or login_id is missing:", auth);
    //     swal("Error", "User authentication required!", "error");
    //     return;
    // }

    const onSubmit = (data) => {


        const requestData = {
            ...data,
            created_by: auth.login_id, 
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addSharesMaster, requestData)
                .then((res) => {
                    setSharesMasterAdd([...SharesMasterAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseShow();
                    getAllSharesMaster();
                    reset();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // EDIT Operation with ID in URL
            commonService.update(`${apiUrlsService.editSharesMaster}/${editData.id}`, requestData)
                .then((response) => {
                    if (response) {
                        const updatedSharesMaster = SharesMaster.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        console.log("Updated Data:", updatedSharesMaster);
                        setSharesMasterAdd(updatedSharesMaster);
                        swal("Success", "Updated successfully!", "success");
                        handleCloseShow();
                        getAllSharesMaster();
                        reset();
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        // EventBus.dispatch("logout");
                    }
                });
        }
    };


    const handleShowEdit = (id) => {
        const itemToEdit = SharesMaster.find((item) => item.id === id)
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
    const activeShares = SharesMaster.filter(item => item.is_active);
    const inactiveShares = SharesMaster.filter(item => !item.is_active);

    // Decide which data to show
    const displayedShares = showActive ? activeShares : inactiveShares;


    return (
        <div className="container-fluid pl-2 pr-2">
            <div className="row">
                <div className="col-md-12 bg-white">
                    <div className="row">
                        {/* <h3 className="header-title mt-2"> Shares Master </h3> */}
                    </div>
                </div>

                <div className="col-md-12  bg-white pb-2 pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
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
                                        className="ml-2 Addbutton text-right"
                                        title="Add  Checklist "
                                        onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button>
                                    <select
                                        className=" ml-2 Addbutton text-center"
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
                                    <th>Type of Share Name</th>
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
                                                <td>{item.type_of_share_name}</td>
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
                                                                onClick={() => deleteSharesMaster(item.id)}
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

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleCloseShow}
                    centered
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Edit SharesMaster" : "Add SharesMaster"}</Modal.Title>
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
                                                Type of Share Master{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("type_of_share_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.type_of_share_name : ""} // Set initial value based on editData
                                            />
                                            {errors.type_of_share_name && (
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

export default SharesMaster;


