import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const Datatables = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://demo.anyibc.com/api/apiRoutes/entities-value");
        setData(res.data);
        setFilteredData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Search Filter
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  // Paginate Data
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    { name: "S.No", selector: (row) => row.s_no, sortable: true, width: "80px" },
    { name: "Entity Name", selector: (row) => row.entity_name, sortable: true },
    { name: "Frequency", selector: (row) => row.reporting_frequency, sortable: true },
    { name: "Financial Year", selector: (row) => row.financial_year, sortable: true },
    { name: "PAN", selector: (row) => row.pan },
    { name: "CIN", selector: (row) => row.cin },
    { name: "Constitution", selector: (row) => row.constitution },
    { name: "Framework", selector: (row) => row.framework },
    { name: "CFS", selector: (row) => row.cfs_applicable },
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="pagination-records">
          <span>Show </span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[15, 30, 60, 100, data.length].filter((value, index, self) =>
              value <= data.length && self.indexOf(value) === index
            ).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span> entries</span>
        </div>


        <div><strong>Company Master Table</strong></div>

        <div className="custom-table-search">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={currentRows}
        pagination
        paginationServer
        paginationTotalRows={filteredData.length}
        paginationPerPage={rowsPerPage}
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationDefaultPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
        striped
        highlightOnHover
        responsive
        fixedHeader
      />
    </div>
  );
};

export default Datatables;
