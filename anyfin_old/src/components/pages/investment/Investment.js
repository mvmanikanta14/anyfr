
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
import { useForm } from "react-hook-form";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";


const Investment = () => {
    const [pageno, setPageNo] = useState(1);
    const [records, setRecords] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('');
    const [investment, setInvestment] = useState();
    const [ids, setId] = useState("");
    const [investmentAdd,setInvestmentAdd]=useState();

    useEffect(() => {
        getAllInvestment();
    }, []);


    const handlePageChange = (newPageNumber) => {
        setPageNo(newPageNumber);
    };

    const handleRecordsChange = (event) => {
        setRecords(event.target.value);
        setPageNo(1); // Reset to first page
    };
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const getAllInvestment = () => {
        commonService.getAll(apiUrlsService.getInvestment).then(
            (response) => {
                if (response && response.data) {
                    console.log("mani", response.data)
                    setInvestment(response.data);
                }
            }
        ).catch((error) => {
            console.error("API call failed: ", error);
        });
    };



    const [show, setShow] = useState(false);
    const [pageName, setPageName] = useState('');
    const [pageUrl, setPageUrl] = useState('');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSubmit = (data) => {
        console.log("Submitting Data:", data); // Check if data is correct
      
        if (!ids) {
          commonService
            .add(apiUrlsService.addInvestment, data)
            .then((res) => {
              console.log("API Response:", res); // Check if response exists
              if (res) {
                setInvestmentAdd([...investmentAdd, res.data]); // Update state
                swal("Success", "Added successfully!", "success");
                handleClose();
                reset();
              } else {
                console.error("Response is undefined!");
              }
            })
            .catch((err) => {
              console.error("API Error:", err.response ? err.response.data : err.message);
            });
        }
      };
      
    


    return (

        <div className=" ">
            <div className=" ">

                <div className="bread_crumb">
                    <div className=" ">
                        <h3 className="header-title">Investment </h3>
                    </div>

                    <div>
                        <ul>
                            <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
                            <li> FSS Prints  </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">


                        <div className="w-100">


                            <div className="d-flex justify-content-between align-items-center  ">
                                <label className="mb-0 d-flex show-result">
                                    Show&nbsp;
                                    <select
                                        className="form-control"
                                        value={records}
                                        onChange={handleRecordsChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </label>


                                <div className="group-buttons">
                                    <button
                                        type="button"
                                        className="mt-2 Addbutton m-r-5"
                                        title="Add"
                                        onClick={() => handleShow()}
                                    >
                                        ADD
                                    </button>

                                </div>

                            </div>
                        </div>



                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table_custom_1">
                                <thead>
                                    <tr className="border-btm-0">
                                        <th width="5%">S.No</th>
                                        <th> Trade or Other </th>
                                        <th> Nature of Propert </th>
                                        <th> Association Type </th>
                                        <th> Valuation Method </th>
                                        <th> Quoted Unquoted </th>
                                        <th> Investment Name </th>
                                        <th> No of Instruments </th>
                                        <th> Value of Acquisition</th>
                                        <th> Current Year Amount</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {investment && investment.length > 0 ? (
                                        investment.slice().reverse().map((item, index) => {
                                            const sNo = (pageno - 1) * records + (index + 1);
                                            return (
                                                <tr key={index}>
                                                    <td>{sNo}</td>
                                                    <td>{item.trade_or_other}</td>
                                                    <td>{item.nature_of_property}</td>
                                                    <td>{item.association_type}</td>
                                                    <td>{item.valuation_method}</td>
                                                    <td>{item.quoted_unquoted}</td>
                                                    <td>{item.investment_name}</td>
                                                    <td>{item.no_of_instruments}</td>
                                                    <td>{item.value_of_acquisition}</td>
                                                    <td>{item.current_year_amount}</td>

                                                    {/* <td>
                                                        <button
                                                            className="btn-sm btn-primary btn-sm mr-2"
                                                            onClick={() => handleShowEdit(item.id)}
                                                            title="Edit"
                                                        >
                                                            <FaPencilAlt />
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm mr-2"
                                                            title="Delete"
                                                            onClick={() => deleteIndividual(item.id)}
                                                        >
                                                            <FaTimes />
                                                        </button>


                                                    </td> */}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>


                        <div className="d-flex justify-content-between">

                            <div className=" ">
                                <span className="float-right">
                                    Showing {(pageno - 1) * records + 1} to{" "}
                                    {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                                    of {totalElements} entries
                                </span>
                            </div>

                            <div className=" ">
                                {/* <Pagination
                  totalElements={totalElements}
                  recordsPerPage={records}
                  pageNumber={pageno}
                  onPageChange={handlePageChange}
                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show}
                size="xl"
                onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Page</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="formtext modalform"
                        onSubmit={handleSubmit(onSubmit)}>



                        <div className="container">
                            <div className="row pt-1 mt-1">

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Trade or Other{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("trade_or_other", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Nature of Property{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("nature_of_property", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Association Type{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("association_type", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Valuation Method{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("valuation_method", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Quoted Unquoted{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("quoted_unquoted", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Investment Name{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("investment_name", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    No of Instruments{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("no_of_instruments", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Value of Acquisition{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("value_of_acquisition", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                    <label className="">
                                    Current Year Amount{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Client Name"
                                        className="accordiantext"
                                        {...register("current_year_amount", {
                                            required: true,
                                        })}


                                    />

                                </div>

                                <div className="col-md-12 text-right">
                                    <button className=" mt-1 text-white accordianbutton">
                                        {/* {title} */}ADD
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Investment;

