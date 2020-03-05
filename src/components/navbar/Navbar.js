import "bootstrap/dist/css/bootstrap.css";
import "./navbar.scss";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignInHere from "./SignInHere";
import SignOutHere from "./SignOutHere";

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
              <NavLink className="link-nav" to="/">
                Home
              </NavLink>
          </li>
          <li className="nav-item  mt-3">
            <NavLink className="link-nav" to="/Quiz">
              Quiz
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

// const mapThisState = state => {
//   console.log(state);
//   return {};
// };

export default Navbar;