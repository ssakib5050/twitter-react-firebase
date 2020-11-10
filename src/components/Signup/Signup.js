import React from "react";
import "./Signup.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="signup dev">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <h2 className="text-center">Sign up to Twitter</h2>

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
