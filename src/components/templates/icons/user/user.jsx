import React, { useState } from "react";
import ProfilePhoto from "../components/ProfilePhoto";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import CreateAvatar from "../components/CreateAvatar";
import Portal from "../components/Portal";
// import MydotsProfile from "../components/MydotsProfile";

const UserIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const getData = (isOpened, imageSrc) => {
    setIsOpen(isOpened);
    setImageSrc(imageSrc);
  };

  return (
    <React.Fragment>
      <ProfilePhoto getData={getData} imageSrc={imageSrc} />
      {/* <MydotsProfile getData={getData} imageSrc={imageSrc} /> */}
      <div id="createAvatarDiv" />
      {isOpen && !imageSrc && (
        <Portal portalDiv="createAvatarDiv">
          <div className="createAvatarDiv_content m-auto">
            <CreateAvatar getData={getData} />
          </div>
        </Portal>
      )}
      <br />
    </React.Fragment>
  );
};

export default UserIcon;
