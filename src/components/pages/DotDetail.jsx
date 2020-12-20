import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delete_dot } from "../../reducks/dots/action";
import { fetch_todayDotLength } from "../../reducks/star/action";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";
import Header from "../templates/Header/Header";
import Footer from "../templates/Footer/Footer";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import oneWeekIcon from "../pages/img/one-week.png";
import yayFrogIcon from "../pages/img/yayFrog.png";


import Button from "@material-ui/core/Button";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

const H3 = styled.h3`
	text-align: center;
	font-weight: bold;
`;

const INNER = styled.div`
	display: flex;
	margin: auto;
	width: 70%;
	padding-top: 5%;
	// padding: 6% 2%;
`;
const DETAIL_WRAPPER = styled.div`
	padding-left: 8%;
	width: 100%;
`;

const TEXT = styled.p`
	font-size: 1.2rem;
	height: 30vh;
	padding-bottom: 5%;
	word-break: break-all;
`;

const TAGS = styled.div`
	font-size: 1.2rem;
	height: 50px;
`;

const IMG_WRAPPER = styled.div`
	width: 100%;
`;
const IMG = styled.img`
	width: 55px;
	padding-right: 2%;
`;

export default function DotDetail() {
	const classes = useStyles();
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useContext(AuthContext);
	const [workingTime, set_WorkingTime] = useState([]);
	const dotsFromRedux = useSelector((state) => state.dots);
	const clickedDot = dotsFromRedux.find(
		(dotFromRedux) => dotFromRedux.dotId === id
	);

	// -----一週間分の合計勉強時間------//
	const zeroAdjust = () => {
		let agoDate = new Date();
		let agoWeek = agoDate.setDate(agoDate.getDate() - 6);
		let hope = new Date(agoWeek);
		let zero = hope.setHours(0);
		let one = new Date(zero);
		let two = one.setMinutes(0);
		let three = new Date(two);
		let four = three.setSeconds(0);
		let five = new Date(four);
		return five;
	};

	const array = [];
	useEffect(() => {
		if (user) {
			firebase
				.firestore()
				.collection("dots")
				.where("userId", "==", user.uid)
				.where(
					"createdAt",
					">",
					firebase.firestore.Timestamp.fromDate(zeroAdjust())
				)
				.get()
				.then((data) => {
					data.docs.map((doc) => {
						const oneWeekDots = doc.data();
						array.push(oneWeekDots);
					});

					let totalWorking = 0;
					for (let i = 0; i < array.length; i++) {
						totalWorking += array[i].working;
					}
					set_WorkingTime(totalWorking);
				});
		}
	}, [user]);
	// -------------------------------//

	// ----今日のdot作ってるか確認------//
	const get_todayMidnight = () => {
		const TODAY_MIDNIGHT = new Date();
		TODAY_MIDNIGHT.setHours(0);
		TODAY_MIDNIGHT.setMinutes(0);
		return TODAY_MIDNIGHT.setSeconds(0);
	};

	if (user) {
		firebase
			.firestore()
			.collection("dots")
			.where("userId", "==", user.uid)
			.where("createdAt", ">=", new Date(get_todayMidnight()))
			.get()
			.then((data) => {
				const todayDot = data.docs.map((doc) => {
					return doc.data();
				});
				dispatch(fetch_todayDotLength(todayDot.length));
			});
	}
	// -----------------------

	const renderText = () => {
		if (clickedDot) {
			return clickedDot.text;
		}
	};

	const renderTitle = () => {
		if (clickedDot) {
			return clickedDot.title;
		}
	};

	const renderWorkingTime = () => {
		if (clickedDot) {
			const createdAt = clickedDot.createdAt;
			const year = createdAt.getFullYear();
			const month = createdAt.getMonth() + 1;
			const date = createdAt.getDate();
			return (
				year +
				"/" +
				month +
				"/" +
				date +
				"の勉強時間" +
				"：" +
				clickedDot.working +
				" 時間"
			);
		}
	};

	const onDelete_click = () => {
		firebase
			.firestore()
			.collection("dots")
			.doc(clickedDot.dotId)
			.delete()
			.then(function () {
				console.log("Document successfully deleted!");
				dispatch(delete_dot(clickedDot));
				history.push("/");
			})
			.catch(function (error) {
				console.error("Error removing document: ", error);
			});
	};

	const show_editAndDeleteButtons = () => {
		if (user && clickedDot && user.uid === clickedDot.userId) {
			return (
				<div style={{ display: "flex", float: "right", paddingRight: "5%" }}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						startIcon={<EditSharpIcon />}
						style={{ marginTop: "5%" }}
						onClick={onEdit_click}
					>
						EDIT
					</Button>
					<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						startIcon={<DeleteSharpIcon />}
						style={{ marginTop: "5%", marginLeft: "8%" }}
						onClick={onDelete_click}
					>
						DELETE
					</Button>
				</div>
			);
		}
	};

	const onEdit_click = () => {
		console.log("edit click");
		history.push(`/dot/${id}/edit`);
	};

	return (
		<div style={{ height: "10vh" }}>
			<Header />
			<INNER>
				{/* ----avatarの実装はここ👇----- */}
				<diV>
					<Avatar src="/broken-image.jpg" className={classes.large} />
				</diV>
				{/* ----------ここまで------------ */}
				<DETAIL_WRAPPER>
					<H3> {renderTitle()} </H3>
					<TEXT>{renderText()}</TEXT>
					<IMG_WRAPPER style={{ paddingBottom: "10%" }}>
						<IMG
							src={yayFrogIcon}
							title="カレンダー"
							alt="カレンダーのアイコン "
							align="middle"
						/>
					</IMG_WRAPPER>

					<IMG_WRAPPER style={{ paddingBottom: "2%" }}>
						<IMG
							src={oneWeekIcon}
							title="時計"
							alt="時計のアイコン"
							align="middle"
						/>
						今週の合計勉強時間： {workingTime} 時間
					</IMG_WRAPPER>
				</DETAIL_WRAPPER>

				{/* {dot && <p>title : {dot.title}</p>}
						{dot && <p>tag : {dot.tag}</p>}
						{dot && <p>url : {dot.url}</p>}
						{dot && <p>working : {dot.working}</p>}
          {dot && <p>text : {dot.text}</p>} */}
			</INNER>
			<span>{show_editAndDeleteButtons()}</span>
			<Footer />
		</div>
	);
}
