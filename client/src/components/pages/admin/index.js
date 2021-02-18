import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { Card, Button, Row, Container } from "react-bootstrap";
import Blockchain from "./Blockchain";

function Account({ cookies }) {
  const [contracts, setContracts] = useState(["Mortgage", "Wedding contract"]);

  useEffect(() => {
    let token = cookies.get("token");
    fetch(`http://localhost:4000/contract?token=${token}`)
      .then((res) => res.json())
      .then((data) => console.log("ok"));
  }, []);

  return (
    <Container>
      <Row>
        {contracts.map((contract) => (
          <Card className="text-center m-2 w-25" style={{ minWidth: "300px" }}>
            <Card.Header>{contract}</Card.Header>
            <Card.Body>
              <Card.Title>
                Contract between You and the Bank of Ukraine
              </Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Row className="justify-content-around">
                <Button variant="success">Confirm</Button>
                <Button variant="primary">Review</Button>

                <Button variant="danger">Reject</Button>
              </Row>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        ))}
      </Row>
      <Blockchain />
    </Container>
  );
}

export default withCookies(Account);
