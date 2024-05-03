import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux"
import { setUser } from "../store/reducers/userSlice";
import {useState} from "react";
import { Link } from "react-router-dom";

const ExploreCard = ({title, description, location, img, _id}) => {
    
    const dispatch = useDispatch();
    
    const userData = useSelector((state) => state.user);

    const { user } = userData;

    

    const [isLiked, setIsLiked] = useState(user?.likedDestinations?.includes(_id));

    const like = async ()=>{
        setIsLiked(!isLiked);
        const res = await fetch(`http://localhost:5000/api/destination/like?destination=${_id}&user=${user._id}`);
        const data = await res.json()
        console.log(data.user);
        dispatch(setUser(data.user));
    }


    return ( 
    <article className="explore-card">
        <div className="action-section">
            <button onClick={like}>
                <i className={`fas fa-heart ${isLiked ? "liked" : "not-liked"}`}></i>
            </button>
        </div>
        <div className="img-container">
            <img src={img} alt={title} />
        </div>
        <div className="explore-card-content">
            <div className="location">
                <i className="fas fa-location-dot"></i>
                <span>{location}</span>
            </div>
            <div className="message">
                <p className="title">{title}</p>
                <p className="desc">{description}</p>
            </div>
        </div>
        <div className="link">
            <Link to={`/create-trip?destination=${_id}`} className="button">Create Trip</Link>
        </div>
    </article> );
}

ExploreCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    img: PropTypes.string,
    _id: PropTypes.string
}

export default ExploreCard;