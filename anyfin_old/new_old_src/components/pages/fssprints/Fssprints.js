import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";


const Fssprints = () => {
  const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');




  const handlePageChange = (newPageNumber) => {
    setPageNo(newPageNumber);
  };

  const handleRecordsChange = (event) => {
    setRecords(event.target.value);
    setPageNo(1); // Reset to first page
  };


  const [show, setShow] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Page Name:', pageName);
    console.log('Page URL:', pageUrl);
    handleClose();
  };


  return (

    <div className=" ">
      <div className=" ">

        <div className="bread_crumb">
          <div className=" ">
            <h3 className="header-title"> FSS Prints </h3>
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
                    <th> Name of the Page </th>
                    <th width="50%"> Path </th>
                  </tr>

                </thead>
                <tbody>
                <tr>
                    <td> 0 </td>
                    <td> Financials Statement </td>
                    <td> <Link to={"/fssnotes"}>  Financials Statement </Link> </td>
                  </tr>
                  <tr>
                    <td> 1 </td>
                    <td> Balance Sheet </td>
                    <td> <Link to={"/balancesheet"}>Balance Sheet </Link> </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td> Profit &  Loss </td>
                    <td> <Link to={"/profitloss"}> Profit & Loss </Link> </td>
                  </tr>

                  <tr>
                    <td> 3 </td>
                    <td> Cash Flow Statement </td>
                    <td> <Link to={"/cashflowstatement"}> Cash Flow Statement  </Link> </td>
                  </tr>


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

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPageName">
              <Form.Label>Page Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter page name"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPageUrl">
              <Form.Label>Page URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter page URL"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" className="btn-sm btn-theme">
                Submit
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Fssprints;

