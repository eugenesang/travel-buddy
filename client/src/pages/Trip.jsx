import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import  { getUserTrips } from "../services/tripApi"
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const TripCard = ({name, destination, cost, startDate, totalDays, _id}) =>{
    return (
        <article className='trip-card' >
            <h3>{name}</h3>
            <h5><i className="fas fa-location-dot"></i> {destination}</h5>
            <div className='other-details'>
                <span className="info">
                    <i className="fas fa-money-bill"></i> {cost}
                </span>
                <span className="info">
                    <i className="fas fa-calender"></i> {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className='info'>
                    {totalDays} days
                </span>
            </div>
            <div className='btn-container'>
                <Link to={`/trips/${_id}`} className='button'>View</Link>
            </div>
        </article>
    )
}

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
            {data && data.map(({name, destination, cost, startDate, totalDays, _id})=>{
                return <TripCard name={name} destination={destination} cost={cost} startDate={startDate} totalDays={totalDays} key={_id} _id={_id} />
            })}
        </section>
     );
}
 
export default Trip;