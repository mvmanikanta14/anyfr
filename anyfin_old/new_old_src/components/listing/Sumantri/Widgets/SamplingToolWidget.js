// import React, { useRef } from 'react';
// import { Typography, Box, Avatar, Chip, IconButton } from '@mui/material';
// import { AssignmentTurnedIn, ErrorOutline, AccessTime, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// // Function to choose the icon and color based on audit status
// const getAuditIcon = (status) => {
//   switch (status) {
//     case 'Completed':
//       return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#4caf50' };
//     case 'Pending':
//       return { icon: <AccessTime sx={{ color: '#fff' }} />, color: '#ff9800' };
//     case 'Issues Found':
//       return { icon: <ErrorOutline sx={{ color: '#fff' }} />, color: '#f44336' };
//     default:
//       return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#757575' };
//   }
// };

// const SamplingToolWidget = ({ audits }) => {
//   const scrollRef = useRef(null); // Reference to the scrollable container

//   // Function to handle scrolling
//   const handleScroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300; // Set scroll amount
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: '102%',
//         padding: '20px',
//         borderRadius: '20px',
//         background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
//         boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
//         textAlign: 'center',
//         position: 'relative',
//         overflow: 'hidden', // Ensure content is clipped when out of view
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444', marginBottom: '30px', letterSpacing: '1px' }}>
//         Bank Audit Overview
//       </Typography>

//       {/* Previous Button */}
//       <IconButton
//         onClick={() => handleScroll('left')}
//         sx={{
//           position: 'absolute',
//           left: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 2,
//           backgroundColor: '#fff',
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
//           '&:hover': {
//             backgroundColor: '#f0f0f0',
//           },
//         }}
//       >
//         <ArrowBackIos />
//       </IconButton>

//       {/* Scrollable Container */}
//       <Box
//         ref={scrollRef}
//         sx={{
//           display: 'flex',
//           overflowX: 'auto', // Enable horizontal scrolling
//           whiteSpace: 'nowrap', // Prevent wrapping of child elements
//           scrollBehavior: 'smooth', // Smooth scrolling effect
//           paddingBottom: '20px', // Prevent clipping at the bottom
//         }}
//       >
//         {audits.map((audit, index) => {
//           const { icon, color } = getAuditIcon(audit.status);
//           return (
//             <Box
//               key={index}
//               sx={{
//                 width: '300px',
//                 margin: '0 15px',
//                 padding: '20px',
//                 borderRadius: '16px',
//                 background: '#ffffff',
//                 boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//                 textAlign: 'center',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-10px)',
//                   boxShadow: '0 16px 24px rgba(0, 0, 0, 0.15)',
//                 },
//                 flex: '0 0 auto',
//               }}
//             >
//               <Avatar sx={{ width: 64, height: 64, bgcolor: color, margin: 'auto', marginBottom: '15px' }}>
//                 {icon}
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: '600', color: '#333', marginBottom: '8px' }}>
//                 {audit.bankName}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#555', marginBottom: '10px' }}>
//                 Last Audit: {audit.lastAuditDate}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#777', marginBottom: '15px' }}>
//                 Audit Firm: {audit.auditFirm}
//               </Typography>
//               <Chip
//                 label={audit.status}
//                 sx={{
//                   backgroundColor: color,
//                   color: '#fff',
//                   fontWeight: 'bold',
//                 }}
//               />
//               <Typography variant="body2" sx={{ color: '#999', marginTop: '10px' }}>
//                 {audit.findingsSummary}
//               </Typography>
//             </Box>
//           );
//         })}
//       </Box>

//       {/* Next Button */}
//       <IconButton
//         onClick={() => handleScroll('right')}
//         sx={{
//           position: 'absolute',
//           right: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 2,
//           backgroundColor: '#fff',
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
//           '&:hover': {
//             backgroundColor: '#f0f0f0',
//           },
//         }}
//       >
//         <ArrowForwardIos />
//       </IconButton>
//     </Box>
//   );
// };

