import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";

const Card = ({ trip }) => {
  const { name, destination, tripDays, cost, image, location, totalDays } =
    trip;
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        style={{
          maxHeight: "250px",
          width: "100%",

          borderRadius: "10px",
          marginBottom: "10px",
        }}
        src={
          image
            ? image
            : `https://source.unsplash.com/random/800x600?${
                location || destination || name
              }`
        }
        alt={name}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FiMapPin style={{ fontSize: "18px", marginRight: "5px" }} />
        <span>{destination || location}</span>
      </div>
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>{name}</h2>
      <p style={{ color: "#888888" }}>
        {tripDays || totalDays} days | $ {cost}
      </p>
    </div>
  );
};

Card.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    tripDays: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    totalDays: PropTypes.number.isRequired,
  }),
};

export default Card;
