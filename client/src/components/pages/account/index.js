import React, { useEffect, useState, useContext } from "react";
import { withCookies } from "react-cookie";
import { Card, Button, Row, Container } from "react-bootstrap";
import DropZone from "./DropZone";
import { withRouter } from "react-router-dom";
import { Context } from "../../Context";

function Account({ cookies, history }) {
  const [contracts, setContracts] = useState(["Mortgage", "Wedding contract"]);
  const { setLoginStatus } = useContext(Context);
  let token = cookies.get("token");

  useEffect(() => {
    fetch(`http://localhost:4000/contract?token=${token}`)
      .then((json) => {
        console.log(json);
        if (json.status == 200) {
          setLoginStatus(true);
          return json.json();
        } else {
          history.push("/login");
          setLoginStatus(false);
        }
      })
      .then((response) => {
        // setContracts(response)
        setContracts(response);
      })
      .catch((err) => {
        history.push("/login");
        setLoginStatus(false);
      });
  }, []);

  return (
    <Container>
      <Row>
        {contracts.map((contract) => (
          <Card className="text-center m-2 w-25" style={{ minWidth: "300px" }}>
            <Card.Header>{contract}</Card.Header>
            <Card.Body>
              <Card.Title>
                Contract between You and the Bank of America
              </Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Row className="justify-content-around">
                <Button variant="primary">Review</Button>
                <Button variant="danger">Remove</Button>
              </Row>
            </Card.Body>
            <Card.Footer className="text-muted">5 days ago</Card.Footer>
          </Card>
        ))}
      </Row>
      <DropZone token={token} />
    </Container>
  );
}

export default withRouter(withCookies(Account));
