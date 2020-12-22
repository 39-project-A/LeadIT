import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

export default function RankProfile({ oneRank, twoRank, threeRank }) {
	const [imageSrc, setImageSrc] = useState("");
  const db = firebase.firestore().collection("userIcon");
  
	useEffect(() => {
		db.get().then((data) => {
			data.docs.map((doc) => {
				const item = doc.data();
				const name = item.userName;
				if (name === oneRank) {
					const blob = item.img;
					if (!imageSrc) {
						setImageSrc(blob);
					}
				} else if (name === twoRank) {
					const blob = item.img;
					if (!imageSrc) {
						setImageSrc(blob);
					}
				} else if (name === threeRank) {
					const blob = item.img;
					if (!imageSrc) {
						setImageSrc(blob);
					}
				}
			});
		});
	}, [oneRank, twoRank, threeRank]);

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
            src={imageSrc}
            className="rounded-circle"
            width="100%"
          />
        )}
      </button>
    </div>
  );
};
