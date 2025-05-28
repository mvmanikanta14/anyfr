import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, RefreshCcw, Search, ArrowUp, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce, head } from "lodash";
import Select from 'react-select';
import { IconFlagSearch, IconSwitch, IconSwitch2, IconSwitchHorizontal } from "@tabler/icons-react";

const OthersMap = ({ datas }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [pageno, setPageNo] = useState(1);
    const records = 10;
    const [OthersMap, setOthersMap] = useState([]);
    const [ids, setIds] = useState(null);
    const [OthersMapAdd, setOthersMapAdd] = useState([]);
    const [editData, setEditData] = useState(null);
    const [editDataOverride, setEditDataOverride] = useState(null);
    const [show, setShow] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [showTally, setShowTally] = useState(false);
    const [showZoho, setShowZoho] = useState(false);
    const [showExcel, setShowExcel] = useState(false);
    const [showOverride, setShowOverride] = useState(false);
    const [title, setTitle] = useState("Add");
    const [header, setHeader] = useState("Create a New GL");
    const [isEditMode, setIsEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const [FrameworkID, setFrameworkID] = useState("");
    const [Finyear, setFinYear] = useState("");
    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [fallingunder, setFallingUnder] = useState([]);
    const [fslimaster, setFsliMaster] = useState([]);
    const [BulkMap, setBulkMap] = useState([]);
    const active = OthersMap.filter(item => item.is_active);
    const inactive = OthersMap.filter(item => !item.is_active);
    const displayed = showActive ? active : inactive;
    const [selecteGlname, setSelecteGlname] = useState(null);
    const [selecteGlId, setSelecteGlId] = useState(null);
    const [OthersMapDropDown, setOthersMapDropDown] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');



    const handleSort = (column) => {
        // Toggle the sort direction
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';
        
        setSortOn(column); // Update sortOn state
        setSortDir(newSortDir); // Update sortDir state
    
        // Call API with the updated sort parameters
        getAllOthersMap(column, '', newSortDir); // Pass empty string for searchTerm
    };
    
    // Function to display sorting icon
    const getSortingIcon = (column) => {
        if (sortOn === column) {
            return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
        }
        return <ChevronUp size={16} />;
    };



    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());
        setFinYear(tokenService.getPeriodName());
    }, []);

    const debouncedSearch = debounce(() => {
        getAllOthersMap();  // Call the API when searchTerm changes
    }, 500);

    const deleteGL = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteChartofAcc}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming OthersMap is the state that holds the list of accounts
                    const updatedOthersMap = OthersMap.filter((item) => item.id !== id);
                    setOthersMap(updatedOthersMap); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllOthersMap();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                    getAllOthersMap();

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


    const formMap = useForm({
        mode: "onChange",
    });
    const formBulk = useForm({
        mode: "onChange",
    });

    const formOverride = useForm({
        mode: "onChange",
    });

    const resetAllForms = () => {
        // formTan.reset();
        formMap.reset();
        formBulk.reset();
        formOverride.reset();

    };



    useEffect(() => {
        if (searchTerm) {
            debouncedSearch();
        } else {
            setOthersMap([]);
        }
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

   

    // const getAllOthersMap = (key, searchTerm) => {

      
    //     const finalSortOn = sortOn 
    //     const finalSortDir = sortDir 

    //     const requestData = {
    //         key: key,                
    //         value: searchTerm,     
    //         sortOn: finalSortOn,  
    //         sortDir: finalSortDir 
    //     };

    //     commonService.add(apiUrlsService.getAllSearch, requestData)
    //         .then((response) => {
    //             console.log("API Sai:", response.data);

    //             if (response && response.data) {
    //                 if (Array.isArray(response.data)) {
    //                     setOthersMap(response.data); 
    //                 } else {
    //                     swal(response.data.error);
    //                     setOthersMap([]);  
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("API call failed: ", error);
    //         });
    // };


    const getAllOthersMap = (key, searchTerm) => {
        const finalSortOn = sortOn 
        const finalSortDir = sortDir 

        const requestData = {
            entity_id: EntityID,
            key: key,                
            value: searchTerm,     
            sortOn: finalSortOn,  
            sortDir: finalSortDir 
        };
        const status = showActive ? 1 : 0;

        commonService.add(`${apiUrlsService.getAllOthresMap}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total);
                    } else {
                        swal(response.data.error);
                        setOthersMap([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const getAllOthersMapDropdwon = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsService.getAllOthresMap}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.mappted_to_fsli_id,
                            label: item.flsi_master_name
                        }));

                        setOthersMapDropDown(transformedData);
                    } else {
                        swal(response.data.error);
                        setOthersMap([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const onSubmitBulk = (data) => {
        const requestData = {
            ...data,
            ids: selectedItems,
            mapped_to_fsli_id: data.mapped_to_fsli_id,
        };

        commonService.update(apiUrlsService.getAllBulkMap, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setBulkMap(response.data.data);
                        handleCloseBulk();
                        getAllOthersMap();
                        reset();
                        setSelectedItems([]);

                        // Success alert
                        swal({
                            title: "Success!",
                            text: "Mapped Seleted GL completed successfully.",
                            icon: "success",
                            button: "OK",
                        });
                    } else {
                        swal({
                            text: "Mapped Seleted GL completed successfully.",
                            icon: "success",
                            button: "OK",

                        });
                        handleCloseBulk();
                        getAllOthersMap();
                        setSelectedItems([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);

                swal({
                    title: "Success!",
                    text: "Mapped Seleted GL completed successfully.",
                    icon: "success",
                    button: "OK",
                });
            });
    };




    const [selectedItems, setSelectedItems] = useState([]); // Track selected items

    const handleCheckboxChange = (id) => {
        const updatedData = displayed.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, selected: !item.selected }; // Toggle selected state
                return updatedItem;
            }
            return item;
        });
        setOthersMap(updatedData); // Update the displayed data state

        // Track the selected items based on the updated state
        const selectedIds = updatedData.filter(item => item.selected).map(item => item.id);
        setSelectedItems(selectedIds);
    };

    const handleSelectAll = () => {
        const newSelectionState = displayed.every(item => item.selected);
        const updatedData = displayed.map(item => ({
            ...item,
            selected: !newSelectionState, // Toggle selection for all
        }));

        setOthersMap(updatedData);

        // Update selectedItems state based on all rows being selected
        const selectedIds = updatedData.filter(item => item.selected).map(item => item.id);
        setSelectedItems(selectedIds);
    };







    const getAllFallingUnder = () => {
        const requestData = {
            entity_id: EntityID,
            framework_id: FrameworkID,
        };

        commonService.add(apiUrlsService.getAllOthresMap, requestData)
            .then((response) => {
                if (response && response.data) {
                    console.log("mani", response.data);

                    // Filter the data to include only items with node_level = 1
                    const filteredData = response.data.data;

                    // Transform the filtered data to match the Select component format
                    const transformedData = filteredData.map(item => ({
                        value: item.id,
                        label: item.gl_name
                    }));

                    setFallingUnder(transformedData); // Set the filtered and transformed data as options
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching data:", error);
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
                    console.log("Master", response.data.data);

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


    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };
   

    useEffect(() => {
        if (EntityID && showActive && !searchTerm) {
            getAllOthersMap();
            getAllFsliMaster();
            getAllOthersMapDropdwon(EntityID);

        }
        else {
            getAllInactive(EntityID);

        }
        getAllFallingUnder(FrameworkID);

    }, [EntityID, showActive, pageno, records,searchTerm]);


    const getAllInactive = () => {

        const requestData = {
            entity_id: EntityID,
        }

        commonService.add(apiUrlsService.getAllInactiveChartofAccounts, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                    } else {
                        swal(response.data.error);
                        // setInactive([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };



    const getAllActive = (id) => {

        commonService.update(`${apiUrlsService.getActiveChartofAccounts}/${id}`)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total); // Set total records
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllOthersMap();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllOthersMap();
                    }

                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };




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
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };


    const onSubmitOverride = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,  // Ensure entity_id is a string
            period_id: Id,
            gl_id: selecteGlId,
            override_mapped_to_fsli_id: data.override_mapped_to_fsli_id,
            created_by: auth.login_id,
            is_regroup_previous: false

        };

        const payload = {
            override_mapped_to_fsli_id: data.override_mapped_to_fsli_id,
            is_regroup_previous: false,
            id: selecteGlId,

        }

        if (ids) {
            commonService.update(apiUrlsService.editOverideMap, payload)
                .then((res) => {
                    setOthersMapAdd([...OthersMapAdd, res.data]);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllOthersMap();
                })
                .catch((error) => {
                    if (error.details && error.details.length > 0) {
                        error.details.forEach((detail) => {
                            swal("Validation", `Column: ${detail.column}, Message: ${detail.message}, Value: ${detail.value}`);
                        });
                    }
                    console.error("Error Mani:", error.details);
                });
        }
        else {
            // UPDATE Operation
            // requestData.id = ids; // Ensure the ID is included in the request data
            commonService.add(`${apiUrlsService.addOverideMap}`, requestData)

                .then((res) => {
                    const updatedOthersMap = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setOthersMap(updatedOthersMap);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseOverride();
                    getAllOthersMap();
                })
                .catch((error) => {
                    swal(error.message) // Log the error to see its structure


                });
        }
    };




    const handleClose = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShow(false)
        reset(); // Reset the form state
        resetAllForms();

        setShowDeleteButton(false);

    }

    const handleCloseOverride = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowOverride(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleCloseTally = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowTally(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleCloseZoho = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowZoho(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleCloseExcel = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowExcel(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleCloseBulk = () => {
        setShowBulk(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleShowEdit = (id) => {
        // console.log(OthersMap, "this is the id for id");

        const itemToEdit = OthersMap.find((item) => item.id === id);
        // console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setHeader("Update GL");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            setIsEditMode(true);
            // setShow(true);
            reset();


        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Create");
            setHeader("Create a New GL");
            setIds(null);
            setShowDeleteButton(false);
            setIsEditMode(true);
            // setShow(true);
            reset();

        }
        setShow(true);
        reset();
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


    const handleShow = () => {
        // reset();
        setShow(true);
        setTitle("Create");
        setHeader("Create a New GL");
    }

    const handleShowZoho = () => {
        // reset();
        setShowZoho(true);
        setTitle("Add")
    }

    const handleShowExcel = () => {
        // reset();
        setShowExcel(true);
        setTitle("Add")
    }

    const handleShowTally = () => {
        // reset();
        setShowTally(true);
        setTitle("Add")
    }


    // const handleShowOverride = () => {
    //     // reset();
    //     setShowOverride(true);
    //     setTitle("Add")
    // }

    const handleShowOverride = (id, gl_name) => {
        // console.log(OthersMap, "this is the id for id");

        const itemToEdit = OthersMap.find((item) => item.id === id);
        // console.log(itemToEdit, "this is the id for edit");

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setIds(itemToEdit.id);
            setIsEditMode(true);
            // setShow(true);
            reset();


        }
        setShowOverride(true);
        setSelecteGlname(gl_name);
        setSelecteGlId(id);


    };

    const handleShowBulk = () => {

        // reset();
        setShowBulk(true);
        setTitle("Add")
    }

    // const handleShowEdit = (id) => {
    //     const itemToEdit = OthersMap.find((item) => item.id === id);
    //     console.log("Item to Edit:", itemToEdit);
    //     setEditData(itemToEdit);
    //     setTitle("Edit");
    //     setIds(itemToEdit.id);
    //     setShow(true);
    //     setIsEditMode(true);
    //     reset();
    // };

    const handleShowToggle = () => {
        setShowActive(!showActive);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setOthersMap([]);
            getAllOthersMap();
        }
    };


    const [values, setValues] = useState('No'); // Default value as 'No'

    // Simulating fetching data or passing external file options
    useEffect(() => {
        if (datas && datas.length > 0) {
            // Assuming the data provides 'Yes' or 'No' value
            setValues(datas[0]); // Example: set initial value based on data
        }
    }, [datas]);

    const handleChange = () => {
        setValues(prevValue => (prevValue === 'Yes' ? 'No' : 'Yes'));
    };

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            padding: '0px 0px',
            height: '24px',

        },
        input: {
            border: 'none',
            outline: 'none',
            flex: 1,
            padding: '0px',
            maxHeight: '0px',
        },
        icon: {
            color: '#999',
            cursor: 'pointer',
            padding: '4px 4px 4px 0px'
        },
    };

    const [searchGlName, setSearchGlName] = useState('');
    const [searchFallingUnder, setSearchFallingUnder] = useState('');
    const [searchFsliMaster, setSearchFasiMaster] = useState('');
    const [searchGlCode, setSearchGlCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleReset = () => {
        setSearchGlName('');
        setSearchGlCode('');
        setSearchFallingUnder('');
        setSearchFasiMaster('');
        getAllOthersMap();
    };

    const handlesetSearchGlname = (event) => {
        setSearchGlName(event.target.value);
    };


    return (
        <div className="">

            <div className="table-top-area d-flex justify-content-between custom-table-search">

                <div className="form-check form-switch d-flex align-items-center gap-1 table-list-status">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="statusToggle"
                        checked={showActive}
                        onChange={() => setShowActive(!showActive)}

                    />
                    <label className="" htmlFor="statusToggle">
                        {showActive ? 'Mapped' : 'Unmapped'}
                    </label>


                    <button
                        style={{ display: selectedItems.length > 0 ? 'inline-block' : 'none' }}
                        onClick={() => handleShowBulk()}
                        className="btn btn-sm btn-outline-primary"
                    >
                        Mapped Seleted GL
                    </button>
                </div>



                <div className="d-flex">

                    <div className="position-relative mx-2" style={{ width: '250px' }}>
                        {/* <input
                            type="text"
                            placeholder="Search..."
                            className="form-control pe-4"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
                            style={{ cursor: 'pointer' }}
                        >
                            <Search size={'18'} className="" />
                        </span> */}
                    </div>


                    <div className="d-flex align-items-center gap-2">


                        <button
                            type="button"
                            className=" btn  btn-outline-secondary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowTally()}
                        >
                            <Plus size={15} />
                            <img src="/assets/tally.png" alt="Zoho Logo" width={'50'} />

                        </button>

                        <button
                            type="button"
                            className=" btn btn-outline-secondary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowZoho()}
                        >
                            <Plus size={15} />
                            <img src="/assets/zoho.png" alt="Zoho Logo" width={'50'} />
                        </button>
                        <button
                            type="button"
                            className=" btn  btn-outline-secondary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowExcel()}
                        >
                            <Plus size={15} />
                            <img src="/assets/excel.png" alt="Zoho Logo" width={'50'} />
                        </button>

                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShow()}
                        >
                            <Plus size={15} /> Create New GL
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th>
                                <input
                                    type="checkbox"
                                    checked={displayed.every(item => item.selected)}
                                    onChange={handleSelectAll}
                                    className="h-auto"
                                />

                            </th>
                            <th width="8%" onClick={() => handleSort('sno')}>
                                S.No {getSortingIcon('sno')}
                            </th>
                            <th onClick={() => handleSort('gl_name')}>
                                GL Name {getSortingIcon('gl_name')}
                            </th>
                            <th onClick={() => handleSort('gl_code')}>
                                GL Code {getSortingIcon('gl_code')}
                            </th>
                            <th onClick={() => handleSort('falling_under_name')}>
                                Falling GL Group {getSortingIcon('falling_under_name')}
                            </th>
                            <th onClick={() => handleSort('flsi_master_name')}>
                                Map to FSLI {getSortingIcon('flsi_master_name')}
                            </th>

                            <th>Action</th>

                        </tr>
                        <tr className="inline-col-search">

                            <th> </th>
                            <th> </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchGlName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchGlName(value);
                                            getAllOthersMap('gl_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchGlCode}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchGlCode(value);
                                            getAllOthersMap('gl_code', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchFallingUnder}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchFallingUnder(value);
                                            getAllOthersMap('falling_under_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchFsliMaster}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchFasiMaster(value);
                                            getAllOthersMap('flsi_master_name', value);


                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>

                            <th className="text-center">
                                <button className=" btn btn-sm p-0 px-2" onClick={handleReset}> <RefreshCcw size={16} /> </button>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayed) && displayed.length > 0 ? (
                            displayed.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr className="tr-hover-effect1" key={item.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={item.selected || false}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="h-auto"
                                            />
                                        </td>
                                        <td onClick={() => handleShowEdit(item.id)}>{sNo}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.gl_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.gl_code}</td>

                                        <td onClick={() => handleShowEdit(item.id)}>{item.falling_under_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.flsi_master_name}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleShowOverride(item.id, item.gl_name)}
                                            >
                                                <IconSwitchHorizontal size={16} />
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>

            <div className="d-flex justify-content-between custom-pagination">
                <div className="show-records">
                    <span>
                        Showing {(pageno - 1) * records + 1} to{" "}
                        {totalElements < pageno * records ? totalElements : pageno * records} of {totalElements} entries
                    </span>
                </div>
                <div>
                    <Pagination
                        totalElements={totalElements}
                        recordsPerPage={records}
                        pageNumber={pageno}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <div className="model_box">
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
                                        <div className=" ">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0 ">
                                                    Map to Fsli  <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="mappted_to_fsli_id"
                                                        control={formMap.control}
                                                        defaultValue={editData ? editData.mappted_to_fsli_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={fslimaster}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={fslimaster.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.mappted_to_fsli_id && <span className="text-danger">This field is required.</span>}
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
                                <button type="button" onClick={() => getAllActive(editData?.id)} className="btn btn-sm btn-success">
                                    Active
                                </button>
                            )}

                        </Modal.Footer>
                    </form>

                </Modal>
            </div>

            {/* // Bulk Modal */}

            <div className="model_box">
                <Modal
                    show={showBulk}
                    onHide={handleCloseBulk}
                    top
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    ClassName="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {isEditMode ? "Mapped Seleted GL" : "Mapped Seleted GL"} </Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formBulk.handleSubmit(onSubmitBulk)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0  modalstart">


                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        <div className="col-md-12 text-left mt-1">
                                            <label>
                                                Fsli Master <span className="text-danger">*</span>
                                            </label>
                                            <Controller
                                                name="mappted_to_fsli_id"
                                                control={formBulk.control}
                                                defaultValue={editData ? editData.mappted_to_fsli_id : ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                        {...field}
                                                        options={fslimaster}
                                                        isSearchable={true} // Enables search functionality
                                                        placeholder="Select "
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={fslimaster.find(option => option.value === field.value)}


                                                    />
                                                )}
                                            />
                                            {errors.mappted_to_fsli_id && <span className="text-danger">This field is required.</span>}
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
                                    <button className="btn btn-sm btn-success">
                                        {title}
                                    </button>
                                </>
                            ) : (
                                <button type="button" onClick={() => getAllActive(editData?.id)} className="btn btn-sm btn-success">
                                    Active
                                </button>
                            )}
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>

            {/* //Override  Model*/}

            <div className="model_box">
                <Modal
                    show={showOverride}
                    onHide={handleCloseOverride}
                    centered
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="md-width-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Override of <span className="theme-text2"> {selecteGlname} </span> </Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formOverride.handleSubmit(onSubmitOverride)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">

                                        {/* FY Display (Readonly) */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    FY <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control"
                                                    value={Finyear}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        {/* Override Fsli Dropdown */}
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Override Fsli <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="override_mapped_to_fsli_id"
                                                        control={formOverride.control}
                                                        defaultValue={editData ? editData.override_mapped_to_fsli_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={fslimaster}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={fslimaster.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.override_mapped_to_fsli_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>

                                        {/* Is Regroup Previous - Switch */}
                                        <div className="  ">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Is Regroup Previous <span className="text-danger">*</span>
                                                </label>

                                                <div className="flex-grow-1 table-list-status">
                                                    <div className="form-check form-switch d-flex align-items-center gap-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="customSwitch1"
                                                            checked={values === 'Yes'}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="customSwitch1">
                                                            {values}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
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
                                    <button className="btn btn-sm btn-success">
                                        {title}
                                    </button>
                                </>
                            ) : (
                                <button type="button" onClick={() => getAllActive(editData?.id)} className="btn btn-sm btn-success">
                                    Active
                                </button>
                            )}
                        </Modal.Footer>
                    </form>


                </Modal>
            </div>

            {/* //Tally Model */}

            <div className="model_box">
                <Modal
                    show={showTally}
                    onHide={handleCloseTally}
                    top
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Tally" : "Tally"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            {/* Displaying "Coming Soon" message */}
                            <h4 className="text-center" style={{ color: "gray", fontSize: "20px", fontWeight: "bold" }}>
                                Coming Soon
                            </h4>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {/* //ZOHO Model */}

            <div className="model_box">
                <Modal
                    show={showZoho}
                    onHide={handleCloseZoho}
                    top
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Zoho" : "Zoho"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            {/* Displaying "Coming Soon" message */}
                            <h4 className="text-center" style={{ color: "gray", fontSize: "20px", fontWeight: "bold" }}>
                                Coming Soon
                            </h4>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* Excel model */}

            <div className="model_box">
                <Modal
                    show={showExcel}
                    onHide={handleCloseExcel}
                    top
                    size="mx"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Excel" : "Excel"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            {/* Displaying "Coming Soon" message */}
                            <h4 className="text-center" style={{ color: "gray", fontSize: "20px", fontWeight: "bold" }}>
                                Coming Soon
                            </h4>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>


        </div >
    );
};

export default OthersMap;
