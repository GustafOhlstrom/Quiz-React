import React from "react";

class LogIn extends React.Component {
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
  };

  render() {
    return (
      <div className="container my-5">
        <form onSubmit={this.onSubmit} className="white">
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
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default LogIn;
