import React from "react";
import { DOT, TEXT, TITLE } from "../../style/OurDots";

export default function OurItem({ dot }) {
  return (
    // <DOT>
    //   <img
    //     alt="profile"
    //     src={dot.img}
    //     className="rounded-circle"
    //     width="100%"
    //   />
    //   <TITLE>{dot.userName}</TITLE>
    //   <TEXT>{dot.title}</TEXT>
    // </DOT>
    <p>{dot.name}</p>
  );
}
