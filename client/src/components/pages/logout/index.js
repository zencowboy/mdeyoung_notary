import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Context } from "../../Context";

function Logout({ cookies, history }) {
  const { setLoginStatus } = useContext(Context);

  function handleLogout() {
    // fetch("http://localhost:4000/user/sign_in", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // })
    //   .then((data) => data.json())
    //   .then((token) => {
    cookies.remove("token", {
      path: "/",
      maxAge: 30 * 60,
    });
    setLoginStatus(false);
    setTimeout(() => {
      history.push("/");
    }, 2000);

    // });
  }
  useEffect(handleLogout, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="6" md="8" xs="10">
          'You have been succesfully logged out and you'll be redirected to the
          home screen
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(withCookies(Logout));
