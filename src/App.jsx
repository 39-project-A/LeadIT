import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_dots } from "./reducks/dots/action";
import { fetch_todayDotLength } from "./reducks/star/action";
import { fetch_icons } from "./reducks/userIcon/action";
import { fetch_oneWeekDots } from "./reducks/oneWeekDots/action";
import { fetch_lastWeekDots } from "./reducks/lastWeekDots/action";
import Base from "./components/pages/Base";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import DotDetail from "./components/pages/DotDetail";
import Form from "./components/pages/Form";
import OurDots from "./components/pages/OurDots";
import "firebase/app";
import "firebase/firestore";
import firebase from "firebase/app";
import { AuthProvider } from "./firebase/AuthService";
import { AuthContext } from "./firebase/AuthService";
import Edit from "./components/pages/Edit";
import Ranking from "./components/pages/Ranking";
import styled from "styled-components";
import { CircleLoading } from "react-loadingg";
import { complete_loading } from "./reducks/loading/action";
import { Redirect } from "react-router-dom";

const TITLE = styled.h1`
	width: 233px;
	position: relative;
	top: 43vh;
	margin: auto;
	font-family: cursive;
`;

export default function App() {
	const currentUser = firebase.auth().currentUser;
	const [loading, set_loading] = useState();
	const dispatch = useDispatch();
	const reduxLoading = useSelector((state) => state.loading);

	function get_userPromise() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					if (firebase.auth().currentUser === null) {
						throw new Error("promise error");
					} else {
						resolve("complete");
					}
				} catch (err) {
					reject("default");
				}
			}, 2000);
		});
	}
	async function get_userData() {
		const user = await get_userPromise();
		set_loading(user);
	}
	const LoggedInRoute = ({ component: Component }) => {
		useEffect(() => {
			set_loading(reduxLoading);
		});
		if (reduxLoading === "default") {
			console.log(loading);
			return <Route render={(props) => <Redirect to={"/home"} />} />;
		} else {
			return <Route render={(props) => <Component {...props} />} />;
		}
	};

	useEffect(() => {
		get_userData()
			.then(() => {
				dispatch(complete_loading("complete"));
				set_loading("complete");
			})
			.catch(() => {
				dispatch(complete_loading("default"));
				set_loading("default");
			});
	}, []);

	useEffect(() => {
		firebase
			.firestore()
			.collection("dots")
			.orderBy("createdAt", "desc")
			.get()
			.then((data) => {
				const dotData = data.docs.map((doc) => {
					return {
						dotId: doc.data().dotId,
						title: doc.data().title,
						text: doc.data().text,
						working: doc.data().working,
						tags: doc.data().tags,
						userId: doc.data().userId,
						userName: doc.data().userName,
						createdAt: new Date(doc.data().createdAt.seconds * 1000),
						getDate: doc.data().getDate,
						getday: doc.data().getday,
					};
				});
				dispatch(fetch_dots(dotData));
			});

		firebase
			.firestore()
			.collection("userIcon")
			.get()
			.then((data) => {
				const iconsData = data.docs.map((doc) => {
					return doc.data();
				});
				dispatch(fetch_icons(iconsData));
			});
	}, []);

	useEffect(() => {
		const get_todayMidnight = () => {
			const TODAY_MIDNIGHT = new Date();
			TODAY_MIDNIGHT.setHours(0);
			TODAY_MIDNIGHT.setMinutes(0);
			return TODAY_MIDNIGHT.setSeconds(0);
		};

		if (currentUser) {
			firebase
				.firestore()
				.collection("dots")
				.where("userId", "==", currentUser.uid)
				.where("createdAt", ">=", new Date(get_todayMidnight()))
				.get()
				.then((data) => {
					const todayDot = data.docs.map((doc) => {
						return doc.data();
					});
					dispatch(fetch_todayDotLength(todayDot.length));
				});

			//----今週の勉強時間(barChartで使用)----//
			const array = [];
			const specify_weekago = () => {
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
			const init_arrayWeeks = () => {
				const jsWeekAgo = [];
				let today = new Date();
				today.setDate(today.getDate() + 1);
				const infoWeek = [];
				const infoDay = [];
				const subtract = 1;
				const max = 6;
				for (let i = 0; i <= max; i++) {
					today.setDate(today.getDate() - subtract);
					infoWeek[i] = today.getMonth() + 1 + "/" + today.getDate();
					infoDay[i] = today.getDay();
					jsWeekAgo.push({
						label: infoWeek[i],
						jsGetDay: infoDay[i],
						initNum: 0,
					});
				}
				const reversedLabelWeek = infoWeek.reverse();
				const reversedDataWeek = jsWeekAgo.reverse();
				const weeksObj = {
					weekLabel: reversedLabelWeek,
					weekData: reversedDataWeek,
				};
				return weeksObj;
			};
			firebase
				.firestore()
				.collection("dots")
				.where("userId", "==", currentUser.uid)
				.where(
					"createdAt",
					">",
					firebase.firestore.Timestamp.fromDate(specify_weekago())
				)
				.orderBy("createdAt")
				.onSnapshot((snapshot) => {
					const hope = init_arrayWeeks().weekData;
					snapshot.docs.map((doc) => {
						const item = doc.data();
						array.push(item);
						const receivedDay = item.getday;
						const hours = item.working;
						for (let i = 0; i < hope.length; i++) {
							if (receivedDay === hope[i].jsGetDay) {
								hope[i].initNum = hours;
							}
						}
					});
					const totalWeekHours = array.reduce((result, current) => {
						return result + current.working;
					}, 0);

					const finalWeek = hope.map((el) => {
						return el.initNum;
					});
					dispatch(fetch_oneWeekDots(finalWeek));
				});
			// -----------------------------

			// ------Last weekの勉強時間-------
			let yesterday2 = new Date(
				specify_weekago().getFullYear(),
				specify_weekago().getMonth(),
				specify_weekago().getDate() - 1
			);
			const yesterday = new Date(yesterday2.setHours(23, 59, 59, 999));
			//前週を指定
			const specify_lastweek = () => {
				let agoWeek2 = yesterday2.setDate(yesterday2.getDate() - 6);
				let hope2 = new Date(agoWeek2);
				let zero2 = hope2.setHours(0);
				let one2 = new Date(zero2);
				let two2 = one2.setMinutes(0);
				let three2 = new Date(two2);
				let four2 = three2.setSeconds(0);
				let five2 = new Date(four2);
				return five2;
			};
			//前週の日付とラベルを取得
			const init_arrayWeeks2 = () => {
				let today = new Date(specify_weekago());
				let yesterday = new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate() - 1
				);
				const jsWeekAgo2 = [];
				yesterday.setDate(yesterday.getDate() + 1);
				const infoWeek = [];
				const infoDay = [];
				const subtract = 1;
				const max = 6;
				for (let i = 0; i <= max; i++) {
					yesterday.setDate(yesterday.getDate() - subtract);
					infoWeek[i] = yesterday.getMonth() + 1 + "/" + yesterday.getDate();
					infoDay[i] = yesterday.getDay();
					jsWeekAgo2.push({
						label: infoWeek[i],
						jsGetDay: infoDay[i],
						initNum: 0,
					});
				}
				const reversedLabelWeek = infoWeek.reverse();
				const reversedDataWeek = jsWeekAgo2.reverse();
				const weeksObj = {
					weekLabel: reversedLabelWeek,
					weekData: reversedDataWeek,
				};
				return weeksObj;
			};
			//firestoreのDBでも時間が指定できるように変換する
			const startDate = firebase.firestore.Timestamp.fromDate(
				specify_lastweek()
			);
			const endDate = firebase.firestore.Timestamp.fromDate(yesterday);
			firebase
				.firestore()
				.collection("dots")
				.orderBy("createdAt")
				.where("userId", "==", currentUser.uid)
				.startAt(startDate)
				.endBefore(endDate)
				.get()
				.then((snapshot) => {
					const hope2 = init_arrayWeeks2().weekData;
					snapshot.docs.map((doc) => {
						const item2 = doc.data();
						const receivedDay = item2.getday;
						const hours = item2.working;
						for (let i = 0; i < hope2.length; i++) {
							if (receivedDay === hope2[i].jsGetDay) {
								hope2[i].initNum = hours;
							}
						}
					});
					const finalWeek2 = hope2.map((el) => {
						return el.initNum;
					});
					dispatch(fetch_lastWeekDots(finalWeek2));
					// set_filledWeek2(finalWeek2);
				});
		}
	}, [currentUser]);
	// ----------------

	return (
		<>
			{loading ? (
				<AuthProvider>
					<Router>
						<Switch>
							<LoggedInRoute exact path="/" component={Base} />
							<Route exact path="/home" component={Home} />
							<Route exact path="/signin" component={SignIn} />
							<Route exact path="/signup" component={SignUp} />
							<LoggedInRoute exact path="/form" component={Form} />
							<Route exact path="/dot/:id" component={DotDetail} />
							<Route exact path="/dot/:id/edit" component={Edit} />
							<LoggedInRoute exact path="/ourdots" component={OurDots} />
							<LoggedInRoute exact path="/ranking" component={Ranking} />
						</Switch>
					</Router>
				</AuthProvider>
			) : (
				<>
					<TITLE>Now Loading</TITLE>
					<CircleLoading />
				</>
			)}
		</>
	);
}
