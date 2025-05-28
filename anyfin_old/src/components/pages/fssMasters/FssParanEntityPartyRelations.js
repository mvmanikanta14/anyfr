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


const FssParanEntityPartyRelations = () => {
    const [FssParanEntityPartyRelations, setFssParanEntityPartyRelations] = useState([]);
    const [FssParanEntityPartyRelationsAdd, setFssParanEntityPartyRelationsAdd] = useState([]);
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
    const [partyTypes, setPartyTypes] = useState([]);
    const [RelationshipTypes, setRelationshipTypes] = useState([]);





    useEffect(() => {
        getAllFssParanEntityPartyRelations();
        getAllPartyTypes();
        getAllRelationship();
    }, [pageno, records,]);


    // const { auth } = useAuth();



    const deleteFssParanEntityPartyRelations = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteFssParanEntityPartyRelations}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllFssParanEntityPartyRelations(); // Refresh the list
                } 
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


    const getAllPartyTypes = () => {

        commonService.add(apiUrlsService.getFssParamEntityParties).then(
            (response) => {
                if (response && response.data) {
                    const partyData = response.data.map(item => ({
                        value: item.id,
                        label: item.party_name
                    }));
                    console.log(' Data:', partyData); // Debugging line
                    setPartyTypes(partyData);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });

    };

    const getAllRelationship = () => {

        commonService.add(apiUrlsService.getFssMastPartyRelationshipTypes).then(
            (response) => {
                if (response && response.data) {
                    const RelationshipData = response.data.map(item => ({
                        value: item.id,
                        label: item.relationship_name
                    }));
                    console.log(' Data:', RelationshipData); // Debugging line
                    setRelationshipTypes(RelationshipData);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });

    };

    const getAllFssParanEntityPartyRelations = () => {
        commonService.add(apiUrlsService.getFssParanEntityPartyRelations).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setFssParanEntityPartyRelations(response.data);
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
        watch,
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
            commonService.add(apiUrlsService.addFssParanEntityPartyRelations, requestData)
                .then((res) => {
                    console.log("API Response (Add):", res); // Debugging

                    // Check if the API returns success in a non-standard format
                    if (res.success || (res.status >= 200 && res.status < 300)) {
                        setFssParanEntityPartyRelationsAdd([...FssParanEntityPartyRelationsAdd, res.data]);
                        toast.success("Added successfully!");
                        handleCloseShow();
                        getAllFssParanEntityPartyRelations();
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
            commonService.update(`${apiUrlsService.editFssParanEntityPartyRelations}/${editData.id}`, requestData)
                .then((response) => {
                    console.log("API Response (Edit):", response); // Debugging

                    if (response.success || (response.status >= 200 && response.status < 300)) {
                        const updatedFssParanEntityPartyRelations = FssParanEntityPartyRelations.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setFssParanEntityPartyRelationsAdd(updatedFssParanEntityPartyRelations);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllFssParanEntityPartyRelations();
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



    // const handleShowEdit = (id) => {
    //     const itemToEdit = FssParanEntityPartyRelations.find((item) => item.id === id)
    //     setEditData(itemToEdit);
    //     console.log(itemToEdit, "this is the id for edit")
    //     setTitle("Edit");
    //     setId(itemToEdit.id);
    //     // console.log(ids);
    //     setShow(true);
    //     reset();
    // }

    const handleShowEdit = (id) => {
        const itemToEdit = FssParanEntityPartyRelations.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");

            setTitle("Edit");
            setId(itemToEdit.id);
            setShow(true);

            reset({
                relation_start_date: itemToEdit.relation_start_date ? itemToEdit.relation_start_date.split("T")[0] : "",
                relation_end_date: itemToEdit.relation_end_date ? itemToEdit.relation_end_date.split("T")[0] : "",
            });
        }
    };


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
    const activeShares = FssParanEntityPartyRelations.filter(item => item.is_active);
    const inactiveShares = FssParanEntityPartyRelations.filter(item => !item.is_active);

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
                                <h3 className="header-title"> Fss Entity Party Relation</h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Fss Entity Party Relation   </li>
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
                                            className="ml-2 Addhead btn-sm mr-1"
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
                                        <th>Party Types</th>
                                        <th>Relationship Type</th>
                                        <th>Relation Start Date</th>
                                        <th>Relationship End Date</th>
                                        <th>Remarks</th>
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
                                                    <td>{item.party_name}</td>
                                                    <td>{item.relationship_name}</td>
                                                    {/* <td>{item.relation_start_date}</td>
                                                    <td>{item.relation_end_date}</td> */}
                                                    <td>{item.relation_start_date.split('T')[0]}</td>
                                                    <td>{item.relation_end_date.split('T')[0]}</td>
                                                    <td>{item.remarks}</td>
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
                                                                    onClick={() => deleteFssParanEntityPartyRelations(item.id)}
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

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Party Type <span className="text-danger">*</span></label>
                                            <Select
                                                options={partyTypes}
                                                onChange={(selectedOption) => setValue("party_id", selectedOption.value)}
                                                defaultValue={partyTypes.find(option => option.value === (editData ? editData.party_id : ""))}
                                            />
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Relationship Type <span className="text-danger">*</span></label>
                                            <Select
                                                options={RelationshipTypes}
                                                onChange={(selectedOption) => setValue("relationship_type_id", selectedOption.value)}
                                                defaultValue={RelationshipTypes.find(option => option.value === (editData ? editData.relationship_type_id : ""))}
                                            />
                                        </div>

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Relation Start Date{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            {/* <input
                                                type="date"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("relation_start_date", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.relation_start_date : ""} // Set initial value based on editData
                                            />
                                            {errors.relation_start_date && (
                                                <span className="text-danger">This is required</span>
                                            )} */}

                                            <input
                                                type="date"
                                                className="accordiantext"
                                                {...register("relation_start_date", { required: true })}
                                                defaultValue={watch("relation_start_date") || ""}
                                            />



                                        </div>

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Relation End Date{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            {/* <input
                                                type="date"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("relation_end_date", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.relation_end_date : ""} // Set initial value based on editData
                                            />
                                            {errors.relation_end_date && (
                                                <span className="text-danger">This is required</span>
                                            )} */}
                                            <input
                                                type="date"
                                                className="accordiantext"
                                                {...register("relation_end_date", { required: true })}
                                                defaultValue={watch("relation_end_date") || ""}
                                            />
                                        </div>

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Remarks{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("remarks", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.remarks : ""} // Set initial value based on editData
                                            />
                                            {errors.remarks && (
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

export default FssParanEntityPartyRelations;


