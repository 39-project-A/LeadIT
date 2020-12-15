import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      //   onChange={(date) => setStartDate(date)}
      //   onChange={display}
      onChange={(date) => setStartDate(date)}
      //   highlightDates={[yesterday]}
      placeholderText="This highlights a week ago and a week from today"
      inline
    />
  );
};

export default Calendar;
