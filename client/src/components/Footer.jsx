const Footer = () => {
  return (
    <footer className="footer glass-effect">
      <div className="footer-container">
        <div
          className="row"
          style={{
            gap: "5rem",
            padding: "4rem 2rem",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexWrap: "wrap"
          }}
        >
          <div
            className="inner-container"
            style={{
              maxWidth: "500px",
              alignItems: "flex-start",
            }}
          >
            <h2>
              Travel <span>Connect</span>{" "}
            </h2>
            <p>
              We are a passionate team of travel enthusiasts dedicated to
              providing unforgettable experiences and helping you create
              lifelong memories.
            </p>
          </div>

          <div
            className="inner-container"
            style={{
              alignItems: "flex-start",
            }}
          >
            <h2>Quick Links</h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/trips">Trips</a>
              </li>
              <li>
                <a href="/explore">Explore</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div
            className="inner-container"
            style={{
              alignItems: "flex-start",
            }}
          >
            <h2>Our Socials</h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <a href="/">Facebook</a>
              </li>
              <li>
                <a href="/trips">Instagram</a>
              </li>
              <li>
                <a href="/explore">Linkedin</a>
              </li>
              <li>
                <a href="/contact">Twitter</a>
              </li>
            </ul>
          </div>

          <div
            className="inner-container"
            style={{
              alignItems: "flex-start",
            }}
          >
            <h2>Contact Information</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>1234 TripPlanner, New Delhi, India</p>

              <p>info@tripplanner.com</p>

              <p>+91 8009396321</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
