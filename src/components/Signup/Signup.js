import React, { useState } from "react";
import "./Signup.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const registerHandle = () => {
    auth
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .catch((e) => setRegisterError(e.message));
  };

  return (
    <div className="signup ">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <h2 className="text-center">Sign up to Twitter</h2>

      <div className="login__form">
        <div className="login__loginEmail form-group">
          <label htmlFor="">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setRegisterEmail(e.target.value)}
            value={registerEmail}
          />
        </div>

        <div className="login__loginEmail form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setregisterPassword(e.target.value)}
            value={registerPassword}
          />
        </div>
        <p className="text-danger">{registerError}</p>
        <button
          type="submit"
          className="btn btn-primary btn-block login__submit"
          onClick={registerHandle}
        >
          Sign up
        </button>

        <Link to="/login" className="login__signup_link">
          Log In for Twitter
        </Link>
      </div>
    </div>
  );
}

export default Register;
