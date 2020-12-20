import React from "react";
import { useSelector } from "react-redux";
import startImg from "../../pages/img/star.png";
import blackStarImg from "../../pages/img/blackstar.png";

export default function Achievement() {
	const star = useSelector((state) => state.star);


	const show_star = () => {
		
		if (star > 0) {
			return <img src={startImg} style={{ width: "55px", }}></img>;
		} else {
			return <img src={blackStarImg} style={{ width: "55px" }}></img>;
		}
	};

	return <div> {show_star()} </div>;
}
