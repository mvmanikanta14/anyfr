import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import commonService from "../../services/common.service";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import Select from 'react-select';
import { ApiContext } from "../../services/ApiProvider";
import tokenService from "../../services/token.service";

const GLModal = ({
    show,
    handleClose,
    deleteGL,
    showActive = true,
    showDeleteButton = false,
    setOthersMapAdd, OthersMapAdd,
    setOthersMap, OthersMap,
    getAllOthersMap,
    onSubmitOverride,
    editData
}) => {

    const { auth } = useContext(ApiContext);
    const [header, setHeader] = useState("Create a New GL");
    const [FrameworkID, setFrameworkID] = useState("");
    const [fallingunder, setFallingUnder] = useState([]);
    const [OthersMapDropDown, setOthersMapDropDown] = useState([]);
    const [fslimaster, setFsliMaster] = useState([]);
    const [title, setTitle] = useState("Create");
    const [isEditMode, setIsEditMode] = useState(false);
    const [ids, setIds] = useState(null);
    const [EntityID, setEntityID] = useState("");


    const formMap = useForm({
        mode: "onChange",
    });


    useEffect(() => {
        if (editData) {
            setIds(editData.id);
            setHeader("Update GL");
            setTitle("Update");

            formMap.setValue("gl_name", editData.gl_name || "");
            formMap.setValue("gl_code", editData.gl_code || "");
            formMap.setValue("falling_under", editData.falling_under || "");
            formMap.setValue("mappted_to_fsli_id", editData.mappted_to_fsli_id || "");
        } else {
            formMap.reset();
            setIds(null);
            setHeader("Create a New GL");
            setTitle("Create");
        }
    }, [editData, formMap]);




    const onSubmit = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,  // Ensure entity_id is a string
            created_by: auth.login_id,
            falling_under: data.falling_under,
            has_subsidiary: "false",
            is_party: "false",

        };

        if (ids) {
            requestData.is_active = true; // Add is_active for update only
        }

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addFssmap, requestData)
                .then((res) => {
                    setOthersMapAdd([...OthersMapAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
                    getAllOthersMap();
                    reset();
                })
                .catch((error) => {
                    if (error.details && error.details.length > 0) {
                        error.details.forEach((detail) => {
                            swal("Validation", `Column: ${detail.column}, Message: ${detail.message}, Value: ${detail.value}`);
                        });
                    }
                    console.error("Error Mani:", error.details);
                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsService.editOthersMap}/${ids}`, requestData)

                .then((res) => {
                    const updatedOthersMap = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setOthersMap(updatedOthersMap);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllOthersMap();
                    reset();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };


    useEffect(() => {
        setFrameworkID(tokenService.getFrameworkID());
        setEntityID(tokenService.getEntityID());

    }, []);

    useEffect(() => {
        if (EntityID) {
            setLoadingDropdowns(true);
            Promise.all([
                // getAllOthersMap(),
                getAllOthersMapDropdwon(),
                getAllFallingUnder(),
                getAllFsliMaster(EntityID, FrameworkID),
            ]).finally(() => setLoadingDropdowns(false));
        }
    }, [EntityID]);







    const [loadingDropdowns, setLoadingDropdowns] = useState(false);




    const getAllFallingUnder = () => {
        const requestData = {
            entity_id: EntityID,
            // Remove framework_id if not available
        };

        commonService.add(apiUrlsService.getAllOthresMap, requestData)
            .then((response) => {
                const filteredData = response?.data?.data || [];
                const transformedData = filteredData.map(item => ({
                    value: item.id,
                    label: item.gl_name,
                }));
                setFallingUnder(transformedData);
            })
            .catch((error) => {
                console.error("Error fetching Falling GL Group:", error);
            });
    };


    const getAllOthersMapDropdwon = () => {
        const requestData = { entity_id: EntityID };

        commonService
            .add(apiUrlsService.getAllOthresMap, requestData)
            .then((response) => {
                if (response?.data?.data && Array.isArray(response.data.data)) {
                    const transformedData = response.data.data.map((item) => ({
                        value: item.mappted_to_fsli_id || item.id,
                        label: item.flsi_master_name || item.gl_name || "Unnamed",
                    }));

                    setOthersMapDropDown(transformedData);
                } else {
                    swal(response.data?.error || "Unexpected response structure");
                    setOthersMapDropDown([]); // 🔁 Correct this line
                }
            })
            .catch((error) => {
                console.error("Error fetching OthersMap dropdown:", error);
            });
    };



    const getAllFsliMaster = () => {
        const requestData = {
            entity_id: EntityID,
            framework_id: FrameworkID
        };

        commonService.add(apiUrlsService.getAllFssFsliMapList, requestData)
            .then((response) => {
                if (response && response.data) {
                    console.log("Master MAni", response.data.data);

                    // Filter the data to include only items with node_level = 1
                    const filteredData = response.data.data;

                    // Transform the filtered data to match the Select component format
                    const transformedData = filteredData.map(item => ({
                        value: item.id,
                        label: item.flsi_master_name
                    }));

                    setFsliMaster(transformedData);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching data:", error);
            });
    };



    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });




    const handleGLSubmit = (formData) => {
        // Do something with submitted GL form
        console.log("Submitted GL:", formData);
    };



    useEffect(() => {
        if (editData) {
            setIds(editData.id); // set edit ID
            setHeader("Update GL");
            setTitle("Update");
            setIsEditMode(true);

            formMap.setValue("gl_name", editData.gl_name || "");
            formMap.setValue("gl_code", editData.gl_code || "");
            formMap.setValue("falling_under", editData.falling_under || "");
            formMap.setValue("mappted_to_fsli_id", editData.mappted_to_fsli_id || "");
        } else {
            formMap.reset();
            setIds(null);
            setHeader("Create a New GL");
            setTitle("Create");
            setIsEditMode(false);
        }
    }, [editData, formMap]);


    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            // size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="md-width-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title> {isEditMode ? header : header} </Modal.Title>
            </Modal.Header>

            <form onSubmit={formMap.handleSubmit(onSubmit)} className="formtext modalform">
                <Modal.Body className="custom-modal-body">
                    <div className="p-0 modalstart">
                        <div className="container">
                            <div className="row pt-1 mt-1">

                                {/* GL Name */}
                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="inline-customform-label me-3 mb-0  ">
                                            Gl Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Gl Name"
                                            className="form-control"
                                            {...formMap.register("gl_name", { required: true })}
                                            defaultValue={editData ? editData.gl_name : ""}
                                        />
                                    </div>
                                    {errors.gl_name && <span className="text-danger">This field is required.</span>}
                                </div>

                                {/* GL Code */}
                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="inline-customform-label me-3 mb-0  ">
                                            Gl Code <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Gl Code"
                                            className="form-control"
                                            {...formMap.register("gl_code", { required: true })}
                                            defaultValue={editData ? editData.gl_code : ""}
                                        />
                                    </div>
                                    {errors.gl_code && <span className="text-danger">This field is required.</span>}
                                </div>

                                {/* Falling Under */}
                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="inline-customform-label me-3 mb-0 ">
                                            Falling GL Group <span className="text-danger">*</span>
                                        </label>
                                        <div className="flex-grow-1">
                                            <Controller
                                                name="falling_under"
                                                control={formMap.control}
                                                defaultValue={editData ? editData.falling_under : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={fallingunder}
                                                        isSearchable={true}
                                                        placeholder="Select"
                                                        classNamePrefix="custom-select"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={fallingunder.find(option => option.value === field.value)}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {errors.falling_under && <span className="text-danger">This field is required.</span>}
                                </div>

                                {/* Fsli Master */}
                                {/* Fsli Master */}
                                <div className=" ">
                                    <div className="d-flex align-items-center">
                                        <label className="inline-customform-label me-3 mb-0 ">
                                            Map to FSLI  <span className="text-danger">*</span>
                                        </label>
                                        <div className="flex-grow-1">
                                            <Controller
                                                name="mappted_to_fsli_id"
                                                control={formMap.control}
                                                defaultValue={editData ? editData.mappted_to_fsli_id : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => {
                                                    const selectedOption = fslimaster.find(
                                                        (option) => `${option.value}` === `${field.value}`
                                                    );

                                                    return (
                                                        <Select
                                                            {...field}
                                                            options={fslimaster}
                                                            isSearchable
                                                            placeholder="Select"
                                                            classNamePrefix="custom-select"
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                            value={selectedOption || null}
                                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {errors.mappted_to_fsli_id && (
                                        <span className="text-danger">This field is required.</span>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>

                    {showActive ? (
                        <>
                            {showDeleteButton && (
                                <button
                                    type="button"
                                    onClick={() => deleteGL(editData?.id)}
                                    className="btn btn-sm btn-danger mx-1"
                                >
                                    Delete
                                </button>
                            )}
                            <button className="btn btn-primary btn-sm">
                                {title}
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-sm btn-success">
                            Active
                        </button>
                    )}

                </Modal.Footer>
            </form>

        </Modal>
    );
};

export default GLModal;
