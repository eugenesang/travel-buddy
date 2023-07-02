import { useState } from "react";
import PropType from "prop-types";

const InviteFriendsModal = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the logic to send an email to the entered email address
    // This could involve making an API call or using a service to send the email

    // Reset the form
    setEmail("");

    // Close the modal
    onClose();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />

          <div className="row">
            <button type="submit">Invite friend</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

InviteFriendsModal.propTypes = {
  onClose: PropType.func.isRequired,
};

const InviteFriend = () => {
  const [showModal, setShowModal] = useState(false);

  const handleInviteFriends = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={handleInviteFriends}
        style={{
          display: showModal ? "none" : "block",
        }}
      >
        Invite Friends
      </button>

      {showModal && <InviteFriendsModal onClose={handleCloseModal} />}
    </div>
  );
};

export default InviteFriend;
