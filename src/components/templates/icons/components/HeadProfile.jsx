import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { AuthContext } from "../../../../firebase/AuthService";

export default function HeadProfile() {
  const [imageSrc, setImageSrc] = useState("");
  const user = useContext(AuthContext);
  const currentUser = firebase.auth().currentUser;
  const db = firebase.firestore().collection("userIcon");
  const iconsData = useSelector((state) => state.icons);
  const [userIcon, set_userIcon] = useState();

  //   // redux変更完了
  // 	useEffect(() => {
  // 		if (iconsData) {
  // 			const thisUserData = iconsData.find(
  // 				(iconData) => iconData.userId === currentUser.uid
  // 			);
  // 			set_userIcon(thisUserData);
  // 		}
  // 	}, [iconsData]);
  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .limit(1)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const item = doc.data();
            const blob = item.img;
            set_userIcon(blob);
          });
        });
    }
  }, [user]);

  return (
    <div className="container3">
      <button
        type="button"
        className=" btn-primary_header rounded-circle  opaque profile-pic3"
        // 👇変更の必要アリ
        disabled={imageSrc}
      >
        {!userIcon && (
          <FontAwesomeIcon icon={faUserAlt} color="white" size="2x" />
        )}
        {userIcon && (
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
