import React, { useState, useEffect, useContext } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../../style/Calendar.css";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";
import { useHistory } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dotDay, set_dotDay] = useState("");
  const [getDotArray, set_getDotArray] = useState([]);
  const user = useContext(AuthContext);
  const db = firebase.firestore().collection("dots");
  const history = useHistory();

  const change_typeJs = [];
  const dotArray = [];
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .get()
        .then((el) => {
          el.docs.map((doc) => {
            const item = doc.data();
            dotArray.push(item);
            const get_dotDay = item.createdAt;
            const convert_date = new Date(get_dotDay.seconds * 1000);
            change_typeJs.push(convert_date);
          });
          set_dotDay(change_typeJs);
          set_getDotArray(dotArray);
        });
    }
  }, [user]);

  const select_date = (date) => {
    const compareDate = getDotArray.forEach((el) => {
      if (el.getDate === new Date(date).toDateString()) {
        history.push(`/dot/${el.dotId}`);
      }
    });
  };

  return (
    <DatePicker
      locale="ja"
      //   selected={startDate}
      // onChange={(date) => setStartDate(date)}
      onChange={select_date}
      highlightDates={dotDay}
      placeholderText="This highlights a week ago and a week from today"
      inline
    />
  );
};

export default Calendar;
