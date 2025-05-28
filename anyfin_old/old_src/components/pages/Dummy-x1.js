 
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

 
const Dummyx1 = () => {
   const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
   const [searchTerm, setSearchTerm] = useState('');
   const [name, setName] = useState('');
 

   const data = [
    { id: 1, description: 'Revenue', amount: 1000, prevamount: 900 },
    { id: 2, description: 'Cost of Goods Sold', amount: -400, prevamount: -300 },
    { id: 3, description: 'Gross Profit', amount: 600, prevamount: 600 },
    { id: 4, description: 'Operating Expenses', amount: -200, prevamount: -150 },
    { id: 5, description: 'Operating Income', amount: 400, prevamount: 350 },
    { id: 6, description: 'Interest Expense', amount: -50, prevamount: -40 },
    { id: 7, description: 'Income Before Taxes', amount: 350, prevamount: 310 },
    { id: 8, description: 'Income Tax Expense', amount: -100, prevamount: -60 },
    { id: 9, description: 'Net Income', amount: 250, prevamount: 250 },
    { id: 10, description: 'Dividends', amount: -50, prevamount: -50 },
  ];

  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  const totalPrevAmount = data.reduce((acc, item) => acc + item.prevamount, 0);

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
            <h3 className="header-title"> Masters </h3>
          </div>

          <div>
            <ul>
              <li className="active"> <Link to={""}> <IconHome /> </Link> </li>
              <li> Masters  </li>
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
                 
                <table className="table-custom table-outerlines-col-lines totals-subtotals">
                  <thead>
                    <tr>
                      <th width="5%">ID</th>
                      <th width="60%"> Particulars </th>
                      <th className="text-right"> 2023 -2024 </th>
                      <th className="text-right"> 2024 -2025 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} >
                        <td>{item.id}</td>
                        <td >{item.description}</td>
                        <td className="text-right">{item.amount}</td>
                        <td className="text-right">{item.prevamount}</td>
                        </tr>
                    ))}

                    <tr className="totals sub-borders-both">
                      <td> </td>
                      <td className="text-right"> Total  </td>
                       <td className="text-right">{totalAmount}</td>
                      <td className="text-right">{totalPrevAmount}</td>
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



        <div className="card mt-3">
          <div className="card-body">

 
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

              {/* Start Company Details */}
              <div className="company-details"> 
                <h4 className="company-title"> ABC Private Limited </h4> 
                <p className="company-desc"> CIN : U12456AP204DADA </p>
                <h6 className="subheading-label"> Cash flow statement for the year ended 
                  <span className="regular-bold"> 31 march, 2024 </span> 
                </h6>
              </div>
 
              <div className="amounts-label"> (Amounts Rs. in Lakshs) </div> 

              {/* End Company Details */}     
            </div>


            
            <div className="table-responsive">
                <table className="table-custom table-outlines hightlight-last-totals">
                  <thead>
                    <tr>
                      <th width="5%">ID</th>
                      <th width="60%"> Particulars </th>
                      <th className="text-right"> 2023 -2024 </th>
                      <th className="text-right"> 2024 -2025 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} >
                        <td>{item.id}</td>
                        <td >{item.description}</td>
                        <td className="text-right">{item.amount}</td>
                        <td className="text-right">{item.prevamount}</td>
                        </tr>
                    ))}

                    <tr className="totals" >
                      <td> </td>
                      <td className="text-right"> Total  </td>
                       <td className="text-right">{totalAmount}</td>
                      <td className="text-right">{totalPrevAmount}</td>
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



        <div className="card mt-3">
          <div className="card-body">

 


            <div className="table-responsive">
                <table className="table-custom table-regular totals-subtotals">
                  <thead>
                    <tr>
                      <th width="5%">ID</th>
                      <th width="60%"> Particulars </th>
                      <th className="text-right"> 2023 -2024 </th>
                      <th className="text-right"> 2024 -2025 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} >
                        <td>{item.id}</td>
                        <td >{item.description}</td>
                        <td className="text-right">{item.amount}</td>
                        <td className="text-right">{item.prevamount}</td>
                        </tr>
                    ))}

                    <tr className="totals-bold">
                      <td> </td>
                      <td className="text-right"> Total  </td>
                       <td className="text-right">{totalAmount}</td>
                      <td className="text-right">{totalPrevAmount}</td>
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

export default Dummyx1;