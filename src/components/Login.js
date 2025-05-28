// import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import useAuth from './hooks/useAuth';
// import tokenService from '../services/token.service';
// import api from "../services/api";
// import config from '../config/config';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function LoginPage() {


//   const navigate = useNavigate();
//   const location = useLocation();
//   const { setAuth } = useAuth(); // Use Auth Context

//   const from = location.state?.from?.pathname || "/dashboard";

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [organisation_id, setOrganizationId] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   useEffect(() => {
//     setErrMsg("");
//     // loadFunction();
//   }, [username, password,organisation_id]);



//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Get the hostname and extract subdomain
//     const hostname = window.location.hostname;
//     const subdomain = hostname.split(".")[0];

//     // Determine the API base URL dynamically
//     const baseUrl = config.apiUrl
//     // const baseUrl = "http://qaapi.anyibc.com/api"
//     // const baseUrl = "http://localhost:3000"

//     // hostname.includes("localhost")
//     //   ? "http://qaapi.anyibc.com/api"
//     //   : `http://${subdomain}.localhost:3000`;

//     // const apiUrl = `${baseUrl}/basicmasterusers/login`; 
//     const apiUrl = `${baseUrl}/basicmasterusers/login`;

//     try {
//       const response = await api.post(apiUrl, { organisation_id, username, password });

//       if (response.data.status) {
//         const userData = response.data;

//         //Save user details in AuthContext
//         setAuth({
//           login_id: userData.login_id,
//           username:userData.username,
//           // token: userData.token,
//           // role: userData.role,
//         });

//         tokenService.setUser(userData);

//         toast.success(userData.message, {
//           position: "top-right",
//           autoClose: 2000,
//         });

//         navigate("/dashboard");
//         window.location.reload(); // Refresh page to apply auth state
//       } else {
//         toast.error(response.data.message || "Login failed!", {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Username incorrect!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (



//     <div className="login-page d-flex align-items-center justify-content-center vh-100">
//       <div className="card shadow-lg p-4 login-card">
//         <div className="text-center mb-4">
//           <div className="brand-bar mb-3"></div>
//           <h4 className="mb-1 small"> WELCOME TO </h4>
//           <span className="theme1-text ms-2 logo-text">AnyFinancials FR</span>
//         </div>

//         <form onSubmit={handleLogin}>

//         <div className="mb-3">
//             <label htmlFor="organisation_id" className="form-label">Organization Id</label>
//             <input
//               type="number"
//               className="form-control"
//               id="organisation_id"
//               placeholder="Organization Id"
//               onChange={(e) => setOrganizationId(e.target.value)}
//               value={organisation_id}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">User Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               placeholder="username"
//               onChange={(e) => setUsername(e.target.value)}
//               value={username}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3 form-check d-flex justify-content-between">
//             <div>
//               <input type="checkbox" className="form-check-input" id="rememberMe" />
//               <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
//             </div>
//             <a href="/forgot-password" className="text-primary small">Forgot password?</a>
//           </div>

//           <button type="submit" className="btn btn-maroon w-100">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';
import tokenService from '../services/token.service';
import api from "../services/api";
import config from '../config/config';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonvalidationSchema } from '../services/CommonvalidationSchema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CommonvalidationSchema)
  });

  useEffect(() => {
    const savedOrg = localStorage.getItem("remember_org_id");
    const savedUser = localStorage.getItem("remember_username");
    const savedPass = localStorage.getItem("remember_password");


    if (savedOrg) setValue("organisation_id", savedOrg);
    if (savedUser) setValue("username", savedUser);
    if (savedOrg && savedUser) setRememberMe(true);
    if (savedPass) setValue("password", savedPass);

  }, [setValue]);

  const handleLogin = async (data) => {
    const baseUrl = config.apiUrl;
    const apiUrl = `${baseUrl}/basicmasterusers/login`;

    try {
      const response = await api.post(apiUrl, data);

      if (!response.data.status) {
        toast.error(response.data.message || "Login failed!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }

      const userData = response.data;
      setAuth({
        login_id: userData.login_id,
        username: userData.username,
        organisation_id: userData.organisation_id,
        organisation_name: userData.organisation_name,
      });

      tokenService.setUser(userData);

      if (rememberMe) {
        localStorage.setItem("remember_org_id", data.organisation_id);
        localStorage.setItem("remember_username", data.username);
        localStorage.setItem("remember_password", data.password); 
      } else {
        localStorage.removeItem("remember_org_id");
        localStorage.removeItem("remember_username");
        localStorage.removeItem("remember_password");
      }

      toast.success(userData.message || "Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login error";
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="login-page d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow-lg p-4 login-card">
          <div className="text-center mb-4">
            <div className="brand-bar mb-3"></div>
            <h4 className="mb-1 small">WELCOME TO</h4>
            <span className="theme1-text ms-2 logo-text">AnyFinancials FR</span>
          </div>

          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Organisation ID */}
            <div className="mb-3">
              <label htmlFor="organisation_id" className="form-label">Organisation Id</label>
              <Controller
                name="organisation_id"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Organisation Id"
                    {...field}
                  />
                )}
              />
              {errors.organisation_id && <small className="text-danger">{errors.organisation_id.message}</small>}
            </div>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">User Name</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
              {errors.username && <small className="text-danger">{errors.username.message}</small>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    className="form-control"
                    placeholder="******"
                    {...field}
                  />
                )}
              />
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>

            {/* Remember Me */}
            <div className="mb-3 form-check d-flex justify-content-between">
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-primary small">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-maroon w-100">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
