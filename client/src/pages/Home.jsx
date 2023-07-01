import { useSelector } from "react-redux";

import { Header } from "../components";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="container">
      <Header username={user ? user.name : ""} />
    </div>
  );
};

export default Home;
