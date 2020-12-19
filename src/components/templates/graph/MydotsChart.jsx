import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";
import { AuthContext } from "../../../firebase/AuthService";

const MydotsChart = () => {
  const db = firebase.firestore().collection("dots");
  const [filledWeek, set_filledWeek] = useState([]);
  const [filledWeek2, set_filledWeek2] = useState([]);
  const [oneWeekHours, setOneWeekHours] = useState("");
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

  let yesterday2 = new Date(
    zeroAdjust().getFullYear(),
    zeroAdjust().getMonth(),
    zeroAdjust().getDate() - 1
  );
  const yesterday = new Date(yesterday2.setHours(23, 59, 59, 999));

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

  const array = [];
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
            array.push(item);
            const receivedDay = item.getday;
            const hours = item.working;
            for (let i = 0; i < hope.length; i++) {
              if (receivedDay === hope[i].jsGetDay) {
                hope[i].initNum = hours;
              }
            }
          });
          const totalWeekHours = array.reduce((result, current) => {
            return result + current.working;
          }, 0);

          const finalWeek = hope.map((el) => {
            return el.initNum;
          });
          setOneWeekHours(totalWeekHours);
          set_filledWeek(finalWeek);
        });
    }
  }, [user]);
  // console.log(oneWeekHours);

  //前週のdotsをDBから取得
  useEffect(() => {
    if (user) {
      //firestoreのDBでも時間が指定できるように変換する
      const startDate = firebase.firestore.Timestamp.fromDate(zeroAdjust2());
      const endDate = firebase.firestore.Timestamp.fromDate(yesterday);
      db.orderBy("createdAt")
        .where("userId", "==", user.uid)
        .startAt(startDate)
        .endBefore(endDate)
        .get()
        .then((snapshot) => {
          const hope2 = init_arrayWeeks2().weekData;
          snapshot.docs.map((doc) => {
            const item2 = doc.data();
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
  // console.log(filledWeek2);

  return (
    <div className="App">
      <div style={{ height: "300px", width: "500px", marginTop: "50px" }}>
        <Line
          data={{
            labels: init_arrayWeeks().weekLabel,
            // labels: init_arrayWeeks2().weekLabel,
            datasets: [
              {
                label: " #今週の学習状況 ",
                // pointStyle: oneWeekHours,
                data: filledWeek,
                backgroundColor: [
                  "rgba(28, 169, 212, 0.5)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "#63ffea",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
              },
              {
                label: " # 前週の学習状況",
                data: filledWeek2,
                // fill: false,
                backgroundColor: [
                  "rgba(112, 255, 99, 0.3)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "#9c5363",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 0.1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 15,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 8,
                    fontSize: 15,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "(hour)",
                    fontSize: 20,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MydotsChart;
