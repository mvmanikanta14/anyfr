// import React, { createContext, useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export const ApiContext = createContext();

// const ApiProvider = ({ children }) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const hasNavigated = useRef(false); // Prevent multiple redirects

//     const getSubdomain = () => {
//         const hostname = window.location.hostname;
//         const parts = hostname.split(".");
//         return parts.length > 2 ? parts[0] : null;
//     };

//     const host = window.location.hostname;
//     const subdomain = getSubdomain();

//     // Handle API URL based on environment
//     const apiUrl = host.includes("localhost")
//         ? "http://localhost:3000"
//         : `http://${subdomain}.anyfinancials.in/api/basicparamentities/view`;

//     useEffect(() => {
//         if (!subdomain && subdomain !== null && !hasNavigated.current) {
//             hasNavigated.current = true; // Ensure navigation happens only once
//             navigate("/invalid-subdomain");
//             return;
//         }

//         // Prevent API calls if localhost
//         if (host.includes("localhost")) return;

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(apiUrl);
//                 const result = await response.json();

//                 if (!result.status && result.error.includes("INVALID SUBDOMAIN") && !hasNavigated.current) {
//                     hasNavigated.current = true;
//                     navigate("/invalid-subdomain");
//                 } else {
//                     setData(result);
//                 }
//             } catch (err) {
//                 setError("Failed to fetch data");
//             }
//         };

//         fetchData();
//     }, [navigate, subdomain, apiUrl]); // Only re-run when subdomain or apiUrl changes

//     return <ApiContext.Provider value={{ data, error }}>{children}</ApiContext.Provider>;
// };

// export default ApiProvider;


import React, { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import config from '../config/config';
// import useAuth from "./useAuth"; // Import Auth Hook

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const hasNavigated = useRef(false); // Prevent multiple redirects

    const { auth } = useAuth(); // Get logged-in user info

    const getSubdomain = () => {
        const hostname = window.location.hostname;
        const parts = hostname.split(".");
        return parts.length > 2 ? parts[0] : null;
    };

    const host = window.location.hostname;
    const subdomain = getSubdomain();

    const apiUrl = config.apiUrl
    // const apiUrl = host.includes("localhost")
    //     ? "http://localhost:3000"
    //     : `http://${subdomain}.anyfinancials.in/api/basicparamentities/view`;

    useEffect(() => {
        if (!subdomain && subdomain !== null && !hasNavigated.current) {
            hasNavigated.current = true;
            navigate("/invalid-subdomain");
            return;
        }

        if (host.includes("localhost")) return; // Prevent API calls on localhost

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();

                if (!result.status && result.error.includes("INVALID SUBDOMAIN") && !hasNavigated.current) {
                    hasNavigated.current = true;
                    navigate("/invalid-subdomain");
                } else {
                    setData(result);
                }
            } catch (err) {
                setError("Failed to fetch data");
            }
        };

        fetchData();
    }, [navigate, subdomain, apiUrl]);

    return (
        <ApiContext.Provider value={{ data, error, auth }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;

