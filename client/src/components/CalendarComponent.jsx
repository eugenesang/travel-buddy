import { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ startDate, endDate }) => {
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);

  console.log("startDate:", formattedStartDate, "endDate:", formattedEndDate);

  const formatDate = (date) => {
    // Perform your desired formatting here
    return date.toLocaleDateString();
  };

  const handleDateChange = (date) => {
    if (!startDate) {
      setFormattedStartDate(formatDate(date));
    } else if (!endDate) {
      setFormattedEndDate(formatDate(date));
    }
  };

  return (
    <div>
      <Calendar value={startDate || endDate} onChange={handleDateChange} className={"calender"} />
    </div>
  );
};

CalendarComponent.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default CalendarComponent;
