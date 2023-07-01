import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { images } from "../constants";

const Navigation = () => {
  const user = useSelector((state) => state.user.user);

  const mainMenu = [
    {
      label: "Home",
      link: "/home",
    },
    {
      label: "Trips",
      link: "/trips",
    },
    {
      label: "Explore",
      link: "/explore",
    },
    {
      label: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <nav className="navigation glass-effect">
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src={images.logos_black}
          alt="logo"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
        <h1>
          Travel <span>Buddy</span>
        </h1>
      </Link>
      <div className="row">
        {mainMenu.map((item, index) => (
          <Link key={index} to={item.link}>
            {item.label}
          </Link>
        ))}
      </div>
      {user ? (
        <div className="row">
          <Link to="/trips">Trips</Link>
          <Link to="/profile" className="button">
            Profile
          </Link>
        </div>
      ) : (
        <div className="row">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="button">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
