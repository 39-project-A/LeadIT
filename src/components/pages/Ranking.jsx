import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Ranking.css";
import firebase from "../../firebase/firebase";
import Header from "../templates/Header/Header";
import RankProfile from "../templates/icons/components/RankProfile";
import Footer from "../templates/Footer/Footer";

export default function Ranking() {
  const db = firebase.firestore().collection("dots");
  const [oneRank, setOneRank] = useState("");
  const [oneHours, setOneHours] = useState("");
  const [twoRank, setTwoRank] = useState("");
  const [twoHours, setTwoHours] = useState("");
  const [threeRank, setThreeRank] = useState("");
  const [threeHours, setThreeHours] = useState("");

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

  const hoge = [];
  useEffect(() => {
    db.where(
      "createdAt",
      ">",
      firebase.firestore.Timestamp.fromDate(zeroAdjust())
    )
      .get()
      .then((data) => {
        data.docs.map((doc) => {
          const item = doc.data();
          hoge.push(item);
        });
        const group = hoge.reduce((result, current) => {
          const element = result.find((p) => p.userId === current.userId);
          if (element) {
            element.working += current.working;
          } else {
            result.push({
              userName: current.userName,
              userId: current.userId,
              working: current.working,
            });
          }
          return result;
        }, []);
        group.sort(function (a, b) {
          if (a.working < b.working) return 1;
          if (a.working > b.working) return -1;
          return 0;
        });
        if (group.length >= 1) {
          const oneRank = group[0].userName;
          setOneRank(oneRank);
          const oneHours = group[0].working;
          setOneHours(oneHours);
        }
        if (group.length >= 2) {
          const twoRank = group[1].userName;
          setTwoRank(twoRank);
          const twoHours = group[1].working;
          setTwoHours(twoHours);
        }
        if (group.length >= 3) {
          const threeRank = group[2].userName;
          setThreeRank(threeRank);
          const threeHours = group[2].working;
          setThreeHours(threeHours);
        }
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <p className="rank_title">🏆 Weekly Ranking</p>{" "}
      <>
        <div id="podium-box" className="row" style={{ height: "600px" }}>
          <div className="col-md-4 step-container m-0 p-0">
            <div>
              <p className="two_username">
                🥈{twoRank} / {twoHours} hours
              </p>{" "}
              <RankProfile twoRank={twoRank} />
            </div>
            <div
              id="second-step"
              className="bg-blue step centerBoth podium-number"
            >
              2
            </div>
          </div>
          <div className="col-md-4 step-container m-0 p-0">
            <div>
              <p className="one_username">
                🥇{oneRank} / {oneHours} hours
              </p>{" "}
              <RankProfile oneRank={oneRank} />{" "}
            </div>
            <div
              id="first-step"
              className="bg-blue step centerBoth podium-number"
            >
              1
            </div>
          </div>
          <div className="col-md-4 step-container m-0 p-0">
            <div>
              {" "}
              <p className="three_username">
                🥉{threeRank} / {threeHours} hours
              </p>{" "}
              <RankProfile threeRank={threeRank} />
            </div>
            <div
              id="third-step"
              className="bg-blue step centerBoth podium-number"
            >
              3
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
}
