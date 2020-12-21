import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { DOT, TEXT, TITLE } from "../../../../style/OurDots";

export default function OurIcon({ dot }) {
  const iconsData = useSelector((state) => state.icons);
  console.log(dot);
  const thisUserIcon = iconsData.find(
    (iconData) => iconData.userId === dot.userId
  );
  const renderImg = () => {
    if (thisUserIcon) {
      return (
        <DOT key={dot.dotId}>
          <TITLE>
            <img
              src={thisUserIcon.img}
              alt="プロフィール写真"
              style={{ width: "7%" }}
            />
            &ensp;:&ensp;
            {dot.userName}
            <span>{dot.getDate}</span>
          </TITLE>
          <TEXT>{dot.title}</TEXT>
        </DOT>
      );
    } else {
      return <div>{/* <AVATAR /> */}</div>;
    }
  };

  return <>{renderImg()}</>;
}
