import React, { useState } from "react";
import "./Login.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const loginHandle = () => {
    setLoginError("");

    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((e) => setLoginError(e.message));
  };

  return (
    <div className="login">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <h2 className="text-center">Log in to Twitter</h2>

      <div className="login__form">
        <div className="login__loginEmail form-group">
          <label htmlFor="">Email address</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setLoginEmail(e.target.value)}
            value={loginEmail}
          />
        </div>
        <div className="login__loginEmail form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
          />
        </div>
        <p className="text-danger">{loginError}</p>
        <button
          type="submit"
          className="btn btn-primary btn-block login__submit"
          onClick={loginHandle}
        >
          Log in
        </button>
        <Link to="/signup" className="login__signup_link">
          Sign up for Twitter
        </Link>
      </div>
    </div>
  );
}

export default Login;
