import React, { useEffect, useState } from "react";
// import axios from "axios";
import qs from "qs";
// import moment from "moment";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import "./style.css";

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrormsg] = useState("");

  useEffect(() => {
    console.log("firstname", firstName);
    console.log("lastname", lastName);
    console.log("email", email);
    console.log("password", password);
  }, [firstName, lastName, email, password]);

  const registerUser = () => {
    //check stuff
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      //show error message
      setErrormsg("All fields required");
    } else {
      setErrormsg("");
      //   const baseUrl = "http://localhost:5000";
      //   const axiosInstance = axios.create({
      //     baseURL: baseUrl,
      //     timeout: 5000, // 5000ms = 5s
      //   });
      fetch("http://localhost:4000/user/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      })
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            return json.json();
          } else {
            throw new Error(json.code);
          }
        })
        .then((response) => {
          console.log(response);
          if (!response) {
            return setErrormsg("Error occurred in form, please check values");
          }
          props.cookies.set("token", response.token, {
            path: "/",
            maxAge: 30 * 60,
          });

          props.history.push("/account");
        })
        .catch((err) => {
          console.log(err);
          setErrormsg("Error occurred in form, please check values");
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="6" md="8" xs="10">
          <img
            className="mb-4"
            src="/../tokofolio_logo1.svg"
            alt="200"
            width="200"
            height="300"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
          <h3 className="text-danger">{errorMsg} </h3>
          <div className="form-group">
            <label htmlFor="first_name" className="sr-only">
              First Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              required=""
              autoFocus=""
              name="first_name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              required=""
              autoFocus=""
              name="last_name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required=""
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={registerUser}
          >
            Submit
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(withCookies(Register));
