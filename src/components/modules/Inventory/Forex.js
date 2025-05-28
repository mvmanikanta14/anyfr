import React, { useState, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import commonService from "../../../services/common.service";
import apiUrlsModulesService from "../../../services/apiUrlsModules.service";
import swal from "sweetalert";

const Forex = () => {
  const [forexData, setForexData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    commonService.getAll(`${apiUrlsModulesService.getAllmovementforex}`)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          const firstItem = response.data[0];
          if (firstItem.forex_balances && Array.isArray(firstItem.forex_balances)) {
            setForexData(firstItem.forex_balances);
            console.log("Forex balances fetched: ", firstItem.forex_balances);
          } else {
            setForexData([]);
            swal("No forex balances data found");
          }
        } else {
          swal(response.data?.error || "Invalid API response");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        swal("Failed to fetch forex data");
      });
  };

  return (
    <div className="">
      {/* <div className="d-flex justify-content-end custom-table-search mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          // onChange={handleSearch}
        />
      </div> */}

      <div className="table-responsive">
        <table className="table table-bordered table-design-1">
          <thead>
            <tr className="bg-light">
              <th width="5%">S.No.</th>
              <th width="20%">Name</th>
              <th>Closing Balance</th>
              <th>Currency</th>
              <th>Exchange Rate</th>
              <th>Closing Balance (INR)</th>
            </tr>
          </thead>
          <tbody>
            {forexData.length > 0 ? (
              forexData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.closing_balance_forex}</td>
                  <td>{item.currency}</td>
                  <td>{item.exchange_rate}</td>
                  <td>{item.closing_balance_inr}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No forex data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Forex;
