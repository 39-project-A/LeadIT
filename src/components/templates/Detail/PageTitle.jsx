import React from "react";
import styled from "styled-components";

const H3 = styled.h3`
	width: auto;
	float: left;
	padding: 0 3%;
	font-size: 5rem;
	line-height: 6rem;
	font-weight: bold;
	font-family: "Bebas Neue", cursive;
`;

export default function PageTitle() {
	return (
		<H3 className="allH3">
			<span style={{ color: "#1a1a00" }}>Check</span>
			<br />
			<span style={{ color: "#ffd11a" }}>Your Dot</span>
			<br />
			<span style={{ color: "#ffe6b3" }}>Here</span>
		</H3>
	);
}
