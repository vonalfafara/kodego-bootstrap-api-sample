import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "./Game.css";
import http from "../http";

const Game = () => {
  const api = http();
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGame();
    return () => {};
  }, []);

  async function getGame() {
    const { data } = await api.get(`/game?id=${id}`);
    setGame(data);
  }

  return (
    <>
      {game ? (
        <>
          <img
            src={game?.screenshots[0]?.image}
            alt=""
            className="banner mb-4"
          />
          <Container>
            <h1 className="text-center">{game.title}</h1>
            <p className="text-center fw-bold">by {game.developer}</p>
            <p>{game.description}</p>
            <p>Genre: {game.genre}</p>
            <p>
              Game URL:{" "}
              <a href={game.game_url} target="_blank">
                {game.game_url}
              </a>
            </p>
            <Carousel className="mb-4">
              {game.screenshots.map((item) => {
                return (
                  <Carousel.Item key={item.id}>
                    <img className="carousel-img" src={item.image} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <p>Minimum System Requirements:</p>
            <ul>
              <li>Graphics: {game.minimum_system_requirements.graphics}</li>
              <li>Memory: {game.minimum_system_requirements.memory}</li>
              <li>Operating System: {game.minimum_system_requirements.os}</li>
              <li>Processor: {game.minimum_system_requirements.processor}</li>
              <li>Storage: {game.minimum_system_requirements.storage}</li>
            </ul>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default Game;
