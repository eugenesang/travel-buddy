import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../store/reducers/userSlice";
import { updateUser } from "../services/userApi";

const Loader = () => {
    return (
        <div className="cover">
            <div className='loader'>
                <div className="bg"></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
        </div>
    )
};

const EditProfile = () => {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);

    const { user } = userData;

    const [name, setName] = useState(user.name);

    const [city, setCity] = useState(user?.location?.city || "");
    const [country, setCountry] = useState(user?.location?.country || "");

    const [about, setAbout] = useState(user.about);

    const [locationLoad, setLocationLoad] = useState(false);
    const [locationError, setLocationError] = useState(false);

    const [nameLoad, setNameLoad] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [aboutLoad, setAboutLoad] = useState(false);
    const [aboutError, setAboutError] = useState(false);

    const handleNameUpdate = async (e) => {
        e.preventDefault();
        setNameLoad(true);
        try {

            const account = await updateUser.name(name, user._id);
            setNameError(false);
            dispatch(setUser(account));
        } catch (error) {
            setNameError(true);
        } finally {
            setNameLoad(false)
        }
    }

    const handleLocationUpdate = async e =>{
        e.preventDefault();

        setLocationLoad(true);
        try {
            const account = await updateUser.location(city, country, user._id);
            setLocationError(false);
            dispatch(setUser(account))
        } catch (error) {
            setLocationError(true);
        } finally {
            setLocationLoad(false);
        }
    }

    const handleAboutChange = async e =>{
        e.preventDefault();
        setAboutLoad(true);
        try {
            const account = await updateUser.about(about, user._id);
            setAboutError(false);
            dispatch(setUser(account));
        } catch (error) {
            setAboutError(true);
        } finally {
            setAboutLoad(false)
        }
    }

    return (
        <section id="edit-profile">
            <form onSubmit={handleNameUpdate} className="change-name">
                <fieldset>
                    <legend><label htmlFor="change-name">Name</label></legend>
                    <div>

                        <input type="text" name="name" id="change-name" value={name} onChange={e => setName(e.target.value)} />
                        <button>Update</button>
                    </div>
                    {nameLoad && <Loader />}
                    {nameError && <p className="error-msg">An error occurred, name update failed</p>}
                </fieldset>
            </form>
            <form onSubmit={handleLocationUpdate} className="change-location">
                <fieldset>
                    <legend>Location</legend>
                    <div>
                        <div className="location-container">
                            <label htmlFor="change-city">City</label>
                            <input type="text" name="change-city" id="change-city" value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                        <div className="location-container">
                            <label htmlFor="change-country">Country</label>
                            <input type="text" name="change-country" id="change-country" value={country} onChange={e => setCountry(e.target.value)} />
                        </div>
                        <div>
                            <button>Update</button>
                        </div>
                    </div>
                    {locationLoad && <Loader />}
                    {locationError && <p className="error-msg">An error occurred, location update failed</p>}
                </fieldset>

            </form>
            <form onSubmit={handleAboutChange} className="change-about">
                <fieldset>
                    <legend><label htmlFor="about-textarea">About you</label></legend>
                    <div className="about-container">
                        <textarea name="about-textarea" id="about-text-aea" cols="30" rows="10" value={about} onChange={e => setAbout(e.target.value)}></textarea>
                        <button>Update</button>
                    </div>
                    {aboutLoad && <Loader />}
                    {aboutError && <p className="error-msg">An error occurred, failed to update about.</p>}
                </fieldset>

            </form>
        </section>
    );
}

export default EditProfile;