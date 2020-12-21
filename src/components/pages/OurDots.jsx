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
        userIconArr.push({
          name: dot.userName,
          title: dot.title,
          createdAt: dot.getDate,
          ...res[0],
        });
        console.log(userIconArr);
        // userDataArr.push({
        //   dotId: dot.dotId,
        //   userName: dot.userName,
        //   img: res[0].img,
        //   text: dot.text,
        //   createdAt: dot.getDate,
        // });
      });
  });
  console.log(userDataArr);
  // useEffect(() => {
  //   set_sortDots(dots);
  // }, [dots]);

  // return (
  //   <img
  //     alt="profile"
  //     src={img}
  //     // className="rounded-circle"
  //     width="100%"
  //   />
  // );
  // for (let i = 0; i < array.length; i++) {}
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
            {/* {sortDots.map((dot) => {
              setTimeout(() => {
                return (
                  <DOT key={dot.dotId}>
                    <TITLE>{dot.userName}</TITLE>
                    <TEXT>{dot.title}</TEXT>
                  </DOT>
                );
              }, 2000);
            })} */}
          </List>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
