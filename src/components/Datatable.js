import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://demo.anyibc.com/api/testApis/financials/balance-sheet");
        const apiResponse = await response.json();

        if (apiResponse.success) {
          const formattedData = [];
          let id = 1;

          apiResponse.fsli_sections.forEach((section) => {
            section.lines.forEach((line) => {
              formattedData.push({
                id: id++,
                account: line.fsli_name,
                category: section.section,
                amount1: line.amount,
                amount2: "-", // Placeholder
                amount3: "-", // Placeholder
                total: line.amount,
                column8: "-",
                column9: "-",
                finalTotal: line.amount,
              });
            });
          });

          setTableData(formattedData);
          
          // Dynamically extract table headers
          if (formattedData.length > 0) {
            setTableHeaders(Object.keys(formattedData[0]));
          }
        } else {
          console.error("API response unsuccessful");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      const table = $(tableRef.current).DataTable();

      // Apply search for each column
      $(tableRef.current).find("thead input").on("keyup change", function () {
        let columnIndex = $(this).parent().index();
        table.column(columnIndex).search(this.value).draw();
      });
    }
  }, [tableData]);

  return (
    <div className="table-responsive">
      {tableData.length > 0 ? (
        <table ref={tableRef} className="table table-bordered table-striped table-design-1">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header.toUpperCase()}</th>
              ))}
            </tr>
            <tr>
              {tableHeaders.map((_, index) => (
                <th key={index}>
                  <input type="text" placeholder="Search..." className="form-control" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataTable;
