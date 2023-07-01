import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav>
      {user ? (
        <>
          <Link to="/trips">Trips</Link>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <p>
          Please <Link to={"/login"}>login</Link> or{" "}
          <Link to={"/signup"}>sign up</Link> to access the application.
        </p>
      )}
    </nav>
  );
};

export default Navigation;
