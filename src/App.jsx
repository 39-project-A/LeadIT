import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetch_dot, fetch_dots } from "./reducks/dots/action";
import { fetch_today_dot } from "./reducks/star/action";
import Base from "./components/pages/Base";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import MyDots from "./components/pages/MyDots";
import DotDetail from "./components/pages/DotDetail";
import Form from "./components/pages/Form";
import OurDots from "./components/pages/OurDots";
import firebase from "./firebase/firebase";
import { AuthProvider } from "./firebase/AuthService";
import { AuthContext } from "./firebase/AuthService";
import LoggedInRoute from "./firebase/LoggedInRoute";
import Ranking from "./components/pages/Ranking";

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase
			.firestore()
			.collection("dots")
			.orderBy("createdAt", "asc")
			.get()
			.then((data) => {
				const RESPONSE = data.docs.map((doc) => {
					return {
						dotId: doc.data().dotId,
						title: doc.data().title,
						text: doc.data().text,
						working: doc.data().working,
						tags: doc.data().tags,
						userId: doc.data().userId,
						userName: doc.data().userName,
						createdAt: new Date(doc.data().createdAt.seconds * 1000),
						getday: doc.data().getday,
					};
				});
				dispatch(fetch_dots(RESPONSE));
			});
	}, []);

	return (
		<AuthProvider>
			<Router>
				<Switch>
					<LoggedInRoute exact path="/" component={Base} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/signin" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/mydots" component={MyDots} />
					<Route exact path="/form" component={Form} />
					<Route exact path="/dot/:id" component={DotDetail} />
					<Route exact path="/mydots" component={MyDots} />
					<Route exact path="/ourdots" component={OurDots} />
					<Route exact path="/ranking" component={Ranking} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}
