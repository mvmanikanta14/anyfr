// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Modal, Button, Form } from "react-bootstrap";
// import swal from "sweetalert";
// import axios from "axios";
// import { IconHome, IconPencil, IconTrash, IconRefresh } from '@tabler/icons-react';
// import { useForm } from "react-hook-form";
// import '../../css/custom_style.css';
// import 'jspdf-autotable';
// import apiUrlsService from "../../services/apiUrls.service";
// import commonService from "../../services/common.service";

// const Users = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadResponse, setUploadResponse] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Handle file upload on form submission
//   // const handleUpload = async (e) => {
//   //   e.preventDefault();
//   //   if (!selectedFile) {
//   //     swal("Please select a file to upload.");
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   // Append the file with the key "file" (ensure this key matches your backend)
//   //   formData.append("file", selectedFile);

//   //   try {
//   //     setUploading(true);
//   //     const response = await axios.post("http://localhost:3100/fssupload/upload", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //         // Add any auth headers if required, e.g.:
//   //         "Authorization": "Bearer <token>"
//   //       },
//   //     });
//   //     console.log(response);
//   //   //   alert(response.data);
//   //   alert(JSON.stringify(response, null, 2));
//   //     setUploadResponse(response.data);
//   //   //   swal("Success", "File uploaded successfully.", "success");
//   //   } catch (error) {
//   //     console.error("Upload error:", error);
//   //     swal("Error", "File upload failed.", "error");
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const handleUpload = (e) => {
//     e.preventDefault();
//     uploadExcelFile();
//   };


//   const uploadExcelFile = () => {
//     if (!selectedFile) {
//       swal("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile); // Ensure the backend expects "file" as the key

//     setUploading(true);

//     commonService.add(apiUrlsService.uploadFile, formData, {
//       // headers: {
//       //     "Content-Type": "multipart/form-data",
//       //     "Authorization": "Bearer <token>",
//       // },
//     })
//       .then((response) => {
//         console.log("Server Response:", response.data); // Log the response
//         setUploadResponse(response.data);
//         swal("Success", "File uploaded successfully.", "success");
//       })
//       .catch((error) => {
//         console.error("Upload error:", error);
//         swal("Error", error.response?.data?.error || "File upload failed.", "error");
//       })
//       .finally(() => {
//         setUploading(false);
//       });

//   };


//   return (
//     <div className="container">
//       <div className="bread_crumb my-3">
//         <div>
//           <h3 className="header-title">Tribalance</h3>
//         </div>
//         <div>
//           <ul>
//             <li className="active">
//               <Link to="">
//                 <IconHome />
//               </Link>
//             </li>
//             <li>Tribalance</li>
//           </ul>
//         </div>
//       </div>

//       {/* File Upload Section */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <Form onSubmit={handleUpload}>
//           <div className="col-md-4 text-left mt-1">
//             <label>Closing Balance <span className="text-danger">*</span></label>
//             <input
//               type="number"
//               placeholder="Enter Closing Balance"
//               className="accordiantext"
//               {...register("closing_balance", { required: true })}
//               defaultValue={editData ? editData.closing_balance : ""}
//             />
//             {errors.closing_balance && <span className="text-danger">Closing balance is required</span>}
//           </div>
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Label>Select Excel File</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={handleFileChange}
//                 accept=".xlsx, .xls"
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" disabled={uploading}>
//               {uploading ? "Uploading..." : "Upload File"}
//             </Button>
//           </Form>
//         </div>
//       </div>

//       {/* Upload Response Section */}
//       {uploadResponse && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5>Upload Response:</h5>
//             <pre>{JSON.stringify(uploadResponse, null, 2)}</pre>
//           </div>
//         </div>
//       )}


//     </div>
//   );
// };

// export default Users;

// // import React, { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import swal from "sweetalert";
// // import * as XLSX from "xlsx";
// // import apiUrlsService from "../../services/apiUrls.service";
// // import commonService from "../../services/common.service";

// // const Users = ({ editData }) => {
// //   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);

// //   // Handle file selection and validate "closing_balance"
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];

// //     if (!file) {
// //       swal("Error", "No file selected!", "error");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = (event) => {
// //       const binaryStr = event.target.result;
// //       const workbook = XLSX.read(binaryStr, { type: "binary" });
// //       const sheetName = workbook.SheetNames[0]; // Get first sheet
// //       const sheet = workbook.Sheets[sheetName];
// //       const jsonData = XLSX.utils.sheet_to_json(sheet);

// //       console.log("Parsed Excel Data:", jsonData);

// //       // Check if "closing_balance" exists in file
// //       if (jsonData.length > 0 && !jsonData[0].hasOwnProperty("closing_balance")) {
// //         swal("Error", "The uploaded file is missing the 'closing_balance' column.", "error");
// //         setSelectedFile(null);
// //         return;
// //       }

// //       setSelectedFile(file);
// //       swal("Success", "File validated successfully!", "success");
// //     };
// //     reader.readAsBinaryString(file);
// //   };

// //   // Handle form submission
// //   const onSubmit = (data) => {
    

// //     const formData = new FormData();
// //     formData.append("file", selectedFile); 
// //     formData.append("closing_balance", data.closing_balance); 

// //     setUploading(true);

// //     commonService
// //       .add(apiUrlsService.uploadFile, formData)
// //       .then((response) => {
// //         console.log("Server Response:", response.data);
// //         swal("Success", "File uploaded successfully.", "success");
// //       })
// //       .catch((error) => {
// //         console.error("Upload error:", error);
// //         swal("Error", error.response?.data?.error || "File upload failed.", "error");
// //       })
// //       .finally(() => {
// //         setUploading(false);
// //       });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="formtext modalform">
// //       <div className="container">
// //         <div className="row pt-1 mt-1">

        

// //           {/* Closing Balance Input */}
// //           <div className="col-md-4 text-left mt-1">
// //             <label>Closing Balance <span className="text-danger">*</span></label>
// //             <input
// //               type="number"
// //               placeholder="Enter Closing Balance"
// //               className="accordiantext"
// //               {...register("closing_balance", { required: true })}
// //               defaultValue={editData ? editData.closing_balance : ""}
// //             />
// //             {errors.closing_balance && <span className="text-danger">Closing balance is required</span>}
// //           </div>

// //           {/* File Upload */}
// //           <div className="col-md-4 text-left mt-1">
// //             <label>Upload Excel File <span className="text-danger">*</span></label>
// //             <input
// //               type="file"
// //               accept=".xlsx, .xls"
// //               onChange={handleFileChange}
// //               className="accordiantext"
// //             />
// //           </div>

// //         </div>

// //         <div className="row mt-3">
// //           <div className="col-md-12 text-center">
// //             <button type="submit" className="btn btn-primary" disabled={uploading}>
// //               {uploading ? "Uploading..." : "Submit"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default Users;

