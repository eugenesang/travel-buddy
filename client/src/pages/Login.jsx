import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../store/reducers/userSlice";
import { loginUser } from "../services/userApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form data on input change
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await loginUser(formData); // Make API request to login user
      dispatch(setUser(user));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/"); // Redirect to home page
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      {/* Display loading message when logging in */}
      {isLoading && <p>Loading...</p>}

      {/* Display error message if login fails */}
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleLogin}>
        {/* Email input */}
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleInput}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleInput}
        />

        {/* Submit button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link to={"/signup"}>Signup</Link>
    </div>
  );
};

export default Login;
