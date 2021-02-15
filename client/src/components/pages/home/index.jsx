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
              <Card.Title>"What is a Smart Contract?"</Card.Title>
              <Card.Text>
                A Smart Contract is an agreement between parties that is stored
                on and executed by a blockchain. Smart contracts may have the
                most potential to change the way companies and organizations do
                business.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Card style={{ width: "50vw", margin: "50px auto" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>How does it work?</Card.Title>
              <Card.Text>
                MdeYoung Notary allows you to simply and easily store the
                contents of your contract on the Ethereum Blockchain.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Card style={{ width: "50vw", margin: "50px auto" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Sign up now!</Card.Title>
              <Card.Text>Simply blah blah blah</Card.Text>
              <Button variant="primary">Go somewhere</Button>
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
