import { TripForm } from "../components";

const CreateTrip = () => {
  return (
    <div
      className="container"
      style={{
        padding: "3rem 0",
        gap: "2rem"
      }}
    >
      <div className="inner-container" style={{
        textAlign: "center", marginBottom: "16px"
      }}>
        <h1>Create a New Trip</h1>
        <p>Plan your next adventure with our trip creation tool.</p>
      </div>
      <TripForm />
    </div>
  );
};

export default CreateTrip;
