import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../templates/Footer/Footer";
import Header from "../templates/Header/Header";
import BarChart from "../templates/graph/BarChart";
import MiniDots from "../templates/MiniDots";
import MiniForm from "../templates/MiniForm";
import { AuthContext } from "../../firebase/AuthService";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import { fetch_todayDotLength } from "../../reducks/star/action";
import { Bodyleft } from "../templates/Header/HeaderElements";
import { Redirect } from "react-router-dom";

export default function Base() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useContext(AuthContext);
  const get_todayMidnight = () => {
    const TODAY_MIDNIGHT = new Date();
    TODAY_MIDNIGHT.setHours(0);
    TODAY_MIDNIGHT.setMinutes(0);
    return TODAY_MIDNIGHT.setSeconds(0);
  };

  const logout = () => {
    firebase.auth().signOut();
    history.push("/home");
  };

  useEffect(() => {
    user &&
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
    user && (
      <React.Fragment>
        <Header />
        <BarChart />
        <Bodyleft>
          <MiniForm />
          <MiniDots />
        </Bodyleft>
        <Footer />

        <div>Index</div>
        <button style={{ width: "100px", height: "30px" }} onClick={logout}>
          ログアウト
        </button>
        <div style={jobstyle}>
          <div style={topjobstyle}>
            <h4>Justice!!!!</h4>
            <Link to="/mydots">
              <button>MyDotsページ</button>
            </Link>
            <Link to="/ranking">
              <button>Rankingページ</button>
            </Link>
          </div>
          <div style={topjobstyle}>
            <h4>goto</h4>
            <Link to="/form">
              <button>Formページ</button>
            </Link>
            <Link to="/ourdots">
              <button>OurDotsページ</button>
            </Link>
          </div>
          <div style={topjobstyle}>
            <h4>ito</h4>
            <Link to="/dot/:id.jsx">
              <button>DotDetailページ</button>
            </Link>
            <Link to="/dot/:id/edit">
              <button>Editページ</button>
            </Link>
          </div>
          <div style={topjobstyle}>
            <h4>iwaswa</h4>
            <Link to="/home">
              <button>Homeページ</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    )
  );
}
