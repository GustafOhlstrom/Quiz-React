import React from "react";
import Home from "./components/Home";
import LogIn from "./components/Login and signup/LogIn";
import SignUp from "./components/Login and signup/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/LogIn" component={LogIn} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
