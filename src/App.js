import "./App.css";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.js";
import MiddleSidebar from "./components/MiddleSidebar/MiddleSidebar.js";
import RightSidebar from "./components/RightSidebar/RightSidebar.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import Setup from "./components/Setup/Setup.js";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid dev">
      <Switch>
        <Route path="/" exact>
          <div className="App dev">
            <div className="leftSidebar d-md-block d-none dev">
              <LeftSidebar />
            </div>
            <div className="middleSidebar dev">
              <MiddleSidebar />
            </div>
            <div className="rightSidebar  d-xl-block d-none dev">
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
      </Switch>
    </div>
  );
}

export default App;
