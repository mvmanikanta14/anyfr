
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";
import { IconHome, IconTrash, IconPencil } from "@tabler/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
import apiUrlsService from "../../../services/apiUrls.service";
import commonService from "../../../services/common.service";
import { ApiContext } from "../../../ApiProvider";


const ReconciliationofShareCapital = () => {
  const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [tableData, setTableData] = useState([]);

  const totalAmount = tableData.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalPrevAmount = tableData.reduce((acc, item) => acc + Number(item.prevamount), 0);

  useEffect(() => {
    getAllShareFormReconciliation();

  }, []);
  const { auth } = useContext(ApiContext);

  // const getAllShareFormReconciliation = () => {
  //   commonService.getAll(apiUrlsService.getAllShareFormReconciliation)
  //     .then((response) => {
  //       console.log("Raw API Response:", response.data);

  //       if (response && response.data && Array.isArray(response.data)) {
  //         console.log("Processed Table Data:", response.data.data);
  //         setTableData(response.data);
  //       } else {
  //         console.error("Invalid API response format:", response);
  //         setTableData([]); // Set empty array to prevent undefined errors
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("API call failed: ", error);
  //       setTableData([]); // Ensure empty array on failure
  //     });
  // };

  const [isDataPresent, setIsDataPresent] = useState(false); // Track if data exists

  const getAllShareFormReconciliation = () => {
    commonService.getAll(apiUrlsService.getAllShareFormReconciliation)
      .then((response) => {
        console.log("Raw API Response:", response);
  
        if (response && response.data && Array.isArray(response.data)) {
          const extractedData = response.data;
          
          console.log("Processed Table Data:", extractedData);
          setTableData(extractedData);
          setIsDataPresent(extractedData.length > 0); // Set flag if data exists
        } else {
          console.error("Invalid API response format:", response);
          setTableData([]);
          setIsDataPresent(false); // No data
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        setTableData([]);
        setIsDataPresent(false); // Handle API failure
      });
  };



  const handleAdd = () => {
    const requestData = {
      entity_id: 1,
      created_by: auth.login_id,
    };

    commonService.add(apiUrlsService.addShareFormReconciliation, requestData)
      .then((response) => {
        if (response && response.success) {
          console.log("Record Added Successfully:", response);
          getAllShareFormReconciliation(); // Refresh table data after adding
        } else {
          console.error("Failed to add record:", response);
          swal("Error", "Failed to add data.", "error");
        }
      })
      .catch(error => {
        console.error("API call failed: ", error);
        swal("Error", "Failed to add data.", "error");
      });
  };


  const updateShareReconciliation = (id, updatedData) => {
    if (!id) {
      console.error("Invalid ID detected in update function:", id);
      return;
    }

    const requestData = {
      entity_id: updatedData.entity_id || 1,
      created_by: auth.login_id,
      current_year_shares: updatedData.current_year_shares || 0,
      current_year_amt: updatedData.current_year_amt || "0.00",
      previous_year_amt: updatedData.previous_year_amt || "0.00"
    };

    console.log(`Sending API request to: ${apiUrlsService.shareFormReconciliationEdit}/${id}`, requestData);

    commonService.update(`${apiUrlsService.shareFormReconciliationEdit}/${id}`, requestData)
      .then(response => {
        if (response && response.success) {
          console.log("Update Successful:", response);
          swal("Updated!", "Data has been successfully updated.", "success");
        } else {
          console.error("Update Failed:", response);
          swal("Updated!", "Data has been successfully updated.", "success");

        }
      })
      .catch(error => {
        console.error("API call failed: ", error);
        swal("Error", "Failed to update data.", "error");
      });
  };




  const handleInputChange = (id, field, value) => {
    console.log(`Updating ID: ${id}, Field: ${field}, New Value: ${value}`);

    if (!id) {
      console.error("Invalid ID detected:", id);
      swal("Error", "Invalid record ID, cannot update.", "error");
      return;
    }

    setTableData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          updateShareReconciliation(id, updatedItem); // Call API immediately
          return updatedItem;
        }
        return item;
      })
    );
  };



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




        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-between">

              <h6> <b> Reconciliation of Share Capital at the beginning and end of the reporting period</b></h6>
              {!isDataPresent && ( // Hide button when data exists
                <button
                  type="button"
                  className="ml-2 Addbutton text-right"
                  title="Add Checklist"
                  onClick={handleAdd}
                >
                  ADD
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table-custom table-regular totals-subtotals">
                <thead>
                  <tr>
                    <th width="5%" rowSpan={4}>S.No</th>
                    <th width="45%" rowSpan={4}> Particulars </th>
                    <th width="25%" className="text-center" colSpan={2}> For the Year ending  31-03-2024 </th>
                    <th width="25%" className="text-center" colSpan={2}> For the Year ending 31-03-2023 </th>

                  </tr>
                  <tr>
                    <th className="text-center" colSpan={1}> No.of Shares </th>
                    <th className="text-center" colSpan={1}>(Amount Rs in Lakhs) </th>


                    <th className="text-center" colSpan={1}> No.of Shares </th>
                    <th className="text-center" colSpan={1}>(Amount Rs in Lakhs) </th>

                  </tr>
                </thead>
                <tbody>
                  {tableData && tableData.length > 0 ? (
                    tableData.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{index + 1}</td>
                        <td>{item.particular || "N/A"}</td>

                        {/* Current Year Shares */}
                        <td className="text-right">
                          <input
                            type="text"
                            value={item.current_year_shares || ""}
                            onChange={(e) => handleInputChange(item.id, "current_year_shares", e.target.value)}
                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none"
                            style={{ outline: "none", boxShadow: "none" }}
                          />
                        </td>

                        {/* Current Year Amount */}
                        <td className="text-right">
                          <input
                            type="text"
                            value={item.current_year_amt || ""}
                            onChange={(e) => handleInputChange(item.id, "current_year_amt", e.target.value)}
                            className="borderBottom text-right border-0 border-bottom w-75 bg-transparent shadow-none"
                            style={{ outline: "none", boxShadow: "none" }}
                          />
                        </td>

                        <td>{item.previous_year_amt || "N/A"} </td>
                        <td>{item.previous_year_shares || "N/A"} </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>






              </table>
            </div>





          </div>
        </div>
      </div>

    </div>




  );
};

export default ReconciliationofShareCapital;