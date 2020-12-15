import React, { useState, useEffect, useContext } from "react";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import BarChart from "../templates/graph/BarChart";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import OurSideBar from "../templates/OurSideBar";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";

const useStyles = makeStyles({
  container: {
    width: "400px",
    margin: "0 auto",
  },
  input: {
    width: "343px",
  },
  div: {
    height: "40px",
  },
  text: {
    width: "400px",
  },
});

const MainStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const MyDots = () => {
  const [oneWeek, setOneWeek] = useState("");
  const [total, setTotal] = useState("");
  const db = firebase.firestore().collection("dots");
  const user = useContext(AuthContext);
  const classes = useStyles();

  // 今日から一週間前の指定
  const zeroAdjust = () => {
    let agoDate = new Date();
    let agoWeek = agoDate.setDate(agoDate.getDate() - 6);
    let hope = new Date(agoWeek);
    let zero = hope.setHours(0);
    let one = new Date(zero);
    let two = one.setMinutes(0);
    let three = new Date(two);
    let four = three.setSeconds(0);
    let five = new Date(four);
    return five;
  };

  //一週間文の勉強時間を取得し合計する
  const array = [];
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .where(
          "createdAt",
          ">",
          firebase.firestore.Timestamp.fromDate(zeroAdjust())
        )
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            array.push(item);
          });
          console.log(array);
          const totalWeekHours = array.reduce((result, current) => {
            return result + current.working;
          }, 0);
          console.log(totalWeekHours);
          setOneWeek(totalWeekHours);
        });
    }
  }, [user]);
  //総学習時間を取得
  const array2 = [];
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            array.push(item);
          });
          console.log(array);
          const totalHours = array.reduce((result, current) => {
            return result + current.working;
          }, 0);
          // console.log(totalHours);
          setTotal(totalHours);
        });
    }
  }, [user]);

  return (
    <React.Fragment>
      <Header />
      <from className="MainFrom" style={MainStyle}>
        <div>
          <OurSideBar />
        </div>
        <div className="Our-list">
          <BarChart />
          <TextField
            id="outlined-multiline-static"
            className={classes.text}
            multiline
            rows={6}
            variant="outlined"
          />
          <div className={classes.div}> </div>
        </div>
        <div>
          <ul>
            <p>今週の学習時間　{oneWeek} hours</p>
            <li>データ1 </li>
            <li>データ2</li>
            <li>データ3</li>
            <li>データ4</li>
          </ul>
        </div>
        <div>
          <ul>
            <p>総学習時間　{total} hours</p>
            <li>データ1 </li>
            <li>データ2</li>
            <li>データ3</li>
            <li>データ4</li>
          </ul>
        </div>
      </from>
      <Footer />
    </React.Fragment>
  );
};
export default MyDots;
