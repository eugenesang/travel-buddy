import { useSelector } from "react-redux";
import { useState } from "react";

import { Card, Header } from "../components";
import { trips, images, features } from "../constants";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTrips = trips.filter((trip) => {
    const isMatch =
      trip.location.toLowerCase().includes(filter.toLowerCase()) &&
      trip.cost <= parseInt(search);
    return isMatch;
  });

  const displayedTrips = search === "" ? trips : filteredTrips;

  return (
    <div className="container">
      {/* Header */}
      <Header username={user ? user.name : ""} />

      {/* Trip cards */}
      <div
        style={{
          width: "100%",
          minHeight: "100vh",

          padding: "5rem 2rem",

          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "2rem",
        }}
        className="bg-2"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="inner-container"
            style={{
              alignItems: "flex-start",
            }}
          >
            <h1>Popular Destinations</h1>
            <p>Vacations to make your experience enjoyable in world</p>
          </div>
          <div className="row">
            <input
              type="text"
              id="location-filter"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search by location"
            />
            <input
              type="number"
              id="cost-filter"
              value={search}
              onChange={handleSearchChange}
              placeholder="Filter by cost"
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gridGap: "2rem",
          }}
        >
          {displayedTrips.map((trip, index) => {
            return <Card key={index} trip={trip} />;
          })}
        </div>
      </div>

      {/* Why choose us */}
      <div
        className="row"
        style={{
          padding: "2rem",
          gap: "5rem",
        }}
      >
        <img
          src={images.chooseus}
          alt="image"
          style={{
            width: "40%",
            height: "40%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          <div
            className="inner-container"
            style={{
              alignItems: "flex-start",
            }}
          >
            <h1>Why Choose Us</h1>
            <p>
              Enjoy different experiences in every place you visit and discover
              new and affordable adventures of course.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  <div>{feature.icon}</div>
                  <div
                    className="inner-container"
                    style={{
                      alignItems: "flex-start",
                    }}
                  >
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* World map */}
      <div
        className="container bg-2"
        style={{
          padding: "5rem 2rem",
        }}
      >
        <img src={images.world} alt="map" />
      </div>
    </div>
  );
};

export default Home;
