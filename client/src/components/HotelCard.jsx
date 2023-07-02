import PropTypes from "prop-types";

const HotelCard = ({
  hotelName,
  address,
  reviewScore,
  price,
  imageURL,
  websiteURL,
  zip,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        background: "#fff",
      }}
    >
      <img
        src={imageURL}
        alt={hotelName}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}
        >
          {hotelName.length > 25 ? hotelName.slice(0, 25) + "..." : hotelName}
        </h3>

        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
          {address}, {zip}
        </p>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <span style={{ fontSize: "14px", marginRight: "5px" }}>
            Review Score:
          </span>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            {reviewScore}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "14px", marginRight: "5px" }}>Price:</span>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>{price}</span>
        </div>
        <a href={websiteURL} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  hotelName: PropTypes.string,
  address: PropTypes.string,
  zip: PropTypes.string,
  reviewScore: PropTypes.number,
  price: PropTypes.number,
  imageURL: PropTypes.string,
  websiteURL: PropTypes.string,
};

export default HotelCard;
