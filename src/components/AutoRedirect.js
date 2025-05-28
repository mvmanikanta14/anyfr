import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoRedirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (to) {
      navigate(to, { replace: true });
    }
  }, [to, navigate]);

  return null;
};

export default AutoRedirect;
