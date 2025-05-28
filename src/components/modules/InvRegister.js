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
import GLModal from "../commonpopups/GLModal";
import apiUrlsModulesService from "../../services/apiUrlsModules.service";

const InvRegister = ({ datas }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isManualPaging, setIsManualPaging] = useState(false);
    const [searchColObj, setsearchColObj] = useState("");
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
    const [showInvRegister, setShowInvRegister] = useState(false);

    const [showOverride, setShowOverride] = useState(false);
    const [title, setTitle] = useState("Add");
    const [header, setHeader] = useState("Create a New GL");
    const [isEditMode, setIsEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const [FrameworkID, setFrameworkID] = useState("");
    const [Finyear, setFinYear] = useState("");
    const [PeriodId, setPeriodId] = useState("");

    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [BulkMap, setBulkMap] = useState([]);
    const active = OthersMap.filter(item => item.is_active);
    const inactive = OthersMap.filter(item => !item.is_active);
    const displayed = showActive ? active : inactive;
    const [selecteGlname, setSelecteGlname] = useState(null);
    const [selecteGlId, setSelecteGlId] = useState(null);
    const [investeeTypeDropDown, setinvesteeTypeDropDown] = useState([]);
    const [instrumentTypeDropDown, setinstrumentTypeDropDown] = useState([]);
    const [mesurementTypeDropDown, setmesurementTypeDropDown] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [searchInvestmentName, setsearchInvestmentName] = useState('');
    const [searchInstrumentFrom, setsearchInstrumentFrom] = useState('');
    const [searchInstrumentTo, setsearchInstrumentTo] = useState('');
    const [searchInvestmentDate, setsearchInvestmentDate] = useState('');
    const [searchGVI, setsearchGVI] = useState('');
    const [searchPFD, setsearchPFD] = useState('');
    const [searchCV, setsearchCV] = useState('');
    const [searchIT, setsearchIT] = useState('');
    const [searchInsT, setsearchInsT] = useState('');
    const [searchMT, setsearchMT] = useState('');

    //let searchColObj = {};
    const [fsliList, setFsliList] = useState([]);
    const [selectedGl, setSelectedGl] = useState(null);
    const [InvRegisterAdd, setInvRegisterAdd] = useState([]);

    // Sorting function
    /*const handleSort = (column) => {
        alert(column)
        alert(sortDir)       
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';
        setSortOn(column);
        setSortDir(newSortDir);
        alert(newSortDir)

        getAllListings(); // call API again after sort change
    };
    */


    const handleSort = (column) => {
        const newSortDir = sortOn === column && sortDir === 'ASC' ? 'DESC' : 'ASC';

        // Immediately use the new values in the API call
        setSortOn(column);
        setSortDir(newSortDir);

        getAllListings("", "", column, newSortDir); // pass explicitly
    };


    // Sorting icon (example basic function)
    /*const getSortingIcon = (column) => {
        if (sortOn !== column) return <ChevronUp size={16} />;
        return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    };
    */
    const getSortingIcon = (column) => {
        if (sortOn === column) {
            return sortDir === 'ASC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
        } else {
            // return <ChevronUp size={16} className="text-muted" />; // Neutral icon for unsorted columns
            return (
                <div style={{ lineHeight: '1', fontSize: '10px', color: '#ccc' }}>
                    ▲<br />▼
                </div>
            );
        }
    };

    useEffect(() => {
        getAllInstrumentsDropDown();
        getAllMeasurementsDropDown();
        getAllInvesteeTypesDropDown();

    }, []); // ✅ Only runs first time


    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());
        setFinYear(tokenService.getPeriodName());
        setPeriodId(tokenService.getEID());

        if (EntityID) {
            if (!isManualPaging) {
                getAllListings();
            }
        }
    }, [EntityID, pageno, records]);




    const formInvRegister = useForm({
        mode: "onChange",
    });

    const deleteInvestmentRegister = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsModulesService.deleteInvestmentRegister}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming OthersMap is the state that holds the list of accounts
                    const updatedOthersMap = OthersMap.filter((item) => item.id !== id);
                    setOthersMap(updatedOthersMap); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleCloseInvRegister(); // Close modal or any UI element that needs closing
                    getAllListings();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleCloseInvRegister(); // Close modal or any UI element that needs closing
                    getAllListings();

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
        formInvRegister.reset();


    };






    //const getAllListings = (key = "", value = "") => {
    const getAllListings = (key = "", value = "", passedSortOn = sortOn, passedSortDir = sortDir) => {

        setPageNo(1);
        //alert("Venkat")
        // Use direct values instead of waiting for state to update       
        const requestData = {
            entity_id: EntityID,
            key: key,
            value: value,
            searchFilters: {
                investment_name: key === "investment_name" ? value.trim() : searchInvestmentName.trim(),
                instrument_from: key === "instrument_from" ? value.trim() : searchInstrumentFrom.trim(),
                instrument_to: key === "instrument_to" ? value.trim() : searchInstrumentTo.trim(),
                investment_date: key === "investment_date" ? value.trim() : searchInvestmentDate.trim(),
                gross_value_invested: key === "gross_value_invested" ? value.trim() : searchGVI.trim(),
                provision_for_diminution: key === "provision_for_diminution" ? value.trim() : searchPFD.trim(),
                carrying_value: key === "carrying_value" ? value.trim() : searchCV.trim(),
                investee_type_name: key === "investee_type_name" ? value.trim() : searchIT.trim(),
                instrument_type_name: key === "instrument_type_name" ? value.trim() : searchInsT.trim(),
                measurement_type_name: key === "measurement_type_name" ? value.trim() : searchMT.trim(),
            },
            sortOn: passedSortOn,
            sortDir: passedSortDir,
        };
        // searchColObj = requestData;
        console.log("SEARCH VV", searchColObj)
        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsModulesService.getAllInvestmentRegisterList}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
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

    // const getAllListingsDropdwon = () => {
    //     const requestData = {
    //         entity_id: EntityID,
    //     };

    //     commonService.add(`${apiUrlsService.getAllOthresMap}`, requestData)
    //         .then((response) => {
    //             console.log("API:", response.data);

    //             if (response && response.data) {
    //                 if (Array.isArray(response.data.data)) {
    //                     const filteredData = response.data.data;

    //                     // Transform the filtered data to match the Select component format
    //                     const transformedData = filteredData.map(item => ({
    //                         value: item.mappted_to_fsli_id,
    //                         label: item.flsi_master_name
    //                     }));

    //                     // setOthersMapDropDown(transformedData);
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
                        getAllListings();
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
                        getAllListings();
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


    const handlePageChange = (newPageNumber) => {
        // setPageNo(newPageNumber);
        //alert("ok aka")
        //  const requestData = searchColObj

        setIsManualPaging(true); // 🔥 tell React: I'm handling manually now
        setPageNo(newPageNumber);


        const status = showActive ? 1 : 0;

        commonService.add(`${apiUrlsModulesService.getAllInvestmentRegisterList}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setOthersMap(response.data.data);
                        setTotalElements(response.data.total);
                        setIsManualPaging(false); // ✅ After success, allow default API again
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





    const getAllInstrumentsDropDown = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsModulesService.getInstrumentsDropDown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.instrument_type_name
                        }));

                        setinstrumentTypeDropDown(transformedData);
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


    const getAllMeasurementsDropDown = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsModulesService.getMeasurementDropDown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.measurement_type_name
                        }));

                        setmesurementTypeDropDown(transformedData);
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

    const getAllInvesteeTypesDropDown = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsModulesService.getInvesteeTypesDropDown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.investee_type_name
                        }));

                        setinvesteeTypeDropDown(transformedData);
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
                        getAllListings();
                    } else {
                        swal("Success", "Active successfully!", "success");
                        handleClose(); // Close modal or any UI element that needs closing
                        getAllListings();
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
                    getAllListings();
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
                    getAllListings();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


                });
        }
    };


    const onSubmitInvRegister = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,
            period_id: PeriodId,
            created_by: auth.login_id,
            // location_id: data.location_id, 
            is_current: false,
            is_fully_paid: false,
            is_exercised: false
        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsModulesService.addInvestmentRegister, requestData)
                .then((res) => {
                    setInvRegisterAdd([...InvRegisterAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseInvRegister();
                    getAllListings();
                })
                .catch((error) => {
                    swal(error.error);

                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsModulesService.editInvestmentRegister}`, requestData)

                .then((res) => {
                    const updatedInvestmentRegister = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setInvRegisterAdd(updatedInvestmentRegister);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseInvRegister();
                    getAllListings();
                })
                .catch((error) => {
                    console.error("Error:", error);  // Log the error to see its structure


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

    const handleCloseInvRegister = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowInvRegister(false)
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
        console.log(OthersMap, "this is the id for id");

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
        setShowInvRegister(true);
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




    const handleShowInvRegister = () => {
        // reset();
        setShowInvRegister(true);
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
            getAllListings();
        }
    };


    const [values, setValues] = useState('No'); // Default value as 'No'






    const handleReset = () => {
        setsearchInvestmentName('');
        setsearchInstrumentFrom('');
        setsearchInstrumentTo('');
        setsearchInvestmentDate('');
        setsearchGVI('');
        setsearchPFD('');
        setsearchCV('');
        setsearchIT('');
        setsearchInsT('');
        setsearchMT('');
        getAllListings();
    };

    // const handlesearchInvestmentName = (event) => {
    //     setsearchInvestmentName(event.target.value);
    // };





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
                        {showActive ? 'Active' : 'Inactive'}
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
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowInvRegister()}
                        >
                            <Plus size={15} /> Create
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
                            <th onClick={() => handleSort('investment_name')}>
                                Investment Name {getSortingIcon('investment_name')}
                            </th>
                            <th onClick={() => handleSort('instrument_from')}>
                                Instrument From {getSortingIcon('instrument_from')}
                            </th>
                            <th onClick={() => handleSort('instrument_to')}>
                                Instrument To{getSortingIcon('instrument_to')}
                            </th>
                            <th onClick={() => handleSort('investment_date')}>
                                Investment Date {getSortingIcon('investment_date')}
                            </th>
                            <th onClick={() => handleSort('gross_value_invested')}>
                                Gross Value Invested {getSortingIcon('gross_value_invested')}
                            </th>
                            <th onClick={() => handleSort('provision_for_diminution')}>
                                Provision For Diminution {getSortingIcon('provision_for_diminution')}
                            </th>
                            <th onClick={() => handleSort('carrying_value')}>
                                Carrying Value {getSortingIcon('carrying_value')}
                            </th>
                            <th onClick={() => handleSort('investee_type_name')}>
                                Investee Type Name {getSortingIcon('investee_type_name')}
                            </th>
                            <th onClick={() => handleSort('instrument_type_name')}>
                                Instrument Type Name {getSortingIcon('instrument_type_name')}
                            </th>
                            <th onClick={() => handleSort('measurement_type_name')}>
                                Measurement Type Name {getSortingIcon('measurement_type_name')}
                            </th>

                            <th>Action</th>

                        </tr>
                        <tr className="inline-col-search">

                            <th className="bg_white"> </th>
                            <th> </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchInvestmentName}
                                        onChange={(e) => {
                                            const newvalue = e.target.value;
                                            setsearchInvestmentName(newvalue);
                                            getAllListings("investment_name", newvalue);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>

                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchInstrumentFrom}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchInstrumentFrom(value);
                                            getAllListings('instrument_from', value);
                                        }}
                                        className="form-control table-col-search"
                                    />

                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchInstrumentTo}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchInstrumentTo(value);
                                            getAllListings('instrument_to', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchInvestmentDate}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchInvestmentDate(value);
                                            getAllListings('investment_date', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchGVI}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchGVI(value);
                                            getAllListings('gross_value_invested', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchPFD}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchPFD(value);
                                            getAllListings('provision_for_diminution', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchCV}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchCV(value);
                                            getAllListings('carrying_value', value);
                                        }}
                                        className="form-control table-col-search"
                                    />

                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchIT}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchIT(value);
                                            getAllListings('investee_type_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />

                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchInsT}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchInsT(value);
                                            getAllListings('instrument_type_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
                                </div>
                            </th>

                            <th>
                                <div className="input-group data-search">
                                    <input
                                        type="text"
                                        value={searchMT}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchMT(value);
                                            getAllListings('measurement_type_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                    <div className="input-search-icon">
                                        <Search className="" />
                                    </div>
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
                                        <td onClick={() => handleShowEdit(item.id)}>{item.investment_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.instrument_from}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.instrument_to}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.investment_date}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.gross_value_invested}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.provision_for_diminution}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.carrying_value}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.investee_type_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.instrument_type_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.measurement_type_name}</td>
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


            {/* <GLModal
                show={show}
                handleClose={handleClose}
                deleteGL={deleteGL}
                title={selectedGl ? "Update" : "Create"}
                isEditMode={!!selectedGl}
                editData={editData}
                fslimaster={fsliList}
                fallingunder={fallingunder}
                showDeleteButton={!!editData}
                showActive={true}
                EntityID={EntityID}
                loginId={auth.login_id}
                ids={selectedGl?.id}
                setOthersMap={setOthersMap}
                setOthersMapAdd={setOthersMapAdd}
                OthersMapAdd={OthersMapAdd}
                OthersMap={OthersMap}
                getAllListings={getAllListings}
                // onSubmitOverride={onSubmitOverride}
            /> */}




            {/* //Investment Register Model */}

            <div className="model_box">
                <Modal
                    show={showInvRegister}
                    onHide={handleCloseInvRegister}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Register" : "Register"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formInvRegister.handleSubmit(onSubmitInvRegister)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Investment Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Investment Name"
                                                    className="form-control"
                                                    {...formInvRegister.register("investment_name", { required: true })}
                                                    defaultValue={editData ? editData.investment_name : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Instrument From <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Instrument From"
                                                    className="form-control"
                                                    {...formInvRegister.register("instrument_from", { required: true })}
                                                    defaultValue={editData ? editData.instrument_from : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Instrument To <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Instrument To"
                                                    className="form-control"
                                                    {...formInvRegister.register("instrument_to", { required: true })}
                                                    defaultValue={editData ? editData.instrument_to : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Investment Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    placeholder="Enter Investment Date"
                                                    className="form-control"
                                                    {...formInvRegister.register("investment_date", { required: true })}
                                                    defaultValue={editData ? editData.investment_date : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Gross Value Invested <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Gross Value Invested"
                                                    className="form-control"
                                                    {...formInvRegister.register("gross_value_invested", { required: true })}
                                                    defaultValue={editData ? editData.gross_value_invested : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Provision For Diminution <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Provision For Diminution"
                                                    className="form-control"
                                                    {...formInvRegister.register("provision_for_diminution", { required: true })}
                                                    defaultValue={editData ? editData.provision_for_diminution : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Carrying Value <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Carrying Value"
                                                    className="form-control"
                                                    {...formInvRegister.register("carrying_value", { required: true })}
                                                    defaultValue={editData ? editData.carrying_value : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Investee Type <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="investee_type_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.investee_type_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={investeeTypeDropDown}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={investeeTypeDropDown.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.investee_type_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Instrument Type <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="instrument_type_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.instrument_type_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={instrumentTypeDropDown}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={instrumentTypeDropDown.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.instrument_type_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Measurement Type <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="measurement_type_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.measurement_type_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={mesurementTypeDropDown}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={mesurementTypeDropDown.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.measurement_type_id && (
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
                                            onClick={() => deleteInvestmentRegister(editData?.id)}
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



        </div >
    );
};

export default InvRegister;
