import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import api from "../services/api";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import tokenService from "../services/token.service";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import logodark2 from '../assets/images/logo.png';
import { IconUser, IconLockOpen } from "@tabler/icons-react";
import LoadingButton from "./LoadingButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import config from '../config/config';

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth(); // Use Auth Context

  const from = location.state?.from?.pathname || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
    // loadFunction();
  }, [username, password]);

  

  const handleLogin = async (e) => {
    e.preventDefault();

    // Get the hostname and extract subdomain
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    // Determine the API base URL dynamically
    const baseUrl = config.apiUrl
    // const baseUrl = "http://qaapi.anyibc.com/api"
    // const baseUrl = "http://localhost:3000"

    // hostname.includes("localhost")
    //   ? "http://qaapi.anyibc.com/api"
    //   : `http://${subdomain}.localhost:3000`;

    // const apiUrl = `${baseUrl}/basicmasterusers/login`; 
    const apiUrl = `${baseUrl}/basicmasterusers/login`; 

    try {
      const response = await api.post(apiUrl, { username, password });

      if (response.data.status) {
        const userData = response.data;

        //Save user details in AuthContext
        setAuth({
          login_id: userData.login_id,
          // token: userData.token,
          // role: userData.role,
        });

        tokenService.setUser(userData);

        toast.success(userData.message, {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/dashboard");
        window.location.reload(); // Refresh page to apply auth state
      } else {
        toast.error(response.data.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Username incorrect!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  
  return (
    <div>
      <Tabs
        defaultTab="one"
        onChange={(tabId) => {
          console.log(tabId);
        }}
      >
        <body className="authentication-page">
          {/* <div className="login-overlay"> </div> */}
          <div className="container-fluid">
            <div className="row align-items-center">
              <div class="col-md-8 col-lg-8 col-xs-8">
                <div class="login-text">
                  <h1 class="f-34 line-1 anim-typewriter"> Any Financials </h1>
                  <h4 class="sub-title"> Simplifying Finance for You
                  </h4>
                  <p class="text-justify f-14 m-t-20">
                    Anyfinancial.in is a complete audit and GRC tool designed by
                    Sadhguru Audit and GRC Solutions Pvt Limited. An integrated
                    end-to-end solution that enables organizations to have complete
                    Audit tool has become need of the hour. Anyfinancial.in has been
                    designed to ease the process of audit with more and more
                    effectiveness and reliability with blend of old-aged audit and
                    risk management techniques and sophisticated modern audit tools,
                    customised as per the client requirement...
                  </p>
                </div>
              </div>

              <div class="col-lg-4 col-md-4">

                <div className="login-form border_anim">
                  <img src={logodark2} alt="logo" className="logo" />{" "}
                  <h5> Let's get you signed in </h5>
                  <div class="w-100">
                    <TabList>
                     
                    </TabList>
                  </div>
                  <TabPanel tabId="one">
                    <div class="tab-content">
                      <div role="tabpanel" class="  in active" id="">
                        <div class=" ">
                          <form onSubmit={handleLogin}

                            class="myclassdummy testdummy  "
                          
                          >
                            <div class="input-group text-dark">
                              <div class="form-line">
                                <label class="mini-label">
                                  {" "}
                                  <IconUser className="icon-1" /> User Id <span class="text-danger">* </span>{" "}
                                </label>

                              
                                <input
                                  type="text"
                                  autocomplete="off"
                                  class="form-control-sign"
                                  placeholder="Enter your User ID"
                                  id="n_user"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                  required
                                />
                              </div>
                            </div>

                            <div class="input-group text-dark">
                              <div class="form-line">
                                <label class="mini-label">
                                  {" "}
                                  <IconLockOpen className="icon-1" /> Password <span class="text-danger">* </span>{" "}
                                </label>

                               
                                <input
                                  type="password"
                                  autocomplete="off"
                                  class="form-control-sign"
                                  placeholder="Enter your Password"
                                  id="n_user"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                  required
                                />
                                {errMsg}
                              </div>
                            </div>

                            <div class="pt-10">
                              <div class="col-xs-12">
                              
                                <button   type="submit" className="button-container">
                                  <LoadingButton text="Sign In" styleType="" />

                                </button>
                              </div>
                            </div>
                            {/* <div class="row"></div> */}
                          </form>
                        </div>
                      </div>
                      <div class="w-100 text-right">
                        <small class="text-dark">
                          {" "}
                          <Link className="" to={"/forget_password"}>
                            Forgot Password?
                          </Link>{" "}
                        </small>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel tabId="two">
                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane  in active" id="">
                        <div class="col">
                          <form

                            class="myclassdummy testdummy  "
                          //   id="sign_in"
                          //   data-cust="1"
                          //   enctype="multipart/form-data"
                          //   method="post"
                          //   accept-charset="utf-8"
                          //   novalidate="novalidate"
                          >
                            <div class="input-group text-dark">
                              <div class="form-line">
                                <label class="mini-label">
                                  {" "}
                                  User Id <span class="text-danger">* </span>{" "}
                                </label>
                                <br />
                                {/* <span class="input-group-addon">
                          <i class="material-icons"></i>
                        </span> */}
                                <BsFillPersonFill />
                                <input
                                  type="text"
                                  autocomplete="off"
                                  class="form-control-sign"
                                  id="n_user"
                                  name="username"
                                  placeholder=""
                                  required=""
                                  autofocus=""
                                  aria-required="true"
                                  aria-invalid="false"
                                />
                              </div>
                            </div>

                            <div class="input-group text-dark">
                              <div class="form-line">
                                <label class="mini-label">
                                  {" "}
                                  Password <span class="text-danger">* </span>{" "}
                                </label>
                                <br />
                                {/* <span class="input-group-addon">
                          <i class="material-icons"></i>
                        </span> */}
                                <BsLockFill />
                                <input
                                  type="password"
                                  autocomplete="off"
                                  class="form-control-sign"
                                  id="n_user"
                                  name="username"
                                  placeholder=""
                                  required=""
                                  autofocus=""
                                  aria-required="true"
                                  aria-invalid="false"
                                />
                              </div>
                            </div>

                            <div class="pt-10">
                              <div class="col-xs-12">
                                <button
                                  class="btn btn-block bg-green waves-effect login-btn"
                                  id="s_sign"
                                  name="s_sign"
                                  type="submit"
                                >
                                  {" "}
                                  EXTERNAL USER SIGN IN
                                </button>
                              </div>
                            </div>
                            <div class="row"></div>
                          </form>
                        </div>
                      </div>
                      <div class="col-xs-12 text-right mt-25 mr-2">
                        <small class="text-dark">
                          {" "}
                          <Link className="links-links" to={"/forget_password"}>
                            Forgot Password?
                          </Link>{" "}
                        </small>
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
        </body>
      </Tabs>
      <ToastContainer />
    </div>
  );
};

export default Login;


// import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
// import logodark2 from '../assets/images/logo.png';
// import { IconUser, IconLockOpen } from "@tabler/icons-react";
// import LoadingButton from "./LoadingButton";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import config from '../config/config';
// import api from "../services/api";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/dashboard";

//   const [accountId, setAccountId] = useState(""); // Account ID state
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   useEffect(() => {
//     setErrMsg("");
//   }, [accountId, userId, password]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Define API URL
//     const baseUrl = config.apiUrl; // Assuming the API URL is stored here
//     const apiUrl = `${baseUrl}/testApis/auth/login`;

//     try {
//       // Send request to validate account
//       const response = await api.post(apiUrl, {
//         account_id: accountId,  // Send the account_id here
//         user_id: userId,
//         password: password,
//       });

//       if (response.data.success) {
//         toast.success("Login successful", {
//           position: "top-right",
//           autoClose: 3000,
//         });

//         // Redirect to the dashboard
//         navigate("/dashboard");
//       } else {
//         toast.error(response.data.error || "Login failed!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Username or Password incorrect!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div>
//       <body className="authentication-page">
//         <div className="container-fluid">
//           <div className="row align-items-center">
//             <div className="col-md-8 col-lg-8 col-xs-8">
//               <div className="login-text">
//                 <h1 className="f-34 line-1 anim-typewriter">Any Financials</h1>
//                 <h4 className="sub-title">Simplifying Finance for You</h4>
//                 <p className="text-justify f-14 m-t-20">
//                   Anyfinancial.in is a complete audit and GRC tool designed by
//                   Sadhguru Audit and GRC Solutions Pvt Limited...
//                 </p>
//               </div>
//             </div>

//             <div className="col-lg-4 col-md-4">
//               <div className="login-form border_anim">
//                 <img src={logodark2} alt="logo" className="logo" />
//                 <h5>Let's get you signed in</h5>
//                 <form onSubmit={handleLogin}>
//                   <div className="input-group text-dark">
//                     <div className="form-line">
//                       <label className="mini-label">
//                         <IconUser className="icon-1" /> Account ID <span className="text-danger">* </span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control-sign"
//                         placeholder="Enter your Account ID"
//                         value={accountId}
//                         onChange={(e) => setAccountId(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="input-group text-dark">
//                     <div className="form-line">
//                       <label className="mini-label">
//                         <IconUser className="icon-1" /> User ID <span className="text-danger">* </span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control-sign"
//                         placeholder="Enter your User ID"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="input-group text-dark">
//                     <div className="form-line">
//                       <label className="mini-label">
//                         <IconLockOpen className="icon-1" /> Password <span className="text-danger">* </span>
//                       </label>
//                       <input
//                         type="password"
//                         className="form-control-sign"
//                         placeholder="Enter your Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="pt-10">
//                     <div className="col-xs-12">
//                       <button type="submit" className="button-container">
//                         <LoadingButton text="Sign In" />
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 <div className="w-100 text-right">
//                   <small className="text-dark">
//                     <Link to="/forget_password">Forgot Password?</Link>
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;


