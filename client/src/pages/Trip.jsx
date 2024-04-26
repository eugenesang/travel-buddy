import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getUserTrips } from "../services/tripApi";

const Card = ({ trip }) => {
    const { name, destination, tripDays, cost, image, location, totalDays, _id } =
        trip;
    const imgUrl = image
        ? image
        : `https://source.unsplash.com/random/800x600?tourist place of${location || destination
        }`;

    return (
        <div className="home-trip-card">
            <div className="img-container">
                <img src={imgUrl} alt={name} />
            </div>
            <div className="content-container">
                <div className="location">
                    <i className="fas fa-location-dot"></i>
                    <span className="destination-name">{destination || location}</span>
                </div>
                <h2 >{name}</h2>
                <p>
                    {tripDays || totalDays} days | Ksh {cost}
                </p>
            </div>
            <div className='btn-container'>
                <a href={`/trips/${_id}`} className="button">view</a>
            </div>
        </div>
    );
};

Card.propTypes = {
    trip: PropTypes.shape({
        name: PropTypes.string.isRequired,
        destination: PropTypes.string,
        tripDays: PropTypes.number,
        cost: PropTypes.number.isRequired,
        image: PropTypes.string,
        location: PropTypes.string,
        totalDays: PropTypes.number,
        _id: PropTypes.string
    }),
};

const Trip = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);

            try {
                const trips = (await getUserTrips(user._id))

                setData(trips);
                console.log(trips);

            } catch (error) {
                setError(true);
                console.error("Error fetching trip details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [user._id]);

    return (
        <section id="trip" className='container'>
            {loading && <h3>Loading ...</h3>}
            {error && <h3>An error occurred, Try again later</h3>}
            {data && (
                <div className="trips-container">
                    {data.map((trip) => {
                        return <Card trip={trip} key={trip._id} />
                    })}
                </div>
            )}
        </section>
    );
}

export default Trip;