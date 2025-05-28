import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import api from "../services/api";
import tokenService from "../services/token.service";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsPersonCircle, BsFillPersonFill } from "react-icons/bs";
const ForgetPageAudit = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [errMsg, setErrMsg] = useState("");

  //   useEffect(() => {
  //     setErrMsg("");
  //     // loadFunction();
  //   }, [username, password]);

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     return api
  //       .post("/auth/signin", {
  //         username,
  //         password,
  //       })
  //       .then((response) => {
  //         if (response.data.accessToken) {
  //           tokenService.setUser(response.data);
  //           navigate(from, { replace: true });
  //         }
  //       }, err =>{
  //         errMsg(err.message);
  //       });
  //   };

  return (
    <div>
      <body className="vc">
        <div className="login-overlay"></div>
        <div class="col-md-6 col-lg-7 col-xs-6 postion-revert">
          <div class="login-text">
            <h1 class="f-34 line-1 anim-typewriter">AnyAudit. </h1>
            <h4 class="sub-title"> Excellence through Automation </h4>
            <p class="text-justify f-14 m-t-20">
              Anyaudit.in is a complete audit and GRC tool designed by Sadhguru
              Audit and GRC Solutions Pvt Limited. An integrated end-to-end
              solution that enables organizations to have complete Audit tool
              has become need of the hour. Anyaudit.in has been designed to ease
              the process of audit with more and more effectiveness and
              reliability with blend of old-aged audit and risk management
              techniques and sophisticated modern audit tools, customised as per
              the client requirement...
            </p>
          </div>
        </div>

        <div class="login-form pb-3">
          <img
            src="https://old.anyaudit.co.in/img/web-logo.png"
            class="login-logo"
          />
          <form
            action="https://old.anyaudit.co.in/Login/reset_password"
            class="myclassdummy testdummy "
            id="sign_in"
            method="post"
            accept-charset="utf-8"
            novalidate="novalidate"
          >
            

            <div class="input-group text-dark">
              <div class="form-line">
                <label class="mini-label">
                  {" "}
                  Registered User ID <span class="text-danger">* </span>{" "}
                </label>
                <br />
                {/* <span class="input-group-addon">
                      <i class="material-icons"></i>
                    </span> */}
              <BsPersonCircle/>
                <input
                  type="text"
                  autocomplete="off"
                  class="form-control-forget margin-bottom"
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

            <div class=" ">
              <div class="col-xs-12 text-center send-otp">
                <a
                 
                  class="btn bgs-blues btn-block wave-effect"
                >
                  {" "}
                 Send OTP
                </a>{" "}
                <br />
              </div>
            </div>

            <div class=" ">
              <div class="col-xs-12 text-center send-otp">
                <Link to={"/login"}
                 
                  class="btn bg-green btn-block wave-effect"
                >
                  {" "}
                  Back to Login
                </Link>{" "}
                <br />
              </div>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default ForgetPageAudit;
