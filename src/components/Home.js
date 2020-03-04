import React, { Component } from "react";
import db from "../config/fbConfig";

class Home extends Component {
  state = {
    quizes: null
  };

  componentDidMount = () => {
    db.collection("quizes")
      .get()
      .then(snapshot => {
        const quizes = snapshot.docs.map(quiz => ({
          ...quiz.data(),
          id: quiz.id
        }));
        this.setState({ quizes });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="text-center mt-4">Welcome to the Quiz Master</h1>
      </div>
    );
  }
}

export default Home;
