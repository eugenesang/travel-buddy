import { FaMap, FaUsers, FaMoneyBillAlt } from "react-icons/fa";

const iconStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "50%",
  color: "#176b87",
};

const features = [
  {
    id: 1,
    title: "Explore Destinations",
    description: "Discover amazing travel destinations around the world.",
    icon: (
      <div style={iconStyles}>
        <FaMap />
      </div>
    ),
  },
  {
    id: 2,
    title: "Collaborate with Friends",
    description:
      "Invite friends and collaborate together in planning your trips.",
    icon: (
      <div style={iconStyles}>
        <FaUsers />
      </div>
    ),
  },
  {
    id: 3,
    title: "Budget Management",
    description: "Track and manage your trip expenses efficiently.",
    icon: (
      <div style={iconStyles}>
        <FaMoneyBillAlt />
      </div>
    ),
  },
];

export default features;
