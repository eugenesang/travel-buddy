import { useSelector } from "react-redux";
import { useState } from "react";

import { Card, Header } from "../components";
import { data } from "../constants";

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

  const filteredTrips = data.filter((trip) => {
    const isMatch =
      trip.location.toLowerCase().includes(filter.toLowerCase()) &&
      trip.cost <= parseInt(search);
    return isMatch;
  });

  const displayedTrips = search === "" ? data : filteredTrips;

  return (
    <div className="container">
      <Header username={user ? user.name : ""} />
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#dafffb",

          padding: "2rem ",

          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "2rem",
        }}
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
    </div>
  );
};

export default Home;
