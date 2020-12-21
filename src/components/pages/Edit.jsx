import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetch_todayDotLength } from "../../reducks/star/action";
import { AuthContext } from "../../firebase/AuthService";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import { makeStyles } from "@material-ui/core/styles";
import FormSideBar from "../templates/FormSideBar";
import firebase from "firebase";
import styled from "styled-components";

const useStyles = makeStyles({
	container: {
		width: "400px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translateY(-50%) translateX(-50%)",
	},
	input: {
		width: "100%",
	},
	div: {
		height: "40px",
	},
	text: {
		width: "400px",
	},
});

const bodyStyle = {
	float: "left",
};

const H3 = styled.h3`
	text-align: center;
	padding-bottom: 5%;
	color: #003399;
	font-weight: bold;
`;

const WRAPPER = styled.div`
	margin-bottom: 7%;
`;

const LABEL = styled(InputLabel)`
	font-size: 0.8rem;
`;

const ERROR = styled.p`
	color: #ff4500;
	margin-left: 14px;
	margin-right: 14px;
	line-height: 1.66;
	font-size: 0.75rem;
	letter-spacing: 0.03333em;
`;

const Edit = () => {
	const classes = useStyles();
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useContext(AuthContext);
	const [dot, set_dot] = useState();
	const [tags, set_tags] = useState();
	const { register, handleSubmit, errors } = useForm();

	useEffect(() => {
		firebase
			.firestore()
			.collection("dots")
			.get()
			.then((data) => {
				const dots = data.docs.map((doc) => {
					return doc.data();
				});
				set_dot(dots.find((dot) => dot.dotId === id));
				dot && set_tags(dot.tags);
			});
	}, []);

	useEffect(() => {
		if (dot) {
			set_tags(dot.tags);
		}
	}, [dot]);

	// starをリロードしても正常に表示させる
	if (user) {
		const get_todayMidnight = () => {
			const TODAY_MIDNIGHT = new Date();
			TODAY_MIDNIGHT.setHours(0);
			TODAY_MIDNIGHT.setMinutes(0);
			return TODAY_MIDNIGHT.setSeconds(0);
		};

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

	const onSubmit = (data) => {
		// console.log(new Date(dot.createdAt.seconds * 1000));
		firebase
			.firestore()
			.collection("dots")
			.doc(dot.dotId)
			.set({
				dotId: dot.dotId,
				title: data.title,
				text: data.text,
				// url: data.url,
				working: Number(data.working),
				tags: tags,
				userId: user.uid,
				userName: user.displayName,
				createdAt: new Date(dot.createdAt.seconds * 1000),
				getday: dot.getday,
			})
			.then(function () {
				console.log("Document successfully edited!");
				history.push("/");
			});
	};

	return (
		<React.Fragment>
			<Header />
			<div style={bodyStyle}>
				<FormSideBar tags={tags} set_tags={set_tags} />
			</div>
			<form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
				<div className={classes.div}> </div>
				<H3>EDIT PAGE</H3>
				<LABEL>タイトル</LABEL>
				<input
					type="text"
					name="title"
					label="テキスト"
					className={classes.input}
					defaultValue={dot && dot.title}
					ref={register({ required: true })}
				/>
				{errors.title && <ERROR>タイトルを記入してください</ERROR>}
				<WRAPPER className={classes.div}>
					{tags &&
						tags.map((tag) => {
							return `${tag} / `;
						})}
				</WRAPPER>
				<WRAPPER>
					<LABEL>勉強時間</LABEL>

					<select
						id="working"
						name="working"
						defaultValue={dot && dot.working}
						ref={register({ required: true })}
					>
						{dot && (
							<option value={dot.working} selected>
								{dot.working}
							</option>
						)}
						<option value="0.5">0.5</option>
						<option value="1.0">1.0</option>
						<option value="1.5">1.5</option>
						<option value="2.0">2.0</option>
						<option value="2.5">2.5</option>
						<option value="3.0">3.0</option>
						<option value="3.5">3.5</option>
						<option value="4.0">4.0</option>
						<option value="4.5">4.5</option>
						<option value="5.0">5.0</option>
						<option value="5.5">5.5</option>
						<option value="6.0">6.0</option>
						<option value="6.5">6.5</option>
						<option value="7.0">7.0</option>
						<option value="7.5">7.5</option>
						<option value="8.0">8.0</option>
						<option value="8.5">8.5</option>
						<option value="9.0">9.0</option>
						<option value="10">9+</option>
					</select>
				</WRAPPER>
				<LABEL>内容</LABEL>
				<TextField
					id="outlined-multiline-static"
					name="text"
					className={classes.text}
					multiline
					rows={6}
					variant="outlined"
					defaultValue={dot && dot.text}
					inputRef={register({ required: true })}
				/>
				{errors.text && <ERROR>内容を記入してください</ERROR>}
				<div className={classes.div}> </div>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					startIcon={<SaveSharpIcon />}
					type="submit"
				>
					この内容に変更する
				</Button>
			</form>
			<Footer />
		</React.Fragment>
	);
};
export default Edit;
