import React from "react";
import { auth } from "../config/fbConfig";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    const { email, password } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        console.log("Succesful!", credentials);
        this.props.history.push("/");
      })
      .catch(err => {
        // Make a error message that displays here!
        console.log("Failed!!!", err);
      });
  };

  render() {
    return (
      <div className="container my-5">
        <form onSubmit={this.onSubmit} className="white">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="firstName"
              aria-describedby="emailHelp"
              placeholder="Firstname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="lastName"
              aria-describedby="lastName"
              placeholder="Lastname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={this.onChange}
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
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-light">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
