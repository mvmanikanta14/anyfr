import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Plus, RefreshCcw, Search, ArrowUp, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce, head } from "lodash";
import Select from 'react-select';
import { IconFlagSearch, IconSwitch, IconSwitch2, IconSwitchHorizontal } from "@tabler/icons-react";
import GLModal from "../commonpopups/GLModal";
import apiUrlsModulesService from "../../services/apiUrlsTbDbUploadBatches.service";

const TbDbUploadBatches = ({ datas }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isManualPaging, setIsManualPaging] = useState(false);
    const [searchColObj, setsearchColObj] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [totalElementsUnloaded, setTotalElementsUnloaded] = useState(0);
    const [pageno, setPageNo] = useState(1);
    const [pagenoUnloaded, setPageNoUnloaded] = useState(1);
    const records = 10;
    const [OthersMap, setOthersMap] = useState([]);
    const [OthersMapUnloaded, setOthersMapUnloaded] = useState([]);
    const [ids, setIds] = useState(null);
    const [OthersMapAdd, setOthersMapAdd] = useState([]);
    const [editData, setEditData] = useState(null);
    // State for managing modal visibility
    const [showEditModal, setShowEditModal] = useState(false);
    const [editDataOverride, setEditDataOverride] = useState(null);
    const [show, setShow] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [showAssetsDepn, setShowAssetsDepn] = useState(false);
    const [showexcelShowTb, setshowexcelShowTb] = useState(false);

     const [showexcelShowDb, setshowexcelShowDb] = useState(false);


   const [showOverride, setShowOverride] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
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
    const [excelShowAssetsDepns, setexcelShowAssetsDepns] = useState(false);
    const [BulkMap, setBulkMap] = useState([]);
    const active = OthersMap.filter(item => item.is_active);
    const inactive = OthersMap.filter(item => !item.is_active);
    const displayed = showActive ? active : inactive;
    const [selecteGlname, setSelecteGlname] = useState(null);
    const [selecteGlId, setSelecteGlId] = useState(null);
    const [CategoryDropDown, setCategoryDropDown] = useState([]);
    const [SubCategoryDropDown, setSubCategoryDropDown] = useState([]);
    const [BlockDropDown, setBlockDropDown] = useState([]);
    const [locations, setLocations] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [sortOn, setSortOn] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [batchName, setbatchName] = useState('');
    const [searchAssetDescription, setsearchAssetDescription] = useState('');
    const [searchPurchaseDate, setsearchPurchaseDate] = useState('');
    const [searchPurchaseCost, setsearchPurchaseCost] = useState('');
    const [searchSalvageValue, setsearchSalvageValue] = useState('');
    const [searchUsefulLife, setsearchUsefulLife] = useState('');
    const [searchRemarks, setsearchRemarks] = useState('');
    const [searchCategory, setsearchCategory] = useState('');
    const [searchSubCategory, setsearchSubCategory] = useState('');
    const [searchBlock, setsearchBlock] = useState('');
    const [searchLocation, setsearchLocation] = useState('');
   
    //let searchColObj = {};
    const [fsliList, setFsliList] = useState([]);
    const [selectedGl, setSelectedGl] = useState(null);
    const [AssetsDepnAdd, setAssetsDepnAdd] = useState([]);

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
        getAllListingsUnloaded("", "", column, newSortDir); // pass explicitly
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

        if (EntityID) {
            if (!isManualPaging) {
                getAllListings(); 
                getAllListingsUnloaded();              
            }
        }       
    }, [EntityID, pageno, records]);



    useEffect(() => { 
        setEntityID(tokenService.getEntityID());      
        getAllCategoryDropDown();
        getAllBlockDropDown();
        getAllLocations();

      
       
   }, [EntityID]); // ✅ Only runs first time



    


    const formAssetsDepn = useForm({
        mode: "onChange",
    });
   const downloadExcelSampleFile = () => {
  const downloadExcelUrl = `${apiUrlsModulesService.downloadsamplefile}`;
  console.log("Download URL:", downloadExcelUrl); // ← Check this in browser console
  window.location.href = downloadExcelUrl;
 // window.open(downloadExcelUrl, '_blank');
};

    const deleteAssetsDepn = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsModulesService.deleteAssetsDepn}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming OthersMap is the state that holds the list of accounts
                    const updatedOthersMap = OthersMap.filter((item) => item.id !== id);
                    setOthersMap(updatedOthersMap); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleCloseAssetsDepn(); // Close modal or any UI element that needs closing
                    getAllListings();
                } else {
                    swal("Success", "Deleted successfully!", "success");
                    handleCloseAssetsDepn(); // Close modal or any UI element that needs closing
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
        formAssetsDepn.reset();


    };



 const [categoryId, setCategoryId] = useState(editData?.category_id || '');


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
                asset_code: key === "asset_code" ? value.trim() : batchName.trim(),
                asset_description: key === "asset_description" ? value.trim() : searchAssetDescription.trim(),
                purchase_date: key === "purchase_date" ? value.trim() : searchPurchaseDate.trim(),
                purchase_cost: key === "purchase_cost" ? value.trim() : searchPurchaseCost.trim(),
                salvage_value: key === "salvage_value" ? value.trim() : searchSalvageValue.trim(),
                useful_life: key === "useful_life" ? value.trim() : searchUsefulLife.trim(),
                remarks: key === "remarks" ? value.trim() : searchRemarks.trim(),
                category_name: key === "category_name" ? value.trim() : searchCategory.trim(),
                sub_category_name: key === "sub_category_name" ? value.trim() : searchSubCategory.trim(),
                block_name: key === "block_name" ? value.trim() : searchBlock.trim(),
                location_name: key === "location_name" ? value.trim() : searchLocation.trim(),
            },
            sortOn: passedSortOn,
            sortDir: passedSortDir,
        };
        // searchColObj = requestData;
        console.log("SEARCH VV", searchColObj)
        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsModulesService.getAllUnloadedTBDBList}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API:", response.data);
                setShowEditModal(false); // Set the modal visibility to false

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



    const getAllListingsUnloaded = (key = "", value = "", passedSortOn = sortOn, passedSortDir = sortDir) => {
       
        setPageNoUnloaded(1);
        //alert("Venkat")
        // Use direct values instead of waiting for state to update       
        const requestData = {
            entity_id: EntityID,
            key: key,
            value: value,
            searchFilters: {
                asset_code: key === "asset_code" ? value.trim() : batchName.trim(),
                asset_description: key === "asset_description" ? value.trim() : searchAssetDescription.trim(),
                purchase_date: key === "purchase_date" ? value.trim() : searchPurchaseDate.trim(),
                purchase_cost: key === "purchase_cost" ? value.trim() : searchPurchaseCost.trim(),
                salvage_value: key === "salvage_value" ? value.trim() : searchSalvageValue.trim(),
                useful_life: key === "useful_life" ? value.trim() : searchUsefulLife.trim(),
                remarks: key === "remarks" ? value.trim() : searchRemarks.trim(),
                category_name: key === "category_name" ? value.trim() : searchCategory.trim(),
                sub_category_name: key === "sub_category_name" ? value.trim() : searchSubCategory.trim(),
                block_name: key === "block_name" ? value.trim() : searchBlock.trim(),
                location_name: key === "location_name" ? value.trim() : searchLocation.trim(),
            },
            sortOn: passedSortOn,
            sortDir: passedSortDir,
        };
        // searchColObj = requestData;
        console.log("SEARCH VV", searchColObj)
        const status = showActive ? 1 : 0;
        setsearchColObj(requestData);

        commonService.add(`${apiUrlsModulesService.getAllUnloadedTBDBListUnloaded}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
            .then((response) => {
                console.log("API:", response.data);
                setShowEditModal(false); // Set the modal visibility to false

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {

                        setOthersMapUnloaded(response.data.data);
                        setTotalElementsUnloaded(response.data.total);
                    } else {
                        swal(response.data.error);
                        setOthersMapUnloaded([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
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

        commonService.add(`${apiUrlsModulesService.getAllUnloadedTBDBList}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
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


    const getAllLocations = () => {
          const requestData = {
              entity_id: EntityID,
          };
  
          commonService.add(apiUrlsModulesService.getAllLocationDropdown, requestData)
              .then((response) => {
                  if (response && response.data) {
                      console.log("mani", response.data);
                      const transformedData = response.data.data.map(item => ({
                          value: item.id,
                          label: item.location_name
                      }));
                      setLocations(transformedData);
                  }
              })
              .catch((error) => {
                  console.error("API call failed: ", error);
              });
      };
  


    const  getAllCategoryDropDown = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsModulesService.getCategoryDropDown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.category_name
                        }));

                        setCategoryDropDown(transformedData);
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

    const  getAllBlockDropDown = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(`${apiUrlsModulesService.getBlockDropDown}`, requestData)
            .then((response) => {
                console.log("API:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        const filteredData = response.data.data;

                        // Transform the filtered data to match the Select component format
                        const transformedData = filteredData.map(item => ({
                            value: item.id,
                            label: item.block_name
                        }));

                        setBlockDropDown(transformedData);
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


const [subCategoryValue, setSubCategoryValue] = useState(null);

/*
useEffect(() => {
    const requestData = {
        entity_id: EntityID,
        category_id: categoryId
    };

    commonService
        .add(`${apiUrlsModulesService.getSubCategoryDropDown}`, requestData)
        .then((response) => {
            if (response && response.data && Array.isArray(response.data.data)) {
                const transformedData = response.data.data.map(item => ({
                    value: item.id,
                    label: item.sub_category_name
                }));
                setSubCategoryDropDown(transformedData);

                // Set selected value if in edit mode
                if (editData?.sub_category_id) {
                    const selected = transformedData.find(
                        item => item.value === editData.sub_category_id
                    );
                    setSubCategoryValue(selected ? selected.value : null);
                }
                  // Optional: preselect subcategory if needed
      formAssetsDepn.setValue('sub_category_id', editData.sub_category_id);
            } else {
                swal(response.data?.error || "Invalid response");
                setSubCategoryDropDown([]);
                setSubCategoryValue(null);
            }
        })
        .catch((error) => {
            console.error("API call failed: ", error);
        });
}, [editData?.category_id]);
*/

/*
useEffect(() => {
  if (editData?.category_id) {
    const requestData = {
      entity_id: EntityID,
      category_id: editData.category_id, // use directly from editData
    };

    commonService
      .add(`${apiUrlsModulesService.getSubCategoryDropDown}`, requestData)
      .then((res) => {
        const options = res.map((item) => ({
          value: item.id,
          label: item.sub_category_name,
        }));
        setSubCategoryDropDown(options);

        // Set selected subcategory value
        formAssetsDepn.setValue('sub_category_id', editData.sub_category_id);
        setSubCategoryValue(editData.sub_category_id); // for controlled state
      })
      .catch((error) => {
        console.error("Error loading subcategories:", error);
      });
  }
}, [editData?.category_id]);
*/








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




  

    const onSubmitAssetsDepn = (data) => {
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
            commonService.add(apiUrlsModulesService.addAssetsDepn, requestData)
                .then((res) => {
                    setAssetsDepnAdd([...AssetsDepnAdd, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleCloseAssetsDepn();
                    getAllListings();
                })
                .catch((error) => {
                    swal(error.error);

                });
        } else {
            // UPDATE Operation
            requestData.id = ids; // Ensure the ID is included in the request data
            commonService.update(`${apiUrlsModulesService.updateAssetsDepn}`, requestData)

                .then((res) => {
                    const updatedAssetsDepn = OthersMap.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setAssetsDepnAdd(updatedAssetsDepn);
                    swal("Success", "Updated successfully!", "success");
                    handleCloseAssetsDepn();
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

    const handleCloseAssetsDepn = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShowAssetsDepn(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    
    const handleCloseexcelTb = () => {       
        setshowexcelShowTb(false)
    }

const handleCloseexcelDb = () => {       
        setshowexcelShowDb(false)
    }
    const handleCloseBulk = () => {
        setShowBulk(false)
        reset(); // Reset the form state
        resetAllForms();
        setShowDeleteButton(false);

    }

    const handleShowEdit = async  (id) => {
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

            setShowEditModal(true); // Set the modal visibility to true
           



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
        setShowAssetsDepn(true);
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



    // 2. For Excel Upload Form #1
const {
  register: registerExcel,
  handleSubmit: handleSubmitExcel,
  control: controlExcel,
  formState: { errors: errorsExcel },
} = useForm();

// 3. For Excel Upload Form #2 (DB)
const {
  register: registerExcelDb,
  handleSubmit: handleSubmitExcelDb,
  control: controlExcelDb,
  formState: { errors: errorsExcelDb },
} = useForm();




    const handleShowAssetsDepn = () => {
        // reset();
        setShowAssetsDepn(true);
        setTitle("Add")
    }

     const handleexcelShowTB = () => {
        // reset();
        setshowexcelShowTb(true);
      
    }

    const handleexcelShowDB = () => {
        // reset();
        setshowexcelShowDb(true);
      
    }

    


    // const handleShowOverride = () => {
    //     // reset();
    //     setShowOverride(true);
    //     setTitle("Add")
    // }
    const handleTBBatchLoading  = (id) => {       
                // Use direct values instead of waiting for state to update       
        const requestData = {
            entity_id: EntityID,
            id: id,
            period_id:PeriodId
          
        };
        commonService.add(`${apiUrlsModulesService.LoadTBExcelByBatchId}`, requestData)
            .then((response) => {              

                if (response && response.data) {
                     getAllListings();
                     getAllListingsUnloaded();
                   swal("Success", response.data.message, "success");
                 
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
                 swal("Error", error, "error");
            });
    }
     const handleTBBatchUnLoading  = (id) => {       
                // Use direct values instead of waiting for state to update       
        const requestData = {
            entity_id: EntityID,
            id: id,
            period_id:PeriodId
          
        };
        commonService.add(`${apiUrlsModulesService.UnLoadTBExcelByBatchId}`, requestData)
            .then((response) => {              

                if (response && response.data) {
                     getAllListings();
                    getAllListingsUnloaded();
                   swal("Success", response.data.message, "success");
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
                 swal("Error", error, "error");
            });
    }
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
        setbatchName('');
        setsearchAssetDescription('');
        setsearchPurchaseDate('');
        setsearchPurchaseCost('');
        setsearchSalvageValue('');
        setsearchUsefulLife('');
        setsearchRemarks('');
        setsearchCategory('');
        setsearchSubCategory('');
        setsearchBlock('');
        setsearchLocation('');
        getAllListings();
        getAllListingsUnloaded();
    };




    useEffect(() => {
    if (!categoryId) return;

    const requestData = {
        entity_id: EntityID,
        category_id: categoryId
    };

    commonService.add(`${apiUrlsModulesService.getSubCategoryDropDown}`, requestData)
        .then((response) => {
            if (response && response.data) {
                const filteredData = response.data.data || [];

                const transformedData = filteredData.map(item => ({
                    value: item.id,
                    label: item.sub_category_name
                }));

                setSubCategoryDropDown(transformedData);
            } else {
                setSubCategoryDropDown([]);
                swal(response.data?.error || "Failed to load subcategories");
            }
        })
        .catch((error) => {
            console.error("API call failed: ", error);
        });

}, [categoryId]);



console.log('showEditModal before useEffect:', showEditModal);
console.log('editData?.category_id before useEffect:', editData?.category_id);
useEffect(() => {
  // Check if modal is open and category_id is available
  console.log('showEditModal:', showEditModal);
  console.log('editData?.category_id:', editData?.category_id);

  if (showEditModal && editData?.category_id) {
    const requestData = {
      entity_id: EntityID,
      category_id: editData.category_id,
    };

    console.log('Request Data:', requestData);

    commonService
      .add(`${apiUrlsModulesService.getSubCategoryDropDown}`, requestData)
      .then((res) => {
        console.log('API Response:', res);
        const filteredData = res.data.data || [];
         const options = filteredData.map(item => ({
                    value: item.id,
                    label: item.sub_category_name
                }));
        
        // Update dropdown options
        setSubCategoryDropDown(options);

        // Set the selected subcategory after options are ready
        formAssetsDepn.setValue('sub_category_id', editData.sub_category_id);
        setSubCategoryValue(editData.sub_category_id);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }
}, [editData?.category_id, showEditModal]); // Dependencies for triggering useEffect



const onSubmitExcel = async (data) => {
  const formData = new FormData();
  formData.append('excel_file', data.excel_file[0]);
  formData.append('entity_id', EntityID);
  formData.append('batch_name', data.batch_name);
  formData.append('location_id', data.location_id);
  formData.append('period_id', PeriodId);
  

try {
  const response = await commonService.upload(`${apiUrlsModulesService.uploadexcelTb}`, formData);
 // alert(response.data.message);  // e.g. "File uploaded and processing started"
  swal("Success", response.data.message, "success");
  setshowexcelShowTb(false);
} catch (error) {
  console.error(error);
  //alert('Upload failed');
   swal("Error", error, "error");
}
};

const onSubmitExcelDb = async (data) => {
  const formData = new FormData();
  formData.append('excel_file', data.excel_file[0]);
  formData.append('entity_id', EntityID);
  formData.append('batch_name', data.batch_name);
  formData.append('location_id', data.location_id);
   formData.append('period_id', PeriodId);
  

try {
  const response = await commonService.upload(`${apiUrlsModulesService.uploadexcelDb}`, formData); 
  swal("Success", response.data.message, "success");
  setshowexcelShowTb(false);
} catch (error) {
  console.error(error);  
   swal("Error", error, "error");
}
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
                           onClick={() => handleexcelShowTB()}
                        >
                            <Plus size={15} /> TB Excel Upload
                        </button>


                          <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                           onClick={() => handleexcelShowDB()}
                        >
                            <Plus size={15} /> DB Excel Upload
                        </button>

                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
                            onClick={() => handleShowAssetsDepn()}
                        >
                            <Plus size={15} /> Create New
                        </button>



                       



                    </div>
                </div>
            </div>
                          
            LOADED BATCHES

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
                            <th onClick={() => handleSort('batch_name')}>
                               batch_name {getSortingIcon('batch_name')}
                            </th>
                          
                            <th onClick={() => handleSort('location_name')}>
                               Location {getSortingIcon('location_name')}
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
                                        value={batchName}
                                        onChange={(e) => {
                                            const newvalue = e.target.value;
                                            setbatchName(newvalue);
                                            getAllListings('batch_name', newvalue);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                           
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchLocation}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchLocation(value);
                                            getAllListings('location_name', value);
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
                                        <td onClick={() => handleShowEdit(item.id)}>{item.batch_name}</td>
                                       
                                        <td onClick={() => handleShowEdit(item.id)}>{item.location_name}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleShowOverride(item.id, item.gl_name)}
                                            >
                                                <IconSwitchHorizontal size={16} />
                                            </button>


                                             <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleTBBatchUnLoading(item.id)}
                                            >
                                               UnLoad It
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


  <br/> <br/> 
                        UNLOADED BATCHES

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
                            <th onClick={() => handleSort('batch_name')}>
                               batch_name {getSortingIcon('batch_name')}
                            </th>
                          
                            <th onClick={() => handleSort('location_name')}>
                               Location {getSortingIcon('location_name')}
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
                                        value={batchName}
                                        onChange={(e) => {
                                            const newvalue = e.target.value;
                                            setbatchName(newvalue);
                                            getAllListingsUnloaded('batch_name', newvalue);
                                        }}
                                        className="form-control table-col-search"
                                    />
                                </div>
                            </th>
                           
                            <th>
                                <div className="data-search">
                                    <input
                                        type="text"
                                        value={searchLocation}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearchLocation(value);
                                            getAllListingsUnloaded('location_name', value);
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
                        {Array.isArray(OthersMapUnloaded) && OthersMapUnloaded.length > 0 ? (
                            OthersMapUnloaded.map((item, index) => {
                                const sNo = (pagenoUnloaded - 1) * records + index + 1;
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
                                        <td onClick={() => handleShowEdit(item.id)}>{item.batch_name}</td>
                                       
                                        <td onClick={() => handleShowEdit(item.id)}>{item.location_name}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleShowOverride(item.id, item.gl_name)}
                                            >
                                                <IconSwitchHorizontal size={16} />
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleTBBatchLoading(item.id)}
                                            >
                                               Load It
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
                        {totalElementsUnloaded < pagenoUnloaded * records ? totalElementsUnloaded : pagenoUnloaded * records} of {totalElementsUnloaded} entries
                    </span>
                </div>
                <div>
                    <Pagination
                        totalElements={totalElementsUnloaded}
                        recordsPerPage={records}
                        pageNumber={pagenoUnloaded}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>


                       
             <div className="model_box">
                <Modal 
                    show={showexcelShowTb}
                    onHide={handleCloseexcelTb}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>TB Excel Upload</Modal.Title>
                    </Modal.Header>

                  
                   <form onSubmit={handleSubmitExcel(onSubmitExcel)}>
        <Modal.Body className="custom-modal-body">
          <div className="container">
            <div className="row pt-1 mt-1">


                    <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Batch Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Batch Name"
                                                    className="form-control"
                                                    {...registerExcel("batch_name", { required: true })}
                                                    defaultValue={editData ? editData.asset_code : ""}
                                                />
                                            </div>
                                        </div>


                                         <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                   Location <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                   <Controller
                                                    name="location_id"
                                                    control={controlExcel} // ✅ use the correct form instance
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                        {...field}
                                                        options={locations}
                                                        isSearchable={true}
                                                        placeholder="Select"
                                                        classNamePrefix="custom-select"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={locations.find(option => option.value === field.value)}
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


              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <label className="inline-customform-label me-3 mb-0">
                    Upload Excel File <span className="text-danger">*</span>
                  </label>
                 <input
  type="file"
  accept=".xlsx,.xls,.csv"
  className="form-control"
  {...registerExcel("excel_file", { required: true })}
/>
                </div>
                <div onClick={downloadExcelSampleFile} className="text-primary mt-2" style={{ cursor: "pointer" }}>
                  Download Excel Sample File
                </div>
                {errors.excel_file && (
                  <span className="text-danger">This field is required.</span>
                )}
              </div>


                
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className="btn btn-sm btn-success">
            Upload
          </button>
        </Modal.Footer>
      </form>
                    
                </Modal>
            </div>





            <div className="model_box">
                <Modal 
                    show={showexcelShowDb}
                    onHide={handleCloseexcelDb}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>DB Excel Upload</Modal.Title>
                    </Modal.Header>

                  
                   <form onSubmit={handleSubmitExcelDb(onSubmitExcelDb)}>
        <Modal.Body className="custom-modal-body">
          <div className="container">
            <div className="row pt-1 mt-1">


                  <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Batch Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Batch Name"
                                                    className="form-control"
                                                    {...registerExcelDb("batch_name", { required: true })}
                                                    defaultValue={editData ? editData.asset_code : ""}
                                                />
                                            </div>
                                        </div>


                                         <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                   Location <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                   <Controller
                                                    name="location_id"
                                                    control={controlExcelDb} // ✅ use the correct form instance
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                        {...field}
                                                        options={locations}
                                                        isSearchable={true}
                                                        placeholder="Select"
                                                        classNamePrefix="custom-select"
                                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                        value={locations.find(option => option.value === field.value)}
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


              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <label className="inline-customform-label me-3 mb-0">
                    Upload Excel File <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="form-control"
                    {...registerExcelDb("excel_file", { required: true })}
                  />
                </div>
                <div onClick={downloadExcelSampleFile} className="text-primary mt-2" style={{ cursor: "pointer" }}>
                  Download Excel Sample File
                </div>
                {errors.excel_file && (
                  <span className="text-danger">This field is required.</span>
                )}
              </div>


                
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className="btn btn-sm btn-success">
            Upload
          </button>
        </Modal.Footer>
      </form>
                    
                </Modal>
            </div>



            <div className="model_box">
                <Modal
                    show={showAssetsDepn}
                    onHide={handleCloseAssetsDepn}
                    top
                    size="xl"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? "Register" : "Register"}</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={formAssetsDepn.handleSubmit(onSubmitAssetsDepn)} className="formtext modalform">
                        <Modal.Body className="custom-modal-body">
                            <div className="p-0 modalstart">
                                <div className="container">
                                    <div className="row pt-1 mt-1">


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Asset Code <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Assets Code "
                                                    className="form-control"
                                                    {...formAssetsDepn.register("asset_code", { required: true })}
                                                    defaultValue={editData ? editData.asset_code : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Description <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Description"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("asset_description", { required: true })}
                                                    defaultValue={editData ? editData.asset_description : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Purchase Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    placeholder="Enter  Purchase Date"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("purchase_date", { required: true })}
                                                    defaultValue={editData ? editData.purchase_date : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Purchase Cost <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Purchase Cost"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("purchase_cost", { required: true })}
                                                    defaultValue={editData ? editData.purchase_cost : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Salvage Value <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter  Salvage Value"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("salvage_value", { required: true })}
                                                    defaultValue={editData ? editData.salvage_value : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Useful Life<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter  Useful Life"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("useful_life", { required: true })}
                                                    defaultValue={editData ? editData.useful_life : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                Remarks <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter remarks"
                                                    className="form-control"
                                                    {...formAssetsDepn.register("remarks", { required: true })}
                                                    defaultValue={editData ? editData.remarks : ""}
                                                />
                                            </div>
                                        </div>


                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                    Category <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                  


                                                    <Controller
    name="category_id"
    control={formAssetsDepn.control}
    defaultValue={editData?.category_id || ''}
    rules={{ required: true }}
    render={({ field }) => (
        <Select
            {...field}
            options={CategoryDropDown}
            isSearchable
            placeholder="Select"
            classNamePrefix="custom-select"
            onChange={(selectedOption) => {
                field.onChange(selectedOption?.value);
                setCategoryId(selectedOption?.value); // <- you must have this line
                setSubCategoryDropDown([]); // reset subcategories
                formAssetsDepn.setValue("sub_category_id", ""); // clear selected subcategory
            }}
            value={CategoryDropDown.find(opt => opt.value === field.value)}
            menuPlacement="auto"
            menuPosition="fixed"
/>
    )}
/>



                                                </div>
                                            </div>
                                            {errors.category_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                Sub Category <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                               


                                              



                                             <Controller
          name="sub_category_id"
          control={formAssetsDepn.control}
          defaultValue={subCategoryValue}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={SubCategoryDropDown}
              isSearchable
              placeholder="Select"
              classNamePrefix="custom-select"
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value);
                setSubCategoryValue(selectedOption?.value); // sync with local state
              }}
              value={SubCategoryDropDown.find(option => option.value === field.value)}
              menuPlacement="auto"
              menuPosition="fixed"
            />
          )}
        />


                                                </div>
                                            </div>
                                            {errors.sub_category_id  && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>

                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                   Block <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="block_id"
                                                        control={formAssetsDepn.control}
                                                        defaultValue={editData ? editData.block_id : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={BlockDropDown}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={BlockDropDown.find(option => option.value === field.value)}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {errors.block_id && (
                                                <span className="text-danger">This field is required.</span>
                                            )}
                                        </div>



                                        <div className=" mb-3">
                                            <div className="d-flex align-items-center">
                                                <label className="inline-customform-label me-3 mb-0">
                                                   Location <span className="text-danger">*</span>
                                                </label>
                                                <div className="flex-grow-1">
                                                    <Controller
                                                        name="location"
                                                        control={formAssetsDepn.control}
                                                        defaultValue={editData ? editData.location : ''}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={locations}
                                                                isSearchable={true}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                                                value={locations.find(option => option.value === field.value)}
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
                                            onClick={() => deleteAssetsDepn(editData?.id)}
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

export default TbDbUploadBatches;
