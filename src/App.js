import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./config/fbConfig";

import Navbar from "./components/navbar/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Quiz from "./components/quiz/Quiz";
import CreateQuiz from "./components/createQuiz/CreateQuiz";

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
          <Navbar user={this.state.user} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/CreateQuiz" component={CreateQuiz} />
            <Route path="/LogIn" component={LogIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/:quiz_id" component={Quiz} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
