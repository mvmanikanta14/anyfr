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
import handleApiError from "../../utils/apiErrorHandler";
import { toast } from "react-toastify";


const FssParamentityGls = () => {
    const [FssParamentityGls, setFssParamentityGls] = useState([]);
    const [FssParamentityGlsAdd, setFssParamentityGlsAdd] = useState([]);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(100);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setId] = useState("");
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [fallingUnder, setFallingUnder] = useState([{ value: 0, label: "None" }]);





    useEffect(() => {
        getAllFssParamentityGls();
        getAllFallingUnder();

    }, []);





    const deleteFssParamentityGls = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteFssParamentityGls}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    toast.success("Deleted successfully!");
                    getAllFssParamentityGls(); 
                    getAllFallingUnder();

                } else {
                    toast.error("Error", "Something went wrong!", "error");
                }
            })
            .catch((error) => {
                handleApiError(error);
            });
    };


  





    const getAllFssParamentityGls = () => {
        commonService.add(apiUrlsService.getFssParamentityGls).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setFssParamentityGls(response.data);
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
            falling_under: data.falling_under !== undefined ? data.falling_under : 0,
            entity_id: 1,
            is_party: "false",
            has_subsidiary: "false",
            is_active: "true",
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssParamentityGls, requestData)
                .then((res) => {
                    console.log("API Response (Add):", res); // Debugging

                    // Check if the API returns success in a non-standard format
                    if (res.success || (res.status >= 200 && res.status < 300)) {
                        setFssParamentityGlsAdd([...FssParamentityGlsAdd, res.data]);
                        toast.success("Added successfully!");
                        handleCloseShow();
                        getAllFssParamentityGls();
                        getAllFallingUnder();
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
            commonService.update(`${apiUrlsService.editFssParamentityGls}/${editData.id}`, requestData)
                .then((response) => {
                    console.log("API Response (Edit):", response); // Debugging

                    if (response.success || (response.status >= 200 && response.status < 300)) {
                        const updatedFssParamentityGls = FssParamentityGls.map((item) =>
                            item.id === editData.id ? response.data : item
                        );
                        setFssParamentityGlsAdd(updatedFssParamentityGls);
                        toast.success("Updated successfully!");
                        handleCloseShow();
                        getAllFssParamentityGls();
                        getAllFallingUnder();
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
        const itemToEdit = FssParamentityGls.find((item) => item.id === id)
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
    const activeShares = FssParamentityGls.filter(item => item.is_active);
    const inactiveShares = FssParamentityGls.filter(item => !item.is_active);

    // Decide which data to show
    const displayedShares = showActive ? activeShares : inactiveShares;

    const polarityOptions = [
        { value: "+ve", label: "Debit" },
        { value: "-ve", label: "Credit" }
    ];

    // const options = displayedShares
    //     .filter(share => share.is_active)
    //     .map(share => ({
    //         value: String(share.id), // Ensure it's a string if needed
    //         label: share.gl_name
    //     }));

    // // Find the selected value properly
    // const selectedOption = options.find(option => option.value === String(editData?.falling_under)) || null;

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
                    getAllFssParamentityGls();

                }
            }
        ).catch((error) => {
            console.error("API call failed: ", error);
        });
    };
    


    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        <div className="bread_crumb">
                            <div className=" ">
                                <h3 className="header-title"> Fss GLs</h3>
                            </div>

                            <div>
                                <ul>
                                    <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                                    <li> Fss GLs   </li>
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
                                        <th>GL Name</th>
                                        <th>Fallling Under</th>
                                        <th>Gl Code</th>
                                        <th>Mapping To</th>
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
                                                    <td>{item.gl_name}</td>
                                                    <td>{parentItem ? parentItem.gl_name : ""}</td>
                                                    <td>{item.gl_code}</td>
                                                    <td>{item.mapped_to}</td>
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
                                                                    onClick={() => deleteFssParamentityGls(item.id)}
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
                                                Gl Name{" "}
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("gl_name", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.gl_name : ""} // Set initial value based on editData
                                            />
                                            {errors.gl_name && (
                                                <span className="text-danger">This is required</span>
                                            )}
                                        </div>


                                        {/* <div className="col-md-4 text-left mt-1">
                                            <label>Falling Under</label>
                                         
                                            <Select
                                                options={displayedShares
                                                    .filter(share => share.is_active)
                                                    .map(share => ({
                                                        value: share.id,
                                                        label: share.gl_name
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
                                                                label: share.gl_name
                                                            }))
                                                            .find(option => option.value === editData?.falling_under) || null
                                                        : null
                                                }
                                            />



                                        </div> */}


                                        <div className="col-md-4 text-left mt-1">
                                            <label>Falling Under</label>
                                            

                                            <Select
                                                options={fallingUnder}
                                                onChange={(selectedOption) => setValue("falling_under", selectedOption.value)}
                                                defaultValue={fallingUnder.find(option => option.value === (editData ? editData.falling_under : ""))}
                                            />
                                        </div>

                                        {/* <Select
                                                options={options}
                                                isClearable={false}
                                                onChange={(selectedOption) => {
                                                    console.log("Selected:", selectedOption);
                                                    setValue("falling_under", selectedOption ? selectedOption.value : null);
                                                }}
                                                value={selectedOption}
                                            /> */}






                                        <div className="col-md-4 text-left mt-1 ">
                                            <label className="">
                                                GL Code
                                                <span className="text-danger">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter  Name"
                                                className="accordiantext"
                                                {...register("gl_code", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.gl_code : ""} // Set initial value based on editData
                                            />
                                            {errors.gl_code && (
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
                                                {...register("mapped_to", {
                                                    required: true,
                                                })}

                                                defaultValue={editData ? editData.mapped_to : ""} // Set initial value based on editData
                                            />
                                            {errors.mapped_to && (
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

export default FssParamentityGls;


