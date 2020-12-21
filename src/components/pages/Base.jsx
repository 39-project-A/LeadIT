import React, { useEffect, useContext, useState } from "react";
import Header from "../templates/Header/Header";
import Footer from "../templates/Footer/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthService";
import { fetch_dots } from "../../reducks/dots/action";
import { fetch_todayDotLength } from "../../reducks/star/action";
import firebase from "../../firebase/firebase";
import MydotsChart from "../templates/graph/MydotsChart";
import UserIcon from "../templates/icons/user/user";
import OurSideBar from "../templates/OurSideBar";
import Calendar from "../templates/Calendar";
import MiniDots from "../templates/MiniDots";
import MiniForm from "../templates/MiniForm";
import {
  LeftItem,
  Profile,
  WeekStudyHours,
  StudyHours,
  StyledCalendar,
  ExplainCa,
  StyledChart,
  StyledForm,
  StyledDots,
} from "../../style/BaseStyle";

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

export default function Base() {
  const dispatch = useDispatch();
  const user = useContext(AuthContext);
  const classes = useStyles();
  const [week_hours, setWeek_hours] = useState("");
  const [lastweek_hours, setLastweek_hours] = useState("");
  const [total_hours, setTotal_hours] = useState("");
  const db = firebase.firestore().collection("dots");

  // 今日から一週間前の指定
  const specify_weekago = () => {
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

  let weekago_yesterday = new Date(
    specify_weekago().getFullYear(),
    specify_weekago().getMonth(),
    specify_weekago().getDate() - 1
  );

  const just_weekago = new Date(weekago_yesterday.setHours(23, 59, 59, 999));

  //前週を指定
  const specify_lastweek = () => {
    let agoWeek2 = weekago_yesterday.setDate(weekago_yesterday.getDate() - 6);
    let hope2 = new Date(agoWeek2);
    let zero2 = hope2.setHours(0);
    let one2 = new Date(zero2);
    let two2 = one2.setMinutes(0);
    let three2 = new Date(two2);
    let four2 = three2.setSeconds(0);
    let five2 = new Date(four2);
    return five2;
  };

  //一週間文のdotsを取得し勉強時間を合計する
  useEffect(() => {
    if (user) {
      const week_array = [];
      db.where("userId", "==", user.uid)
        .where(
          "createdAt",
          ">",
          firebase.firestore.Timestamp.fromDate(specify_weekago())
        )
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            week_array.push(item);
          });
          const totalWeekHours = week_array.reduce((result, current) => {
            return result + current.working;
          }, 0);
          setWeek_hours(totalWeekHours);
        });
    }
  }, [user]);

  //前週のdotsをDBから取得
  useEffect(() => {
    const lastweek_array = [];
    if (user) {
      //firestoreのDBでも時間が指定できるように変換する
      const startDate = firebase.firestore.Timestamp.fromDate(
        specify_lastweek()
      );
      const endDate = firebase.firestore.Timestamp.fromDate(just_weekago);
      db.orderBy("createdAt")
        .where("userId", "==", user.uid)
        .startAt(startDate)
        .endBefore(endDate)
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            lastweek_array.push(item);
          });
          const total_lastweekHours = lastweek_array.reduce(
            (result, current) => {
              return result + current.working;
            },
            0
          );
          setLastweek_hours(total_lastweekHours);
        });
    }
  }, [user]);

  //総学習時間を取得
  useEffect(() => {
    const total_array = [];
    if (user) {
      db.where("userId", "==", user.uid)
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            total_array.push(item);
          });
          const total_hours = total_array.reduce((result, current) => {
            return result + current.working;
          }, 0);
          setTotal_hours(total_hours);
        });
    }
  }, [user]);

  const get_todayMidnight = () => {
    const TODAY_MIDNIGHT = new Date();
    TODAY_MIDNIGHT.setHours(0);
    TODAY_MIDNIGHT.setMinutes(0);
    return TODAY_MIDNIGHT.setSeconds(0);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

	// // -----全てのdotをfetch(editして、baseに戻ったあとに反映させるために) refactoringの必要アリ?-----
	useEffect(() => {
		firebase
			.firestore()
			.collection("dots")
			.get()
			.then((data) => {
				const RESPONSE = data.docs.map((doc) => {
					return {
						dotId: doc.data().dotId,
						title: doc.data().title,
						text: doc.data().text,
						// url: data.url,
						working: doc.data().working,
						tags: doc.data().tags,
						userId: doc.data().userId,
						userName: doc.data().displayName,
						// createdAt: doc.data().createdAt,
						createdAt: new Date(doc.data().createdAt.seconds * 1000), //こっちがNEW
						getday: doc.data().getday,
					};
				});
				dispatch(fetch_dots(RESPONSE));
			});
	}, []);

  // -----今日のDotのfetch------
  useEffect(() => {
    firebase
      .firestore()
      .collection("dots")
      .where("userId", "==", user.uid)
      .where("createdAt", ">=", new Date(get_todayMidnight()))
      .get()
      .then((data) => {
        const todayDot = data.docs.map((doc) => {
          return doc.data();
        });
        dispatch(fetch_todayDotLength(todayDot.length));
      });
  }, []);

  const jobstyle = {
    display: "flex",
    JustifyContent: "flex-end",
  };

  const topjobstyle = {
    display: "flex",
    flexFlow: "column",
  };

  return (
    <React.Fragment>
      <Header />
      <form className="MainFrom" style={MainStyle}>
        <div>
          <OurSideBar />
        </div>
        <LeftItem>
          <UserIcon />
          <StyledDots>
            <MiniDots />
          </StyledDots>
        </LeftItem>
        <StyledChart>
          <StyledForm>
            <MiniForm />
          </StyledForm>
          <MydotsChart />
        </StyledChart>
        <StyledCalendar>
          <Calendar />
          <ExplainCa>🟩：dot済み (クリックで確認)</ExplainCa>
        </StyledCalendar>
        <WeekStudyHours>
          <StudyHours>今週の学習時間 / {week_hours}時間</StudyHours>
          <StudyHours>前週の学習時間 / {lastweek_hours}時間</StudyHours>
          <StudyHours>総学習時間 / {total_hours}時間</StudyHours>
        </WeekStudyHours>
      </form>
      <Footer />
    </React.Fragment>
  );
}
