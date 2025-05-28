import React, { useState, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import commonService from "../../../services/common.service";
import apiUrlsModulesService from "../../../services/apiUrlsModules.service";
import swal from "sweetalert";

const ClosingStock = () => {
  const [closingData, setClosingData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    commonService.getAll(`${apiUrlsModulesService.getAllmovementct}`)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          const firstItem = response.data[0];
          if (firstItem.closing_stock && Array.isArray(firstItem.closing_stock)) {
            setClosingData(firstItem.closing_stock);
            console.log("Closing stock fetched: ", firstItem.closing_stock);
          } else {
            setClosingData([]);
            swal("No closing stock data found");
          }
        } else {
          swal(response.data?.error || "Invalid API response");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        swal("Failed to fetch closing stock data");
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
              <th width="25%">Inventory Name</th>
              <th>Closing Quantity</th>
              <th>Closing Value</th>
              <th>UOM</th>
              <th>Basics</th>
            </tr>
          </thead>
          <tbody>
            {closingData.length > 0 ? (
              closingData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.inv_name}</td>
                  <td>{item.closing_quality}</td>
                  <td>{item.closing_value}</td>
                  <td>{item.uom}</td>
                  <td>{item.basics}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No closing stock data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClosingStock;
