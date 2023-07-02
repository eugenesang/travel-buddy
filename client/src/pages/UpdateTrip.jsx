import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getTripById, updateTrip } from "../services/tripApi";

const UpdateTrip = () => {
  const [tripData, setTripData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector((state) => state.user);
  const { user } = userData;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTripById(id)
      .then((trip) => {
        setTripData(trip);
      })
      .catch((error) => {
        console.error("Error fetching trip:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format date values to "yyyy-MM-dd" before updating state
    if (name === "startDate" || name === "endDate") {
      const formattedDate = value.substring(0, 10); // Extract the first 10 characters
      setTripData((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    } else {
      setTripData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const updatedTrip = await updateTrip(id, tripData);
      console.log("Updated trip:", updatedTrip);
      // Redirect to the trip details page or any other appropriate page
      navigate(`/trips/${id}`);
    } catch (error) {
      console.error("Error updating trip:", error);
      // Display an error message or show a notification for the update error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Update Trip</h1>
      {isLoading && tripData.createdBy === user._id ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            gap: "1rem",
            margin: "1rem auto",
          }}
        >
          <div
            className="row"
            style={{
              width: "100%",
            }}
          >
            <div
              className="inner-container"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={tripData.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className="inner-container"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={tripData.destination || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div
            className="row"
            style={{
              width: "100%",
            }}
          >
            <div
              className="inner-container"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={tripData.startDate || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className="inner-container"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={tripData.endDate || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div
            className="inner-container"
            style={{
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={tripData.description || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div
            className="inner-container"
            style={{
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            <label htmlFor="cost">Estimated cost per person:</label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={tripData.cost || 0}
              onChange={handleInputChange}
              required
              placeholder="Enter in dollar currency..."
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Trip"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateTrip;
