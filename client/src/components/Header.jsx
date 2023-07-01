import images from "../constants/images";

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
          Hey {username} <br />
          Start your journey by one click, <br />
          explore beautiful world!
        </h1>
        <p>
          Plan and book your perfect trip with expert advice, travel tips,
          destination information and inspiration from us!
        </p>
        <div className="row">
          <button>Plan now</button>
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
