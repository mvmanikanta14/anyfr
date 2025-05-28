// // App.js
// import React from 'react';
// import { Box, Typography, Avatar, Chip, Divider, Button, Tooltip } from '@mui/material';
// import { Business, LocationOn, Phone, Email, Info, Storefront } from '@mui/icons-material';

// // Function to get the styles and icon based on entity type
// const getEntityStyles = (type) => {
//   switch (type) {
//     case 'Corporation':
//       return {
//         color: '#1e88e5',
//         bgColor: 'linear-gradient(145deg, #e3f2fd, #bbdefb)', // Gradient background
//         icon: <Business sx={{ color: '#fff' }} />,
//       };
//     case 'Partnership':
//       return {
//         color: '#8e24aa',
//         bgColor: 'linear-gradient(145deg, #f3e5f5, #e1bee7)',
//         icon: <Storefront sx={{ color: '#fff' }} />,
//       };
//     case 'Sole Proprietorship':
//       return {
//         color: '#43a047',
//         bgColor: 'linear-gradient(145deg, #e8f5e9, #c8e6c9)',
//         icon: <Info sx={{ color: '#fff' }} />,
//       };
//     default:
//       return {
//         color: '#757575',
//         bgColor: 'linear-gradient(145deg, #f5f5f5, #eeeeee)',
//         icon: <Business sx={{ color: '#fff' }} />,
//       };
//   }
// };

// const ProjectionsWidget = ({ entities }) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: '20px',
//         width: '100%',
//         padding: '20px',
//         background: '#fafafa',
//         borderRadius: '16px',
//         justifyContent: 'center',
//       }}
//     >
//       {entities.map((entity, index) => {
//         const { color, bgColor, icon } = getEntityStyles(entity.type);
//         return (
//           <Box
//             key={index}
//             sx={{
//               width: '350px',
//               padding: '16px',
//               borderRadius: '16px',
//               background: bgColor,
//               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               position: 'relative', // For overlay elements
//               overflow: 'hidden',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
//               },
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px',
//             }}
//           >
//             {/* Overlay Icon */}
//             <Tooltip title={entity.industry} placement="top">
//               <Avatar
//                 sx={{
//                   bgcolor: color,
//                   width: 64,
//                   height: 64,
//                   position: 'absolute',
//                   top: '-32px',
//                   right: '-32px',
//                   opacity: 0.2,
//                 }}
//               >
//                 {icon}
//               </Avatar>
//             </Tooltip>

//             {/* Header Section with Entity Logo/Avatar and Name */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
//               <Box>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
//                   {entity.name}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
//                   {entity.type}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Divider for Separation */}
//             {/* <Divider sx={{ backgroundColor: color }} /> */}

//             {/* Industry and Description Section */}
//             {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>
//                 Industry: {entity.industry}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#555' }}>
//                 {entity.description}
//               </Typography>
//             </Box> */}

//             {/* Product Information Section */}
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//               <Typography
//                 variant="body2"
//                 sx={{ color: '#333', fontWeight: 'bold', mt: 1, borderBottom: `1px solid ${color}` }}
//               >
//                 Products/Services:
//               </Typography>
//               {entity.products.map((product, idx) => (
//                 <Typography key={idx} variant="body2" sx={{ color: '#555', paddingLeft: '8px' }}>
//                   - {product}
//                 </Typography>
//               ))}
//             </Box>

//             {/* Divider */}
//             <Divider sx={{ backgroundColor: color }} />

//             {/* Entity Details Section */}
//             {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <LocationOn sx={{ color }} />
//                 <Typography variant="body2" sx={{ color: '#555' }}>
//                   {entity.location}
//                 </Typography>
//               </Box>
              
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <Email sx={{ color }} />
//                 <Typography variant="body2" sx={{ color: '#555' }}>
//                   {entity.email}
//                 </Typography>
//               </Box>
//             </Box> */}

