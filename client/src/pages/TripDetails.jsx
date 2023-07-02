import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchImages } from "./../services/unsplashApi";
import {
  fetchPlaceLocation,
  fetchTouristPlaces,
  fetchHotels,
} from "./../services/rapidApi";

import { getTripById, deleteTrip } from "./../services/tripApi";

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);

  // Get user from Redux store
  const userData = useSelector((state) => state.user);
  const { user } = userData;

  // Get trip id from URL
  const { id } = useParams();

  // Get history object from react-router-dom
  const navigate = useNavigate();

  // Get trip details from API
  useEffect(() => {
    setIsLoading(true);

    getTripById(id)
      .then(async (trip) => {
        setTrip(trip);

        console.log("Trip:", trip);

        try {
          // Fetch images
          const images = await fetchImages(trip.destination);
          setImages(images);

          // Fetch tourist places
          const touristPlaces = await fetchTouristPlaces(trip.destination);
          setTouristPlaces(touristPlaces);

          // Fetch place location
          const placeProperty = await fetchPlaceLocation(trip.destination);

          if (placeProperty && placeProperty.lat && placeProperty.lon) {
            // Fetch hotels using lat and lon from placeProperty
            const hotels = await fetchHotels(
              placeProperty.lat,
              placeProperty.lon
            );
            setHotels(hotels);
          }
        } catch (error) {
          console.error("Error fetching trip details:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching trip:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, endDate, startDate]);

  const handleEdit = () => {
    // Check if the user is the creator of the trip
    if (trip.createdBy === user._id) {
      // Redirect to the trip edit page with the trip ID
      navigate(`/trips/${id}/edit`);
    } else {
      // Display an error message or show a notification that the user does not have permission to edit the trip
    }
  };

  const handleDelete = () => {
    // Check if the user is the creator of the trip
    if (trip.createdBy === user._id) {
      // Call the deleteTrip function from the API service
      deleteTrip(id)
        .then(() => {
          // Redirect to the trip listing page or any other appropriate page
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error deleting trip:", error);
          // Display an error message or show a notification that the trip could not be deleted
        });
    } else {
      // Display an error message or show a notification that the user does not have permission to delete the trip
    }
  };

  const handleInviteFriends = () => {
    // Implement the functionality to invite friends to join the trip
    // This can be done using a modal, form, or any other method based on your design and requirements
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{trip.name}</h2>
          <p>{trip.destination}</p>

          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* Render the images */}
          <div>
            {/* <h3>Images of {trip.destination}</h3>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
              />
            ))} */}
          </div>

          {/* Render the tourist places */}
          <div>
            <h3>Tourist Places in {trip.destination}</h3>
            <ul>{touristPlaces.name}</ul>
          </div>

          {/* Render the hotels */}
          <div>
            <h3>Hotels near {trip.destination}</h3>
            <ul>
              {hotels.map((hotel) => (
                <li key={hotel.id}>{hotel.hotel_name}</li>
              ))}
            </ul>
          </div>

          {/* Only show the Edit and Delete buttons if the user is the creator of the trip */}
          {trip.creator === user.id && (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}

          <button onClick={handleInviteFriends}>Invite Friends</button>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
