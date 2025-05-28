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

const DataDisplay = () => {
  const [assignments, setAssignments] = useState([]);
  const [pageno, setPageNo] = useState(1);
  const [records, setRecords] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchtitle, setSearchTitle] = useState('');
  const [searchusername, setSearchUsername] = useState('');
  const [searchemail, setSearchEmail] = useState('');
  const [searchcontent, setSearchContent] = useState('');
  



  useEffect(() => {
    getAllAssignments();
    if (searchTerm !== '') {
        getAllAssignments();
      } else {
        getAllAssignments();
      }

    
  }, [pageno, records,searchTerm,searchusername,searchtitle ,searchcontent,searchemail]);

  const handlesetSearchEmail = (event) => {
    setSearchEmail(event.target.value);
  };

  const handlesetSearchTitle = (event) => {
    setSearchTitle(event.target.value);
  };

  const handlesetSearchContent = (event) => {
    setSearchContent(event.target.value);
  };

  const handlesetSearchUsername = (event) => {
    setSearchUsername(event.target.value);
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
      search_username: searchusername,
      search_email: searchemail,
      search_title: searchtitle,
      search_content: searchcontent,
      active_page: pageno,
      page_size: records,
      // status: activeTab,
    };

    commonService.add(apiUrlsService.getAllAssignments, pagedata).then(
      (response) => {
        if(response && response.data) {
          console.log("mani",response.data)
          setAssignments(response.data.result);
          setTotalElements(response.data.prefil.sql_records_count_new);
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
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Search Username"
                      value={searchusername}
                      onChange={(e) => handlesetSearchUsername(e, setSearchUsername)}
                    /> */}

<input
    type="text"
    placeholder="Search..."
    value={searchusername}
    onChange={handlesetSearchUsername} // Pass the event directly
/>
{isLoading ? (
    <p>Loading...</p>
) : (
    <ul>
        {searchResults.map((result) => (
            <li key={result.id}>
                {result.search_username}
            </li>
        ))}
    </ul>
)}
                  </th>
                  <th>Email
                  <input
    type="text"
    placeholder="Search..."
    value={searchemail}
    onChange={handlesetSearchEmail} // Pass the event directly
/>
{isLoading ? (
    <p>Loading...</p>
) : (
    <ul>
        {searchResults.map((result) => (
            <li key={result.id}>
                {result.search_email}
            </li>
        ))}
    </ul>
)}
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
                  <input
    type="text"
    placeholder="Search..."
    value={searchtitle}
    onChange={handlesetSearchTitle} // Pass the event directly
/>
{isLoading ? (
    <p>Loading...</p>
) : (
    <ul>
        {searchResults.map((result) => (
            <li key={result.id}>
                {result.search_title}
            </li>
        ))}
    </ul>
)}
             
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
                  <th> Content
                  <input
    type="text"
    placeholder="Search..."
    value={searchcontent}
    onChange={handlesetSearchContent} // Pass the event directly
/>
{isLoading ? (
    <p>Loading...</p>
) : (
    <ul>
        {searchResults.map((result) => (
            <li key={result.id}>
                {result.search_content}
            </li>
        ))}
    </ul>
)}
             
                  </th>
                  {/* <th width="25%">
                    Content
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Content"
                      value={searchcontent}
                      onChange={(e) => handleSearchChange(e, setSearchContent)}
                    />
                  </th> */}
                  <th width="20%">Action</th>
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
                          {/* <Link
                            className="btn btn-outline-info btn-sm mr-2"
                            to="/team"
                            title="Team"
                            onClick={() => handleShow(item)}
                          >
                            <BsPersonFill />
                          </Link> */}
                          <button
                            className="btn btn-outline-danger btn-sm mr-2"
                            title="Mark As Inactive"
                            onClick={() => deleteAssignment(item.id)}
                          >
                            <FaTimes />
                          </button>
                          {/* <Link
                            className="btn btn-outline-warning btn-sm"
                            to="/assignment_tag"
                            title="Tag"
                            onClick={() => handleShow(item)}
                          >
                            <BsFillTagsFill />
                          </Link> */}
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

export default DataDisplay;



// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FaPencilAlt, FaTimes, FaFileAlt, FaStickyNote, FaCommentDots, FaSearch, FaEnvelope, FaUndo } from "react-icons/fa";
// import { Modal, Button, Form } from "react-bootstrap";
// import swal from "sweetalert";
// import Pagination from "../../../PaginationCommon";
// import commonService from "../../../services/common.service";
// import apiUrlsService from "../../../services/apiUrls.service";
// import { useForm } from "react-hook-form";
// // /import { useAuth } from './AuthContext'; 
// import { useAuth } from '../../context/AuthProvider';
// import "../../../assets/css/custom_style.css";
// import { IconHome, IconPencil, IconTrash } from "@tabler/icons-react";
// import Subsidies from "./AboutTheProjectTabs/Subsidies";
// import Implementation from "./AboutTheProjectTabs/Implementation";
// import Departments from "./AboutTheProjectTabs/Departments";
// import tokenService from "../../../services/token.service";
// import Select from 'react-select';

// const UnderstandingtheProjectGreen = () => {
//     const [Vision, setVision] = useState([]);
//     const [Mission, setMission] = useState([]);
//     const [Goal, setGoal] = useState([]);
//     const [Economic, setEconomic] = useState([]);
//     const [Social, setSocial] = useState([]);
//     const [Technological, setTechnological] = useState([]);
//     const [Environmental, setEnvironmental] = useState([]);
//     const [Legal, setLegal] = useState([]);
//     const [Strengths, setStrengths] = useState([]);
//     const [Opportunities, setOpportunities] = useState([]);
//     const [Threats, setThreats] = useState([]);
//     const [Weaknesses, setWeaknesses] = useState([]);
//     const [Political, setPolitical] = useState([]);
//     const [Company, setCompany] = useState([]);
//     const [Industry, setIndustry] = useState([]);
//     const [Economy, setEconomy] = useState([]);
//     const [International, setInternational] = useState([]);
//     const [Governance, setGovernance] = useState([]);
//     const [Vendors, setVendors] = useState([]);
//     const [Customers, setCustomers] = useState([]);
//     const [Employees, setEmployees] = useState([]);
//     const [Competitors, setCompetitors] = useState([]);
//     const [Procure, setProcure] = useState([]);
//     const [Produce, setProduce] = useState([]);
//     const [Marketing, setMarketing] = useState([]);
//     const [Sales, setSales] = useState([]);
//     const [Distribution, setDistribution] = useState([]);
//     const [Risks, setRisks] = useState([]);
//     const [Mitigants, setMitigants] = useState([]);
//     const [Forward, setForward] = useState([]);
//     const [Backward, setBackward] = useState([]);
//     const [Integration, setIntegration] = useState([]);
//     const [subtypes, setSubTypes] = useState([]);











//     const [VisionAdd, setVisionAdd] = useState([]);
//     const [pageno, setPageNo] = useState(1);
//     const [records, setRecords] = useState(100);
//     const [totalElements, setTotalElements] = useState(0);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchLastName, setSearchLastName] = useState('');
//     const [searchVisionName, setSearchVisionName] = useState('');
//     const [searchemail, setSearchEmail] = useState('');
//     const [searchPhone, setSearchPhone] = useState('');
//     const [searchFirstName, setSearchFirstName] = useState('');
//     const [assignmenId, setassignmenId] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [modalData, setModalData] = useState({ username: "", email: "", title: "", content: "" });
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [ids, setId] = useState("");
//     // const [Aid, setAId] = useState("");
//     const [Nid, setNId] = useState("");
//     const [editData, setEditData] = useState([]);
//     const [title, setTitle] = useState("Add");
//     const [Show, setShow] = useState(false);
//     const [entityId, setEntityId] = useState("");
//     const [AId, setAId] = useState("");

//     useEffect(() => {
//         const id = tokenService.getAssignmentEID();
//         const Aid = tokenService.getAssignmentID();
//         console.log("Retrieved entity ID:", id);
//         console.log("Retrieved assignment ID:", Aid);
//         setEntityId(id);
//         setAId(Aid);
//       }, []);
    
//       useEffect(() => {
//         console.log("entityId:", entityId, "AId:", AId);
//         if (entityId && AId) {
//           console.log("Calling getAllIndividual with IDs");
//           getAllVision(entityId, AId);
//         }
//       }, [entityId, AId, pageno, records, searchTerm, searchFirstName, searchLastName, searchPhone, searchemail]);
    

//     // useEffect(() => {
//     //     getAllVision();
//     //     if (activeTab) {
//     //         getAllVision();
//     //     } else {
//     //         getAllVision();
//     //     }

//     // }, [pageno, records, searchTerm, Aid, Nid, searchVisionName, searchFirstName, searchLastName, searchPhone, searchemail]);

//     useEffect(() => {
//         if (editData && editData.note_subtype_id) {
//             setValue('subtypes', editData.note_subtype_id);
//         }
//     }, [editData]);

//     const handleSearch = () => {
//         setPageNo(1); // Reset to first page
//         getAllVision();
//     };
//     const { auth } = useAuth();

//     const { id } = useParams();

//     const deleteAllTabs = (id) => {
//         const payload = {
//             id: id,
//         };

//         commonService.add(apiUrlsService.deleteAllTabs, payload).then(
//             (response) => {
//                 console.log(response)
//                 // alert(response.data.success)
//                 if (response.data.success === true) { // Assuming 200 is the success status code
//                     swal("Success", "Deleted successfully!", "success");
//                     getAllVision();
//                 } else if (response.data.success === false) { // Assuming 403 is the forbidden status code
//                     swal("Error", "You don't have permission to delete this Data!", "error");
//                 } else {
//                     swal("Error", "Something went wrong!", "error");
//                 }
//             }
//         ).catch((error) => {
//             if (error.response && error.response.status === 403) {
//                 swal("Error", "You don't have permission to delete this item!", "error");
//             } else {
//                 swal("Error", "Something went wrong!", "error");
//             }
//         });
//     };


//     const getDataAllSubtypes = async (note_type_id) => {
//         let pagedata = {
//             note_type_id: note_type_id,

//         };

//         try {
//             const response = await commonService.add(apiUrlsService.getAllSubTypes, pagedata);
//             if (response && response.data) {
//                 console.log("subtypess", response.data);
//                 setSubTypes(response.data.result)

//             }
//         } catch (error) {
//             console.error("API call failed: ", error);
//         }
//     };






//     const getAllVision = async () => {
//         console.log(activeTab, "activeTab");

//         if (activeTab == 'VMG') {
//             setVision(await getData(1));
//             console.log(Vision, "Vision")
//             setMission(await getData(2));
//             console.log(Mission, "Mission")
//             setGoal(await getData(3));
//         } else if (activeTab == 'PESTEL') {
//             setPolitical(await getData(8));
//             setEconomic(await getData(9));
//             setSocial(await getData(10));
//             setTechnological(await getData(11));
//             setEnvironmental(await getData(12));
//             setLegal(await getData(13));
//         } else if (activeTab == 'SWOT') {
//             setStrengths(await getData(4));
//             setWeaknesses(await getData(5));
//             setOpportunities(await getData(6));
//             setThreats(await getData(7));
//         }
//         else if (activeTab == 'CIEI') {
//             setCompany(await getData(14));
//             setIndustry(await getData(15));
//             setEconomy(await getData(16));
//             setInternational(await getData(17));
//         }
//         else if (activeTab == 'ESG') {
//             setEnvironmental(await getData(12));
//             setSocial(await getData(10));
//             setGovernance(await getData(18));
//         }


//         else if (activeTab == 'VCEC') {
//             setVendors(await getData(19));
//             setCustomers(await getData(20));
//             setEmployees(await getData(21));
//             setCompetitors(await getData(22));
//         }
//         else if (activeTab == 'PPMSD') {
//             setProcure(await getData(23));
//             setProduce(await getData(24));
//             setMarketing(await getData(25));
//             setSales(await getData(26));
//             setDistribution(await getData(27));
//         }
//         else if (activeTab == 'RM') {
//             setRisks(await getData(28));
//             setMitigants(await getData(29));
//         }
//         else if (activeTab == 'FBI') {
//             setForward(await getData(30));
//             setBackward(await getData(31));
//             setIntegration(await getData(32));
//         }
//     };

//     const getData = async (note_type_id) => {
//         let pagedata = {
//             assignment_id: AId,
//             note_type_id: note_type_id,
//             notes: searchFirstName,
//             name: searchLastName,
//             active_page: pageno,
//             page_size: records,
//         };

//         try {
//             const response = await commonService.add(apiUrlsService.getAllVision, pagedata);
//             if (response && response.data) {
//                 console.log("mani", response.data);
//                 return response.data.result;
//             }
//         } catch (error) {
//             console.error("API call failed: ", error);
//         }
//     };









//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//         setValue,
//     } = useForm({
//         mode: "onChange",
//     });



//     const onSubmit = (data) => {
//         console.log(data, "submit data")
//         let type_id
//         if (popupName == "Vision") {
//             type_id = "1"
//         }
//         else if (popupName == "Mission") {
//             type_id = "2"
//         }
//         else if (popupName == "Goal") {
//             type_id = "3"
//         }
//         let pagedata = {
//             assignment_id: AId,
//             note_type_id: type_id,
//             notes: data.notes,
//             name: data.name,
//             note_subtype_id: data.subtypes
//         };
//         if (!ids) {
//             commonService.add(apiUrlsService.AddAllTabs, pagedata)
//                 .then((res) => {
//                     swal("Success", " added succesfully..!", "success");
//                     handleCloseShow();
//                     setActiveTab(activeTab);
//                     getAllVision();

//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//         else {

//             data.id = ids;
//             data.note_type_id = type_id;
//             data.assignment_id =AId;
//             data.note_subtype_id = data.subtypes;
//             console.log(data);

//             commonService.add(apiUrlsService.editAllTabs, data)
//                 .then(
//                     (response) => {
//                         if (response.data.success === true) {

//                             setActiveTab(activeTab);
//                             getAllVision();
//                             swal("Success", " Updated succesfully..!", "success");
//                             reset();
//                             handleCloseShow();
//                         }
//                     },
//                     (error) => {
//                         if (error.response && error.response.status === 403) {
//                             // EventBus.dispatch("logout");
//                         }
//                     }
//                 );
//         }
//     }


//     const handleShowEdit = (id, StaticName) => {
//         let itemToEdit = [];
//         if (StaticName === "Vision") {
//             itemToEdit = Vision.find((item) => item.id === id);
//         } else if (StaticName === "Mission") {
//             itemToEdit = Mission.find((item) => item.id === id);

//         } else if (StaticName === "Goal") {
//             itemToEdit = Goal.find((item) => item.id === id);
//         } else if (StaticName === "Political") {
//             itemToEdit = Political.find((item) => item.id === id);
//         } else if (StaticName === "Technological") {
//             itemToEdit = Technological.find((item) => item.id === id);
//         } else if (StaticName === "Environmental") {
//             itemToEdit = Environmental.find((item) => item.id === id);
//         } else if (StaticName === "Legal") {
//             itemToEdit = Legal.find((item) => item.id === id);
//         } else if (StaticName === "Strengths") {
//             itemToEdit = Strengths.find((item) => item.id === id);
//         } else if (StaticName === "Weaknesses") {
//             itemToEdit = Weaknesses.find((item) => item.id === id);
//         } else if (StaticName === "Opportunities") {
//             itemToEdit = Opportunities.find((item) => item.id === id);
//         } else if (StaticName === "Threats") {
//             itemToEdit = Threats.find((item) => item.id === id);
//         } else if (StaticName === "Company") {
//             itemToEdit = Company.find((item) => item.id === id);
//         } else if (StaticName === "Industry") {
//             itemToEdit = Industry.find((item) => item.id === id);
//         } else if (StaticName === "International") {
//             itemToEdit = International.find((item) => item.id === id);
//         } else if (StaticName === "Environmental") {
//             itemToEdit = Environmental.find((item) => item.id === id);
//         } else if (StaticName === "Social") {
//             itemToEdit = Social.find((item) => item.id === id);
//         } else if (StaticName === "Governance") {
//             itemToEdit = Governance.find((item) => item.id === id);
//         } else if (StaticName === "Vendors") {
//             itemToEdit = Vendors.find((item) => item.id === id);
//         } else if (StaticName === "Customers") {
//             itemToEdit = Customers.find((item) => item.id === id);
//         }
//         else if (StaticName === "Employees") {
//             itemToEdit = Employees.find((item) => item.id === id);
//         } else if (StaticName === "Competitors") {
//             itemToEdit = Competitors.find((item) => item.id === id);
//         } else if (StaticName === "Procure") {
//             itemToEdit = Procure.find((item) => item.id === id);
//         } else if (StaticName === "Customers") {
//             itemToEdit = Customers.find((item) => item.id === id);
//         } else if (StaticName === "Produce") {
//             itemToEdit = Produce.find((item) => item.id === id);
//         } else if (StaticName === "Customers") {
//             itemToEdit = Customers.find((item) => item.id === id);
//         } else if (StaticName === "Marketing") {
//             itemToEdit = Marketing.find((item) => item.id === id);
//         } else if (StaticName === "Sales") {
//             itemToEdit = Sales.find((item) => item.id === id);
//         } else if (StaticName === "Distribution") {
//             itemToEdit = Distribution.find((item) => item.id === id);
//         }
//         else if (StaticName === "Risks") {
//             itemToEdit = Risks.find((item) => item.id === id);
//         } else if (StaticName === "Mitigants") {
//             itemToEdit = Mitigants.find((item) => item.id === id);
//         } else if (StaticName === "Forward") {
//             itemToEdit = Forward.find((item) => item.id === id);
//         }
//         else if (StaticName === "Backward") {
//             itemToEdit = Backward.find((item) => item.id === id);
//         }
//         else if (StaticName === "Integration") {
//             itemToEdit = Integration.find((item) => item.id === id);
//         }


//         setEditData(itemToEdit);
//         getDataAllSubtypes(itemToEdit.note_type_id)

//         console.log(itemToEdit, "this is the id for edit")
//         setTitle("Edit");
//         setId(itemToEdit.id);
//         console.log(ids, 'ids');
//         setStaticName(StaticName);
//         setShow(true);
//         setIsEditMode(true);
//         reset();
//     }

//     const handleCloseShow = () => {
//         setEditData(null); // Reset editData
//         setId(""); // Reset the ID
//         setShow(false)
//     }
//     const [popupName, setStaticName] = useState("");

//     const handleShow = (StaticName, note_type_id) => {
//         // alert(StaticName)
//         reset();
//         setStaticName(StaticName);
//         setShow(true);
//         setTitle("Add")
//         getDataAllSubtypes(note_type_id)
//     }

//     const CommonOptions = subtypes.map((subtypes) => ({
//         value: subtypes.id,
//         label: subtypes.sub_type_name,
//     }));

//     const handleSubTypesSelectChange = (selectedOption) => {
//         setValue('note_subtype_id', selectedOption ? selectedOption.value : '');
//     };

//     const [activeTab, setActiveTab] = useState('VMG');

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//         getAllVision();

//         // console.log(activeTab,"activeTab09")
//     };
//     const tabs = ['VMG', 'PESTEL', 'SWOT', 'CIEI', 'ESG', 'VCEC', 'PPMSD', 'RM', 'FBI', 'Location', 'Departments','Implementation', 'Subsidies'];

//     return (
//         <div className=" ">
//             <div className=" ">

//                 <div className="bread_crumb">
//                     <div className=" ">
//                         <h3 className="header-title">  About the Project </h3>
//                     </div>

//                     <div>
//                         <ul>
//                             <li className="active"> <a href="">  <IconHome />  </a> </li>
//                             <li>   About the Project </li>
//                             <li>{activeTab}</li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="card">

//                     <div className="custom_tabs_list">
//                         <div>
//                             {tabs.map((tab) => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => handleTabClick(tab)}
//                                     className={activeTab === tab ? 'active' : ''}
//                                 >
//                                     {tab}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="card-body">


//                         {activeTab === 'VMG' && (


//                             <div className="tab-content custom_tabs">


//                                 <div className="tab-data border-none">


//                                     <div className="d-flex justify-content-between align-items-center  ">
//                                         <h6>Vision</h6>

//                                         <button
//                                             type="button"
//                                             className="mt-2 Addbutton"
//                                             title="Add  Checklist "
//                                             onClick={() => handleShow("Vision", "1")}
//                                         >
//                                             ADD
//                                         </button>
//                                     </div>
//                                     <div className="table-responsive">


//                                         <table className="table table-striped table-bordered table-hover table_custom_1">
//                                             <thead>
//                                                 <tr className="border-btm-0">
//                                                     <th width="5%">S.No</th>
//                                                     <th width="15%">  Type </th>
//                                                     <th>  Sub Types  </th>

//                                                     <th width="10%">Action
//                                                     </th>
//                                                 </tr>
//                                             </thead>

//                                             <tbody>
//                                                 {Vision && Vision.length > 0 ? (
//                                                     Vision.slice().reverse().map((item, index) => {
//                                                         const sNo = (pageno - 1) * records + (index + 1);
//                                                         return (
//                                                             <tr key={index}>
//                                                                 <td>{sNo}</td>
//                                                                 <td>{item.note_name ? item.note_name : ""}</td>
//                                                                 <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                                 <td className="inline-btns ">
//                                                                     <button
//                                                                         className="btn-primary-outlined"
//                                                                         onClick={() => handleShowEdit(item.id, 'Vision')}
//                                                                         title="Edit"
//                                                                     >
//                                                                         <IconPencil />
//                                                                     </button>

//                                                                     <button
//                                                                         className="btn-danger-outlined"
//                                                                         title="Delete"
//                                                                         onClick={() => deleteAllTabs(item.id)}
//                                                                     >
//                                                                         <IconTrash />
//                                                                     </button>


//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                     })
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="7" className="text-center">
//                                                             No data found
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>

//                                         </table>

//                                         <div className="w-100">


//                                             <div className="d-flex justify-content-between align-items-center  ">
//                                                 <h6>Mission</h6>

//                                                 <button
//                                                     type="button"
//                                                     className="mt-2 Addbutton"
//                                                     title="Add  Checklist "
//                                                     onClick={() => handleShow("Mission", "2")}
//                                                 >
//                                                     ADD
//                                                 </button>
//                                             </div>
//                                         </div>


//                                         <table className="table table-striped table-bordered table-hover table_custom_1">
//                                             <thead>
//                                                 <tr className="border-btm-0">
//                                                     <th width="5%">S.No</th>
//                                                     <th width="15%">  Type </th>
//                                                     <th>  Sub Types  </th>

//                                                     <th width="10%">Action
//                                                     </th>
//                                                 </tr>
//                                             </thead>

//                                             <tbody>
//                                                 {Mission && Mission.length > 0 ? (
//                                                     Mission.slice().reverse().map((item, index) => {
//                                                         const sNo = (pageno - 1) * records + (index + 1);
//                                                         return (
//                                                             <tr key={index}>
//                                                                 <td>{sNo}</td>
//                                                                 <td>{item.note_name ? item.note_name : ""}</td>
//                                                                 <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                                 <td className="inline-btns ">
//                                                                     <button
//                                                                         className="btn-primary-outlined"
//                                                                         onClick={() => handleShowEdit(item.id, "Mission")}
//                                                                         title="Edit"
//                                                                     >
//                                                                         <IconPencil />
//                                                                     </button>

//                                                                     <button
//                                                                         className="btn-danger-outlined"
//                                                                         title="Delete"
//                                                                         onClick={() => deleteAllTabs(item.id)}
//                                                                     >
//                                                                         <IconTrash />
//                                                                     </button>


//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                     })
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="7" className="text-center">
//                                                             No data found
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>

//                                         </table>

//                                         <div className="w-100">


//                                             <div className="d-flex justify-content-between align-items-center  ">
//                                                 <h6>Goal of the Entity</h6>

//                                                 <button
//                                                     type="button"
//                                                     className="mt-2 Addbutton"
//                                                     title="Add  Checklist "
//                                                     onClick={() => handleShow("Goal", "3")}
//                                                 >
//                                                     ADD
//                                                 </button>
//                                             </div>
//                                         </div>


//                                         <table className="table table-striped table-bordered table-hover table_custom_1">
//                                             <thead>
//                                                 <tr className="border-btm-0">
//                                                     <th width="5%">S.No</th>
//                                                     <th width="15%">  Type </th>
//                                                     <th>  Text  </th>

//                                                     <th width="10%">Action
//                                                     </th>
//                                                 </tr>
//                                             </thead>

//                                             <tbody>
//                                                 {Goal && Goal.length > 0 ? (
//                                                     Goal.slice().reverse().map((item, index) => {
//                                                         const sNo = (pageno - 1) * records + (index + 1);
//                                                         return (
//                                                             <tr key={index}>
//                                                                 <td>{sNo}</td>
//                                                                 <td>{item.note_name ? item.note_name : ""}</td>
//                                                                 <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                                 <td className="inline-btns ">
//                                                                     <button
//                                                                         className="btn-primary-outlined"
//                                                                         onClick={() => handleShowEdit(item.id, "Goal")}
//                                                                         title="Edit"
//                                                                     >
//                                                                         <IconPencil />
//                                                                     </button>

//                                                                     <button
//                                                                         className="btn-danger-outlined"
//                                                                         title="Delete"
//                                                                         onClick={() => deleteAllTabs(item.id)}
//                                                                     >
//                                                                         <IconTrash />
//                                                                     </button>


//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                     })
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="7" className="text-center">
//                                                             No data found
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>

//                                         </table>

//                                     </div>
//                                 </div>


//                             </div>
//                         )}

//                         <div className="tab-content custom_tabs">

//                             {activeTab === 'PESTEL' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Political</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Political", "8")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Political && Political.length > 0 ? (
//                                                 Political.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Political")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Economic</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Economic", "9")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Economic && Economic.length > 0 ? (
//                                                 Economic.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Economic")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Social</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Social", "10")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Social && Social.length > 0 ? (
//                                                 Social.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Social")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Technological</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Technological", "11")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Technological && Technological.length > 0 ? (
//                                                 Technological.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Technological")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Environmental</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Environmental", "12")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Environmental && Environmental.length > 0 ? (
//                                                 Environmental.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Environmental")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Legal </h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Legal", "13")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Legal && Legal.length > 0 ? (
//                                                 Legal.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Legal")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                 </div>




//                             )}

//                             {activeTab === 'SWOT' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Strengths</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Strengths", "4")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Strengths && Strengths.length > 0 ? (
//                                                 Strengths.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Strengths")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Weakness</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Weaknesses", "5")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Weaknesses && Weaknesses.length > 0 ? (
//                                                 Weaknesses.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Weaknesses")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Opportunity</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Opportunities", "6")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Opportunities && Opportunities.length > 0 ? (
//                                                 Opportunities.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Opportunities")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Threats</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Threats", "7")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Threats && Threats.length > 0 ? (
//                                                 Threats.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Threats")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>



//                                 </div>




//                             )}

//                             {activeTab === 'CIEI' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Company</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Company", "14")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Company && Company.length > 0 ? (
//                                                 Company.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Company")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Industry</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Industry", "15")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Industry && Industry.length > 0 ? (
//                                                 Industry.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Industry")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Economy</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Economy", "16")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Economy && Economy.length > 0 ? (
//                                                 Economy.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Economy")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>International</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("International", "17")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {International && International.length > 0 ? (
//                                                 International.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "International")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>



//                                 </div>




//                             )}

//                             {activeTab === 'ESG' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Environmental</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Environmental", "12")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Environmental && Environmental.length > 0 ? (
//                                                 Environmental.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Environmental")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Social</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Social", "10")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Social && Social.length > 0 ? (
//                                                 Social.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Social")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Governance</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Governance", "18")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Governance && Governance.length > 0 ? (
//                                                 Governance.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Governance")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>





//                                 </div>




//                             )}

//                             {activeTab === 'VCEC' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Vendors</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Vendors", "19")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Vendors && Vendors.length > 0 ? (
//                                                 Vendors.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Vendors")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Customers</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Customers", "20")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Customers && Customers.length > 0 ? (
//                                                 Customers.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Customers")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Employees</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Employees", "21")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Employees && Employees.length > 0 ? (
//                                                 Employees.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Employees")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Competitors</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Competitors", "22")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Competitors && Competitors.length > 0 ? (
//                                                 Competitors.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Competitors")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>





//                                 </div>




//                             )}

//                             {activeTab === 'PPMSD' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Procure</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Procure", "23")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Procure && Procure.length > 0 ? (
//                                                 Procure.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Procure")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Produce</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Produce", "24")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Produce && Produce.length > 0 ? (
//                                                 Produce.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Produce")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Marketing</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Marketing", "25")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Marketing && Marketing.length > 0 ? (
//                                                 Marketing.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Marketing")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Sales</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Sales", "26")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Sales && Sales.length > 0 ? (
//                                                 Sales.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Sales")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Distribution</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Distribution", "27")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Distribution && Distribution.length > 0 ? (
//                                                 Distribution.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Distribution")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>





//                                 </div>




//                             )}

//                             {activeTab === 'RM' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Risks</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Risks", "28")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Risks && Risks.length > 0 ? (
//                                                 Risks.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Risks")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Mitigants</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Mitigants", "29")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Mitigants && Produce.length > 0 ? (
//                                                 Mitigants.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Mitigants")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>







//                                 </div>




//                             )}

//                             {activeTab === 'FBI' && (



//                                 <div className="table-responsive">

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Forward</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Forward", "30")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Forward && Forward.length > 0 ? (
//                                                 Forward.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Forward")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Backward</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Backward", "31")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Backward && Backward.length > 0 ? (
//                                                 Backward.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Backward")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>

//                                     <div className="w-100">


//                                         <div className="d-flex justify-content-between align-items-center  ">
//                                             <h6>Integration</h6>

//                                             <button
//                                                 type="button"
//                                                 className="mt-2 Addbutton"
//                                                 title="Add  Checklist "
//                                                 onClick={() => handleShow("Integration", "32")}
//                                             >
//                                                 ADD
//                                             </button>
//                                         </div>
//                                     </div>


//                                     <table className="table table-striped table-bordered table-hover table_custom_1">
//                                         <thead>
//                                             <tr className="border-btm-0">
//                                                 <th width="5%">S.No</th>
//                                                 <th width="15%">  Type </th>
//                                                 <th>  Text  </th>

//                                                 <th width="10%">Action
//                                                 </th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Integration && Integration.length > 0 ? (
//                                                 Integration.slice().reverse().map((item, index) => {
//                                                     const sNo = (pageno - 1) * records + (index + 1);
//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>{sNo}</td>
//                                                             <td>{item.note_name ? item.note_name : ""}</td>
//                                                             <td>{item.sub_type_name ? item.sub_type_name : ""}</td>


//                                                             <td className="inline-btns ">
//                                                                 <button
//                                                                     className="btn-primary-outlined"
//                                                                     onClick={() => handleShowEdit(item.id, "Integration")}
//                                                                     title="Edit"
//                                                                 >
//                                                                     <IconPencil />
//                                                                 </button>

//                                                                 <button
//                                                                     className="btn-danger-outlined"
//                                                                     title="Delete"
//                                                                     onClick={() => deleteAllTabs(item.id)}
//                                                                 >
//                                                                     <IconTrash />
//                                                                 </button>


//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="7" className="text-center">
//                                                         No data found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>

//                                     </table>







//                                 </div>




//                             )}

//                             {activeTab === 'Subsidies' && (
//                                 <>
//                                     <Subsidies />
//                                 </>

//                             )}

//                             {activeTab === 'Departments' && (
//                                 <>
//                                     <Departments />
//                                 </>

//                             )}

//                             {activeTab === 'Implementation' && (
//                                 <>
//                                     <Implementation />
//                                 </>

//                             )}

//                         </div>





//                     </div>
//                 </div>
//             </div>

//             {/* Start Common POP UP */}
//             <div className="model_box">
//                 <Modal
//                     show={Show}
//                     onHide={handleCloseShow}
//                     centered
//                     size="lg"
//                     backdrop="static"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     ClassName="modalcustomise"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>{isEditMode ? `Edit ${popupName} ` : `Add ${popupName}`}</Modal.Title>
//                     </Modal.Header>

//                     <Modal.Body className="custom-modal-body">
//                         <div className="p-0 border modalstart">
//                             <form
//                                 onSubmit={handleSubmit(onSubmit)}
//                                 className="formtext modalform"
//                             >
//                                 <div className="container">
//                                     <div className="row pt-1 mt-1">






//                                         <div className="col-md-4 text-left mt-1 ">
//                                             <label className="">
//                                                 Text {" "}
//                                                 <span className="text-danger">*</span>
//                                             </label>

//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter Client Name"
//                                                 className="accordiantext"
//                                                 {...register("notes", {
//                                                     required: true,
//                                                 })}

//                                                 defaultValue={editData ? editData.note_name : ""} // Set initial value based on editData
//                                             />
//                                             {errors.notes && (
//                                                 <span className="text-danger">This is required</span>
//                                             )}
//                                         </div>

//                                         <div className="col-md-4 text-left mt-1 ">
//                                             <label className="">
//                                                 Sub Types <span className="text-danger">*</span>
//                                             </label>

//                                             {/* <select
//                                                 className="accordiantext"
//                                                 {...register("subtypes", { required: true })}
//                                                 defaultValue={editData ? editData.note_subtype_id : ""}
//                                             >
//                                                 <option value="">---Select----</option>
//                                                 {Array.isArray(subtypes) &&
//                                                     subtypes.map((h, i) => (
//                                                         <option key={i} value={h.id}>
//                                                             {h.sub_type_name}
//                                                         </option>
//                                                     ))
//                                                 }
//                                             </select> */}
//                                              <Select
//                                                 options={CommonOptions}
//                                                 onChange={handleSubTypesSelectChange}
//                                                 placeholder="---Select---"
//                                                 defaultValue={
//                                                     editData && editData.note_subtype_id
//                                                         ? CommonOptions.find((option) => option.value === editData.note_subtype_id)
//                                                         : null
//                                                 }
//                                                 isClearable
//                                                 className="accordiantext"
//                                             />
//                                         </div>



//                                         <div className="col-md-12 text-right">





//                                             <button className=" mt-1 text-white accordianbutton">
//                                                 {title}
//                                             </button>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </Modal.Body>
//                 </Modal>
//             </div>

//             {/* END Common POP UP */}



//         </div>
//     );
// };

// export default UnderstandingtheProjectGreen;




