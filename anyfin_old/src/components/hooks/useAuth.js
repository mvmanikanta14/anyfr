// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";

// const useAuth = () => {
//     return useContext(AuthContext);
// };

// export default useAuth;


import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
        return { auth: {} }; // ✅ Return empty object to prevent crashes
    }

    return context;
};

export default useAuth;
