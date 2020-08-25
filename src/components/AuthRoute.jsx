import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ isLoggedIn, token, redirectTo, ...rest }) => {
  if (isLoggedIn) {
    return <Route {...rest} />;
  }
  return <Redirect to={redirectTo} />;
};

const mapStateToProps = ({ user: { token } }, ownProps) => ({
  ...ownProps,
  isLoggedIn: !!token,
  token,
});

const AuthRouteActive = connect(mapStateToProps)(AuthRoute);

export default AuthRouteActive;
