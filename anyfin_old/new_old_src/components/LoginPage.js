import {  useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import api from "../services/api";
import tokenService from "../services/token.service";
import {  useNavigate, useLocation } from "react-router-dom";


const LoginPage = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

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
    return api
      .post("/api-login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          tokenService.setUser(response.data);
          navigate(from, { replace: true });
        }
      }, err =>{
        errMsg(err.message);
      });
  };

  return (
    <div>
      <div className="vc">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 login-card">
              <div className="main-logo">
                {" "}
                <img src="../web-logo.png" className="img-fluid mt-lg-3" alt="" />{" "}
              </div>

              <Card className="col-md-10 card-h-center login-form border-0">
                <div className="text-center mt-3">
                  <h4> Sign in to Account </h4>
                  <p className="mb-0 text-dark">
                    {" "}
                    Enter your userid & password to login{" "}
                  </p>
                </div>

                <Form className="p-lg-2" onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label> User Id </Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Password
                    </Form.Label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </Form.Group>
                  {errMsg}

                  <Form.Group className="mb-3 float-left">
                    <Form.Check type="checkbox" label="Remember Password" />
                  </Form.Group>

                  <Nav.Link
                    href="https://www.google.com/"
                    className="p-0 float-right"
                  >
                    {" "}
                    Forgot Password?{" "}
                  </Nav.Link>

                  <Button
                    type="submit"
                    size="sm"
                    className="w-100 rounded-50 theme-btn"
                  >
                    {""}
                    Sign In
                  </Button>
                </Form>
              </Card>
            </div>

            <Card className="col-md-6 d-none d-lg-block border-0 bg-content">
              <Card.Body className="  p-lg-4  ">
                <h2> Excellence through Automation </h2>
                <p>
                  {" "}
                  Anyaudit.in is a complete audit and GRC tool designed by
                  Sadhguru Audit and GRC Solutions Pvt Limited. An integrated
                  end-to-end solution that enables organizations to have
                  complete Audit tool has become need of the hour. Anyaudit.in
                  has been designed to ease the process of audit with more and
                  more effectiveness and reliability with blend of old-aged
                  audit and risk management techniques and sophisticated modern
                  audit tools, customised as per the client requirement...
                </p>
              </Card.Body>
              <p className="card-foot ">
                {" "}
                Any Audit © 2023 Developed By Sadhguru Audit & GRC Solutions Pvt
                Ltd{" "}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
