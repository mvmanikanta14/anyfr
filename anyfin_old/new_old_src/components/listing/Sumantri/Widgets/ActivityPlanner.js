// import React from "react";
// import { Box, Typography, Avatar, Chip, LinearProgress, Grid } from "@mui/material";
// import { Event, AssignmentTurnedIn, Pending, Warning } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// // Function to choose the icon and color based on activity status
// const getActivityIcon = (status) => {
//   switch (status) {
//     case "Completed":
//       return { icon: <AssignmentTurnedIn sx={{ color: "#fff" }} />, color: "#28a745" }; // Vibrant green
//     case "In Progress":
//       return { icon: <Pending sx={{ color: "#fff" }} />, color: "#ffc107" }; // Yellow-orange
//     case "Overdue":
//       return { icon: <Warning sx={{ color: "#fff" }} />, color: "#dc3545" }; // Strong red
//     default:
//       return { icon: <Event sx={{ color: "#fff" }} />, color: "#6c757d" }; // Neutral gray
//   }
// };

// const ActivityPlanner = ({ activities }) => {
//   return (
//     <Grid container spacing={3} sx={{ padding: 1 }}>
//       {activities.map((activity, index) => {
//         const { icon, color } = getActivityIcon(activity.status);
//         const progress =
//           activity.status === "Completed" ? 100 : activity.status === "In Progress" ? 50 : 20; // Example progress

//         return (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Box
//               sx={{
//                 padding: "18px 10px",
//                 borderRadius: "16px",
//                 background: "linear-gradient(to right, #ffffff, #f8f9fa)", // Light gray gradient
//                 boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
//                   background: "linear-gradient(to right, #ffffff, #e3f2fd)", // Soft blue on hover
//                 },
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: "5px",
//                 textAlign: "center",
//               }}
//             >
//               <Avatar sx={{ width: 56, height: 56, bgcolor: color, mb: 1 }}>{icon}</Avatar>
//               <Typography variant="subtitle1" sx={{ fontWeight: "600", color: "#333" }}>
//                <Link to={"/FSS"} >{activity.name}</Link> 
//               </Typography>

//               <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
//                 {activity.details}
//               </Typography>

              
//             </Box>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };

// // Example Usage
// const activities = [
//   { name: "Data", details: "Review the Q3 Budget", status: "Completed" },
//   { name: "Mapping", details: "Meeting with client ABC", status: "In Progress" },
//   { name: "Modules", details: "Submit annual report", status: "Overdue" },
//   { name: "Discolusers", details: "Initial project discussion", status: "In Progress" },
//   { name: "FSS Statements", details: "Review UI/UX designs", status: "Completed" },
//   { name: "Cash Flow", details: "Analyze project code", status: "Overdue" },
//   { name: "Project Kickoff", details: "Initial project discussion", status: "Completed" },
//   { name: "Design Review", details: "Review UI/UX designs", status: "In Progress" },
//   { name: "Manual Audit", details: "Analyze project code", status: "Completed" },
// ];

// export default () => <ActivityPlanner activities={activities} />;

import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import { Event, AssignmentTurnedIn, Pending, Warning } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconArrowLeftToArc, IconListCheck } from "@tabler/icons-react";

// Function to choose the icon and color based on activity status
const getActivityIcon = (status) => {
  switch (status) {
    case "Completed":
      return { icon: <AssignmentTurnedIn sx={{ color: "#fff" }} />, color: "#28a745" };
    case "Fss":
    return { icon: <IconListCheck sx={{ color: "#fff" }} />, color: "#333" };
    case "In Progress":
      return { icon: <Pending sx={{ color: "#fff" }} />, color: "#ffc107" };
    case "Overdue":
      return { icon: <Warning sx={{ color: "#fff" }} />, color: "#dc3545" };
    default:
      return { icon: <Event sx={{ color: "#fff" }} />, color: "#6c757d" };
  }
};

