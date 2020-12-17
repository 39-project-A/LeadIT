import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dotDay, setDotDay] = useState("");
  const [getDotArray, setGetDotArray] = useState([]);
  const [dot, set_dot] = useState();
  const user = useContext(AuthContext);
  const db = firebase.firestore().collection("dots");
  const dots = useSelector((state) => state.dots);
  const history = useHistory();
  const { id } = useParams();

  const array = [];
  const dotArray = [];
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .get()
        .then((el) => {
          el.docs.map((doc) => {
            const item = doc.data();
            dotArray.push(item);
            const getDotDay = item.createdAt;
            const convertDate = new Date(getDotDay.seconds * 1000);
            array.push(convertDate);
            const getDayString = convertDate.toDateString();
          });
          setDotDay(array);
          setGetDotArray(dotArray);
        });
    }
  }, [user]);

  // console.log(getDotArray);

  const onEdit_click = () => {
    history.push(`/dot/${dot.dotId}/edit`);
  };

  const convert_dotArray = [];
  const catch_myDot = dots.filter((dot) => {
    if (dot.userId === user.uid) {
      convert_dotArray.push(dot);
    }
  });
  // console.log(convert_dotArray);

  const catch_evertDot = convert_dotArray.map((el) => {
    return el.dotId;
  });
  console.log(catch_evertDot);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("dots")
  //     .get()
  //     .then((data) => {
  //       const dots = data.docs.map((doc) => {
  //         return doc.data();
  //       });
  //       set_dot(dots.find((dot) => dot.dotId === id));
  //     });
  // }, []);

  // const hoge = [];
  // const catchMyDot = dots.filter((dot) => {
  //   if (dot.userId === user.uid) {
  //     //   new Date(dot.createdAt).toDateString();
  //     hoge.push(dot);
  //   }
  // });
  // console.log(hoge);

  const select_date = (date) => {
    const compareDate = getDotArray.forEach((el) => {
      if (el.getDate === new Date(date).toDateString()) {
        history.push(`/dot/${el.dotId}`);
      }
    });
  };
  // const select = (date) => {
  // console.log(getDotArray);
  // dotDay.map((el) => {
  // if (el.toDateString() === new Date(date).toDateString()) {
  //   setStartDate(date);
  // }
  // });
  // console.log(new Date(date).toDateString());
  // };
  // console.log(startDate);
  return (
    <DatePicker
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
