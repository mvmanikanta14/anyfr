// PreventManualRoute.js
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import tokenService from '../services/token.service';

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

  if (!assignment) {
    return null; // Prevent rendering content until the redirect happens
  }

  return children;
};

export default PreventManualRoute;
