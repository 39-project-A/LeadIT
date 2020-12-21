import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { DOT, TEXT, TITLE, TIME } from "../../../../style/OurDots";
import { Link } from "react-router-dom";

export default function OurIcon({ dot }) {
  const iconsData = useSelector((state) => state.icons);
  console.log(dot);
  const thisUserIcon = iconsData.find(
    (iconData) => iconData.userId === dot.userId
  );
  const renderImg = () => {
    if (thisUserIcon) {
      return (
        <Link style={{ textDecoration: "none" }} to={`/dot/${dot.dotId}`}>
          <DOT key={dot.dotId}>
            <TITLE>
              <img
                src={thisUserIcon.img}
                alt="プロフィール写真"
                style={{ width: "7%" }}
              />
              &ensp;
              {dot.userName}
            </TITLE>
            <TEXT>{dot.title}</TEXT>
            <TIME>{dot.getDate}</TIME>
          </DOT>
        </Link>
      );
    } else {
      return <div>{/* <AVATAR /> */}</div>;
    }
  };

  return <>{renderImg()}</>;
}
