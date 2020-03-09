import "bootstrap/dist/css/bootstrap.css";
import "./navbar.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../config/fbConfig";

<<<<<<< HEAD
class Navbar extends React.Component {
  handleClick() {
    auth.signOut().catch(err => console.error(err));
  }
=======
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="logohere">
        Quiz master
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item mt-3">
            <NavLink className="nav-link2" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <NavLink className="nav-link2" to="/CreateQuiz">
              Create a Quiz
            </NavLink>
          </li>
          <li className="nav-item  mt-3">
            <SignOutHere />
          </li>
          <li className="nav-item  mt-3">
            <SignInHere />
          </li>
        </ul>
      </div>
    </nav>
  );
};
>>>>>>> 4794c51fb28ef8041fec74fee3d2dd9a251f7506

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="logohere">
          Quiz master
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="link-nav">
              <NavLink className="link-nav" to="/">
                Home
              </NavLink>
            </li>
            <li className="link-nav">
              <NavLink className="link-nav" to="/Quiz">
                Quiz
              </NavLink>
            </li>
            <li>
              {this.props.user ? (
                <NavLink className="link-nav" to="/CreateQuiz">
                  Create Quiz
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              <NavLink className="link-nav" to="/SignUp">
                Sign Up
              </NavLink>
            </li>
            <li>
              {this.props.user ? (
                <NavLink onClick={this.handleClick} className="link-nav" to="/">
                  Log Out
                </NavLink>
              ) : (
                <NavLink className="link-nav" to="/LogIn">
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
