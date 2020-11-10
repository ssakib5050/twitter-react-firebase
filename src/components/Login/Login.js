import React, { useState } from "react";
import "./Login.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import { Link } from "react-router-dom";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <div className="login dev">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <h2 className="text-center">Log in to Twitter</h2>

      <div className="login__form">
        <div className="login__loginEmail form-group">
          <label for="">Email address</label>
          <input type="email" class="form-control" />
        </div>

        <div className="login__loginEmail form-group">
          <label for="">Password</label>
          <input type="email" class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary btn-block login__submit">
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
