import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CalendarComponent,
  TouristLocationCard,
  ImageCarousel,
  InviteFriend,
} from "../components";

import { fetchImages } from "../services/unsplashApi";

import {
  fetchPlaceLocation,
  fetchTouristPlaces,
} from "../services/rapidApi";

import { getTripById, deleteTrip } from "../services/tripApi";

function editUrl(img){
  const pieces = img.split("/");

  let imgData = pieces.pop();

  let [a, b] = imgData.split('px');

  a=300;

  imgData = [a,b].join('px');
  return [...pieces, imgData].join("/");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(user);

  useEffect(()=>{
    (async ()=>{
      const fetchedTouristPlaces = await fetchTouristPlaces(trip.destination);

      setTouristPlaces(fetchedTouristPlaces);
      console.log(fetchedTouristPlaces);
    })()
  }, [trip])

  useEffect(() => {
    const fetchTripDetails = async () => {
      setIsLoading(true);

      try {
        const trip = await getTripById(id);
        setTrip(trip);

        const [fetchedImages, fetchedTouristPlaces] =
          await Promise.all([
            fetchImages(trip.destination),
            fetchTouristPlaces(trip.destination),
            fetchPlaceLocation(trip.destination),
          ]);

        setImages(fetchedImages);
        setTouristPlaces(fetchedTouristPlaces);

        

        
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleEdit = () => {
    if (trip?.createdBy === user?._id) {
      navigate(`/trips/${id}/edit`);
    } else {
      // Display an error message or show a notification that the user does not have permission to edit the trip
    }
  };

  const handleDelete = () => {
    if (trip?.createdBy === user?._id) {
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
      {isLoading && (
        <div className="container">Loading...</div>
      ) } 
      {trip?._id && (
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
                <h1>{trip?.name}</h1>
                <p>{trip?.description}</p>
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
                    { label: "Start Date", value: formatDate(trip?.startDate) },
                    { label: "End Date", value: formatDate(trip?.endDate) },
                    { label: "Created By", value: user.name },
                    {
                      label: "Invited friends",
                      value: trip?.invitations?.length || 0,
                    },
                    { label: "Total days", value: `${trip?.totalDays} Days` },
                    { label: "Cost for each", value: `Ksh. ${trip?.cost}` },
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
              <h1>More info from the internet</h1>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {touristPlaces && touristPlaces.map((location) => {
                  console.log(location);
                  return (
                    <TouristLocationCard
                      key={location?.id}
                      image={editUrl(location?.thumbnail.url)}
                      description={location?.description}
                      excerpt={location?.excerpt}
                      location={`${trip.destination}, Kenya`}
                      name={location?.title}
                    />
                  )
                })}
              </div>
            </div>

            {/* Image Gallery */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Gallery</h1>
              {images?.length > 0 && <ImageCarousel images={images} />}
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
                  startDate={new Date(trip.startDate)}
                  endDate={new Date(trip.endDate)}
                  
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
