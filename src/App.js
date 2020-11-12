import React, { useEffect, useState } from "react";
import "./App.css";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.js";
import MiddleSidebar from "./components/MiddleSidebar/MiddleSidebar.js";
import RightSidebar from "./components/RightSidebar/RightSidebar.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import Setup from "./components/Setup/Setup.js";
import Post from "./components/Post/Post.js";

import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase";

import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setGlobalData(user.providerData);

        if (user.displayName) {
          return history.push("/");
        }
        return history.push("/setup");
      }
      return history.push("/login");
    });
  }, []);
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/" exact>
          <div className="App ">
            <div className="leftSidebar d-md-block d-none ">
              <LeftSidebar data={globalData} />
            </div>
            <div className="middleSidebar ">
              <MiddleSidebar data={globalData} />
            </div>
            <div className="rightSidebar  d-xl-block d-none ">
              <RightSidebar />
            </div>
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/setup">
          <Setup />
        </Route>
        <Route path="/post/:postid">
          <Post />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
