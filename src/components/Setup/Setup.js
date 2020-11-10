import React from "react";
import "./Setup.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import { Link } from "react-router-dom";

function Setup() {
  return (
    <div className="setup">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <h2 className="text-center">Setup</h2>

      <div className="login__form">
        <div className="login__loginEmail form-group">
          <label for="">Full Name</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter full name"
          />
        </div>
        <div class="custom-file form-group">
          <input type="file" class="custom-file-input" />
          <label class="custom-file-label" for="validatedInputGroupCustomFile">
            Choose file...
          </label>
        </div>
        <br />
        <br />
        <button type="submit" class="btn btn-primary btn-block login__submit">
          Continue
        </button>
        <br />
      </div>
    </div>
  );
}

export default Setup;
