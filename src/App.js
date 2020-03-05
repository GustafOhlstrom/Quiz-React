<<<<<<< HEAD
import React from 'react';
// import Home from './components/Home'
import Quiz from './components/quiz/Quiz'

function App() {
	return (
		<div className="App">
			<Quiz />
		</div>
	);
=======
import React from "react";
import Home from "./components/Home";
import LogIn from "./components/Login and signup/LogIn";
import SignUp from "./components/Login and signup/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { auth } from "./config/fbConfig";

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
            <Route path="/LogIn" component={LogIn} />
            <Route path="/SignUp" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
>>>>>>> c53a5c5880949fb5d8d1e2eb048ed4ec5177ceeb
}

export default App;
