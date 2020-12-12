import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

const ProfilePhoto = ({ getData, imageSrc }) => {
  const [toggle, setToggle] = useState(false);
  const [imageurl, setImageUrl] = useState("");
  const [blobKey, setBlobKey] = useState("");
  const db = firebase.firestore().collection("userIcon");
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    db.limit(1).onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        const item = doc.data();
        const blob = item.img;
        const getBlobId = item.blobId;
        setBlobKey(getBlobId);
        if (!imageSrc && !toggle) {
          imageSrc = blob;
          setToggle(true);
          getData(true, imageSrc);
        }
      });
    });
  }, []);

  const handleToggleClick = () => {
    setToggle(true);
    getData(true, imageSrc);
  };

  const deletePic = () => {
    setToggle(false);
    getData(false, "");
    db.doc(currentUser.uid).delete();
  };

  // console.log(imageurl);
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
