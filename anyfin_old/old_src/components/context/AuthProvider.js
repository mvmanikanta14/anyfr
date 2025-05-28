import React, { createContext, useContext, useEffect ,useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    // Example: Retrieve user data from local storage or an API
    const storedUser = JSON.parse(localStorage.getItem('token'));
    if (storedUser) {
      setAuth(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthContext;



