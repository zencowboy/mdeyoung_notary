import React, { useEffect, useState } from "react";
import { ListGroup, Carousel, Card, Button, Row } from "react-bootstrap";

export default function Home() {
  let [news, setNews] = useState([]);
  useEffect(() => {
    let from = new Date().toISOString().split("T")[0];
    let to = new Date().toISOString().split("T")[0];
    let q = "ethereum";
    let apiKey = "bd1b1115c38a49108c822a9fb636a598";
    fetch(
      `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&sortBy=publishedAt&apiKey=${apiKey}&language=en`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setNews(data.articles);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      Articles:
      <Carousel>
        <Carousel.Item interval={2000}>
          <Card style={{ width: "50vw", margin: "50px auto" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>
                How Blockchain Technology Can Be Used For Digital Notary
                Services
              </Card.Title>
              <Card.Text>
                By using Blockchain users can be guaranteed the integrity of
                data on the Ethereum chain. The known characteristics of
                blockchain already set it up to be a great asset to improve
                notary service in three ways. Proof of Existence, Proof of
                Ownership and Document Ownership Transfer.
              </Card.Text>
              <Button variant="primary">Sign up now!</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Card style={{ width: "50vw", margin: "50px auto" }}>
            <Card.Img
              variant="top"
              // src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/440px-Ethereum-icon-purple.svg.png"
            />
            <Card.Body>
              <Card.Title>How does it work?</Card.Title>
              <Card.Text>
                Ethereum operates via a global network of computers that work
                together as a supercomputer. The network assembles and runs
                smart contracts - applications that are, in theory, independent
                from any third party interference or censorship, as the
                blockchain is resistant to tampering.
              </Card.Text>
              <Button variant="primary">Sign up now!</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Card style={{ width: "50vw", margin: "50px auto" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Benefits Of Using Blockchain Technology </Card.Title>
              <Card.Text>
                • Security of stored documents and deeds. • Private key access
                to the documents. • Secured storage on the blocks with
                appropriate timestamps. • Seamless transfer of document
                ownership through the network. • Open transactions on the
                network for the verification process.
              </Card.Text>
              <Button variant="primary">Sign up now!</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
      Latest News:
      <Carousel>
        {news
          .reduce(
            (acc, item, index, arr) => {
              if (acc.view.length < 3) {
                acc.view.push(item);
              } else {
                acc.res.push(acc.view);
                acc.view = [];
              }
              if (index == arr.length - 1) {
                acc.res.push([item]);
              }
              return acc;
            },
            { view: [], res: [] }
          )
          .res.map((view, key) => (
            <Carousel.Item interval={2000} key={key}>
              <Row>
                {view.map((item, key) => (
                  <Card
                    key={key}
                    style={{ width: "25vw", margin: "50px auto" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                      src={item.urlToImage}
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <i>{new Date(item.publishedAt).toLocaleString()}</i>
                      <Card.Text>{item.description}</Card.Text>
                      <a href={item.url} target="_blank">
                        <Button variant="primary">read more</Button>
                      </a>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
}
