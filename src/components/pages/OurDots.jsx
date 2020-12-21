import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
import OurItem from "../templates/OurItem";
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
  const userDataArr = null;
  const userIconArr = null;
  // useEffect(() => {
  function get_img(dots) {
    const arr = [];
    dots.forEach((dot) => {
      firebase
        .firestore()
        .collection("userIcon")
        .doc(dot.userId)
        .get()
        .then((doc) => {
          arr.push({
            name: dot.userName,
            title: dot.title,
            createdAt: dot.getDate,
            ...doc.data(),
          });
        });
    });
    return arr.length && arr;
  }
  console.log(get_img(dots));
  // console.log(userIconArr);
  // useEffect(() => {
  //   set_sortDots(userIconArr);
  //   console.log(sortDots);
  // }, []);
  // dots.forEach((dot) => {
  //   firebase
  //     .firestore()
  //     .collection("userIcon")
  //     .where("userId", "==", dot.userId)
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         // console.log(doc.data());
  //         userIconArr.push({
  //           name: dot.userName,
  //           title: dot.title,
  //           createdAt: dot.getDate,
  //           ...doc.data(),
  //         });
  //       });
  //       if (dots.length === userIconArr.length) {
  //         console.log(userIconArr);
  //       }
  //     });
  // });
  return (
    <React.Fragment>
      <Header />
      <List component="nav">
        <div style={sideBar}>
          <OurSideBar
            dots={dots}
            sortDots={sortDots}
            set_sortDots={set_sortDots}
          />
        </div>
        <div>
          {userIconArr &&
            userIconArr.map((dot) => {
              return <OurItem dot={dot} key={dot.id} />;
            })}
        </div>
      </List>
      {/* <div className="MainBody" style={bodyStyle}>
        <div className={classes.root}>
            {userDataArr.length !== 0 &&
              userDataArr.map((data) => {
                console.log(data);
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
        </div>
      </div> */}
      <Footer />
    </React.Fragment>
  );
}
