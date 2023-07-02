import PropTypes from "prop-types";

const TouristLocationCard = ({
  image,
  description,
  location,
  name,
  numHotels,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "250px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        background: "#fff",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>{name}</p>
        <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="location-icon.png"
          alt="Location"
          style={{ width: "20px", marginRight: "5px" }}
        />
        <p style={{ fontSize: "14px", color: "#333" }}>{location}</p>
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        {numHotels} Hotels Available
      </div>
    </div>
  );
};

TouristLocationCard.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numHotels: PropTypes.number.isRequired,
};

export default TouristLocationCard;