// // Example Usage
// const audits = [
//   { bankName: 'State Bank of India', status: 'Completed', lastAuditDate: '2023-08-10', auditFirm: 'Deloitte', findingsSummary: 'No significant issues found.' },
//   { bankName: 'HDFC Bank', status: 'Pending', lastAuditDate: '2023-07-25', auditFirm: 'PwC', findingsSummary: 'Audit scheduled for next quarter.' },
//   { bankName: 'ICICI Bank', status: 'Issues Found', lastAuditDate: '2023-06-15', auditFirm: 'KPMG', findingsSummary: 'Minor compliance issues reported.' },
//   { bankName: 'Axis Bank', status: 'Completed', lastAuditDate: '2023-05-18', auditFirm: 'EY', findingsSummary: 'Audit completed with no findings.' },
//   { bankName: 'Bank of Baroda', status: 'Completed', lastAuditDate: '2023-08-01', auditFirm: 'Grant Thornton', findingsSummary: 'All controls are in place.' },
//   { bankName: 'Kotak Mahindra Bank', status: 'Pending', lastAuditDate: '2023-07-12', auditFirm: 'BDO India', findingsSummary: 'Awaiting final reports.' },
//   { bankName: 'Canara Bank', status: 'Issues Found', lastAuditDate: '2023-06-30', auditFirm: 'Mazars', findingsSummary: 'Compliance and risk issues noted.' },
//   { bankName: 'Union Bank of India', status: 'Completed', lastAuditDate: '2023-07-20', auditFirm: 'RSM India', findingsSummary: 'No discrepancies found.' },
// ];

// export default () => <SamplingToolWidget audits={audits} />;

// import React, { useEffect, useState, useRef } from 'react';
// import { Typography, Box, Avatar, Chip, IconButton } from '@mui/material';
// import { AssignmentTurnedIn, ErrorOutline, AccessTime, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
// import apiUrlsService from '../../../../services/apiUrls.service';
// import commonService from '../../../../services/common.service';

// // Function to choose the icon and color based on audit status
// const getAuditIcon = (status) => {
//   switch (status) {
//     case 'Completed':
//       return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#4caf50' };
//     case 'Pending':
//       return { icon: <AccessTime sx={{ color: '#fff' }} />, color: '#ff9800' };
//     case 'Issues Found':
//       return { icon: <ErrorOutline sx={{ color: '#fff' }} />, color: '#f44336' };
//     default:
//       return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#757575' };
//   }
// };

// const SamplingToolWidget = () => {
//   const [audits, setAudits] = useState([]); // State to hold audit data
//   const scrollRef = useRef(null); // Reference to the scrollable container
//   const [pageno, setPageNo] = useState(1);
//   const [records, setRecords] = useState(10);
//   const [totalElements, setTotalElements] = useState(0); // State to hold total number of records for pagination

//   // Function to handle scrolling
//   const handleScroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300; // Set scroll amount
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Function to fetch bank audits data
//   const getAllBanks = () => {
//     const pagedata = {
//       active_page: pageno,
//       page_size: records,
//     };

//     commonService.add(apiUrlsService.getBanks, pagedata)
//       .then((response) => {
//         if (response && response.data) {
//           setAudits(response.data.result);
//           setTotalElements(response.data.prefil.sql_records_count_new);
//         } else {
//           console.warn('No data found in response');
//         }
//       })
//       .catch((error) => {
//         console.error('API call failed:', error.message || error);
//       });
//   };

//   // Fetch data when component mounts or when page number or records per page change
//   useEffect(() => {
//     getAllBanks();
//   }, [pageno, records]); // Dependencies to trigger effect

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         padding: '20px',
//         borderRadius: '20px',
//         background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
//         boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
//         textAlign: 'center',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444', marginBottom: '30px', letterSpacing: '1px' }}>
//         Bank Audit Overview
//       </Typography>

//       {/* Previous Button */}
//       <IconButton
//         onClick={() => handleScroll('left')}
//         sx={{
//           position: 'absolute',
//           left: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 2,
//           backgroundColor: '#fff',
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
//           '&:hover': {
//             backgroundColor: '#f0f0f0',
//           },
//         }}
//       >
//         <ArrowBackIos />
//       </IconButton>

