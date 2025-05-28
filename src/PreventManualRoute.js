// PreventManualRoute.js
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import tokenService from './services/token.service';

const PreventManualRoute = ({ children }) => {
  const assignment = tokenService.getEntityName();
  const navigate = useNavigate();

  useEffect(() => {
    if (!assignment) {
      swal({
        title: "Entity Required",
        text: "Please select an entity to proceed.",
        icon: "warning",
        button: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    }
  }, [assignment, navigate]);

  // If assignment is not available, redirect to login or dashboard page
  if (!assignment) {
    return <Navigate to="/login" />;  // Redirect immediately to the login page
  }

  return children;  // Render the protected component if entity exists
};

export default PreventManualRoute;
