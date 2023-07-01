import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1>Welcome to TripPlanner</h1>
      {user ? (
        <p>You are logged in. Start planning your trips!</p>
      ) : (
        <p>You are not logged in...</p>
      )}
    </div>
  );
};

export default Home;
