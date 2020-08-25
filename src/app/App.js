import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Spin } from "antd";
import * as firebase from "firebase/app";
import { setToken } from "../store/user-actions";
import { AuthRoute } from "../components";
import HomePage from "../pages";
import LoginSignupPage from "../pages/login-signup";
import getStore from "../store";
import "./App.css";

const store = getStore();

function App() {
  const [setup, setSetup] = useState(true);

  useEffect(() => {
    const unscr = firebase.auth().onAuthStateChanged((user) => {
      store.dispatch(setToken(user?.uid ?? null));
      clearTimeout(tId);
      unscr();
      setSetup(false);
    });

    let tId = setTimeout(() => {
      setSetup(false);
      unscr();
    }, 5000);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      store.destroy();
    };
    //eslint-disable-next-line
  }, []);

  if (setup) {
    return (
      <div className="app">
        <Spin />
      </div>
    );
  }

  return (
    <Router basename="/covid19">
      <Provider store={store}>
        <div className="app">
          <Switch>
            <Route exact path="/login-signup" component={LoginSignupPage} />
            <AuthRoute
              exact
              redirectTo="/login-signup"
              path="/"
              component={HomePage}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