const ActivityPlanner = ({ activities }) => {
  return (
    <Grid container spacing={3} sx={{ padding: 1 }}>
      {activities.map((activity, index) => {
        const { icon, color } = getActivityIcon(activity.status);
        const activityLink = `/${activity.name.toLowerCase().replace(/\s+/g, "-")}`; // Generate link dynamically

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={activityLink} style={{ textDecoration: "none", color: "#007bff" }}> 
            <Box
              sx={{
                padding: "18px 10px",
                borderRadius: "16px",
                background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  background: "linear-gradient(to right, #ffffff, #e3f2fd)",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                textAlign: "center",
              }}
            >
              <Avatar sx={{ width: 56, height: 56, bgcolor: color, mb: 1 }}>{icon}</Avatar>

              <Typography variant="subtitle1" sx={{ fontWeight: "600", color: "#333" }}>
                
                  {activity.name}
                
              </Typography>

              <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
                {activity.details}
              </Typography>
            </Box>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

// Example Usage
const activities = [
  { name: "Data", details: "Review the Q3 Budget", status: "Completed" },
  { name: "Mapping", details: "Meeting with client ABC", status: "In Progress" },
  { name: "Modules", details: "Submit annual report", status: "Overdue" },
  { name: "Disclosures", details: "Initial project discussion", status: "In Progress" },
  { name: "FSS Statements", details: "Review UI/UX designs", status: "Fss" },
  { name: "Checklist", details: "Sample Check List", status: "Overdue" },
  { name: "Project Kickoff", details: "Initial project discussion", status: "Completed" },
  { name: "Reporting", details: "Reporting", status: "In Progress" },
  { name: "Manual Audit", details: "Analyze project code", status: "Completed" },
];

export default () => <ActivityPlanner activities={activities} />;


// import React from "react";
// import { Box, Typography, Avatar } from "@mui/material";
// import { Event, AssignmentTurnedIn, Pending, Warning } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { IconListCheck } from "@tabler/icons-react";

// const getActivityIcon = (status) => {
//   switch (status) {
//     case "Completed":
//       return { icon: <AssignmentTurnedIn sx={{ color: "#fff" }} />, color: "#28a745" };
//     case "Fss":
//       return { icon: <IconListCheck sx={{ color: "#fff" }} />, color: "#333" };
//     case "In Progress":
//       return { icon: <Pending sx={{ color: "#fff" }} />, color: "#ffc107" };
//     case "Overdue":
//       return { icon: <Warning sx={{ color: "#fff" }} />, color: "#dc3545" };
//     default:
//       return { icon: <Event sx={{ color: "#fff" }} />, color: "#6c757d" };
//   }
// };

// const ActivityPlanner = ({ activities }) => {
//   const radius = 200; // Distance from center
//   const centerX = 250; // X-axis center
//   const centerY = 250; // Y-axis center

//   return (
//     <Box sx={{ position: "relative", width: "500px", height: "500px", margin: "auto" }}>
//       {/* Center Element */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 100,
//           height: 100,
//           borderRadius: "50%",
//           background: "#007bff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
//           FSS <br /> Statements
//         </Typography>
//       </Box>

//       {/* Circular Layout for Activities */}
//       {activities.map((activity, index) => {
//         const angle = (index / activities.length) * 2 * Math.PI;
//         const x = centerX + radius * Math.cos(angle) - 35; // Adjust to center items
//         const y = centerY + radius * Math.sin(angle) - 35;

//         const { icon, color } = getActivityIcon(activity.status);
//         const activityLink = `/${activity.name.toLowerCase().replace(/\s+/g, "-")}`;

//         return (
//           <Link to={activityLink} key={index} style={{ textDecoration: "none", position: "absolute", top: y, left: x }}>
//             <Box
//               sx={{
//                 width: 70,
//                 height: 70,
//                 borderRadius: "50%",
//                 background: color,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//                 },
//               }}
//             >
//               <Avatar sx={{ bgcolor: "transparent", width: 50, height: 50 }}>{icon}</Avatar>
//             </Box>

//             {/* Activity Name */}
//             <Typography
//               sx={{
//                 position: "absolute",
//                 top: "68%",
//                 left: "50%",
//                 transform: "translate(-50%, 20px)",
//                 fontSize: "12px",
//                 fontWeight: "bold",
//                 color: "#333",
//                 textAlign: "center",
//                 width: "100px",
//               }}
//             >
//               {activity.name}
//             </Typography>
//           </Link>
//         );
//       })}
//     </Box>
//   );
// };

// // Example Usage
// const activities = [
//   { name: "Data", details: "Review the Q3 Budget", status: "Completed" },
//   { name: "Mapping", details: "Meeting with client ABC", status: "In Progress" },
//   { name: "Modules", details: "Submit annual report", status: "Overdue" },
//   { name: "Disclosures", details: "Initial project discussion", status: "In Progress" },
//   { name: "FSS Statements", details: "Review UI/UX designs", status: "Fss" },
//   { name: "Cash Flow", details: "Analyze project code", status: "Overdue" },
//   { name: "Project Kickoff", details: "Initial project discussion", status: "Completed" },
//   { name: "Design Review", details: "Review UI/UX designs", status: "In Progress" },
//   { name: "Manual Audit", details: "Analyze project code", status: "Completed" },
// ];

// export default () => <ActivityPlanner activities={activities} />;

