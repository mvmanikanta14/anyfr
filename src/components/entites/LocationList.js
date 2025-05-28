import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import { Plus, Search } from "lucide-react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LocationModal from "../commonpopups/LocationModal";

const LocationList = ({ selectedEntityId }) => {
    const [Location, setLocation] = useState([]);
    const [LocationAdd, setLocationAdd] = useState([]);
    const [Moduleslist, setModuleslist] = useState([]);
    const [moduleCheckboxes, setModuleCheckboxes] = useState({});
    const { auth } = useContext(ApiContext);
    const [totalElements, setTotalElements] = useState(0);
    const [showActive, setShowActive] = useState(true);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(15);
    const [searchTerm, setSearchTerm] = useState("");
    const [title, setTitle] = useState("Crate New Location");
    const [Show, setShow] = useState(false);
    const [editData, setEditData] = useState([]);
    const [ids, setId] = useState("");
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {

        if (selectedEntityId) {
            getAllModuleslist(selectedEntityId);
            getAllLocation(selectedEntityId);
        }
    }, [selectedEntityId]);

    const activeShares = Location.filter(item => item.is_active);
    const inactiveShares = Location.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);




    const deleteLocation = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteLocation}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Deleted successfully!", "success");
                    getAllLocation(); // Refresh the list
                    handleClose();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    getAllLocation();
                    handleClose();

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



    const getAllLocation = () => {
        const pagedata = {
            entity_id: selectedEntityId,
        };
        commonService
            .add(apiUrlsService.getAllLocationList, pagedata)
            .then((response) => {
                console.log("Location List Response:", response);
                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setLocation(response.data.data);
                        setTotalElements(response.data.total);
                    } else {
                        swal(response.data.error);
                        setLocation([]);
                    }
                }
            })
            .catch((error) => {
                console.error("Error loading modules:", error);
            });
    };

    const getAllModuleslist = (entityId) => {
        const requestData = { entity_id: entityId };

        commonService.add(apiUrlsService.getAllModuleslist, requestData)
            .then(res => {
                setModuleslist(res.data.modules.data); // must include module_id
            })
            .catch((error) => {
                console.error("Error loading active modules:", error);
            });
    };

    const handleShow = async () => {
        setEditData(null);  // Clear any previous edit data
        setTitle("Crate New Location");  // Set the title to "Add"
        setShowDeleteButton(false); // Hide the delete button for a new record
        reset({
            location_name: "",  // Reset all form fields
            state: "",
            city: "",
            pincode: "",
            address: ""
        });
        setShow(true);  // Show the modal
    };
    
    

    const handleClose = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false);
        reset({
            location_name: "",  // Ensure all fields are reset
            state: "",
            city: "",
            pincode: "",
            address: ""
        });
    }

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
            entity_id: selectedEntityId,

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addLocation, requestData)
                .then((res) => {
                    setLocationAdd([...LocationAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    getAllLocation();
                    handleClose();
                    reset();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure

                    swal("Error", error.details, "error");
                });
        } else {
            // UPDATE Operation
            commonService.update(`${apiUrlsService.editLocation}/${ids}`, requestData)
                .then((res) => {
                    const updatedLocation = Location.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setLocation(updatedLocation);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllLocation();
                    reset();
                })
                .catch((error) => {
                    // handleApiError(error);
                });

        }
    };



    const handleShowEdit = (id) => {
        const itemToEdit = Location.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setId(itemToEdit.id);
            setShowDeleteButton(true);
        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Crate New Location");
            setId(null);
            setShowDeleteButton(false);
        }

        reset(); // Reset the form state
        setShow(true); // Show the modal
    };

    



    return (
        <div>

            <div className="table-top-area d-flex justify-content-between custom-table-search">

                <div className="form-check form-switch d-flex align-items-center gap-1 table-list-status">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="statusTogglemodal"
                        checked={showActive}
                        onChange={() => setShowActive(!showActive)}

                    />
                    <label className="" htmlFor="statusTogglemodal">
                        {showActive ? 'Active' : 'Inactive'}
                    </label>
                </div>

                <div className="d-flex">

                    <div className="position-relative mx-2" style={{ width: '250px' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control pe-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
                            style={{ cursor: 'pointer' }}
                        >
                            <Search size={'18'} className="" />
                        </span>
                    </div>


                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Crate New Location "
                            onClick={() => handleShow()}
                        >
                            <Plus size={15} /> Create
                        </button>
                    </div>
                </div>

            </div>
            <div className="table-responsive">
                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th width="5%">S.No</th>
                            <th>Location Name</th>
                            <th>State</th>
                            <th> City</th>
                            <th> Pincode</th>
                            <th> Address</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                            displayedShares.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr onClick={() => handleShowEdit(item.id)} key={item.id} className="tr-hover-effect1">
                                        <td>{sNo}</td>
                                        <td>{item.location_name} </td>
                                        <td>{item.state}</td>
                                        <td>{item.city}</td>
                                        <td>{item.pincode}</td>
                                        <td>{item.address}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">No data found</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            <LocationModal
                show={Show}
                handleClose={handleClose}
                onSubmit={onSubmit}
                title={title}
                editData={editData}
                showDeleteButton={showDeleteButton}
                deleteLocation={deleteLocation}
            />

        </div>
    );
};

export default LocationList;
