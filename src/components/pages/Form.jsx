import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase/firebase";
import { fetch_todayDotLength } from "../../reducks/star/action";
import { AuthContext } from "../../firebase/AuthService";
import TextField from "@material-ui/core/TextField";
import Header from "../templates/Header/Header.jsx";
import Footer from "../templates/Footer/Footer.jsx";
import FormSideBar from "../templates/FormSideBar";
import shortid from "shortid";
import { add_dot } from "../../reducks/dots/action";
import { set_star } from "../../reducks/star/action";

const useStyles = makeStyles({
  container: {
    width: "400px",
    margin: "0 auto",
  },
  input: {
    width: "343px",
  },
  div: {
    height: "40px",
  },
  text: {
    width: "400px",
  },
});

const Form = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const user = useContext(AuthContext);
  const star = useSelector((state) => state.star);
  const [tags, set_tags] = useState([]);

  const get_todayMidnight = () => {
    const TODAY_MIDNIGHT = new Date();
    TODAY_MIDNIGHT.setHours(0);
    TODAY_MIDNIGHT.setMinutes(0);
    return TODAY_MIDNIGHT.setSeconds(0);
  };

  // if (user) {
  //   firebase
  //     .firestore()
  //     .collection("dots")
  //     .where("userId", "==", user.uid)
  //     .where("createdAt", ">=", new Date(get_todayMidnight()))
  //     .get()
  //     .then((data) => {
  //       const todayDot = data.docs.map((doc) => {
  //         return doc.data();
  //       });
  //       dispatch(fetch_todayDotLength(todayDot.length));
  //     });
  // }

  // const onSubmit = (data) => {
  //   const dotId = shortid.generate();
  //   if (star === 0) {
  //     firebase
  //       .firestore()
  //       .collection("dots")
  //       .doc(dotId)
  //       .set({
  //         dotId: dotId,
  //         title: data.title,
  //         text: "",
  //         url: "",
  //         working: Number(data.working),
  //         tags: tags,
  //         userId: user.uid,
  //         userName: user.displayName,
  //         createdAt: new Date(),
  //         getday: new Date().getDay(),
  //       });
  //     dispatch(
  //       add_dot({
  //         dotId: dotId,
  //         title: data.title,
  //         text: "",
  //         url: "",
  //         working: Number(data.working),
  //         tags: tags,
  //         userId: user.uid,
  //         userName: user.displayName,
  //         createdAt: new Date(),
  //       })
  //     );
  //     dispatch(set_star());
  //   }
  // };

  return (
    <React.Fragment>
      <Header />
      <div
        style={{
          float: "left",
        }}
      >
        <FormSideBar tags={tags} set_tags={set_tags} />
      </div>
      {/* <form className={classes.container} onSubmit={console.log("HELLO")}>
        <div className={classes.div}> </div>
        {star === 1 ? (
          <p style={{ color: "#e65c00", textAlign: "center" }}>
            今日のdotはすでに作成済みです！
          </p>
        ) : (
          ""
        )}
        <label>
          <input
            type="text"
            name="title"
            className={classes.input}
            ref={register({ required: true })}
          />
        </label>
        {star === 0 ? <input type="submit" value="Send" /> : ""}
        <div className={classes.div}>
          {tags &&
            tags.map((tag) => {
              return `${tag} / `;
            })}
        </div>
        <div className={classes.div}> </div>
        <select name="working" ref={register({ required: true })}>
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
        <TextField
          id="outlined-multiline-static"
          name="text"
          className={classes.text}
          multiline
          rows={6}
          variant="outlined"
          ref={register({ required: true })}
        />
        <div className={classes.div}> </div>
      </form> */}
      <Footer />
    </React.Fragment>
  );
};
export default Form;
