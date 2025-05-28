// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaPencilAlt, FaTimes } from "react-icons/fa";
// import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
// import swal from "sweetalert";
// import Pagination from "../../PaginationCommon";
// import commonService from "../../services/common.service";
// import apiUrlsService from "../../services/apiUrls.service";

// const DataDisplay = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [pageno, setPageNo] = useState(1);
//   const [records, setRecords] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     getAllAssignments();
//   }, [pageno, records]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     setPageNo(1); // Reset to first page
//     getAllAssignments();
//   };

//   const deleteAssignment = (id) => {
//     commonService.deleteById(apiUrlsService.deleteAssignment + id).then(
//       (response) => {
//         if (response) {
//           swal("Success", "Assignment deleted successfully!", "success");
//           getAllAssignments();
//         }
//       }
//     );
//   };

//   const getAllAssignments = () => {
//     let pagedata = {
//         search_username: searchQuery, 
//       active_page: pageno,
//       page_size: records
//     };

//     commonService.add(apiUrlsService.getAllAssignments, pagedata).then(
//       (response) => {
//         setAssignments(response.data.result);
//         setTotalElements(response.data.prefil.sql_records_count_new);
//         setSearchQuery(response.data.prefil.search_username);
//       }
//     );
//   };

//   const handlePageChange = (newPageNumber) => {
//     setPageNo(newPageNumber);
//   };

//   const handleRecordsChange = (event) => {
//     setRecords(event.target.value);
//     setPageNo(1); // Reset to first page
//   };

//   return (
//     <div className="container-fluid pl-2 pr-2">
//       <div className="row">
//         <div className="col-md-12 bg-white">
//           <div className="row">
//             <h3 className="header-title mt-2">Data Display</h3>
//           </div>
//         </div>

//         <div className="col-md-12 border bg-white pb-2 pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
//           <div className="col-md-12">
//             <form className="text-right formtext p-0 mr-0">
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <label className="mb-0">
//                   Show&nbsp;
//                   <select
//                     className="form-control d-inline w-auto"
//                     value={records}
//                     onChange={handleRecordsChange}
//                   >
//                     <option value="10">10</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                   &nbsp; entries
//                 </label>
//                 <div className="padding-search">
//                   <input 
//                     type="text"
//                     className="form-control d-inline w-auto"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                   />
//                   <button
//                     type="button"
//                     className="btn-sm btn-primary ml-2"
//                     onClick={handleSearch}
//                   >
//                     Search
//                   </button>
//                 </div>
//                 <Link to="/add_assignment" className="btn-sm btn-success ml-2">
//                   ADD
//                 </Link>
//               </div>
//             </form>
//           </div>

//           <div className="col-md-12 pt-0">
//             <table className="table table-striped table-bordered">
//               <thead>
//                 <tr>
//                   <th width="5%">S.No</th>
//                   <th width="20%">User Name</th>
//                   <th width="20%">Email</th>
//                   <th width="20%">Title</th>
//                   <th width="20%">Content</th>
//                   <th width="15%">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments ? (
//                   assignments.map((item, index) => {
//                     const sNo = (pageno - 1) * records + (index + 1);
//                     return (
//                       <tr key={index}>
//                         <td>{sNo}</td>
//                         <td>{item.username}</td>
//                         <td>{item.email}</td>
//                         <td>{item.title}</td>
//                         <td>{item.content}</td>
//                         <td>
//                           <Link
//                             className="btn btn-outline-secondary btn-sm mr-2"
//                             to={`/add_assignment/edit/${item.id}`}
//                             title="Edit"
//                           >
//                             <FaPencilAlt />
//                           </Link>
//                           <Link
//                             className="btn btn-outline-info btn-sm mr-2"
//                             to="/team"
//                             title="Team"
//                           >
//                             <BsPersonFill />
//                           </Link>
//                           <button
//                             className="btn btn-outline-danger btn-sm mr-2"
//                             title="Mark As Inactive"
//                             onClick={() => deleteAssignment(item.id)}
//                           >
//                             <FaTimes />
//                           </button>
//                           <Link
//                             className="btn btn-outline-warning btn-sm"
//                             to="/assignment_tag"
//                             title="Tag"
//                           >
//                             <BsFillTagsFill />
//                           </Link>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center">
//                       No data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="row">
//             <div className="col-md-6">
//               <Pagination
//                 totalElements={totalElements}
//                 recordsPerPage={records}
//                 pageNumber={pageno}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <span className="float-right">
//                 Showing {(pageno - 1) * records + 1} to{" "}
//                 {totalElements < pageno * records ? totalElements : pageno * records}{" "}
//                 of {totalElements} entries
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataDisplay;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { BsPersonFill, BsFillTagsFill } from "react-icons/bs";
import swal from "sweetalert";
import Pagination from "../../PaginationCommon";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";

const DataAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchtitle, setSearchTitle] = useState('');
  const [name, setName] = useState('');
  const [searchemail, setSearchEmail] = useState('');
  const [searchcontent, setSearchContent] = useState('');
  



  useEffect(() => {
    getAllAssignments();
    if (searchTerm !== '') {
        getAllAssignments();
      } else {
        getAllAssignments();
      }

    
  }, [pageno, records,searchTerm,name]);

  

  const handlesetSearchUsername = (event) => {
    setName(event.target.value);
  };

  

  const handleSearch = () => {
    setPageNo(1); // Reset to first page
    getAllAssignments();
  };

  const deleteAssignment = (id) => {
    commonService.deleteById(apiUrlsService.deleteAssignment + id).then(
      (response) => {
        if (response) {
          swal("Success", "Assignment deleted successfully!", "success");
          getAllAssignments();
        }
      }
    );
  };

  const getAllAssignments = () => {
    let pagedata = {
        name: name,
      
      // status: activeTab,
    };

    commonService.add(apiUrlsService.getAllDataAssignment, pagedata).then(
      (response) => {
        if(response && response.data) {
          console.log("mani",response.data)
          setAssignments(response.data);
        //   setTotalElements(response.data.prefil.sql_records_count_new);
          // setSearchResults(response.data.prefil.search_username);
        }
      }
    ).catch((error) => {
      console.error("API call failed: ", error);
    });
  };

  const handlePageChange = (newPageNumber) => {
    setPageNo(newPageNumber);
  };

  const handleRecordsChange = (event) => {
    setRecords(event.target.value);
    setPageNo(1); // Reset to first page
  };
  
 
  return (
    <div className="container-fluid pl-2 pr-2">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="row">
            <h3 className="header-title mt-2">Data Display</h3>
          </div>
        </div>

        <div className="col-md-12 border bg-white pb-2 pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
          <div className="col-md-12">
            <form className="text-right formtext p-0 mr-0">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="mb-0">
                  Show&nbsp;
                  <select
                    className="form-control d-inline w-auto"
                    value={records}
                    onChange={handleRecordsChange}
                  >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  &nbsp; entries
                </label>
                {/* <div className="padding-search">
                  <input 
                    type="text"
                    className="form-control d-inline w-auto"
                    placeholder="Search..."
                    value={searchResults}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="button"
                    className="btn-sm btn-primary ml-2"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div> */}
                <Link to="/add_assignment" className="btn-sm btn-success ml-2">
                  ADD
                </Link>
              </div>
            </form>
          </div>
          {/* <div className="col-md-12 pt-0">
             <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>
                    {result.username} - {result.email} - {result.title} - {result.content}
                  </li>
                ))}
              </ul>
            )}
            
          </div> */}

          <div className="col-md-12 pt-0">
            {/* <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="5%">S.No</th>
                  <th width="20%">User Name</th>
                  <th width="20%">Email</th>
                  <th width="20%">Title</th>
                  <th width="20%">Content</th>
                  <th width="15%">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments ? (
                  assignments.map((item, index) => {
                    const sNo = (pageno - 1) * records + (index + 1);
                    return (
                      <tr key={index}>
                        <td>{sNo}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>
                          <Link
                            className="btn btn-outline-secondary btn-sm mr-2"
                            to={`/add_assignment/edit/${item.id}`}
                            title="Edit"
                          >
                            <FaPencilAlt />
                          </Link>
                          <Link
                            className="btn btn-outline-info btn-sm mr-2"
                            to="/team"
                            title="Team"
                          >
                            <BsPersonFill />
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm mr-2"
                            title="Mark As Inactive"
                            onClick={() => deleteAssignment(item.id)}
                          >
                            <FaTimes />
                          </button>
                          <Link
                            className="btn btn-outline-warning btn-sm"
                            to="/assignment_tag"
                            title="Tag"
                          >
                            <BsFillTagsFill />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
             <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="5%">S.No</th>
                  <th width="">
                    User Name 
         
                        <input
                            type="text"
                            placeholder="Search..."
                            value={name}
                            onChange={handlesetSearchUsername} // Pass the event directly
                        />
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {searchResults.map((result) => (
                                    <li key={result.id}>
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                  </th>
                  <th>Email
                 
                  </th>
                 
             
                  {/* <th width="25%">
                    Email
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Email"
                      value={searchemail}
                      onChange={(e) => handleSearchChange(e, setSearchEmail)}
                    />

                  </th> */}
                  <th> Title
                
             
                  </th>
                  {/* <th width="25%">
                    Title
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Title"
                      value={searchtitle}
                      onChange={(e) => handleSearchChange(e, setSearchTitle)}
                    />
                  </th> */}
                 
                  <th width="20%">Action</th>
                </tr>
              </thead>
              <tbody>
        {Array.isArray(assignments) && assignments.length > 0 ? (
          assignments.map((item, index) => {
            const sNo = (pageno - 1) * records + (index + 1);
            return (
              <tr key={index}>
                <td>{sNo}</td>
                <td>{item.assignment_name}</td>
                <td>{item.period}</td>
                <td>{item.timeline}</td>
                <td>
                  <Link
                    className="btn btn-outline-secondary btn-sm mr-2"
                    to={`/add_assignment/edit/${item.id}`}
                    title="Edit"
                  >
                    <FaPencilAlt />
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm mr-2"
                    title="Mark As Inactive"
                    onClick={() => deleteAssignment(item.id)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No data found
            </td>
          </tr>
        )}
      </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Pagination
                totalElements={totalElements}
                recordsPerPage={records}
                pageNumber={pageno}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="col-md-6">
              <span className="float-right">
                Showing {(pageno - 1) * records + 1} to{" "}
                {totalElements < pageno * records ? totalElements : pageno * records}{" "}
                of {totalElements} entries
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAssignment;

