import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Dots from "./Dots";

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

export default function MiniDots({ dots }) {
  // const dots = useSelector((state) => state.dots);
  const classes = useStyles();
  // const user = useContext(AuthContext);

  // const catch_myDot = dots.filter((dot) => {
  //   if (dot.userId === user.uid) {
  //     console.log(dot);
  //     return dot;
  //   }
  // });

  //日付順にdotsを並び変え
  dots.sort(function (a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <>
      <div className={classes.root}>
        <List component="nav">
          {dots.map((dot) => {
            return <Dots dot={dot} key={dot.dotId} />;
          })}
        </List>
      </div>
    </>
  );
}
