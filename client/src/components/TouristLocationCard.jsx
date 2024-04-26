import PropTypes from "prop-types";

const TouristLocationCard = ({
  image,
  description,
  name,
  excerpt
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
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#222" }}>
          {name}
        </p>
        <p style={{ fontSize: "14px", color: "#66a", fontStyle: "italic" }}>{description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        
        
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} style={{color: '#666'}}></p>
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
  excerpt: PropTypes.string
};

export default TouristLocationCard;
