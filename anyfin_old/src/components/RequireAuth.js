import { useLocation, Navigate, Outlet } from "react-router-dom";
import tokenService from "../services/token.service";

const RequireAuth = () => {
  const location = useLocation();

  const isLoggedIn = tokenService.getLocalAccessToken() ? true: false;
  console.log(isLoggedIn,'isLoggedIn')

  return( 
    isLoggedIn ? 
    <Outlet /> :
    <Navigate to="/login" state={{ from: location }} replace />    
  );    
};

export default RequireAuth;



// import { useEffect } from "react";
// import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
// import swal from "sweetalert";
// import tokenService from "../services/token.service";

// const RequireAuth = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isLoggedIn = tokenService.getLocalAccessToken() ? true : false;

//   useEffect(() => {
//     const storedRoute = localStorage.getItem('routePath');
    
//     if (location.pathname === '/dashboard') {
//       swal({
//         title: 'You will be logged out',
//         text: 'Do you want to continue?',
//         icon: 'warning',
//         buttons: {
//           cancel: {
//             text: 'No, stay here',
//             value: false,
//             visible: true,
//             className: "",
//             closeModal: true,
//           },
//           confirm: {
//             text: 'Yes, log me out!',
//             value: true,
//             visible: true,
//             className: "",
//             closeModal: true
//           }
//         }
//       }).then((willLogout) => {
//         if (willLogout) {
//           // Perform logout logic here, e.g., clear auth tokens
//           tokenService.removeAssignement('assignmentname'); // Example: remove auth token
//           navigate('/dashboard'); // Redirect to login page
//         } 
//         // else {
//         //   // Optionally handle the case when the user chooses to stay
//         //   navigate(storedRoute); // Navigate back to the stored route
//         // }
//       });
//     }

//     localStorage.setItem('routePath', location.pathname);
//   }, [location, navigate]);

//   return (
//     isLoggedIn ? 
//     <Outlet /> : 
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;
