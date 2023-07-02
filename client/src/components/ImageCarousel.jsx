import { useState } from "react";
import PropTypes from "prop-types";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const currentImage = images[currentIndex];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <img
        src={
          currentImage.urls?.small ||
          "https://source.unsplash.com/random/800x600?beach"
        }
        alt={currentImage.alt_description}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
      <div
        className="row"
        style={{
          width: "100%",
          gap: "15rem",
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            width: "100%",
          }}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          style={{
            width: "100%",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      urls: PropTypes.shape({
        small: PropTypes.string,
      }),
      alt_description: PropTypes.string,
    })
  ).isRequired,
};

export default ImageCarousel;
