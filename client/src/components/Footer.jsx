const Footer = () => {
  return (
    <footer className="footer glass-effect">
      <div className="footer-container">
        <div
          className="row"
          style={{
            gap: "5rem",
            padding: "2rem ",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <div
            className="inner-container"
            style={{
              maxWidth: "500px",
              alignItems: "flex-start",
            }}
          >
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo.
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
            <h2>Contact Information</h2>
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              1234 TripPlanner St, City, Country
              <br />
              info@tripplanner.com
              <br />
              +1 234 567 890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
