import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import Dots from "../templates/Dots";
import OurSideBar from "../templates/OurSideBar";
import { DOT, TEXT, TITLE } from "../../style/OurDots";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "50vh",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
    position: "relative",
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  addButton: {
    fontSize: 30,
    position: "fixed",
    right: "0%",
    bottom: "7%",
  },
}));
const bodyStyle = {
  display: "flex",
};
const sideBar = {
  float: "left",
};

export default function OurDots() {
  const [sortDots, set_sortDots] = useState([]);
  const dots = useSelector((state) => state.dots);
  const classes = useStyles();
  const userDataArr = [];
  const userIconArr = [];
  function get_userArr() {
    return new Promise((resolve, reject) => {
      dots.map((dot) => {
        firebase
          .firestore()
          .collection("userIcon")
          .where("userId", "==", dot.userId)
          .get()
          .then((data) => {
            const res = data.docs.map((doc) => {
              return doc.data();
            });
            return {
              name: dot.userName,
              title: dot.title,
              // createdAt: dot.createdAt,
              ...res[0],
            };
            // userIconArr.push({
            //   name: dot.userName,
            //   title: dot.title,
            //   // createdAt: dot.createdAt,
            //   ...res[0],
            // });
          });
        resolve(dots);
      });
    });
  }
  async function set_userArr() {
    const dataArr = await get_userArr();
    const Arr = dataArr;
    console.log(Arr);
  }
  set_userArr().then((result) => {
    console.log(result);
  });
  return (
    <React.Fragment>
      <Header />
      <div style={sideBar}>
        <OurSideBar
          dots={dots}
          sortDots={sortDots}
          set_sortDots={set_sortDots}
        />
      </div>
      <div className="MainBody" style={bodyStyle}>
        <div className={classes.root}>
          <List component="nav">
            {userDataArr.length === dots.length &&
              userDataArr.map((data) => {
                return (
                  <DOT key={data.dotId}>
                    <img
                      alt="profile"
                      src={data.img}
                      className="rounded-circle"
                      width="100%"
                    />
                    <TITLE>{data.userName}</TITLE>
                    <TEXT>{data.title}</TEXT>
                  </DOT>
                );
              })}
          </List>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
