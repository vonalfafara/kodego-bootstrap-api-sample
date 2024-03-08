import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                exact
              />
            );
          })}
        </Routes>
      </Container>
    </>
  );
};

export default App;
