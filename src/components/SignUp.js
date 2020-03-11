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
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          err: err.message
        });
      });
  };

  render() {
    return (
      <div className="thisCard">
        <div className="card-2 mx-auto bg-dark ">
          <div className="container my-5 max-auto">
            <form onSubmit={this.handleSubmit} className="white">
              <div className="form-group"></div>
              <div className="form-group">
                <label className="text-white" htmlFor="email">
                  Email address
                </label>
                <input
                  onChange={this.handleChange}
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                />
                <small id="emailHelp" className="form-text text-white">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="displayError">
                {this.state.err ? (
                  <div className="text-white">{this.state.err}</div>
                ) : (
                  ""
                )}
              </div>

              <button type="submit" className="btn btn-light">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
