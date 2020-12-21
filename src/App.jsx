import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_dots } from "./reducks/dots/action";
import Base from "./components/pages/Base";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import MyDots from "./components/pages/MyDots";
import DotDetail from "./components/pages/DotDetail";
import Form from "./components/pages/Form";
import OurDots from "./components/pages/OurDots";
import "firebase/app";
import "firebase/firestore";
import firebase from "firebase/app";
import { AuthProvider } from "./firebase/AuthService";
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
  firebase
    .firestore()
    .collection("dots")
    .get()
    .then((data) => {
      const RESPONSE = data.docs.map((doc) => {
        return doc.data();
      });
      dispatch(fetch_dots(RESPONSE));
    });

  const LoggedInRoute = ({ component: Component }) => {
    useEffect(() => {
      set_loading(reduxLoading);
    });
    if (reduxLoading === "default") {
      console.log(loading);
      return <Route render={(props) => <Redirect to={"/home"} />} />;
    } else {
      console.log(loading);
      return <Route render={(props) => <Component {...props} />} />;
    }
  };
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
              <LoggedInRoute exact path="/mydots" component={MyDots} />
              <LoggedInRoute exact path="/form" component={Form} />
              <LoggedInRoute exact path="/dot/:id" component={DotDetail} />
              <LoggedInRoute exact path="/dot/:id/edit" component={Edit} />
              <LoggedInRoute exact path="/mydots" component={MyDots} />
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
