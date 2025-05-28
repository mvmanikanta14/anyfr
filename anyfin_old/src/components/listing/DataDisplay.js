

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
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchtitle, setSearchTitle] = useState('');
//   const [searchusername, setSearchUsername] = useState('');
//   const [searchemail, setSearchEmail] = useState('');
//   const [searchcontent, setSearchContent] = useState('');




//   useEffect(() => {
//     getAllAssignments();
//     if (searchTerm !== '') {
//       getAllAssignments();
//     } else {
//       getAllAssignments();
//     }


//   }, [pageno, records, searchTerm, searchusername, searchtitle, searchcontent, searchemail]);

//   const handlesetSearchEmail = (event) => {
//     setSearchEmail(event.target.value);
//   };

//   const handlesetSearchTitle = (event) => {
//     setSearchTitle(event.target.value);
//   };

//   const handlesetSearchContent = (event) => {
//     setSearchContent(event.target.value);
//   };

//   const handlesetSearchUsername = (event) => {
//     setSearchUsername(event.target.value);
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
//       search_username: searchusername,
//       search_email: searchemail,
//       search_title: searchtitle,
//       search_content: searchcontent,
//       active_page: pageno,
//       page_size: records,
//       // status: activeTab,
//     };

//     commonService.add(apiUrlsService.getAllAssignments, pagedata).then(
//       (response) => {
//         if (response && response.data) {
//           console.log("mani", response.data)
//           setAssignments(response.data.result);
//           setTotalElements(response.data.prefil.sql_records_count_new);
//           // setSearchResults(response.data.prefil.search_username);
//         }
//       }
//     ).catch((error) => {
//       console.error("API call failed: ", error);
//     });
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
//                   <th width="">
//                     User Name


//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchusername}
//                       onChange={handlesetSearchUsername} // Pass the event directly
//                     />
//                     {isLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <ul>
//                         {searchResults.map((result) => (
//                           <li key={result.id}>
//                             {result.search_username}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </th>
//                   <th>Email
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchemail}
//                       onChange={handlesetSearchEmail} // Pass the event directly
//                     />
//                     {isLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <ul>
//                         {searchResults.map((result) => (
//                           <li key={result.id}>
//                             {result.search_email}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </th>



//                   <th> Title
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchtitle}
//                       onChange={handlesetSearchTitle} // Pass the event directly
//                     />
//                     {isLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <ul>
//                         {searchResults.map((result) => (
//                           <li key={result.id}>
//                             {result.search_title}
//                           </li>
//                         ))}
//                       </ul>
//                     )}

//                   </th>

//                   <th> Content
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchcontent}
//                       onChange={handlesetSearchContent} // Pass the event directly
//                     />
//                     {isLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <ul>
//                         {searchResults.map((result) => (
//                           <li key={result.id}>
//                             {result.search_content}
//                           </li>
//                         ))}
//                       </ul>
//                     )}

//                   </th>

//                   <th width="20%">Action</th>
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
//                           {/* <Link
//                             className="btn btn-outline-info btn-sm mr-2"
//                             to="/team"
//                             title="Team"
//                             onClick={() => handleShow(item)}
//                           >
//                             <BsPersonFill />
//                           </Link> */}
//                           <button
//                             className="btn btn-outline-danger btn-sm mr-2"
//                             title="Mark As Inactive"
//                             onClick={() => deleteAssignment(item.id)}
//                           >
//                             <FaTimes />
//                           </button>
//                           {/* <Link
//                             className="btn btn-outline-warning btn-sm"
//                             to="/assignment_tag"
//                             title="Tag"
//                             onClick={() => handleShow(item)}
//                           >
//                             <BsFillTagsFill />
//                           </Link> */}
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
import { Modal, Button, Form } from "react-bootstrap";
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
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ username: "", email: "", title: "", content: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getAllAssignments();
    if (searchTerm !== '') {
      getAllAssignments();
    } else {
      getAllAssignments();
    }
  }, [pageno, records, searchTerm, searchusername, searchtitle, searchcontent, searchemail]);

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
        if (response && response.data) {
          console.log("mani", response.data)
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

  const handleModalShow = (assignment) => {
    setIsEditMode(!!assignment);
    setModalData(assignment ? assignment : { username: "", email: "", title: "", content: "" });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalData({ username: "", email: "", title: "", content: "" });
  };

  const handleModalSave = () => {
    if (isEditMode) {
      // Call update API
      commonService.updateById(apiUrlsService.updateAssignment + modalData.id, modalData).then(
        (response) => {
          if (response) {
            swal("Success", "Assignment updated successfully!", "success");
            getAllAssignments();
            handleModalClose();
          }
        }
      );
    } else {
      // Call add API
      commonService.add(apiUrlsService.addAssignment, modalData).then(
        (response) => {
          if (response) {
            swal("Success", "Assignment added successfully!", "success");
            getAllAssignments();
            handleModalClose();
          }
        }
      );
    }
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

                <Button onClick={() => handleModalShow(null)} className="btn-sm btn-success ml-2">
                  ADD
                </Button>
              </div>
            </form>
          </div>

          <div className="col-md-12 pt-0">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="5%">S.No</th>
                  <th width="">
                    User Name
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
                          <Button
                            className="btn btn-secondary btn-sm mr-2"
                            onClick={() => handleModalShow(item)}
                            title="Edit"
                          >
                            <FaPencilAlt />
                          </Button>
                          <button
                            className="btn btn-danger btn-sm mr-2"
                            title="Delete"
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

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Assignment" : "Add Assignment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={modalData.username}
                onChange={(e) => setModalData({ ...modalData, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={modalData.email}
                onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={modalData.title}
                onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={modalData.content}
                onChange={(e) => setModalData({ ...modalData, content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataDisplay;


