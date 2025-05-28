import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";
import { debounce } from "lodash";
import Select from 'react-select';


const Rectification = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageNo] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page
    const [Rectifications, setRectifications] = useState([]); // State to hold chart of accounts data
    const [ShowTan, setShowTan] = useState(false); // State to control modal visibility
    const [selecteTan, setSelecteTan] = useState(""); // State to hold selected TAN
    const [selectedId, setSelectedId] = useState(null); // State to hold selected ID for editing
    const [ids, setIds] = useState(null); // State to hold ID for update operation
    const [RectificationsAdd, setRectificationsAdd] = useState([]); // State to hold added Rectifications
    const [editData, setEditData] = useState(null); // State to hold edit data for Rectifications
    const [show, setShow] = useState(false); // State to control modal visibility for Rectifications
    const [title, setTitle] = useState("Add");
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const { auth } = useContext(ApiContext);
    const [showActive, setShowActive] = useState(true); // State to toggle between active and inactive shares
    const [showInactive, setShowInactive] = useState(false); // State to toggle between active and inactive shares
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [chartofAccounts, setChartofAccounts] = useState([]); // State to hold chart of accounts data
    const [TransactionName, setTransactionName] = useState("");
    const [TransactionDate, setTransactionDate] = useState("");

    const [locations, setLocations] = useState([]);
    const [vouchers, setVouchers] = useState([]);


    const activeShares = Rectifications.filter(item => item.is_active);
    const inactiveShares = Rectifications.filter(item => !item.is_active);

    const displayedShares = showActive ? activeShares : inactiveShares;
    console.log("Active Shares:", activeShares);
    console.log("Inactive Shares:", inactiveShares);





    useEffect(() => {
        setId(tokenService.getEID());
        setEntityID(tokenService.getEntityID());
    }, []);

    const debouncedSearch = debounce(() => {
        getAllRectificationSearch();  // Call the API when searchTerm changes
    }, 500);

    const deleteCA = (id) => {
        // Construct the correct API URL with the ID
        const deleteUrl = `${apiUrlsService.deleteChartofAcc}/${id}`;

        commonService.deleteById(deleteUrl)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    // Assuming Rectifications is the state that holds the list of accounts
                    const updatedRectifications = Rectifications.filter((item) => item.id !== id);
                    setRectifications(updatedRectifications); // Update state with the remaining records

                    swal("Success", "Deleted successfully!", "success");
                    handleClose(); // Close modal or any UI element that needs closing
                } else {
                    swal("Error", "Something went wrong during the deletion!", "error");
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



    useEffect(() => {
        if (searchTerm) {
            debouncedSearch();  // Call the debounced function
        } else {
            setRectifications([]);  // Reset search when searchTerm is empty
        }
        // Cleanup debounce on component unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);


    const getAllLocations = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(apiUrlsService.getAllLocationDropdown, requestData)
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


    const getVouchers = () => {

        commonService.getAll(apiUrlsService.getvoucherlist)
            .then((response) => {
                if (response && response.data) {
                    console.log("vvvvv", response.data);
                    const transformedData = response.data.map(item => ({
                        value: item.id,
                        label: item.voucher_type_name
                    }));
                    setVouchers(transformedData);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };





    const getAllChartofAccounts = () => {
        const requestData = {
            entity_id: EntityID,
        };

        commonService.add(apiUrlsService.getAllFssFsligldropdown, requestData)
            .then((response) => {
                if (response && response.data) {
                    console.log("mani", response.data);
                    const transformedData = response.data.data.map(item => ({
                        value: item.id,
                        label: item.gl_name
                    }));
                    setChartofAccounts(transformedData);
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };


    const getAllRectificationSearch = () => {
        const requestData = {
            query: searchTerm,
        };

        commonService.add(apiUrlsService.getAllSearch, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setRectifications(response.data); // Set the filtered data
                    } else {
                        swal(response.data.error);
                        setRectifications([]);  // Reset search results if there's an error
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    // Fetch data from the API
    const getAllRectification = () => {
        const requestData = {
            entity_id: EntityID,
            period_id: Id,
        };

        commonService.add(apiUrlsService.getAllRectification, requestData)
            .then((response) => {
                console.log("API Sai:", response.data);

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setRectifications(response.data.data); // Set the filtered data
                        setTotalElements(response.data.total); // Set total records for pagination (based on filtered data)
                    } else {
                        swal(response.data.error);
                        setRectifications([]);
                    }
                }
            })
            .catch((error) => {
                console.error("API call failed: ", error);
            });
    };

    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    useEffect(() => {
        if (EntityID && Id) {
            getAllRectification();
        }
        getAllChartofAccounts();
        getAllLocations();
        getVouchers();

    }, [EntityID, Id]);

    useEffect(() => {
        if (showActive) {
            getAllRectification();  // Fetch active entities
        } else {
            getAllInactive();  // Fetch inactive entities
        }

    }, [showActive, pageno, records]);


    const polarity = [
        { value: '1', label: 'Credit' },
        { value: '2', label: 'Debit' },

    ];

    const getAllInactive = () => {

        const requestData = {
            entity_id: EntityID,
        }

        commonService.add(apiUrlsService.getAllInactiveRectifications, requestData)
            .then((response) => {
                console.log("API Response:", response.data.data); // Debugging

                if (response && response.data) {
                    if (Array.isArray(response.data.data)) {
                        setRectifications(response.data.data);
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


    const [additionalFields, setAdditionalFields] = useState([]);


    const deleteRectification = () => {
        // Show a confirmation alert before proceeding with deletion
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: ["Cancel", "Confirm"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // If the user clicks "Confirm," proceed with deletion
                    const deleteUrl = apiUrlsService.deleteRectification(ids); // Assuming 'ids' is the ID you want to delete

                    commonService.deleteById(deleteUrl)
                        .then((response) => {
                            console.log(response);

                            // Check if the response data is successful (according to the backend response structure)
                            if (response.data && response.data.message) {
                                // Handle success response from backend
                                getAllRectification(); // Refresh the list or perform any action after deletion
                                swal("Success", "Deleted successfully!", "success");
                                handleClose(); // Close modal or any UI element that needs closing
                            } else {
                                // Handle case where deletion fails on the backend (no message in the response)
                                swal("Error", "Something went wrong during the deletion!", "error");
                            }
                        })
                        .catch((error) => {
                            // Handle error response from backend
                            if (error.response && error.response.status === 403) {
                                swal("Error", "You don't have permission to delete this item!", "error");
                            } else {
                                swal("Error", "Something went wrong!", "error");
                            }
                        });
                } else {
                    // If the user clicks "Cancel," show a cancellation message
                    swal("Your record is safe!", {
                        icon: "info",
                    });
                }
            });
    };



    const addNewField = () => {
        /*setAdditionalFields([
            ...additionalFields,
            { gl_id: '', amount: '', location_id: '' }
        ]);
        */
        setAdditionalFields(prev => [
            ...prev,
            {
                id: Date.now(), // or use uuid()
                gl_id: '',
                amount: ''
            }
        ]);

    };
    const removeField = (id) => {
        setAdditionalFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    const onSubmit = (data) => {



        let debitTotal = 0;
        let creditTotal = 0;

        // Calculate for main row
        const mainAmount = parseFloat(data.amount || 0);
        const mainCrDr = data.cr_dr?.value;

        if (mainCrDr === '2') debitTotal += mainAmount;
        if (mainCrDr === '1') creditTotal += mainAmount;

        // Calculate for additional rows
        additionalFields.forEach(field => {
            const amount = parseFloat(data[`amount_${field.id}`] || 0);
            const crdr = data[`cr_dr_${field.id}`]?.value;

            if (crdr === '2') debitTotal += amount;
            if (crdr === '1') creditTotal += amount;
        });

        const netAmount = debitTotal - creditTotal;

        // Check if total sum is zero
        if (netAmount !== 0) {
            swal("error", "Total net amount must be zero.", "error");
            return;
        }


        const requestData = [];

        // Master record
        requestData.push({
            entity_id: EntityID,
            period_id: Id,
            created_by: auth.login_id,
            TransactionName: data.TransactionName,
            TransactionDate: data.TransactionDate,
            voucher_type: data.voucher_type,
            gl_id: data.gl_id,
            location_id: data.location_id,
            cr_dr: data.cr_dr,
            amount: data.amount,
        });

        // Detail records based on dynamic fields with unique IDs
        additionalFields.forEach((field) => {
            requestData.push({
                gl_id: data[`gl_id_${field.id}`],
                location_id: data.location_id,
                amount: data[`amount_${field.id}`],
                cr_dr: data[`cr_dr_${field.id}`],

            });
        });

        console.log("Request Data:", requestData);
        //alert(ids)
        if (!ids) {
            // ADD Operation
            commonService.add(apiUrlsService.addRectification, requestData)
                .then((res) => {
                    setRectifications([...Rectifications, res.data]);
                    swal("Success", "Added successfully!", "success");
                    handleClose();
                    getAllRectification();
                })
                .catch((error) => {
                    console.error("Error:", error);

                    // Check for specific error message related to net sum validation
                    if (error.details) {
                        swal("Validation Error", error.details, "error");
                    } else {
                        swal("Error", "An unexpected error occurred", "error");
                    }
                });
        } else {
            // UPDATE Operation
            commonService.update(apiUrlsService.editRectification(ids), requestData)
                .then((res) => {
                    const updatedRectifications = Rectifications.map((item) =>
                        item.id === ids ? res.data : item
                    );
                    setRectifications(updatedRectifications);
                    swal("Success", "Updated successfully!", "success");
                    handleClose();
                    getAllRectification();
                })
                .catch((error) => {
                    console.error("Error:", error);

                    if (error?.response?.data?.newMapping?.error) {
                        if (error.response.data.newMapping.status === 500) {
                            swal("Error", `Server error: ${error.response.data.newMapping.error}`, "error");
                        } else {
                            swal("Error", error.response.data.newMapping.error, "error");
                        }
                    } else {
                        swal("Error", "An unexpected error occurred", "error");
                    }
                });
        }
    };





    const handleClose = () => {
        setEditData(null); // Reset editData
        setIds(""); // Reset the ID
        setShow(false)
        reset(); // Reset the form state

        setShowDeleteButton(false);

    }

    const handleShowEditOld = (id) => {
        const itemToEdit = Rectifications.find((item) => item.id === id);
        console.log("item edit", itemToEdit)

        if (itemToEdit) {
            setEditData(itemToEdit);
            console.log(itemToEdit, "this is the id for edit");
            setTitle("Update");
            setIds(itemToEdit.id);
            setShowDeleteButton(true);
            // setShow(true);


        } else {
            setEditData(null); // For new record, ensure there's no edit data
            setTitle("Add");
            setIds(null);
            setShowDeleteButton(false);
            // setShow(true);

        }
        setShow(true);
        reset();
    };



    const handleShowEdit = async (id) => {
        try {
            const res = await commonService.getById(apiUrlsService.getRectificationById(id));
            //const res = await commonService.getById(apiUrlsService.getRectificationById(id));
            const { main, details } = res.data;

            // Build static-row prefill:
            const prefill = {
                TransactionName: main.transaction_name,
                TransactionDate: main.transaction_date,
                voucher_type: vouchers.find(v => v.value === main.voucher_type) || null,
                gl_id: chartofAccounts.find(o => o.value === details[0].gl_id) || null,
                location_id: locations.find(o => o.value === details[0].location_id) || null,
                cr_dr: polarity.find(o => o.value === String(details[0].cr_dr)) || null,
                amount: details[0].amount,
            };

            // Build dynamic-rows state & their prefill values
            const dynamic = {};
            const dynamicFields = details.slice(1).map((d, idx) => {
                const rowId = idx + 1;
                dynamic[`gl_id_${rowId}`] = chartofAccounts.find(o => o.value === d.gl_id) || null;
                dynamic[`location_id_${rowId}`] = locations.find(o => o.value === d.location_id) || null;
                dynamic[`cr_dr_${rowId}`] = polarity.find(o => o.value === String(d.cr_dr)) || null;
                dynamic[`amount_${rowId}`] = d.amount;
                return { id: rowId };
            });

            // reset the form values all at once:
            reset({ ...prefill, ...dynamic });

            // now show that many detail rows in your UI
            setAdditionalFields(dynamicFields);

            // Combine static and dynamic values
            // reset({ ...prefill, ...dynamicPrefill });

            // setAdditionalFields(dynamicFields);
            //setEditData(prefill); // Optional if you need separate access
            setTitle("Update");
            setIds(id);
            setShowDeleteButton(true);
            setShow(true);
            setIsEditMode(true);
        } catch (err) {
            console.error(err);
            alert("Failed to load transaction.");
        }
    };



    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });


    const handleShow = () => {

        // reset();
        // setShow(true);
        // setTitle("Add")
        // 1) Clear the form fields back to your initial defaults:
        reset({
            TransactionName: "",
            TransactionDate: "",
            voucher_type: null,
            gl_id: null,
            location_id: null,
            cr_dr: null,
            amount: "",
            // no dynamic detail fields
        });

        // 2) Clear out any dynamic rows
        setAdditionalFields([]);

        // 3) Switch out of edit mode
        setIsEditMode(false);
        setIds(null);
        setTitle("Add");
        setShowDeleteButton(false);

        // 4) Finally, show the modal
        setShow(true);
    }

    const handleShowToggle = () => {
        setShowActive(!showActive);
    };

    const handleClearSearch = () => {
        setSearchTerm('');  // Clear the search term
        setRectifications([]);
        getAllRectification();  // Reset the displayed shares to show all data
    };




    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setRectifications([]);
            getAllRectification();
        }
    };




    return (
        <div className="">

            {/* Search Box */}
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
                </div>



                <div className="d-flex">

                    <div className="position-relative mx-2" style={{ width: '250px' }}>
                        <input
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
                        </span>
                    </div>


                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className=" btn btn-outline-primary btn-pill btn-sm nowrap"
                            title="Add "
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
                            <th>Trans ID RECTIFICATION</th>
                            <th>Transaction Name</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(displayedShares) && displayedShares.length > 0 ? (
                            displayedShares.map((item, index) => {
                                const sNo = (pageno - 1) * records + index + 1;
                                return (
                                    <tr className="tr-hover-effect1" onClick={() => handleShowEdit(item.id)} key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.transaction_name}</td>
                                        <td>{item.transaction_date}</td>

                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between">
                <div>
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
                    size="lg"
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalcustomise"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditMode ? 'Update Transaction' : 'Create a New Transaction'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                            <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
                                <div className="container">
                                    <div className="col-md-12 text-right">

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary mx-2"
                                            onClick={addNewField}
                                        >
                                            Create Another
                                        </button>
                                    </div>

                                    <div className="row pt-1 mt-1">
                                        <div className="col-md-3 text-left mt-1">
                                            <label htmlFor="TransactionName" className="form-label">
                                                Transaction Name
                                            </label>
                                            <Controller
                                                name="TransactionName"
                                                control={control}
                                                rules={{ required: "Transaction Name is required" }}
                                                render={({ field }) => (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="TransactionName"
                                                        placeholder="Transaction Name"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.TransactionName && <span className="text-danger">{errors.TransactionName.message}</span>}


                                        </div>

                                        <div className="col-md-3 text-left mt-1">
                                            <label htmlFor="TransactionName" className="form-label">
                                                Transaction Date
                                            </label>
                                            <Controller
                                                name="TransactionDate"
                                                control={control}
                                                rules={{ required: "Transaction Date is required" }}
                                                render={({ field }) => (
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="TransactionDate"
                                                        {...field}

                                                    />
                                                )}
                                            />
                                            {errors.TransactionDate && <span className="text-danger">{errors.TransactionDate.message}</span>}


                                        </div>

                                        <div className="col-md-3 text-left mt-1">
                                            <label>Location<span className="text-danger">*</span></label>



                                            <Controller
                                                name="location_id"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={locations}
                                                        placeholder="Select"
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )}
                                            />


                                            {errors.location_id && <span className="text-danger">This field is required.</span>}
                                        </div>



                                        <div className="col-md-3 text-left mt-1">
                                            <label>Voucher Type<span className="text-danger">*</span></label>



                                            <Controller
                                                name="voucher_type"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={vouchers}
                                                        placeholder="Select"
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )}
                                            />



                                            {errors.voucher_type && <span className="text-danger">This field is required.</span>}
                                        </div>


                                    </div>


                                    <div className="row pt-1 mt-1">
                                        {/* Main Form Fields */}
                                        <div className="col-md-3 text-left mt-1">
                                            <label>GL<span className="text-danger">*</span></label>
                                            <Controller
                                                name="gl_id"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={chartofAccounts}
                                                        placeholder="Select"
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )}
                                            />
                                            {errors.gl_id && <span className="text-danger">This field is required.</span>}
                                        </div>





                                        <div className="col-md-3 text-left mt-1">
                                            <label>Credit/Debit<span className="text-danger">*</span></label>



                                            <Controller
                                                name="cr_dr"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={polarity}
                                                        placeholder="Select"
                                                        className="react-select-container"
                                                        classNamePrefix="custom-select"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )}
                                            />


                                            {errors.cr_dr && <span className="text-danger">This field is required.</span>}
                                        </div>





                                        <div className="col-md-3 text-left mt-1">
                                            <label>Amount <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter Amount"
                                                className="form-control"
                                                {...register("amount", { required: true })}
                                                defaultValue={editData ? editData.amount : ""}
                                            />
                                            {errors.amount && <span className="text-danger">This field is required.</span>}
                                        </div>


                                    </div>

                                    {/* Dynamically added fields */}


                                    {additionalFields.map((field, index) => (
                                        <div key={field.id} className="container border p-2 mb-2 rounded">
                                            <div className="row">
                                                <div className="col-md-3 mt-1">
                                                    <label>GL<span className="text-danger">*</span></label>
                                                    <Controller
                                                        name={`gl_id_${field.id}`}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field: controllerField }) => (
                                                            <Select
                                                                {...controllerField}
                                                                options={chartofAccounts}
                                                                placeholder="Select"
                                                                classNamePrefix="custom-select"
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />

                                                    {errors[`gl_id_${field.id}`] && (
                                                        <span className="text-danger">
                                                            This field is required.
                                                        </span>
                                                    )}



                                                </div>




                                                <div className="col-md-3 text-left mt-1">
                                                    <label>Credit/Debit<span className="text-danger">*</span></label>



                                                    <Controller
                                                        name={`cr_dr_${field.id}`}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={polarity}
                                                                placeholder="Select"
                                                                className="react-select-container"
                                                                classNamePrefix="custom-select"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                menuPlacement="auto"
                                                                menuPosition="fixed"
                                                            />
                                                        )}
                                                    />


                                                    {errors[`cr_dr_${field.id}`] && (
                                                        <span className="text-danger">
                                                            This field is required.
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="col-md-3 mt-1">
                                                    <label>Amount<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register(`amount_${field.id}`, { required: true })}
                                                    />

                                                    {errors[`amount_${field.id}`] && (
                                                        <span className="text-danger">
                                                            This field is required.
                                                        </span>
                                                    )}


                                                </div>

                                                <div className="col-md-1 d-flex align-items-center mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => removeField(field.id)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}




                                    {/* Button to add more rows */}
                                    <div className="col-lg-12 text-right my-3">

                                        <button className="btn btn-sm btn-primary" type="submit">
                                            {isEditMode ? "Update" : "Create"}
                                        </button>&nbsp;&nbsp;
                                        {isEditMode && (
                                            <button type="button" className="btn btn-sm btn-danger" onClick={deleteRectification}>
                                                Delete
                                            </button>
                                        )}
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

export default Rectification;