//             {/* Status Chip */}
//             <Chip
//               label={entity.status}
//               sx={{
//                 alignSelf: 'flex-start',
//                 backgroundColor: color,
//                 color: '#fff',
//                 fontWeight: 'bold',
//               }}
//             />

//             {/* Call to Action Button */}
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: color,
//                 color: '#fff',
//                 marginTop: '10px',
//                 '&:hover': {
//                   backgroundColor: color,
//                   opacity: 0.9,
//                 },
//               }}
//               fullWidth
//             >
//               View Details
//             </Button>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// // Example Usage
// const entities = [
//   {
//     name: 'GlobalTech Innovations',
//     type: 'Corporation',
//     location: 'Silicon Valley, CA',
//     status: 'Active',
//     products: ['AI Analytics Suite', 'Cloud Integration Platform'],
//   },
//   {
//     name: 'GreenLeaf Organics',
//     type: 'Partnership',
//     location: 'Austin, TX',
//     status: 'Pending',
//     products: ['Organic Vegetables', 'Herbal Supplements', 'Eco-Friendly Fertilizers'],
//   },
//   {
//     name: 'Vantage Financial Advisors',
//     type: 'Sole Proprietorship',
//     location: 'New York, NY',
//     status: 'Inactive',
//     products: ['Financial Planning', 'Investment Management', 'Retirement Planning'],
//   },
// ];

// export default () => <ProjectionsWidget entities={entities} />;


// App.js
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// Function to generate data for the bar chart
// const generateBarChartData = (data) => ({
//   labels: data.map((item) => item.year),
//   datasets: [
//     {
//       label: 'Revenue',
//       data: data.map((item) => item.revenue),
//       backgroundColor: '#4caf50',
//     },
//     {
//       label: 'Profit',
//       data: data.map((item) => item.profit),
//       backgroundColor: '#ff9800',
//     },
//   ],
// });

// Function to generate data for the line chart
// const generateLineChartData = (data) => ({
//   labels: data.map((item) => item.year),
//   datasets: [
//     {
//       label: 'Expenses',
//       data: data.map((item) => item.expenses),
//       borderColor: '#1e88e5',
//       fill: false,
//       tension: 0.1,
//     },
//   ],
// });

// Function to generate data for the doughnut chart
const generateDoughnutChartData = (data) => ({
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      label: 'Product Distribution',
      data: data,
      backgroundColor: ['#4caf50', '#ff9800', '#1e88e5'],
    },
  ],
});

// Function to generate data for the pie chart
// const generatePieChartData = (data) => ({
//   labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//   datasets: [
//     {
//       label: 'Quarterly Sales',
//       data: data,
//       backgroundColor: ['#43a047', '#f44336', '#ff9800', '#1e88e5'],
//     },
//   ],
// });

const ProjectionsWidget = ({ historicalData }) => {
//   const barChartData = generateBarChartData(historicalData);
//   const lineChartData = generateLineChartData(historicalData);
  const doughnutChartData = generateDoughnutChartData([300, 150, 50]);
//   const pieChartData = generatePieChartData([40, 30, 20, 10]);

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #f0f4f8, #ffffff)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Bar Chart Widget */}
      {/* <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Historical FSS Overview
      </Typography> */}
      {/* <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '10px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box> */}

      {/* Line Chart Widget */}
      {/* <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Expense Trends
      </Typography> */}
      {/* <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '10px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box> */}

      {/* Doughnut Chart Widget */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Product Distribution
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '10px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box>

      {/* Pie Chart Widget */}
      {/* <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Quarterly Sales Breakdown
      </Typography> */}
      {/* <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '10px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box> */}
    </Box>
  );
};

// Example Usage
const historicalData = [
  { year: '2020', revenue: 120, profit: 40, expenses: 80 },
  { year: '2021', revenue: 150, profit: 60, expenses: 90 },
  { year: '2022', revenue: 180, profit: 75, expenses: 100 },
];

export default () => <ProjectionsWidget historicalData={historicalData} />;

