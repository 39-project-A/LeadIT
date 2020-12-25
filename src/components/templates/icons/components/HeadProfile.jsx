import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
// import { AuthContext } from "../../../../firebase/AuthService";

export default function HeadProfile() {
  const [imageSrc, setImageSrc] = useState("");
  // const user = useContext(AuthContext);
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.firestore().collection("userIcon");

  // console.log(user2.uid);

  useEffect(() => {
    db.where("userId", "==", userId)
      .limit(1)
      .get()
      .then((data) => {
        const thisUserData = data.docs.map((doc) => {
          const item = doc.data();
          const blob = item.img;
          return blob;
        });
        if (!imageSrc) {
          setImageSrc(thisUserData);
        }
      });
  }, []);

  return (
    <div className="container3">
      <button
        type="button"
        className=" btn-primary_header rounded-circle  opaque profile-pic3"
        disabled={imageSrc}
      >
        {!imageSrc && (
          <FontAwesomeIcon icon={faUserAlt} color="white" size="2x" />
        )}
        {imageSrc && (
          <img
            alt="profile"
            src={imageSrc}
            className="rounded-circle"
            width="100%"
          />
        )}
      </button>
    </div>
  );
}
