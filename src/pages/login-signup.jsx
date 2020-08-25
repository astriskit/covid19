import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup } from "../store/user-actions";

const LoginSignup = ({ onLogin, loading, onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleUsername = ({ target: { value } }) => {
    setUsername(value);
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleLoginFail = (err) => {
    message.error(`Login failed: ${err.message}`);
  };

  const handleLoginSuccess = () => {
    message.success("User logged in");
    history.push("/");
  };

  const handleLogin = () => {
    if (username && password) {
      onLogin({
        username,
        password,
        onFail: handleLoginFail,
        onSuccess: handleLoginSuccess,
      });
    } else {
      message.error("Login needs username and password");
    }
  };

  const handleSignupSuccess = () => {
    message.success("User signed up. You may login!");
  };
  const handleSignupFail = (err) => {
    message.error(err.message || "Signup failed");
  };

  const handleSignup = () => {
    if (!username || !password) {
      message.error("Login needs username and password");
      return;
    }
    onSignup({
      username,
      password,
      onSuccess: handleSignupSuccess,
      onFail: handleSignupFail,
    });
  };

  return (
    <Card
      className="login-section"
      title="Please login or signup"
      extra={[
        <Button
          onClick={handleSignup}
          key="signup"
          data-cy="signup"
          disabled={loading}
        >
          Signup
        </Button>,
      ]}
      bodyStyle={{
        display: "grid",
        placeItems: "center",
      }}
      style={{
        maxWidth: "50vw",
        minWidth: "300px",
      }}
      bordered
      hoverable
    >
      <Input
        data-cy="username"
        onChange={handleUsername}
        addonBefore="Username"
        style={{ marginBottom: "0.4rem" }}
      />
      <Input.Password
        data-cy="password"
        onChange={handlePassword}
        addonBefore="Password"
        style={{ marginBottom: "0.4rem" }}
      />
      <Button
        data-cy="login"
        type="primary"
        loading={loading}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Card>
  );
};

LoginSignup.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSignup: PropTypes.func.isRequired,
};

const mapPropsToDispatch = { onLogin: login, onSignup: signup };
const mapStateToProps = ({ user: { loading } }) => ({ loading });

const LoginSignupActive = connect(
  mapStateToProps,
  mapPropsToDispatch
)(LoginSignup);

export default LoginSignupActive;
