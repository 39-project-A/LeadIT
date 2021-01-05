import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase/firebase";
import { fetch_todayDotLength } from "../../reducks/star/action";
import { AuthContext } from "../../firebase/AuthService";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import FormSideBar from "../templates/FormSideBar";
import shortid from "shortid";
import { add_dot } from "../../reducks/dots/action";
import { set_star } from "../../reducks/star/action";
import {
	BODY,
	CONTAINER,
	TITLE,
	FORM,
	UL,
	LI,
	LABEL,
	SUBMIT,
	INPUT,
	SELECT,
	TEXTAREA,
	TAGS,
	TEXTLABEL,
	ERR,
	ALRADY,
	TY,
} from "../../style/formstyle";

const Form = () => {
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();
	const user = useContext(AuthContext);
	const star = useSelector((state) => state.star);
	const [tags, set_tags] = useState([]);

	const onSubmit = (data) => {
		const dotId = shortid.generate();
		console.log(data);
		if (star === 0) {
			firebase
				.firestore()
				.collection("dots")
				.doc(dotId)
				.set({
					dotId: dotId,
					title: data.title,
					text: data.text,
					working: Number(data.working),
					tags: tags,
					userId: user.uid,
					userName: user.displayName,
					createdAt: new Date(),
					getday: new Date().getDay(),
					getDate: new Date().toDateString(),
				});
			dispatch(
				add_dot({
					dotId: dotId,
					title: data.title,
					text: data.text,
					working: Number(data.working),
					tags: tags,
					userId: user.uid,
					userName: user.displayName,
					createdAt: new Date(),
					getDate: new Date().toDateString(),
				})
			);
			dispatch(set_star());
		}
	};

	return (
		<BODY>
			<Header />
			{star === 0 && (
				<div
					style={{
						float: "left",
					}}
				>
					<FormSideBar tags={tags} set_tags={set_tags} />
				</div>
			)}
			{star === 0 && (
				<CONTAINER>
					<TITLE>What did you do today?</TITLE>
					<FORM id="form" className="form" onSubmit={handleSubmit(onSubmit)}>
						<UL>
							<LI>
								<LABEL for="title">
									&emsp;Title:
									{errors.title && (
										<ERR>
											&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;title is required!!
										</ERR>
									)}
								</LABEL>
								<INPUT
									type="text"
									placeholder="Title"
									id="title"
									name="title"
									tabindex="1"
									ref={register({
										required: true,
									})}
								/>
							</LI>
							<LI>
								<LABEL>&emsp;Tags: please select tags from the left bar</LABEL>
								<TAGS>
									<span>
										{tags &&
											tags.map((tag) => {
												return `${tag} / `;
											})}
									</span>
								</TAGS>
							</LI>
							<LI>
								<LABEL for="working">&emsp;Study hours:</LABEL>
								<SELECT
									id="working"
									name="working"
									ref={register({ required: true })}
								>
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
								</SELECT>
							</LI>
							<LI>
								<TEXTLABEL for="text">
									&emsp;Text:
									{errors.text && (
										<ERR>
											&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;text is required!!
										</ERR>
									)}
								</TEXTLABEL>
								<TEXTAREA
									placeholder="Text…"
									id="text"
									name="text"
									tabindex="3"
									inputRef={register({ required: true })}
								></TEXTAREA>
							</LI>
						</UL>
						<SUBMIT type="submit" value="Send Dot" id="submit" />
					</FORM>
				</CONTAINER>
			)}
			{star === 1 && (
				<ALRADY>
					<TY>Thank you for your dot!!</TY>
					<p>you have already submitted today's dot</p>
				</ALRADY>
			)}
			<Footer />
		</BODY>
	);
};
export default Form;
