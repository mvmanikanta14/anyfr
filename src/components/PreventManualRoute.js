import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { useEntity } from './context/EntityContext';  // Import your EntityContext

const PreventManualRoute = ({ children }) => {
  const { entity } = useEntity();  // Get the entity from context
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path requires an entity to be selected
  const isEntityHeaderPage = /\/(entitydashboard|chart-of-accounts|map|jv|sd|fr|module|pd|companies-act|partnership-act|schedule-iii|accounting-standards|frrb|data|rectifications)/.test(location.pathname);

  useEffect(() => {
    if (isEntityHeaderPage && !entity) {
      // If no entity is selected, show a SweetAlert warning
      swal({
        title: "Entity Required",
        text: "You need to select an entity to proceed. Would you like to go to the dashboard to select one?",
        icon: "warning",
        buttons: ["Cancel", "Yes, go to Dashboard"],
        dangerMode: true,
      }).then((willNavigate) => {
        if (willNavigate) {
          navigate("/entityClient"); // Redirect to the entity selection page
        }
      });
    }
  }, [isEntityHeaderPage, entity, navigate]);

  // If entity is missing, prevent rendering of the children and return a navigate (i.e., prevent access to the page)
  if (!entity && isEntityHeaderPage) {
    return null;  // Don't render the children components and wait for the navigation
  }

  return children;  // Render children if entity is selected
};

export default PreventManualRoute;
