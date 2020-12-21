import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import OurSideBar from "../templates/OurSideBar";
import { DOT, TEXT, TITLE } from "../../style/OurDots";
import OurIcon from "../templates/icons/components/OurIcon";

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
            {dots.map((dot) => {
              return <OurIcon dot={dot} />;
            })}
          </List>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
