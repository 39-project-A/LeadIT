import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delete_dot } from "../../reducks/dots/action";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthService";
import Header from "../templates/Header/Header";
import Footer from "../templates/Footer/Footer";
import DetailAvatar from "../templates/icons/components/DetailAvatar";
import PageTitle from "../templates/Detail/PageTitle";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import oneWeekIcon from "../pages/img/one-week.png";
import clockIcon from "../pages/img/clock.png";
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
	font-weight: bold;
	font-size: 1.5em;
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	margin-bottom: 2em;
	border-bottom: solid 3px #111111;
`;

const INNER = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	padding: 3%;
`;
const DETAIL_WRAPPER = styled.div`
	display: grid;
	padding-left: 2%;
	width: 60%;
`;

const TEXT = styled.p`
	height: 20vh;
	word-break: break-all;
	overflow-wrap: break-word;
	border: 2px solid #2f2f1e;
	padding: 2%;
}
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

	const renderWorkingTime = () => {
		if (clickedDot) {
			const stringTime = clickedDot.createdAt;
			const year = stringTime.getFullYear();
			const month = stringTime.getMonth() + 1;
			const date = stringTime.getDate();
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

	const onEdit_click = () => {
		console.log("edit click");
		history.push(`/dot/${id}/edit`);
	};

	const renderName = () => {
		if (clickedDot) {
			return (
				<p style={{ textAlignLast: "center", width: "60%" }}>
					{clickedDot.userName}
				</p>
			);
		}
	};

	const renderTitle = () => {
		if (clickedDot) {
			return <H3> {clickedDot.title} </H3>;
		}
	};

	const renderText = () => {
		if (clickedDot) {
			return <TEXT>{clickedDot.text}</TEXT>;
		}
	};

	return (
		<div style={{ height: "10vh" }}>
			<Header />
			<INNER>
				<div style={{ width: "30%" }}>
					<PageTitle />
					<DetailAvatar clickedDot={clickedDot} />
					{renderName()}
				</div>
				<DETAIL_WRAPPER>
					<div>{renderTitle()}</div>
					{renderText()}
					<div style={{ display: "flex", paddingTop: "5%" }}>
						<IMG_WRAPPER style={{ paddingBottom: "5%" }}>
							<IMG
								src={clockIcon}
								title="clock"
								alt="時計のアイコン"
								align="middle"
							/>
							{renderWorkingTime()}
						</IMG_WRAPPER>
						<IMG_WRAPPER style={{ paddingBottom: "2%" }}>
							<IMG
								src={oneWeekIcon}
								title="calendar"
								alt="カレンダーのアイコン"
								align="middle"
							/>
							今週の合計勉強時間： {workingTime} 時間
						</IMG_WRAPPER>
					</div>
					<span>{show_editAndDeleteButtons()}</span>
				</DETAIL_WRAPPER>
			</INNER>
			<Footer />
		</div>
	);
}
