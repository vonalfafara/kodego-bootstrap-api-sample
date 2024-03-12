import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const GameCard = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.short_description}</Card.Text>
        <Card.Text>Release Date: {props.release_date}</Card.Text>
        <Button variant="primary" as={Link} to={`/game/${props.id}`}>
          View Game
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
