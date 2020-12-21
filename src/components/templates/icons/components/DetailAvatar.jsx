import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const AVATAR = styled(Avatar)`
	width: 100%;
	height: auto;
`;

export default function DetailAvatar({ clickedDot }) {
	const iconsData = useSelector((state) => state.icons);

	const thisUserIcon = iconsData.find(
		(iconData) => iconData.userId === clickedDot.userId
	);

	const renderImg = () => {
		if (thisUserIcon) {
			return (
				<img
					src={thisUserIcon.img}
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
