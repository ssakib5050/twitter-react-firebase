import React, { useState } from "react";
import "./Setup.css";

import { FontAwesomeIcon, faTwitter } from "../../fontawesome";
import {} from "react-router-dom";
import { auth, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function Setup() {
  const [setupFullname, setSetupFullname] = useState("");
  const [setupImage, setSetupImage] = useState("");
  const [setupError, setSetupError] = useState("");

  const setupHandle = () => {
    setSetupError("");

    if (!setupFullname) {
      return setSetupError("Fullname must not be empty");
    }

    if (!setupImage) {
      return setSetupError("Image must not be empty");
    }

    if (!imageFileTypeMatch(setupImage.name)) {
      return setSetupError("Invalid Image Filetype");
    }

    const file = setupImage;

    const uploadTask = storage
      .ref()

      .child(`images/${uuidv4()}.${setupImage.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setSetupError("Sorry Something Went Wrong");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const user = auth.currentUser;

          user
            .updateProfile({
              displayName: setupFullname,
              photoURL: downloadUrl,
            })
            .then(function () {
              // Update successful.
              window.location.replace("/");
            })
            .catch(function (error) {
              // An error happened.
              setSetupError("Sorry Something went wrong");
            });
        });
      }
    );
  };
  return (
    <div className="setup">
      <div className="login__brand_wrap">
        <FontAwesomeIcon icon={faTwitter} className="login__brand" />
      </div>

      <div className="login__form">
        <div className="login__loginEmail form-group">
          <label for="">Full Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter full name"
            onChange={(e) => setSetupFullname(e.target.value)}
            value={setupFullname}
          />
        </div>
        <div class="custom-file form-group">
          <input
            type="file"
            class="custom-file-input"
            accept="image/*"
            onChange={(e) => setSetupImage(e.target.files[0])}
          />
          <label class="custom-file-label" for="validatedInputGroupCustomFile">
            {setupImage ? setupImage.name : "Choose file..."}
          </label>
        </div>

        <br />
        <br />
        <p className="text-danger">{setupError}</p>
        <button
          type="submit"
          class="btn btn-primary btn-block login__submit"
          onClick={setupHandle}
        >
          Continue
        </button>
        <br />
      </div>
    </div>
  );
}

function imageFileTypeMatch(filename) {
  const fileType = filename.split(".").pop();
  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    return true;
  }
  return false;
}
export default Setup;
