import React, { Component } from "react";

class Home extends Component {
  state = {
    quizes: null
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
