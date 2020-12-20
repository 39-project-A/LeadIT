import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { AuthContext } from "../../firebase/AuthService";
import firebase from "../../firebase/firebase";
import { add_dot } from "../../reducks/dots/action";
import { set_star } from "../../reducks/star/action";

const Select = React.forwardRef(({ label }, ref) => (
  <>
    <label>{label}</label>
    <select name={label} ref={ref}>
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
    </select>
  </>
));

export default function MiniForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const star = useSelector((state) => state.star);
  const user = useContext(AuthContext);

  const onSubmit = (data) => {
    const dotId = shortid.generate();
    if (star === 0) {
      firebase
        .firestore()
        .collection("dots")
        .doc(dotId)
        .set({
          dotId: dotId,
          title: data.title,
          text: "",
          url: "",
          working: Number(data.working),
          tags: [],
          userId: user.uid,
          userName: user.displayName,
          createdAt: new Date(),
          getday: new Date().getDay(),
        });
      dispatch(
        add_dot({
          dotId: dotId,
          title: data.title,
          text: "",
          url: "",
          working: Number(data.working),
          tags: [],
          userId: user.uid,
          userName: user.displayName,
          createdAt: new Date(),
        })
      );
      dispatch(set_star());
    }
  };

  const setSendButton = () => {
    if (star === 0) {
      return <input type="submit" value="Send" />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input name="title" ref={register({ required: true })} />
      <Select label="working" ref={register({ required: true })} />
      {setSendButton()}
    </form>
  );
}
