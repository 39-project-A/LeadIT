import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { AuthContext } from "../../../../firebase/AuthService";

const ProfilePhoto = ({ getData, imageSrc }) => {
  const [toggle, setToggle] = useState(false);
  const db = firebase.firestore().collection("userIcon");
  const currentUser = firebase.auth().currentUser;
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      db.where("userId", "==", user.uid)
        .limit(1)
        .get()
        .then((data) => {
          data.docs.map((doc) => {
            const item = doc.data();
            const blob = item.img;
            if (!imageSrc && !toggle) {
              imageSrc = blob;
              setToggle(true);
              getData(true, imageSrc);
            }
          });
        });
    }
  }, [user]);

  const handleToggleClick = () => {
    setToggle(true);
    getData(true, imageSrc);
  };

  const deletePic = () => {
    setToggle(false);
    getData(false, "");
    db.doc(currentUser.uid).delete();
  };
  return (
    <div className="container">
      <button
        type="button"
        onClick={handleToggleClick}
        className="btn btn-primary rounded-circle mt-2 opaque profile-pic"
        disabled={toggle && imageSrc}
      >
        {(!toggle || !imageSrc) && (
          <FontAwesomeIcon icon={faUserAlt} color="white" size="3x" />
        )}
        {toggle && imageSrc && (
          <img
            alt="profile"
            src={imageSrc}
            className="rounded-circle"
            width="100%"
          />
        )}
      </button>
      {toggle && imageSrc && (
        <button
          type="button"
          className="btn btn-danger rounded-circle position-relative delete-button"
          onClick={deletePic}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="white" size="xs" />
        </button>
      )}
    </div>
  );
};

export default ProfilePhoto;
