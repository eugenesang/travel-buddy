import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Signup,
  NotFound,
  CreateTrip,
  Profile,
  TripDetails,
  UpdateTrip,
  EditProfile,
  Trip
} from "./pages";

import { Navigation, Footer } from "./components";

import { setUser } from "./store/reducers/userSlice";
import Explore from "./pages/Explore";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component render
  }, []);

  return (
    <div>
      <Navigation />
      <div className="nav-gap" style={{
        height: "75px",
        width: "100%"
      }}></div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {user && (
          <>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile/>} />
            <Route path="/trips" element={<Trip/>} />
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/trips/:id/edit" element={<UpdateTrip />} />
          </>
        )}

        <Route path="/create-trip" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
