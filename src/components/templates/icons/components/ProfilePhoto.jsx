import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delete_icon } from "../../../../reducks/userIcon/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserAlt,
	faUserEdit,
	faUserPlus,
	faEdit,
	faCamera,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { AuthContext } from "../../../../firebase/AuthService";

export default function ProfilePhoto({ getData, imageSrc }) {
	const [toggle, setToggle] = useState(false);
	const db = firebase.firestore().collection("userIcon");
	const currentUser = firebase.auth().currentUser;
	const user = useContext(AuthContext);
	const dispatch = useDispatch();
	const iconsData = useSelector((state) => state.icons);
	const [userIcon, set_userIcon] = useState();

	useEffect(() => {
		if (iconsData && user) {
			const thisUserData = iconsData.find(
				(iconData) => iconData.userId === user.uid
			);
			set_userIcon(thisUserData);
		}
	}, [iconsData, user]);

	// redux断念
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
		userIcon && dispatch(delete_icon(userIcon));
		db.doc(currentUser.uid).delete();
	};

	return (
		<div className="container">
			{(!toggle || !imageSrc) && (
				<button
					type="button"
					onClick={handleToggleClick}
					className="btn  rounded-circle  edit-button"
					disabled={toggle && imageSrc}
				>
					<FontAwesomeIcon icon={faCamera} color="white" size="xs" />
				</button>
			)}
			<button
				type="button"
				onClick={handleToggleClick}
				className="btn btn-primary rounded-circle mt-2 opaque profile-pic"
				disabled={toggle && imageSrc}
			>
				{(!toggle || !imageSrc) && (
					<FontAwesomeIcon icon={faUserAlt} color="white" size="5x" />
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
					className="btn btn-danger_base rounded-circle position-relative delete-button"
					onClick={deletePic}
				>
					<FontAwesomeIcon icon={faUserPlus} color="white" size="xs" />
				</button>
			)}
		</div>
	);
}
