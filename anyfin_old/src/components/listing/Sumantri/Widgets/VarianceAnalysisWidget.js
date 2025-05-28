// import React from 'react';
// import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
// import { green, red, blue } from '@mui/material/colors';

// // Function to choose the color based on user status
// const getStatusColor = (status) => {
//   switch (status) {
//     case 'Active':
//       return green[500];
//     case 'Inactive':
//       return red[500];
//     default:
//       return blue[500];
//   }
// };

// const VarianceAnalysisWidget = ({ users }) => {
//   return (
//     <Box
//       sx={{
//         width: '640px',
//         padding: '20px',
//         borderRadius: '12px',
//         background: '#f5f5f5',
//         boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
//         User Information
//       </Typography>
//       <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
//               <TableCell sx={{ fontWeight: 'bold' }}>Avatar</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user, index) => (
//               <TableRow key={index} hover>
//                 <TableCell>
//                   <Avatar sx={{ bgcolor: getStatusColor(user.status) }}>{user.name.charAt(0)}</Avatar>
//                 </TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <Typography sx={{ color: getStatusColor(user.status), fontWeight: 'bold' }}>
//                     {user.status}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// // Example Usage
// const users = [
//   { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
//   { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' },
//   { name: 'Sam Johnson', email: 'sam.johnson@example.com', role: 'Viewer', status: 'Active' },
//   { name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Admin', status: 'Inactive' },
// ];

// export default () => <VarianceAnalysisWidget users={users} />;

import React from 'react';
import { Box, Typography, Avatar, Chip, IconButton } from '@mui/material';
import { CheckCircle, PendingActions, Error } from '@mui/icons-material';

// Function to choose the icon and color based on auditor status
const getAuditorIcon = (status) => {
  switch (status) {
    case 'Available':
      return { icon: <CheckCircle sx={{ color: '#fff' }} />, color: '#4caf50' };
    case 'In Progress':
      return { icon: <PendingActions sx={{ color: '#fff' }} />, color: '#ff9800' };
    case 'Issues Found':
      return { icon: <Error sx={{ color: '#fff' }} />, color: '#f44336' };
    default:
      return { icon: <CheckCircle sx={{ color: '#fff' }} />, color: '#757575' };
  }
};

const VarianceAnalysisWidget = ({ auditors }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        // background: 'linear-gradient(145deg, #6dae8a, #ffffff)',
        // boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444', marginBottom: '20px' }}>
        Audit Team Members
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {auditors.map((auditor, index) => {
          const { icon, color } = getAuditorIcon(auditor.status);
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '12px',
                background: '#ffffff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Avatar
                src={auditor.photo}
                alt={auditor.name}
                sx={{ width: 46, height: 46, marginRight: '15px', bgcolor: color }}
              >
                {icon}
              </Avatar>
              <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                <Typography variant="h7" sx={{ fontWeight: '600', color: '#333' }}>
                  {auditor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  {auditor.role}
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', marginTop: '5px' }}>
                  Current Assignment: {auditor.currentAssignment}
                </Typography>
              </Box>
              <Chip
                label={auditor.status}
                sx={{
                  backgroundColor: color,
                  color: '#fff',
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

// Example Usage
const auditors = [
  { name: 'John Doe', role: 'Lead Auditor', status: 'Available', currentAssignment: 'State Bank of India', photo: 'https://via.placeholder.com/150' },
  { name: 'Jane Smith', role: 'Senior Auditor', status: 'In Progress', currentAssignment: 'HDFC Bank', photo: 'https://via.placeholder.com/150' },
  { name: 'Mark Johnson', role: 'Audit Manager', status: 'Issues Found', currentAssignment: 'ICICI Bank', photo: 'https://via.placeholder.com/150' },
  { name: 'Lisa White', role: 'Junior Auditor', status: 'Available', currentAssignment: 'Axis Bank', photo: 'https://via.placeholder.com/150' },
  { name: 'Paul Brown', role: 'IT Auditor', status: 'In Progress', currentAssignment: 'Bank of Baroda', photo: 'https://via.placeholder.com/150' },
  { name: 'Nancy Green', role: 'Forensic Auditor', status: 'Available', currentAssignment: 'Kotak Mahindra Bank', photo: 'https://via.placeholder.com/150' },
];

export default () => <VarianceAnalysisWidget auditors={auditors} />;

