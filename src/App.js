import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./config/fbConfig";

import Navbar from "./components/navbar/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Quiz from "./components/quiz/Quiz"

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.onAuthStateChangedListener = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({
          user: {
            email: authUser.email
          }
        });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  componentWillUnmount() {
    this.onAuthStateChangedListener();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {this.state.user ? (
            <p className="loggedin-andout">
              You are logged in as: {this.state.user.email}
            </p>
          ) : (
            <p className="loggedin-andout">Noone is logged in</p>
          )}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Quiz" component={Quiz} />
            <Route path="/LogIn" component={LogIn} />
            <Route path="/SignUp" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
