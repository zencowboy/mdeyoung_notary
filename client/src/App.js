import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Container, Row } from "react-bootstrap";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import Account from "./components/pages/account";
import Admin from "./components/pages/admin";
import Register from "./components/pages/register";
import "./style.css";
import { Context } from "./components/Context";
import Logout from "./components/pages/logout";

export default function BasicExample() {
  const { loginStatus } = useContext(Context);
  return (
    <div className="add-background">
      <Router>
        <Container fluid className="pl-5">
          <Row
            className="justify-content-between pt-3"
            style={{ width: "300px" }}
          >
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/admin">Admin</Link>
            {loginStatus ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </Row>
        </Container>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/contract/:id/:token">{/* <Contract /> */}</Route>
        </Switch>
      </Router>
    </div>
  );
}
