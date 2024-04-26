import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTrip } from "../services/tripApi";

function isEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const TripForm = () => {
  const userData = useSelector((state) => state.user);
  const { user } = userData;

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

  const [emailMessage, setEmailMessage] = useState(null);

  const [invitationEmails, setInvitationEmails] = useState([""]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const addEmail = (email)=>{
    const isValid = isEmail(email);

    if(!isValid){
      setEmailMessage("Invalid email");
      return;
    }else{
      setEmailMessage("Add more emails")
    }
    const emails = new Set([...invitationEmails, email]);

    setInvitationEmails([...emails]);
  }

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

    navigate("/trips");

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

 // console.trace(tripData);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "70%",
        gap: "1rem",
        maxWidth: "500px"
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
          placeholder="Enter cost estimate in Ksh."
          step={100}
          min={100}
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
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            <div className="row" style={{justifyContent: "flex-start"}}>
            <input
                  type="email"
                  placeholder={`Add email address`}
                  value={currentEmail}
                  onChange={(e) =>
                    setCurrentEmail(e.target.value)
                  }
                />
                <button
                  type="button"
                  className="remove-email-button"
                  onClick={() => {
                    addEmail(currentEmail);
                    console.log(invitationEmails);
                    setCurrentEmail("");
                  }}
                >
                  ADD
                </button>
            </div>
            <p>{emailMessage && emailMessage}</p>
            {invitationEmails.map((email, index) =>(
              <>
              {email && (<div
                key={email}
                className="row"
                style={{
                  width: "100%",
                }}
              >
                <span>{email}</span> <button type="button" onClick={()=>handleRemoveEmail(index)}><i className="fas fa-xmark"></i></button>
              </div>)}
              </>
            ))}
          </div>
        </div>
        <p
          onClick={handleAddMore}
          style={{
            cursor: "pointer",
          }}
        >
        </p>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
};

export default TripForm;
