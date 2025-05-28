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

const ShareCapital = ({ datas }) => {
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
    const [showShareCaptial, setShareCaptial] = useState(false);
    const [showClassofShare, setClassofShare] = useState(false);

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
    const [modeofissuedrop, setModeofIssuedrop] = useState([]);
    const [typeofconsiderdrop, settypeofconsiderdrop] = useState([]);
    const [typeofshareholder, setTypeofshareholderdrop] = useState([]);
    const [typeofsharedrop, setTypeofsharedrop] = useState([]);
    const [classofSharedrop, setClassofSharedrop] = useState([]);
    const [Shareholderdrop, setShareholderdrop] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [searchToSN, setsearchTypeOfshareName] = useState('');
    const [searchCoSN, setsearchClassOfshareName] = useState('');
    const [searchMoIn, setsearchMOIN] = useState('');
    const [searchTOTN, setsearchToCN] = useState('');
    const [searchTOSN, setsearchTOSN] = useState('');
    const [searchPN, setsearchPN] = useState('');
    const [searchNoOfShares, setsearchNoOfsaahres] = useState('');
    const [searchIV, setsearchIV] = useState('');
    const [searchFVPS, setsearchFVPS] = useState('');


    //let searchColObj = {};
    const [fsliList, setFsliList] = useState([]);
    const [selectedGl, setSelectedGl] = useState(null);
    const [InvRegisterAdd, setInvRegisterAdd] = useState([]);
    const [ClassofShareAdd, setClassofShareAdd] = useState([]);

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




        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
        setFrameworkID(tokenService.getFrameworkID());
        setFinYear(tokenService.getPeriodName());
        setPeriodId(tokenService.getEID());

        getAlltypeofsharedrop();
        getAllshareholderdrop();
        getAllClassofsharedrop();
        getAllmodeofissuesdrop();
        getAlltypeofconsiderdrop();
        getAlltypeofshareholderdrop();

        if (EntityID) {
            if (!isManualPaging) {
                getAllListings();
            }
        }
    }, [EntityID, pageno, records]);


    console.log("EntityID", EntityID);



    const formInvRegister = useForm({
        mode: "onChange",
    });

    const formClassofShare = useForm({
        mode: "onChange",
    });

    const deletesharecaptial = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsModulesService.deletesharecaptial}/${id}`;

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

    const resetAllFormsClassofShare = () => {
        formClassofShare.reset();

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
                investment_name: key === "investment_name" ? value.trim() : searchToSN.trim(),
                instrument_from: key === "instrument_from" ? value.trim() : searchCoSN.trim(),
                instrument_to: key === "instrument_to" ? value.trim() : searchMoIn.trim(),
                investment_date: key === "investment_date" ? value.trim() : searchTOTN.trim(),
                gross_value_invested: key === "gross_value_invested" ? value.trim() :
                    searchTOSN.trim(),
                provision_for_diminution: key === "provision_for_diminution" ? value.trim() : searchPN.trim(),
                carrying_value: key === "carrying_value" ? value.trim() : searchNoOfShares.trim(),
                investee_type_name: key === "investee_type_name" ? value.trim() : searchIV.trim(),
                instrument_type_name: key === "instrument_type_name" ? value.trim() : searchFVPS.trim(),

            },
            sortOn: passedSortOn,
            sortDir: passedSortDir,
        };
        // searchColObj = requestData;
        console.log("SEARCH VV", searchColObj)
        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsModulesService.getAllshareRegisterList}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
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

        commonService.add(`${apiUrlsModulesService.getAllshareRegisterList}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
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





    const getAlltypeofsharedrop = () => {


        commonService.getAll(`${apiUrlsModulesService.getAlltypeofsharedrop}`)
            .then((response) => {
                console.log("getAlltypeofsharedrop:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.type_of_share_name
                        }));

                        setTypeofsharedrop(transformedData);
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



    const getAllClassofsharedrop = () => {


        const requestData = {
            entity_id: EntityID,
        };

        console.log(requestData, "requestData");

        commonService.add(`${apiUrlsModulesService.getAllClassofsharedrop}`, requestData)
            .then((response) => {
                console.log("getAllClassofsharedrop:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.class_of_share_name
                        }));

                        setClassofSharedrop(transformedData);
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



    const getAllshareholderdrop = () => {


        const requestData = {
            entity_id: EntityID,
        };


        commonService.add(`${apiUrlsModulesService.getAllshareholderdrop}`, requestData)
            .then((response) => {


                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.party_name
                        }));

                        setShareholderdrop(transformedData);
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



    const getAllmodeofissuesdrop = () => {

        commonService.getAll(`${apiUrlsModulesService.getAllmodeofissuesdrop}`)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.mode_of_issue_name
                        }));

                        setModeofIssuedrop(transformedData);
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


    const getAlltypeofconsiderdrop = () => {

        commonService.getAll(`${apiUrlsModulesService.getAlltypeofconsiderdrop}`)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.type_of_consideration_name
                        }));

                        settypeofconsiderdrop(transformedData);
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


    const getAlltypeofshareholderdrop = () => {

        commonService.getAll(`${apiUrlsModulesService.getAlltypeofshareholderdrop}`)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.type_of_shareholder_name
                        }));

                        setTypeofshareholderdrop(transformedData);
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

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsModulesService.addsharecaptial, requestData)
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


            requestData.id = ids;

            requestData.updated_by = auth.login_id;

            commonService.update(`${apiUrlsModulesService.editsharecaptial}`, requestData)

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


    const onSubmitClassofShare = (data) => {
        const requestData = {
            ...data,
            entity_id: EntityID,
            created_by: auth.login_id,
            // location_id: data.location_id, 

        };

        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsModulesService.addClassofShare, requestData)
                .then((res) => {
                    setClassofShareAdd([...ClassofShareAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseClassofShare();
                    getAllListings();
                })
                .catch((error) => {
                    swal(error.error);

                });
        } else {

            requestData.id = ids;

            requestData.updated_by = auth.login_id;

            commonService.update(`${apiUrlsModulesService.editsharecaptial}`, requestData)

                .then((res) => {
                    const updatedInvestmentRegister = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setClassofShareAdd(updatedInvestmentRegister);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseClassofShare();
                    getAllListings();
                })
                .catch((error) => {
                    console.error("Error:", error);


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
        setShareCaptial(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleCloseClassofShare = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setClassofShare(false)
        reset(); // Reset the form state
        resetAllFormsClassofShare();
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
        setShareCaptial(true);
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




    const handleShowShareCaptial = () => {
        // reset();
        setShareCaptial(true);
        setTitle("Add")
    }


    const handleShowClassofShare = () => {
        // reset();
        setClassofShare(true);
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
        setsearchTypeOfshareName('');
        setsearchClassOfshareName('');
        setsearchMOIN('');
        setsearchToCN('');
        setsearchTOSN('');
        setsearchPN('');
        setsearchNoOfsaahres('');
        setsearchIV('');
        setsearchFVPS('');

        getAllListings();
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
                            onClick={() => handleShowClassofShare()}
                        >
                            <Plus size={15} /> Create Class of Share
                        </button>


                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowShareCaptial()}
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
                            {/* <th>
                                <input
                                    type="checkbox"
                                    checked={displayed.every(item => item.selected)}
                                    onChange={handleSelectAll}
                                    className="h-auto"
                                />

                            </th> */}
                            <th width="8%" onClick={() => handleSort('sno')}>
                                S.No {getSortingIcon('sno')}
                            </th>

                            <th onClick={() => handleSort('date')}>
                                Date {getSortingIcon('date')}
                            </th>
                            <th onClick={() => handleSort('type_of_share_name')}>
                                Type of Share {getSortingIcon('type_of_share_name')}
                            </th>
                            <th onClick={() => handleSort('class_of_share_name')}>
                                Class of Share {getSortingIcon('class_of_share_name')}
                            </th>
                            <th onClick={() => handleSort('mode_of_issue_name')}>
                                Mode of Issue {getSortingIcon('mode_of_issue_name')}
                            </th>
                            <th onClick={() => handleSort('type_of_consideration_name')}>
                                Type of Consideration{getSortingIcon('type_of_consideration_name')}
                            </th>
                            <th onClick={() => handleSort('type_of_shareholder_name')}>
                                Type of Shareholder {getSortingIcon('type_of_shareholder_name')}
                            </th>
                            <th onClick={() => handleSort('party_name')}>
                                Shareholder {getSortingIcon('party_name')}
                            </th>
                            <th onClick={() => handleSort('no_of_shares')}>
                                No. of Shares {getSortingIcon('no_of_shares')}
                            </th>
                            <th onClick={() => handleSort('issue_value')}>
                                Issue Value {getSortingIcon('issue_value')}
                            </th>
                            <th onClick={() => handleSort('for_value_per_shares')}>
                                Value Per Shares {getSortingIcon('for_value_per_shares')}
                            </th>


                            {/* <th>Action</th> */}

                        </tr>
                        <tr className="inline-col-search">

                            {/* <th> </th> */}
                            <th> </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchToSN}
                                        onChange={(e) => {
                                            const newvalue = e.target.value;
                                            setsearchTypeOfshareName(newvalue);
                                            getAllListings('type_of_share_name', newvalue);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchCoSN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchClassOfshareName(value);
                                            getAllListings('class_of_share_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchMoIn}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchMOIN(value);
                                            getAllListings('mode_of_issue_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchTOTN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchToCN(value);
                                            getAllListings('type_of_consideration_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchTOSN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchTOSN(value);
                                            getAllListings('type_of_shareholder_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchPN}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchPN(value);
                                            getAllListings('party_name', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchNoOfShares}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchNoOfsaahres(value);
                                            getAllListings('no_of_shares', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchIV}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchIV(value);
                                            getAllListings('issue_value', value);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchFVPS}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchFVPS(value);
                                            getAllListings('for_value_per_shares', value);
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
                                        {/* <td>
                                            <input
                                                type="checkbox"
                                                checked={item.selected || false}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="h-auto"
                                            />
                                        </td> */}
                                        <td onClick={() => handleShowEdit(item.id)}>{sNo}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.date}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.type_of_share_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.class_of_share_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.mode_of_issue_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.type_of_consideration_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.type_of_shareholder_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.party_name}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.no_of_shares}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.issue_value}</td>
                                        <td onClick={() => handleShowEdit(item.id)}>{item.for_value_per_shares}</td>

                                        {/* <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleShowOverride(item.id, item.gl_name)}
                                            >
                                                <IconSwitchHorizontal size={16} />
                                            </button>

                                        </td> */}
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
                    show={showShareCaptial}
                    onHide={handleCloseInvRegister}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Share Capital" : "Share Capital"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formInvRegister.handleSubmit(onSubmitInvRegister)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">


                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    {...formInvRegister.register("date", { required: true })}
                                                    defaultValue={editData ? editData.date : ""}
                                                />
                                            </div>
                                        </div>




                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Type of Share <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="type_share_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.type_share_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={typeofsharedrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={typeofsharedrop.find(option => option.value === field.value)}
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
                                                    Class of Share <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="class_of_share"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.class_of_share : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={classofSharedrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={classofSharedrop.find(option => option.value === field.value)}
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
                                                    Mode of Issue <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="mode_of_issues"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.mode_of_issues : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={modeofissuedrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={modeofissuedrop.find(option => option.value === field.value)}
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
                                                    Type of Consideration <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="type_of_consideration"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.type_of_consideration : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={typeofconsiderdrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={typeofconsiderdrop.find(option => option.value === field.value)}
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
                                                    Type of Shareholder <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="type_of_share_holder_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.type_of_share_holder_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={typeofshareholder}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={typeofshareholder.find(option => option.value === field.value)}
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
                                                    Shareholder <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="share_holder_id"
                                                        control={formInvRegister.control}
                                                        defaultValue={editData ? editData.share_holder_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={Shareholderdrop}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={Shareholderdrop.find(option => option.value === field.value)}
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
                                                    No of Shares <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter no of Shares"
                                                    className="form-control"
                                                    {...formInvRegister.register("no_of_shares", { required: true })}
                                                    defaultValue={editData ? editData.no_of_shares : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Issue Value <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Issue Value"
                                                    className="form-control"
                                                    {...formInvRegister.register("issue_value", { required: true })}
                                                    defaultValue={editData ? editData.issue_value : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Value par Share <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                    {...formInvRegister.register("for_value_per_shares", { required: true })}
                                                    defaultValue={editData ? editData.for_value_per_shares : ""}
                                                />
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
                                            onClick={() => deletesharecaptial(editData?.id)}
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


            <div className="model_box">
                <Modal
                    show={showClassofShare}
                    onHide={handleCloseClassofShare}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Class of Share" : "Class of Share"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formClassofShare.handleSubmit(onSubmitClassofShare)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">



                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Class of Share
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control"
                                                    {...formClassofShare.register("class_of_share_name", { required: true })}
                                                    defaultValue={editData ? editData.class_of_share_name : ""}
                                                />
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
                                            onClick={() => deletesharecaptial(editData?.id)}
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

export default ShareCapital;
