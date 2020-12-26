import React from "react";
import styled from "styled-components";

const H3 = styled.h3`
	font-size: 6em;
	font-weight: bold;
	display: inline-block;
	color: #fff;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-image: url(https://picsum.photos/id/499/200/300);
	width: auto;
	line-height: 7rem;
	font-family: "Bebas Neue", cursive;
`;

export default function PageTitle() {
	return (
		<H3>
			<span>Check</span>
			<br />
			<span>Your Dot</span>
			<br />
			<span>Here</span>
		</H3>
	);
}
