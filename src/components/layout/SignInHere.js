import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../config/fbConfig";

const SignInHere = props => {
  const SignHere = () => {
    auth.signOut().then(() => {
      console.log("Signed out");
    });
  };

  return (
    <ul className="right-now d-flex">
      <li>
        <NavLink className="link-nav" to="/login">
          Log in
        </NavLink>
      </li>
      <li>
        <NavLink className="link-nav" to="/">
          <span className="link-nav" onClick={SignHere}>
            Log out
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default SignInHere;
