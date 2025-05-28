import React, { useState, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import commonService from "../../services/common.service";
import apiUrlsModulesService from "../../services/apiUrlsModules.service";
import swal from "sweetalert";

const Expenses = () => {
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    commonService.getAll(`${apiUrlsModulesService.getAllmovementexpenses}`)
      .then((response) => {

        console.log("Expenses fetched: ", response);
        if (response && Array.isArray(response.data)) {
          const firstItem = response.data;

          console.log("Expenses fetched: ", firstItem);
          if (firstItem && Array.isArray(firstItem)) {
            setExpensesData(firstItem);
            
          } else {
            setExpensesData([]);
            swal("No expenses data found");
          }
        } else {
          swal(response.data?.error || "Invalid API response");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        swal("Failed to fetch expenses data");
      });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end custom-table-search mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          // onChange={handleSearch}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-design-1">
          <thead>
            <tr className="bg-light">
              <th width="5%">S.No.</th>
              <th width="20%">GL Name</th>
              <th>Opening Provision</th>
              <th>Opening Prepaid</th>
              <th>GL Balance</th>
              <th>Closing Provision</th>
              <th>Closing Prepaid</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.length > 0 ? (
              expensesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.sno}</td>
                  <td>{item.gl_name}</td>
                  <td>{item.opening_provision}</td>
                  <td>{item.opening_prepaid}</td>
                  <td>{item.gl_balance}</td>
                  <td>{item.closing_provision}</td>
                  <td>{item.closing_prepaid}</td>
                  <td>{item.net_amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No expense data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;    