import { createContext, useState, useEffect } from "react";
import tokenService from "../../services/token.service";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth");
        // const storedAuth = tokenService.getLoginID("auth")
        return storedAuth ? JSON.parse(storedAuth) : {}; // ✅ Ensure it always returns an object
    });

    useEffect(() => {
        if (auth?.login_id) {
            localStorage.setItem("auth", JSON.stringify(auth));
            console.log("Auth Updated:", auth);  // Debugging
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
















// import React, { createContext, useContext, useEffect ,useState } from "react";


// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});

//   useEffect(() => {
//     // Example: Retrieve user data from local storage or an API
//     const storedUser = JSON.parse(localStorage.getItem('token'));
//     if (storedUser) {
//       setAuth(storedUser);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// // Create a custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// export default AuthContext;
// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const storedAuth = localStorage.getItem("token");
//     return storedAuth ? JSON.parse(storedAuth) : {}; // Ensure it initializes with an object
//   });

//   useEffect(() => {
//     if (auth && Object.keys(auth).length > 0) {
//       localStorage.setItem("token", JSON.stringify(auth)); // Save auth when updated
//     }
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// i



// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({}); // Holds login state

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;











