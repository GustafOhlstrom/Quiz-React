import React from "react";
import { auth } from "../config/fbConfig";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    err: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        console.log("Succesful!");
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          err: err.message
        });
        console.log("Failed!!!", err);
      });
  };

  render() {
    return (
      <div className="container my-5 max-auto">
        <form onSubmit={this.handleSubmit} className="white">
          <div className="form-group"></div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={this.handleChange}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            <small id="emailHelp" className="form-text text-dark">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="displayError">
            {this.state.err ? <div>{this.state.err}</div> : ""}
          </div>

          <button type="submit" className="btn btn-dark">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
