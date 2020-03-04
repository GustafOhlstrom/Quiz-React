import React from "react";
import { Link } from "react-router-dom";
import SignInHere from "./SignInHere";
import SignOutHere from "./SignOutHere";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Quiz master
      </a>
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
          <li className="nav-item active">
            <SignOutHere />
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item">
            <SignInHere />
          </li>
          <Link to="/" className="rounded">
            IM
          </Link>
        </ul>
      </div>
    </nav>
  );
};

const mapThisState = state => {
  console.log(state);
  return {};
};

export default Navbar;
