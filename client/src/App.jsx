import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Navigation, Footer } from "./components";

import { setUser } from "./store/reducers/userSlice";

const App = () => {
  const dispatch = useDispatch();

  // Check if user state exists in local storage and set it in Redux store
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    dispatch(setUser(storedUser));
  }

  const user = useSelector((state) => state.user.user);

  // Custom scroll behavior to maintain scroll position
  const scrollBehavior = () => {
    const scrollY = window.scrollY;
    return window.scrollTo({ top: scrollY, behavior: "auto" });
  };

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    scrollBehavior();

    console.log("App.jsx: user", user);
  });

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
