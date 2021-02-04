import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import "./style.css";

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
    console.log("passpord", password);
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
      axios
        .post("http://localhost:5000/users/register", {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        })
        .then((response) => {
          console.log(response);
          if (!response.data.success) {
            return setErrormsg("Error occurred in form, please check values");
          }
          props.cookies.set("token", response.data.token, {
            path: "/",
            expires: moment.unix(response.data.expiresAt).toDate(),
          });

          props.history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setErrormsg("Error occurred in form, please check values");
        });
    }
  };

  return (
    <div
      className="container-fluid other-background login"
      style={{
        backgroundImage: "url('/background2.svg')",
      }}
    >
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
    </div>
  );
}

export default withRouter(withCookies(Register));
