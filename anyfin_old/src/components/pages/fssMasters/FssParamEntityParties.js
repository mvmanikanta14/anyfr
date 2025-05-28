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


const FssParamEntityParties = () => {
    const [FssParamEntityParties, setFssParamEntityParties] = useState([]);
    const [FssParamEntityPartiesAdd, setFssParamEntityPartiesAdd] = useState([]);
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
    const [ShowGL, setShowGL] = useState(false);
    const [partyTypes, setPartyTypes] = useState([]);
    const [Gl, setGl] = useState([]);
    const [FssParamentityGlsAdd, setFssParamentityGlsAdd] = useState([]);
    const [isGl, setIsGl] = useState(editData?.is_gl ?? false);
    const [FssParamentityGls, setFssParamentityGls] = useState([]);
    const [fallingUnder, setFallingUnder] = useState([{ value: 0, label: "None" }]);





    useEffect(() => {
        getAllFssParamEntityParties();
        getAllPartyTypes();
        getAllGL();
        getAllFallingUnder();
    }, [pageno, records,]);


    // const { auth } = useAuth();



    const deleteFssParamEntityParties = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteFssParamEntityParties}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllFssParamEntityParties(); // Refresh the list
                } else {
                    toast.error("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };

    const getAllFallingUnder = () => {
        commonService.add(apiUrlsService.getFssParamentityGls).then(
            (response) => {
                if (response && response.data) {
                    const RelationshipData = response.data
                        .filter(item => item.is_active) // Filter only active items
                        .map(item => ({
                            value: item.id,
                            label: item.gl_name
                        }));

                    console.log('Filtered Data:', RelationshipData); // Debugging line
                    setFallingUnder(RelationshipData);


                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };



    const getAllPartyTypes = () => {

        commonService.add(apiUrlsService.getFssMastPartyTypes).then(
            (response) => {
                if (response && response.data) {
                    const partyData = response.data.map(item => ({
                        value: item.id,
                        label: item.party_type_name
                    }));
                    console.log(' Data:', partyData); // Debugging line
                    setPartyTypes(partyData);
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });

    };

    const getAllGL = () => {
        commonService.add(apiUrlsService.getFssParamentityGls).then(
            (response) => {
                if (response && response.data) {
                    const activeGlData = response.data
                        .filter(item => item.is_active) 
                        .map(item => ({
                            value: item.id,
                            label: item.gl_name
                        }));
                    
                    console.log('Filtered Active GL Data:', activeGlData); // Debugging
    
                    setTimeout(() => {
                        setGl([...activeGlData]);
                        console.log("Updated Gl After Timeout:", Gl);
                    }, 100); 
                    
                }
            }
        ).catch((error) => {
            handleApiError(error);
        });
    };
    


    const getAllFssParamEntityParties = () => {
        commonService.add(apiUrlsService.getFssParamEntityParties).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setFssParamEntityParties(response.data);
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

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    //     setValue,
    // } = useForm({
    //     mode: "onChange",
    // });

    const formMethodsEp = useForm({
        mode: "onChange",
    });

    const formMethodsGl = useForm({
        mode: "onChange",
    });

    const {
        register: registerEp,
        formState: { errors: errorsEP },
    } = formMethodsEp;

    const {
        register: registerGl,
        formState: { errors: errorsGl },
    } = formMethodsGl;

    const { setValue: setValueEp, watch: watchEp } = formMethodsEp;
    const { setValue: setValueGl, watch: watchGl } = formMethodsGl;

    const resetAllForms = () => {
        formMethodsEp.reset();
        formMethodsGl.reset();

    };






    const { auth } = useContext(ApiContext);



    const onSubmitEp = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            entity_id: 1,
            is_gl: data.is_gl !== undefined ? data.is_gl : false,
            // is_msme: "false",
            // is_related: "false",
            is_active: "true",
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssParamEntityParties, requestData)
                .then((res) => {
                    console.log("API Response (Add):", res); // Debugging

                    // Check if the API returns success in a non-standard format
                    if (res.success || (res.status >= 200 && res.status < 300)) {
                        setFssParamEntityPartiesAdd([...FssParamEntityPartiesAdd, res.data]);
                        toast.success("Added successfully!");
                        handleCloseShow();
                        getAllFssParamEntityParties();
                        resetAllForms();
                    } else {
                        throw new Error(res.message || "Unexpected response format");
                    }
                })
                .catch((error) => {
                    handleApiError(error);
                });
        } else {
            // EDIT Operation
            commonService.update(`${apiUrlsService.editFssParamEntityParties}/${editData.id}`, requestData)
                .then((response) => {
                    console.log("API Response (Edit):", response); // Debugging

                    if (response.success || (response.status >= 200 && response.status < 300)) {
                        const updatedFssParamEntityParties = FssParamEntityParties.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setFssParamEntityPartiesAdd(updatedFssParamEntityParties);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllFssParamEntityParties();
                        resetAllForms();
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
        const itemToEdit = FssParamEntityParties.find((item) => item.id === id)
        setEditData(itemToEdit);
        console.log(itemToEdit, "this is the id for edit")
        setTitle("Edit");
        setId(itemToEdit.id);
        // console.log(ids);
        setShow(true);
        resetAllForms();
    }

    const handleCloseShow = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false)
    }

    const handleShow = () => {
        resetAllForms();
        setShow(true);
        setTitle("Add")
    }

    const [showActive, setShowActive] = useState(true); // State to toggle Active/Inactive

    // Filter Active & Inactive Shares
    const activeShares = FssParamEntityParties.filter(item => item.is_active);
    const inactiveShares = FssParamEntityParties.filter(item => !item.is_active);

    // Decide which data to show
    const displayedShares = showActive ? activeShares : inactiveShares;

    const polarityOptions = [
        { value: "+ve", label: "Debit" },
        { value: "-ve", label: "Credit" }
    ];


    // const onSubmitGl = (data) => {
    //     const requestData = {
    //         ...data,
    //         created_by: auth.login_id,
    //         falling_under: data.falling_under !== undefined ? data.falling_under : 0,
    //         entity_id: 1,
    //         is_party: "false",
    //         has_subsidiary: "false",
    //         is_active: "true",
    //     };

    //     if (!ids) {
    //         // ADD Operation
    //         commonService.add(apiUrlsService.addFssParamentityGls, requestData)
    //             .then((res) => {
    //                 console.log("API Response (Add):", res); // Debugging

    //                 // Check if the API returns success in a non-standard format
    //                 if (res.success || (res.status >= 200 && res.status < 300)) {
    //                     setFssParamentityGlsAdd([...FssParamentityGlsAdd, res.data]);
    //                     swal("Success", "Added successfully!", "success");
    //                     handleCloseShowGl();
    //                     // getAllFssParamentityGls();
    //                     resetAllForms();
    //                 } else {
    //                     throw new Error(res.message || "Unexpected response format");
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error("Error adding entry:", err);
    //                 swal("Error", err?.response?.data?.error || err.message || "Something went wrong!", "error");
    //             });
    //     } 
    //     // else {
    //     //     // EDIT Operation
    //     //     commonService.update(`${apiUrlsService.editFssParamentityGls}/${editData.id}`, requestData)
    //     //         .then((response) => {
    //     //             console.log("API Response (Edit):", response); // Debugging

    //     //             if (response.success || (response.status >= 200 && response.status < 300)) {
    //     //                 const updatedFssParamentityGls = FssParamentityGls.map((item) =>
    //     //                     item.id === editData.id ? response.data : item
    //     //                 );
    //     //                 setFssParamentityGlsAdd(updatedFssParamentityGls);
    //     //                 swal("Success", "Updated successfully!", "success");
    //     //                 handleCloseShow();
    //     //                 getAllFssParamentityGls();
    //     //                 resetAllForms();
    //     //             } else {
    //     //                 throw new Error(response.message || "Unexpected response format");
    //     //             }
    //     //         })
    //     //         .catch((error) => {
    //     //             console.error("Error updating entry:", error);
    //     //             swal("Error", error?.response?.data?.error || error.message || "Something went wrong!", "error");

    //     //             if (error.response && error.response.status === 403) {
    //     //                 // Uncomment if needed
    //     //                 // EventBus.dispatch("logout");
    //     //             }
    //     //         });
    //     // }
    // };


    const onSubmitGl = (data) => {
        const requestData = {
            ...data,
            created_by: auth.login_id,
            falling_under: data.falling_under !== undefined ? data.falling_under : 0,
            entity_id: 1,
            is_party: "false",
            has_subsidiary: "false",
            is_active: "true",
        };

        if (!ids) {
            commonService.add(apiUrlsService.addFssParamentityGls, requestData)
                .then((res) => {
                    console.log("API Response (Add):", res);

                    if (res.success || (res.status >= 200 && res.status < 300)) {
                        const newGlEntry = {
                            value: res.data.id,
                            label: res.data.gl_name
                        };

                        // ✅ Update dropdown directly instead of using useEffect
                        setGl((prevGl) => [...prevGl, newGlEntry]);

                        // ✅ Auto-select the new GL
                        setValueEp("gl_id", newGlEntry.value);

                        // ✅ Show success message
                        toast.success("GL Added successfully!");


                        // ✅ Close only the GL modal
                        handleCloseShowGl();

                        // ✅ Clear form inputs
                        formMethodsGl.reset();
                    } else {
                        throw new Error(res.message || "Unexpected response format");
                    }
                })
                .catch((err) => {
                    console.error("Error adding GL:", err);
                    toast.error("Error", err?.response?.data?.error || err.message || "Something went wrong!", "error");
                });
        }
    };



    const handleCloseShowGl = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShowGL(false)
    }

    const handleShowGl = () => {
        resetAllForms();
        setShowGL(true);
        setTitle("Add")
    }

    useEffect(() => {
        if (!ShowGL) { // ✅ Fetch only when GL modal is closed
            commonService.add(apiUrlsService.getFssParamentityGls)
                .then((response) => {
                    if (response.success || (response.status >= 200 && response.status < 300)) {
                        setGl(response.data.map((gl) => ({
                            value: gl.id,
                            label: gl.gl_name
                        })));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching GL list:", error);
                });
        }
    }, [ShowGL]); // ✅ Triggers only when the GL modal is closed






    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        <div className="bread_crumb">
                            <div className=" ">
                                <h3 className="header-title"> Fss Entity Parties </h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Fss Entity Parties   </li>
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
                                            className=" Addhead btn-sm mr-1"
                                            title="Add  Checklist "
                                            onClick={() => handleShow()}
                                        >
                                            ADD
                                        </button>
                                        <select
                                            className=" Addbutton btn-sm text-center"
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
                                        <th>Party Name</th>
                                        <th>Party Types</th>
                                        <th>Is MSME</th>
                                        <th>Is Related</th>
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
                                                    <td>{item.party_types}</td>
                                                    <td>{item.is_msme ? "Yes" : "No"}</td> 
                                                    <td>{item.is_related ? "Yes" : "No"}</td> 
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
                                                                    onClick={() => deleteFssParamEntityParties(item.id)}
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
                                onSubmit={formMethodsEp.handleSubmit(onSubmitEp)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Party Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...registerEp("party_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.party_name : ""} // Set initial value based on editData
                                            />
                                            {errorsEP.party_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Party Type <span className="text-danger">*</span></label>
                                            <Select
                                                options={partyTypes}
                                                isMulti
                                                onChange={(selectedOptions) =>
                                                    setValueEp("party_types", selectedOptions.map(option => option.value))
                                                }
                                                defaultValue={partyTypes.filter(option =>
                                                    editData?.party_types?.includes(option.value)
                                                )}
                                            />
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Is MSME<span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                onChange={(e) => {
                                                    const value = e.target.value === "true";
                                                    setValueEp("is_msme", value);
                                                }}
                                               
                                            >
                                                 <option>--Select--</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Is Related<span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                onChange={(e) => {
                                                    const value = e.target.value === "true";
                                                    setValueEp("is_related", value);
                                                }}
                                                
                                            >
                                                 <option >--Select--</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4 text-left mt-1">
                                            <label>Is GL <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                onChange={(e) => {
                                                    const value = e.target.value === "true";
                                                    setIsGl(value);
                                                    setValueEp("is_gl", value);
                                                }}
                                                value={isGl ? "true" : "false"}
                                            >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>

                                        {isGl && (
                                            <div className="col-md-4 text-left mt-1">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <label className="mb-0">
                                                        GL <span className="text-danger">*</span>
                                                    </label>
                                                    <button
                                                        onClick={() => handleShowGl()}
                                                        type="button"
                                                        className="">
                                                        Add GL
                                                    </button>
                                                </div>
                                                <Select
                                                    options={Gl} 
                                                    onChange={(selectedOption) => setValueEp("gl_id", selectedOption.value)}
                                                    value={Gl.find(option => option.value === watchEp("gl_id")) || null} 
                                                />

                                            </div>
                                        )}





                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>GL <span className="text-danger">*</span></label>
                                            <Select
                                                options={Gl}
                                                onChange={(selectedOption) => setValue("gl_id", selectedOption.value)}
                                                defaultValue={Gl.find(option => option.value === (editData ? editData.gl_id : ""))}
                                            />
                                        </div> */}



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

            <div className="model_box">
                <Modal
                    show={ShowGL}
                    onHide={handleCloseShowGl}
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
                                onSubmit={formMethodsGl.handleSubmit(onSubmitGl)}
                                className="formtext modalform"
                            >
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Gl Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...registerGl("gl_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.gl_name : ""} // Set initial value based on editData
                                            />
                                            {errorsGl.gl_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>


                                        <div className="col-md-4 text-left mt-1">
                                            <label>Falling Under</label>

                                            <Select
                                                options={fallingUnder}
                                                onChange={(selectedOption) => setValueGl("falling_under", selectedOption.value)}
                                                defaultValue={fallingUnder.find(option => option.value === (editData ? editData.falling_under : ""))}
                                            />


                                        </div>


                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                GL Code
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...registerGl("gl_code", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.gl_code : ""} // Set initial value based on editData
                                            />
                                            {errorsGl.gl_code && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>

                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                Mapped To
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...registerGl("mapped_to", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.mapped_to : ""} // Set initial value based on editData
                                            />
                                            {errorsGl.mapped_to && (
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

export default FssParamEntityParties;


