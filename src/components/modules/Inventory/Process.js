import React, { useState, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import commonService from "../../../services/common.service";
import apiUrlsModulesService from "../../../services/apiUrlsModules.service";
import swal from "sweetalert";

const Process = () => {
  const [processData, setProcessData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    commonService.getAll(`${apiUrlsModulesService.getAllmovementpy}`)
      .then((response) => {
        if (response && Array.isArray(response.data)) {

          console.log("API response: ", response.data);
          const firstItem = response.data[0];
          if (firstItem.processes && Array.isArray(firstItem.processes)) {
            setProcessData(firstItem.processes);
            console.log("Processes fetched: ", firstItem.processes);
          } else {
            setProcessData([]);
            swal("No processes data found");
          }
        } else {
          swal(response.data?.error || "Invalid API response");
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
        swal("Failed to fetch process data");
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
              <th>S.No</th>
              <th>Process Name</th>
              <th>Input (Qty / Value)</th>
              <th>Output (Qty / Value)</th>
              <th>Shortage (Qty / Value)</th>
              <th>Excess (Qty / Value)</th>
            </tr>
          </thead>
          <tbody>
            {processData.length > 0 ? (
              processData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.process_name}</td>
                  <td>{item.input.quality} / {item.input.value}</td>
                  <td>{item.output.quality} / {item.output.value}</td>
                  <td>{item.shortage.quality} / {item.shortage.value}</td>
                  <td>{item.excess.quality} / {item.excess.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No process data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Process;
