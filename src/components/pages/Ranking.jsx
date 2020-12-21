import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import Header from "../templates/Header/Header";
import RankProfile from "../templates/icons/components/RankProfile";
import {
  Container,
  Rank_title,
  Count_Hours,
  UserList_one,
  UserList_two,
  UserList_three,
} from "../../style/StyledRank";

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
    // <div style={{ textAlign: "center" }}>
    <div>
      <Header />
      <Container>
        <Rank_title>🏆 Weekly Ranking</Rank_title>
        <Count_Hours>
          {oneRank && oneHours && (
            <UserList_one>
              {" "}
              🥇 <RankProfile oneRank={oneRank} /> {oneRank} / {oneHours}hours
            </UserList_one>
          )}
          {twoRank && twoHours && (
            <UserList_two>
              🥈 <RankProfile twoRank={twoRank} /> {twoRank} / {twoHours}hours
            </UserList_two>
          )}
          {threeRank && threeHours && (
            <UserList_three>
              🥉 <RankProfile threeRank={threeRank} /> {threeRank} /{" "}
              {threeHours}
              hours
            </UserList_three>
          )}
        </Count_Hours>
      </Container>
    </div>
  );
};

export default Ranking;
