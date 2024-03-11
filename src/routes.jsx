import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Game from "./views/Game";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    forNavbar: true,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
    forNavbar: true,
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    element: <Contact />,
    forNavbar: true,
  },
  {
    name: "Game",
    path: "/game/:id",
    element: <Game />,
    forNavbar: false,
  },
];

export default routes;
