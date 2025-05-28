import React, { useState, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import commonService from "../../../services/common.service";
import apiUrlsModulesService from "../../../services/apiUrlsModules.service";
import swal from "sweetalert";

const Mtm = () => {
  const [mtmData, setMtmData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    commonService.getAll(`${apiUrlsModulesService.getAllmovementmtm}`)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          const firstItem = response.data[0];
          if (firstItem.inv_tran_ope_mtm && Array.isArray(firstItem.inv_tran_ope_mtm)) {
            setMtmData(firstItem.inv_tran_ope_mtm);
            console.log("MTM data fetched: ", firstItem.inv_tran_ope_mtm);
          } else {
            setMtmData([]);
            swal("No MTM data found");
          }
        } else {
          swal(response.data?.error || "Invalid API response");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        swal("Failed to fetch MTM data");
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
              <th>S.No.</th>
             
              <th>Investment Name</th>
              <th>Opening Balance</th>
              <th>Ledger Balance</th>
              <th>MTM</th>
              <th>Difference</th>
             
            </tr>
          </thead>

          <tbody>
            {mtmData.length > 0 ? (
              mtmData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  
                  <td>{item.investment_id}</td>
                  <td>{item.opening_balance}</td>
                  <td>{item.ledger_balance}</td>
                  <td>{item.mtm}</td>
                  <td>{item.difference}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No MTM data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mtm;
