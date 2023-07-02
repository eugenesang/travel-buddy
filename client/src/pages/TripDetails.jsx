import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CalendarComponent,
  TouristLocationCard,
  HotelCard,
  ImageCarousel,
  InviteFriend,
} from "../components";

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

  return (
    <div>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <div
          className="row"
          style={{
            alignContent: "flex-start",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* Left part */}
          <div
            className="inner-container"
            style={{
              padding: "2rem",
              gap: "2rem",
            }}
          >
            {/* Heading */}
            <div
              className="row"
              style={{
                width: "100%",
              }}
            >
              <div
                className="inner-container"
                style={{
                  alignItems: "flex-start",
                }}
              >
                <h1>{trip.name}</h1>
                <p>{trip.description}</p>
              </div>
              <div className="row">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <InviteFriend />
              </div>
            </div>

            {/* Event details */}
            <div
              className="inner-container"
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <h1>Event Details</h1>
              <div
                className="row"
                style={{
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",

                    width: "100%",
                  }}
                >
                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>Start Date</h2>
                    <p>{trip.startDate}</p>
                  </div>

                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>End Date</h2>
                    <p>{trip.endDate}</p>
                  </div>

                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>Created By</h2>
                    <p>{trip.createdBy}</p>
                  </div>

                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>Invited friends</h2>
                    <p>No of friends invited </p>
                  </div>

                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>Total days</h2>
                    <p>{trip.totalDays} Days</p>
                  </div>

                  <div
                    className="glass-effect"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",

                      alignItems: "flex-start",
                      padding: "1rem",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>Cost for each </h2>
                    <p>{trip.cost}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Places */}
            <div
              className="inner-container"
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <h1>Tourist Places</h1>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {touristPlaces.slice(0, 3).map((location) => (
                  <TouristLocationCard
                    key={location.dest_id}
                    image={location.image_url}
                    description={location.label}
                    location={`${location.region}, ${location.country}`}
                    name={location.name}
                    numHotels={location.nr_hotels}
                  />
                ))}
              </div>
            </div>

            {/* Places */}
            <div
              className="inner-container"
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <h1>Gallery</h1>

              {images.length > 0 && <ImageCarousel images={images} />}
            </div>
          </div>

          {/* Right part */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem",
              borderLeft: "1px solid #64ccc5",
            }}
          >
            <div
              className="inner-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h1>Trip Duration</h1>
              <div>
                <CalendarComponent
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                />
              </div>
            </div>
            {hotels.length > 0 && (
              <div
                className="inner-container"
                style={{
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <h1>Hotels Nearby</h1>
                {hotels.slice(0, 4).map((hotel) => (
                  <HotelCard
                    key={hotel.hotel_name}
                    hotelName={hotel.hotel_name}
                    address={hotel.address}
                    reviewScore={hotel.review_score}
                    price={hotel.min_total_price}
                    imageURL={hotel.max_photo_url}
                    websiteURL={hotel.urL}
                    zip={hotel.zip}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
