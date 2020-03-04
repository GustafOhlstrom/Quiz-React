import React from "react";
import { NavLink } from "react-router-dom";

const SignInHere = () => {
  return (
    <ul className="right-now d-flex">
      <li>
        <NavLink className="link-nav" to="/login">
          Log in
        </NavLink>
      </li>
      <li>
        <NavLink className="link-nav" to="/">
          Log out
        </NavLink>
      </li>
    </ul>
  );
};

export default SignInHere;
