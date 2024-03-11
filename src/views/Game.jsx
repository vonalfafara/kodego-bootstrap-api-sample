import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGame();
    return () => {};
  }, []);

  async function getGame() {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
      params: { id: id },
      headers: {
        "X-RapidAPI-Key": "b9f377de43msh10628aacb321df0p1be870jsn29f9c84e4616",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const { data } = await axios.request(options);
    setGame(data);
  }

  return (
    <>
      {game ? (
        <img src={game?.screenshots[0]?.image} alt="" className="banner" />
      ) : null}
    </>
  );
};

export default Game;
