import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const AVATAR = styled(Avatar)`
	width: 100% !important;
	height: auto !important;
`;

export default function DetailAvatar({ clickedDot }) {
	const iconsData = useSelector((state) => state.icons);
	const [userIcon, set_userIcon] = useState();

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

	return <div style={{ width: "60%" }}>{renderImg()}</div>;
}
