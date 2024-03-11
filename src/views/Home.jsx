import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
    return () => {};
  }, []);

  async function getGames() {
    const { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b9f377de43msh10628aacb321df0p1be870jsn29f9c84e4616",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    const newCarouselItems = data.filter((_, index) => {
      return index < 3;
    });
    setGames(data);
    setCarouselItems(newCarouselItems);
  }

  return (
    <>
      <Carousel className="mb-4">
        {carouselItems.map((item) => {
          return (
            <Carousel.Item key={item.id} className="position-relative">
              <div className="carousel-overlay"></div>
              <img className="carousel-img" src={item.thumbnail} />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.short_description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Container>
        <h3 className="text-center mb-4">Games List</h3>
        <Row gap={2}>
          {games.map((item) => {
            return (
              <Col key={item.id} sm="6" md="3" className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.thumbnail} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.short_description}</Card.Text>
                    <Button variant="primary">View Game</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
