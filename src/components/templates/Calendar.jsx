import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";
import { useSelector } from "react-redux";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dotDay, setDotDay] = useState("");
  const [getDotArray, setGetDotArray] = useState([]);
  const user = useContext(AuthContext);
  const db = firebase.firestore().collection("dots");
  const dots = useSelector((state) => state.dots);
  //   console.log(dots);

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
          //   console.log(dotArray);
          //   const getConvertDot = dotArray.reduce((pre, current) => {
          //   const element = pre.find((p) => p)
          //   } )
        });
    }
  }, [user]);

  const hoge = [];
  const catchMyDot = dots.filter((dot) => {
    if (dot.userId === user.uid) {
      //   new Date(dot.createdAt).toDateString();
      hoge.push(dot);
    }
  });
  console.log(hoge);

  const hoge2 = [];
  //   const changedDate = hoge.map((el) => )

  //   const select = (date) => {
  //     hoge.filter((el) => {
  //       if (
  //         new Date(el.createdAt).toDateString() === new Date(date).toDateString()
  //       ) {
  //         console.log(el);
  //         return el;
  //         // setStartDate(el);
  //       }
  //     });
  //   };
  //   console.log(select());

  const select = (date) => {
    // console.log(getDotArray);
    dotDay.map((el) => {
      if (el.toDateString() === new Date(date).toDateString()) {
        setStartDate(date);
      }
    });
    // console.log(new Date(date).toDateString());
  };
  console.log(startDate);
  return (
    <DatePicker
      //   selected={startDate}
      //   onChange={(date) => setStartDate(date)}
      //   onChange={select}
      highlightDates={dotDay}
      placeholderText="This highlights a week ago and a week from today"
      inline
    />
  );
};

export default Calendar;
