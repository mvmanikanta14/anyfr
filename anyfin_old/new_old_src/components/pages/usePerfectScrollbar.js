import { useEffect } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

const usePerfectScrollbar = () => {
  useEffect(() => {
    const ps = new PerfectScrollbar(document.body, {
      suppressScrollX: true, // Only vertical scrolling
    });

    return () => {
      ps.destroy(); // Cleanup on unmount
    };
  }, []);
};

export default usePerfectScrollbar;
