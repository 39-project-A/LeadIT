import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";
import { AuthContext } from "../../../firebase/AuthService";

const BarChart = () => {
  const db = firebase.firestore().collection("dots");
  const [filledWeek, set_filledWeek] = useState([]);
  const [filledWeek2, set_filledWeek2] = useState([]);
  const user = useContext(AuthContext);

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
  // console.log(zeroAdjust());

  let yesterday2 = new Date(
    zeroAdjust().getFullYear(),
    zeroAdjust().getMonth(),
    zeroAdjust().getDate() - 1
  );
  // console.log(yesterday2);
  const yesterday = new Date(yesterday2.setHours(23, 59, 59, 999));
  // console.log(yesterday);

  //前週を指定
  const zeroAdjust2 = () => {
    let agoWeek2 = yesterday2.setDate(yesterday2.getDate() - 6);
    let hope2 = new Date(agoWeek2);
    let zero2 = hope2.setHours(0);
    let one2 = new Date(zero2);
    let two2 = one2.setMinutes(0);
    let three2 = new Date(two2);
    let four2 = three2.setSeconds(0);
    let five2 = new Date(four2);
    return five2;
  };
  // console.log(zeroAdjust2());

  //今日から一週間の日付とラベルを取得
  const init_arrayWeeks = () => {
    const jsWeekAgo = [];
    let today = new Date();
    today.setDate(today.getDate() + 1);
    const infoWeek = [];
    const infoDay = [];
    const subtract = 1;
    const max = 6;
    for (let i = 0; i <= max; i++) {
      today.setDate(today.getDate() - subtract);
      infoWeek[i] = today.getMonth() + 1 + "/" + today.getDate();
      infoDay[i] = today.getDay();
      jsWeekAgo.push({
        label: infoWeek[i],
        jsGetDay: infoDay[i],
        initNum: 0,
      });
    }
    const reversedLabelWeek = infoWeek.reverse();
    const reversedDataWeek = jsWeekAgo.reverse();
    const weeksObj = {
      weekLabel: reversedLabelWeek,
      weekData: reversedDataWeek,
    };
    return weeksObj;
  };

  //前週の日付とラベルを取得
  const init_arrayWeeks2 = () => {
    let today = new Date(zeroAdjust());
    let yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    const jsWeekAgo2 = [];
    // let today = yesterday;
    yesterday.setDate(yesterday.getDate() + 1);
    const infoWeek = [];
    const infoDay = [];
    const subtract = 1;
    const max = 6;
    for (let i = 0; i <= max; i++) {
      yesterday.setDate(yesterday.getDate() - subtract);
      infoWeek[i] = yesterday.getMonth() + 1 + "/" + yesterday.getDate();
      infoDay[i] = yesterday.getDay();
      jsWeekAgo2.push({
        label: infoWeek[i],
        jsGetDay: infoDay[i],
        initNum: 0,
      });
    }
    const reversedLabelWeek = infoWeek.reverse();
    const reversedDataWeek = jsWeekAgo2.reverse();
    const weeksObj = {
      weekLabel: reversedLabelWeek,
      weekData: reversedDataWeek,
    };
    return weeksObj;
  };
  console.log(init_arrayWeeks2());

  //一週間分のdotsをDBから取得
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .where(
          "createdAt",
          ">",
          firebase.firestore.Timestamp.fromDate(zeroAdjust())
        )
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const hope = init_arrayWeeks().weekData;
          snapshot.docs.map((doc) => {
            const item = doc.data();
            const receivedDay = item.getday;
            const hours = item.working;
            for (let i = 0; i < hope.length; i++) {
              if (receivedDay === hope[i].jsGetDay) {
                hope[i].initNum = hours;
              }
            }
          });

          const finalWeek = hope.map((el) => {
            return el.initNum;
          });
          set_filledWeek(finalWeek);
        });
    }
  }, [user]);

  //前週のdotsをDBから取得
  useEffect(() => {
    if (user) {
      //firestoreのDBでも時間が指定できるように変換する
      const startDate = firebase.firestore.Timestamp.fromDate(zeroAdjust2());
      // console.log(startDate);
      const endDate = firebase.firestore.Timestamp.fromDate(yesterday);
      // console.log(endDate);
      db.orderBy("createdAt")
        .where("userId", "==", user.uid)
        // .where(startDate, ">", endDate)
        .startAt(startDate)
        .endBefore(endDate)
        .get()
        .then((snapshot) => {
          const hope2 = init_arrayWeeks2().weekData;
          console.log(hope2);
          snapshot.docs.map((doc) => {
            const item2 = doc.data();
            console.log(item2);
            const receivedDay = item2.getday;
            const hours = item2.working;
            for (let i = 0; i < hope2.length; i++) {
              if (receivedDay === hope2[i].jsGetDay) {
                hope2[i].initNum = hours;
              }
            }
          });
          const finalWeek2 = hope2.map((el) => {
            return el.initNum;
          });
          set_filledWeek2(finalWeek2);
        });
    }
  }, [user]);
  console.log(filledWeek2);

  return (
    <div className="App">
      <div style={{ height: "300px", width: "600px" }}>
        <Line
          data={{
            labels: init_arrayWeeks().weekLabel,
            datasets: [
              {
                label: " # Your trajectory",
                data: filledWeek,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    // maxTicksLimit: 3,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 8,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
