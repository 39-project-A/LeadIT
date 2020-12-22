import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../../../../firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const AVATAR = styled(Avatar)`
	width: 100%;
	height: auto;
`;

export default function DetailAvatar({ clickedDot }) {
	const iconsData = useSelector((state) => state.icons);
	const [userIcon, set_userIcon] = useState();

	// console.log(clickedDot)

	// useEffect(() => {
	// 	if (clickedDot) {
	// 		firebase
	// 			.firestore()
	// 			.collection("userIcon")
	// 			.where("userId", "==", "clickedDot.userId")
	// 			.get()
	// 			.then((data) => {
	// 				const iconData = data.docs.map((doc) => {
	// 					return doc.data();
	// 				});
	// 				console.log(iconData)
	// 				set_userIcon(iconData)
	// 			});
	// 	}
	// }, [clickedDot]);

	useEffect(() => {
		if (iconsData && clickedDot) {
			const thisUserData = iconsData.find(
				(iconData) => iconData.userId === clickedDot.userId
			);
			set_userIcon(thisUserData);
		}
	}, [iconsData, clickedDot]);

	const renderImg = () => {
		if (userIcon) {
			return (
				<img
					src={userIcon.img}
					alt="プロフィール写真"
					style={{ width: "100%" }}
				/>
			);
		} else {
			return (
				<div>
					<AVATAR />
				</div>
			);
		}
	};
	return <>{renderImg()}</>;
}
