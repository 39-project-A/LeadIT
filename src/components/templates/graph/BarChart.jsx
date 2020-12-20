import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";
import { AuthContext } from "../../../firebase/AuthService";

const BarChart = () => {
  const db = firebase.firestore().collection("dots");
  const [filledWeek, set_filledWeek] = useState([]);
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
