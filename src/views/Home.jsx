import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import GameCard from "../components/GameCard";
import "./Home.css";
import http from "../http";

const Home = () => {
  const api = http();
  const [carouselItems, setCarouselItems] = useState([]);
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState("null");
  const [category, setCategory] = useState("null");
  const [sortBy, setSortBy] = useState("null");

  useEffect(() => {
    getGames();
    return () => {};
  }, []);

  useEffect(() => {
    let params = {};

    if (platform !== "null") params.platform = platform;
    if (category !== "null") params.category = category;
    if (sortBy !== "null") params["sort-by"] = sortBy;

    getGames(params);
    return () => {};
  }, [platform, category, sortBy]);

  async function getGames(params = {}) {
    const options = {
      url: "/games",
      params: params,
    };
    const { data } = await api.request(options);

    if (data.status === 0) {
      toast.error(data.status_message);
    } else {
      const newCarouselItems = data.filter((_, index) => {
        return index < 3;
      });
      setGames(data);
      setCarouselItems(newCarouselItems);
    }
  }

  return (
    <>
      <Toaster />
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
        <form className="mb-4">
          <Row>
            <Col sm="12" md="4">
              <Form.Select
                defaultValue="null"
                className="mb-2"
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="null" disabled>
                  Select Platform
                </option>
                <option value="pc">PC</option>
                <option value="browser">Web Browser</option>
              </Form.Select>
            </Col>
            <Col sm="12" md="4">
              <Form.Select
                defaultValue="null"
                className="mb-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="null" disabled>
                  Select Category
                </option>
                <option value="shooter">Shooter</option>
                <option value="mmorpg">MMORPG</option>
                <option value="racing">Racing</option>
                <option value="sports">Sports</option>
                <option value="strategy">Strategy</option>
                <option value="card">Card Game</option>
                <option value="battle-royale">Battle Royale</option>
                <option value="moba">MOBA</option>
              </Form.Select>
            </Col>
            <Col sm="12" md="4">
              <Form.Select
                defaultValue="null"
                className="mb-2"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="null" disabled>
                  Sort By
                </option>
                <option value="alphabetical">Alphabetical</option>
                <option value="release-date">Release Date</option>
              </Form.Select>
            </Col>
          </Row>
        </form>

        <Row gap={2}>
          {games.map((item) => {
            return (
              <Col key={item.id} sm="6" md="3" className="mb-4">
                <GameCard
                  id={item.id}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  short_description={item.short_description}
                  release_date={item.release_date}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
