import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTrip } from "../services/tripApi";

const TripForm = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    name: "",
    cost: 0,
    createdBy: user._id,
    invitations: [],
  });

  const [invitationEmails, setInvitationEmails] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvitationChange = (index, value) => {
    const updatedEmails = [...invitationEmails];
    updatedEmails[index] = value;
    setInvitationEmails(updatedEmails);
  };

  const handleAddMore = () => {
    setInvitationEmails([...invitationEmails, ""]);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = invitationEmails.filter((_, i) => i !== index);
    setInvitationEmails(updatedEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Update trip data with invitation emails
    const updatedTripData = {
      ...tripData,
      invitations: invitationEmails.filter((email) => email.trim() !== ""),
    };

    // Send trip data to the server
    await createTrip(updatedTripData);

    setIsLoading(false);

    navigate("/");

    // Clear form fields after submitting
    setTripData({
      destination: "",
      startDate: "",
      endDate: "",
      description: "",
      name: "",
      cost: 0,
      createdBy: user._id,
      invitations: [],
    });

    setInvitationEmails([""]);
  };

  console.log("TripForm.jsx: tripData", tripData);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "70%",
        gap: "1rem",
      }}
    >
      <div
        className="row"
        style={{
          width: "100%",
        }}
      >
        <div
          className="inner-container"
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="name">Trip Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={tripData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div
          className="inner-container"
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={tripData.destination}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div
        className="row"
        style={{
          width: "100%",
        }}
      >
        <div
          className="inner-container"
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={tripData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div
          className="inner-container"
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={tripData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <label htmlFor="cost">Estimated cost per person:</label>
        <input
          id="cost"
          name="cost"
          type="number" // Added 'type' attribute to ensure the input accepts numbers
          value={tripData.cost}
          onChange={handleInputChange}
          required
          placeholder="Enter in dollar currency..."
        />
      </div>

      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={tripData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <label htmlFor="invitationEmails">Invitations:</label>
        <div
          className="row"
          style={{
            width: "100%",
          }}
        >
          <div
            className="inner-container"
            style={{
              width: "100%",
            }}
          >
            {invitationEmails.map((email, index) => (
              <div
                key={email}
                className="row"
                style={{
                  width: "100%",
                }}
              >
                <input
                  type="email"
                  id={`invitationEmail${index}`}
                  name={`invitationEmail${index}`}
                  placeholder={`Enter email address ${index + 1}`}
                  value={email}
                  onChange={(e) =>
                    handleInvitationChange(index, e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="remove-email-button"
                  onClick={() => handleRemoveEmail(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <p
          onClick={handleAddMore}
          style={{
            cursor: "pointer",
          }}
        >
          Add more emails...
        </p>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
};

export default TripForm;
