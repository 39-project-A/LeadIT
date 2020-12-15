import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Dots from "./Dots";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";

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

export default function MiniDots() {
  const dots = useSelector((state) => state.dots);
  const classes = useStyles();
  const user = useContext(AuthContext);

  const test = dots.filter((dot) => {
    if (dot.userId === user.uid) {
      console.log(dot);
      return dot;
    }
  });
  console.log(test);

  return (
    <>
      <div className={classes.root}>
        <List component="nav">
          {test.map((dot) => {
            return <Dots dot={dot} key={dot.dotId} />;
          })}
        </List>
      </div>
    </>
  );
}
