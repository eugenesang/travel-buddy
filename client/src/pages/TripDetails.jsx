import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTripById, deleteTrip } from "./../services/tripApi";

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      .then((trip) => {
        setTrip(trip);
        console.log("Trip:", trip);
      })
      .catch((error) => {
        console.error("Error fetching trip:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

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
          <p>{trip.startDate}</p>

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
