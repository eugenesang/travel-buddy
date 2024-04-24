import PropTypes from "prop-types";

const Card = ({ trip }) => {
  const { name, destination, tripDays, cost, image, location, totalDays } =
    trip;
  const imgUrl = image
    ? image
    : `https://source.unsplash.com/random/800x600?tourist place of${location || destination
    }`;

  return (
    <div className="home-trip-card">
      <div className="img-container">
        <img src={imgUrl} alt={name} />
      </div>
      <div className="content-container">
        <div className="location">
          <i className="fas fa-location-dot"></i>
          <span className="destination-name">{destination || location}</span>
        </div>
        <h2 >{name}</h2>
        <p>
          {tripDays || totalDays} days | Ksh {cost}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    destination: PropTypes.string,
    tripDays: PropTypes.number,
    cost: PropTypes.number.isRequired,
    image: PropTypes.string,
    location: PropTypes.string,
    totalDays: PropTypes.number,
  }),
};

export default Card;
