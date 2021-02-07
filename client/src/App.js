import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import Account from "./components/pages/account";
import Register from "./components/pages/register";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/account">
            <Account />{" "}
          </Route>
          <Route path="/contract/:id/:token">{/* <Contract /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}
