import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import firebase from "../../firebase/firebase";
import { delete_dot } from "../../reducks/dots/action";
import { unset_star } from "../../reducks/star/action";

const useStyles = makeStyles((theme) => ({
	primary: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
}));

export default function Dots({ dot }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	let dotTime = 0;

	const handle_delete = () => {
		// -----画面上からdotを消す-----//
		dispatch(delete_dot(dot));

		// -----Star黒くする用-----//
		const get_todayMidnight = () => {
			const TODAY_MIDNIGHT = new Date();
			TODAY_MIDNIGHT.setHours(0);
			TODAY_MIDNIGHT.setMinutes(0);
			return TODAY_MIDNIGHT.setSeconds(0);
		};

		const dotTime = new Date(dot.createdAt)
		// 👇以前まで書いてたverもしばらく取っておきます
		// if (new Date(dot.createdAt).toString() === "Invalid Date") {
		// 	dotTime = new Date(dot.createdAt.seconds * 1000);
		// } else {
		// 	dotTime = new Date(dot.createdAt);
		// }

		if (dotTime >= new Date(get_todayMidnight())) {
			dispatch(unset_star());
		}

		// -----firebaseからdotを消す-----//
		firebase
			.firestore()
			.collection("dots")
			.doc(dot.dotId)
			.delete()
			.then(function () {
				console.log("Document successfully deleted!");
			})
			.catch(function (error) {
				console.error("Error removing document: ", error);
			});
	};

	return (
		<div>
			<Link style={{ display: "flex" }} to={`/dot/${dot.dotId}`}>
				<ListItemText
					className={classes.list}
					primary={dot.title}
					classes={{ primary: classes.primary }}
				/>
			</Link>
			<button onClick={handle_delete}>削除</button>
			<Divider />
		</div>
	);
}
