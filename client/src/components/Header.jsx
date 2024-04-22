import images from "../constants/images";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username }) => {
  return (
    <div
      className="row"
      style={{
        padding: "0 2rem",
      }}
    >
      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
          gap: "1.5rem",
        }}
      >
        <h1>
          Hey {username.split(' ')[0]}, <br />
          Start your journey with one click, <br />
          explore beautiful world!
        </h1>
        <p>
          Plan and book your perfect trip with expert advice, travel tips,
          destination information and inspiration from us!
        </p>
        <div className="row">
          <Link className="button" to={"/profile"}>
            Plan now
          </Link>
          <p>About us</p>
        </div>
      </div>
      <img src={images.illustration} alt="illustartion" />
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
