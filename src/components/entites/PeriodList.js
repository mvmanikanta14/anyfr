import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import { Plus, Search } from "lucide-react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from 'react-select';

const PeriodList = ({ selectedEntityId }) => {
    const [Period, setPeriod] = useState([]);
    const [PeriodDropDown, setPeriodDropDown] = useState([]);
    const [PeriodAdd, setPeriodAdd] = useState([]);
    const [Moduleslist, setModuleslist] = useState([]);
    const [moduleCheckboxes, setModuleCheckboxes] = useState({});
    const { auth } = useContext(ApiContext);
    const [totalElements, setTotalElements] = useState(0);
    const [showActive, setShowActive] = useState(true);
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(15);
    const [searchTerm, setSearchTerm] = useState("");
    const [title, setTitle] = useState("Add");
    const [Show, setShow] = useState(false);
    const [editData, setEditData] = useState([]);
    const [ids, setId] = useState("");
    const [showDeleteButton, setShowDeleteButton] = useState(false);


    useEffect(() => {

        if (selectedEntityId) {
            getAllPeriod(selectedEntityId);
        }
        getAllPeriodDrodown();
    }, [selectedEntityId]);

    const activeShares = Period.filter(item => item.is_active);
    const inactiveShares = Period.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);




    const deletePeriod = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deletePeriod}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    swal("Success", "Deleted successfully!", "success");
                    getAllPeriod(); // Refresh the list
                    handleClose();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    getAllPeriod();
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



    const getAllPeriod = () => {
        const pagedata = {
            entity_id: selectedEntityId,
        };
        commonService
            .add(apiUrlsService.getAllPeriodList, pagedata)
            .then((response) => {
                console.log("Period List Response:", response);
                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setPeriod(response.data.data);
                        setTotalElements(response.data.total);
                    } else {
                        swal(response.data.error);
                        setPeriod([]);
                    }
                }
            })
            .catch((error) => {
                console.error("Error loading modules:", error);
            });
    };


    const getAllPeriodDrodown = () => {
        commonService.getAll(apiUrlsService.getAllPeriodDropdown).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data);
                    const transformedData = response.data.data.map(item => ({
                        value: item.id,
                        label: item.period
                    }));
                    setPeriodDropDown(transformedData);
                }
            }
        ).catch((error) => {
            // handleApiError(error);
        });
    };



    const handleShow = async () => {

        // reset();
        setShow(true);
        setTitle("Add")
        setShowDeleteButton(false);
    }

    const handleClose = () => {
        setEditData(null); // Reset editData
        setId(""); // Reset the ID
        setShow(false);
        reset();
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
            period_type: 1,
            period_id: data.period_id

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addPeriod, requestData)
                .then((res) => {
                    setPeriodAdd([...PeriodAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    getAllPeriod();
                    handleClose();
                    reset();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure

                    swal("Error", error.details, "error");
                });
        } else {
            // UPDATE Operation
            commonService.update(`${apiUrlsService.editPeriod}/${ids}`, requestData)
                .then((res) => {
                    const updatedPeriod = Period.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setPeriod(updatedPeriod);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllPeriod();
                    reset();
                })
                .catch((error) => {
                    // handleApiError(error);
                });

        }
    };



    const handleShowEdit = (id) => {
        const itemToEdit = Period.find((item) => item.id === id);

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setId(itemToEdit.id);
            setShowDeleteButton(true);
        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Add");
            setId(null);
            setShowDeleteButton(false);
        }

        reset(); // Reset the form state
        setShow(true); // Show the modal
    };

    const handleSelectChange = (selectedOption) => {
        console.log("Selected:", selectedOption);
        setValue("period_id", selectedOption.value);
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
                            title="Add "
                            onClick={() => handleShow()}
                        >
                            <Plus size={15} /> Add New
                        </button>
                    </div>
                </div>




            </div>
            <div className="table-responsive">
                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th width="5%">S.No</th>
                            <th > Reporting Period Name</th>


                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                            displayedShares.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr onClick={() => handleShowEdit(item.id)} key={item.id} className="tr-hover-effect1">
                                        <td>{sNo}</td>
                                        <td>{item.reporting_periods} </td>

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

            <div className="model_box">
                <Modal
                    show={Show}
                    onHide={handleClose}
                    centered
                    // size="sm"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Reporting Period </Modal.Title>
                    </Modal.Header>

                    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0   modalstart">


                                <div className="col-md-12 text-left mt-1">
                                    <label>
                                        Period Type <span className="text-danger">*</span>
                                    </label>
                                    <Select
                                        options={PeriodDropDown}
                                        onChange={handleSelectChange}
                                        defaultValue={PeriodDropDown.find(option => option.value === editData?.period_id)}
                                        classNamePrefix="custom-select"
                                        menuPlacement="auto"
                                        menuPosition="fixed"
                                    />

                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            {showDeleteButton && (
                                <button
                                    type="button"
                                    onClick={() => deletePeriod(editData?.id)}
                                    className="btn btn-sm btn-danger mx-2"
                                >
                                    Delete
                                </button>
                            )}

                            <button className="btn btn-sm btn-success">
                                {title}
                            </button>
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>


        </div>
    );
};

export default PeriodList;
