import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import Header from "../templates/Header/Header";
import RankProfile from "../templates/icons/components/RankProfile";

const Ranking = () => {
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
        const oneRank = group[0].userName;
        setOneRank(oneRank);
        const oneHours = group[0].working;
        setOneHours(oneHours);
        const twoRank = group[1].userName;
        setTwoRank(twoRank);
        const twoHours = group[1].working;
        setTwoHours(twoHours);
        const threeRank = group[2].userName;
        setThreeRank(threeRank);
        const threeHours = group[2].working;
        setThreeHours(threeHours);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h1 style={{ marginTop: "50px" }}>Ranking 👑</h1>
      <p style={{ marginTop: "100px", fontSize: "30px" }}>
        <RankProfile oneRank={oneRank} />
        <RankProfile twoRank={twoRank} />
        <RankProfile threeRank={threeRank} />
        🥇1st: {oneRank}さん {oneHours}hours
        <br />
        🥈2st: {twoRank}さん {twoHours}hours
        <br />
        🥉3st: {threeRank}さん {threeHours}hours
      </p>
    </div>
  );
};

export default Ranking;
