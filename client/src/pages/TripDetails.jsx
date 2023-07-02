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

import { fetchImages } from "../services/unsplashApi";

import {
  fetchPlaceLocation,
  fetchTouristPlaces,
  fetchHotels,
} from "../services/rapidApi";

import { getTripById, deleteTrip } from "../services/tripApi";

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripDetails = async () => {
      setIsLoading(true);

      try {
        const trip = await getTripById(id);
        setTrip(trip);

        const [fetchedImages, fetchedTouristPlaces, placeProperty] =
          await Promise.all([
            fetchImages(trip.destination),
            fetchTouristPlaces(trip.destination),
            fetchPlaceLocation(trip.destination),
          ]);

        setImages(fetchedImages);
        setTouristPlaces(fetchedTouristPlaces);

        if (placeProperty && placeProperty.lat && placeProperty.lon) {
          const fetchedHotels = await fetchHotels(
            placeProperty.lat,
            placeProperty.lon
          );
          setHotels(fetchedHotels);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleEdit = () => {
    if (trip.createdBy === user._id) {
      navigate(`/trips/${id}/edit`);
    } else {
      // Display an error message or show a notification that the user does not have permission to edit the trip
    }
  };

  const handleDelete = () => {
    if (trip.createdBy === user._id) {
      deleteTrip(id)
        .then(() => {
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
        <div className="row" style={{ justifyContent: "space-between" }}>
          {/* Left part */}
          <div
            className="inner-container"
            style={{ padding: "2rem", gap: "2rem", minWidth: "60%" }}
          >
            {/* Heading */}
            <div className="row" style={{ width: "100%" }}>
              <div
                className="inner-container"
                style={{ alignItems: "flex-start" }}
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
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Event Details</h1>
              <div className="row" style={{ gap: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {[
                    { label: "Start Date", value: trip.startDate },
                    { label: "End Date", value: trip.endDate },
                    { label: "Created By", value: trip.createdBy },
                    {
                      label: "Invited friends",
                      value: "No of friends invited",
                    },
                    { label: "Total days", value: `${trip.totalDays} Days` },
                    { label: "Cost for each", value: trip.cost },
                  ].map(({ label, value }) => (
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
                      key={label}
                    >
                      <h2>{label}</h2>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tourist Places */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
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

            {/* Image Gallery */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
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
                style={{ alignItems: "flex-start", gap: "1rem" }}
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
