import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { useSelector } from "react-redux";

export default function RankProfile({ oneRank, twoRank, threeRank }) {
  const [imageSrc, setImageSrc] = useState("");
  const iconsData = useSelector((state) => state.icons);
  const [userIcon, set_userIcon] = useState();
  const db = firebase.firestore().collection("userIcon");

  useEffect(() => {
    if (iconsData && oneRank) {
      const thisUserData = iconsData.find(
        return (iconData) => iconData.userName === oneRank
      );
      set_userIcon(thisUserData);
    }
  }, [iconsData, oneRank]);

  //   if (thisUserData.name === oneRank) {
  //     // const blob = item.img;
  //     if (!imageSrc) {
  //       setImageSrc(thisUserData.blob);
  //     }
  //   } else if (thisUserData.name === twoRank) {
  //     // const blob = item.img;
  //     if (!imageSrc) {
  //       setImageSrc(thisUserData.blob);
  //     }
  //   } else if (thisUserData.name === threeRank) {
  //     // const blob = item.img;
  //     if (!imageSrc) {
  //       setImageSrc(thisUserData.blob);
  //     }
  //   }

  return (
    <div className="container_rank">
      <button
        type="button"
        className="btn btn-primary_ranking rounded-circle mt-2 opaque profile-pic_rank"
        disabled={imageSrc}
      >
        {!imageSrc && (
          <FontAwesomeIcon icon={faUserAlt} color="white" size="5x" />
        )}
        {imageSrc && (
          <img
            alt="profile"
            src={userIcon}
            className="rounded-circle"
            width="100%"
          />
        )}
      </button>
    </div>
  );
}