//       {/* Scrollable Container */}
//       <Box
//         ref={scrollRef}
//         sx={{
//           display: 'flex',
//           overflowX: 'auto',
//           whiteSpace: 'nowrap',
//           scrollBehavior: 'smooth',
//           paddingBottom: '20px',
//         }}
//       >
//         {audits.map((audit, index) => {
//           const { icon, color } = getAuditIcon(audit.status);
//           return (
//             <Box
//               key={index}
//               sx={{
//                 width: '300px',
//                 margin: '0 15px',
//                 padding: '20px',
//                 borderRadius: '16px',
//                 background: '#ffffff',
//                 boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//                 textAlign: 'center',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-10px)',
//                   boxShadow: '0 16px 24px rgba(0, 0, 0, 0.15)',
//                 },
//                 flex: '0 0 auto',
//               }}
//             >
//               <Avatar sx={{ width: 64, height: 64, bgcolor: color, margin: 'auto', marginBottom: '15px' }}>
//                 {icon}
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: '600', color: '#333', marginBottom: '8px' }}>
//                 {audit.bank_name}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#555', marginBottom: '10px' }}>
//                 Last Audit: {audit.lastAuditDate}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#777', marginBottom: '15px' }}>
//                 Audit Firm: {audit.auditFirm}
//               </Typography>
//               <Chip
//                 label={audit.status}
//                 sx={{
//                   backgroundColor: color,
//                   color: '#fff',
//                   fontWeight: 'bold',
//                 }}
//               />
//               <Typography variant="body2" sx={{ color: '#999', marginTop: '10px' }}>
//                 {audit.findingsSummary}
//               </Typography>
//             </Box>
//           );
//         })}
//       </Box>

//       {/* Next Button */}
//       <IconButton
//         onClick={() => handleScroll('right')}
//         sx={{
//           position: 'absolute',
//           right: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 2,
//           backgroundColor: '#fff',
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
//           '&:hover': {
//             backgroundColor: '#f0f0f0',
//           },
//         }}
//       >
//         <ArrowForwardIos />
//       </IconButton>
//     </Box>
//   );
// };

// export default SamplingToolWidget;


import React from 'react';
import { Box, Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { AssignmentTurnedIn, ErrorOutline, AccessTime } from '@mui/icons-material';

// Function to choose the icon and color based on audit status
const getAuditIcon = (status) => {
  switch (status) {
    case 'Completed':
      return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#4caf50' };
    case 'Pending':
      return { icon: <AccessTime sx={{ color: '#fff' }} />, color: '#ff9800' };
    case 'Issues Found':
      return { icon: <ErrorOutline sx={{ color: '#fff' }} />, color: '#f44336' };
    default:
      return { icon: <AssignmentTurnedIn sx={{ color: '#fff' }} />, color: '#757575' };
  }
};

const RecentAuditActivitiesWidget = ({ audits }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        // background: 'linear-gradient(145deg, #af7cc3, #ffffff)',
        // boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444', marginBottom: '20px' }}>
        Recent Audit Activities
      </Typography>
      <List sx={{ padding: 0 }}>
        {audits.map((audit, index) => {
          const { icon, color } = getAuditIcon(audit.status);
          return (
            <Box key={index}>
              <ListItem sx={{ alignItems: 'flex-start' }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: color }}>
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={audit.bankName}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ display: 'block', color: '#777' }}>
                        Last Audit: {audit.lastAuditDate}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'block', color: '#555' }}>
                        {audit.findingsSummary}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < audits.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

// Example Usage
const audits = [
  { bankName: 'State Bank of India', status: 'Completed', lastAuditDate: '2023-08-10', auditFirm: 'Deloitte', findingsSummary: 'No significant issues found.' },
  { bankName: 'HDFC Bank', status: 'Pending', lastAuditDate: '2023-07-25', auditFirm: 'PwC', findingsSummary: 'Audit scheduled for next quarter.' },
  { bankName: 'ICICI Bank', status: 'Issues Found', lastAuditDate: '2023-06-15', auditFirm: 'KPMG', findingsSummary: 'Minor compliance issues reported.' },
  { bankName: 'Axis Bank', status: 'Completed', lastAuditDate: '2023-05-18', auditFirm: 'EY', findingsSummary: 'Audit completed with no findings.' },
  { bankName: 'Bank of Baroda', status: 'Completed', lastAuditDate: '2023-08-01', auditFirm: 'Grant Thornton', findingsSummary: 'All controls are in place.' },
  { bankName: 'Kotak Mahindra Bank', status: 'Pending', lastAuditDate: '2023-07-12', auditFirm: 'BDO India', findingsSummary: 'Awaiting final reports.' },
  { bankName: 'Canara Bank', status: 'Issues Found', lastAuditDate: '2023-06-30', auditFirm: 'Mazars', findingsSummary: 'Compliance and risk issues noted.' },
  { bankName: 'Union Bank of India', status: 'Completed', lastAuditDate: '2023-07-20', auditFirm: 'RSM India', findingsSummary: 'No discrepancies found.' },
];

export default () => <RecentAuditActivitiesWidget audits={audits} />;



