import React, { useState, useContext } from "react";
import Avatar from "react-avatar-edit";
import firebase from "firebase";
import { AuthContext } from "../../../../firebase/AuthService";

const CreateAvatar = ({ getData }) => {
  const [preview, setPreview] = useState("");
  const currentUser = firebase.auth().currentUser;
  const db = firebase.firestore().collection("userIcon");
  const user = useContext(AuthContext);

  const set_userIcon = (preview) => {
    const blob = preview;

    db.doc(currentUser.uid)
      .set({
        userName: user.displayName,
        img: blob,
        time: new Date(),
        userId: user.uid,
      })
      .catch((error) => console.log(error));
  };

  const onCrop = (defaultPreview) => {
    setPreview(defaultPreview);
  };

  const onClose = () => {
    setPreview("");
  };

  const onBeforeFileLoad = () => {};

  const onSelectPic = () => {
    getData(false, preview);
    set_userIcon(preview);
  };

  const onCancelSelect = () => {
    getData(false, "");
  };

  return (
    <div className="container">
      <div className="row mx-auto my-3">
        <div className="col-md-6 m-auto">
          <div className="mx-auto my-4 choose-file">
            <Avatar
              imageWidth={270}
              width={"100%"}
              height={180}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
            />
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className="previewDiv rounded-circle m-auto">
            {preview && (
              <img
                alt="preview"
                src={preview}
                width="100%"
                height="100%"
                className="rounded-circle"
              />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary btn-md float-left ml-2 mb-3 text-center"
            style={{ minWidth: "100px" }}
            onClick={onCancelSelect}
          >
            Cancel
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-success btn-md float-right mr-2 mb-3 text-center"
            onClick={onSelectPic}
            disabled={!preview}
            style={{ minWidth: "100px" }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAvatar;
