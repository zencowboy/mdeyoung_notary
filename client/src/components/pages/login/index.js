import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Context } from "../../Context";

function Login({ cookies, history }) {
  const [form, setForm] = useState({});
  const { setLoginStatus } = useContext(Context);

  function handleInput(e) {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/user/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((data) => data.json())
      .then((token) => {
        cookies.set("token", token.token, {
          path: "/",
          maxAge: 30 * 60,
        });
        setLoginStatus(true);
        history.push("/account");
      });
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="6" md="8" xs="10">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleInput}
                name="login"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text style={{ color: "white" }}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleInput}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(withCookies(Login));
