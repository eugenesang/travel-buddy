import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../store/reducers/userSlice";
import { loginUser } from "../services/userApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await loginUser(formData);
      dispatch(setUser(user));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container login-container" style={{ padding: "5rem" }}>
      <div className="top-section">

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <form onSubmit={handleLogin}>
          <fieldset>
            <legend><h1>Login</h1></legend>
            <div className="form-elements">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInput}
              />

              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInput}
              />

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </fieldset>

        </form>
      </div>
      <div className="foot-section">
        <span>Don&rsquo;t have an account? </span>
        <Link to={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
