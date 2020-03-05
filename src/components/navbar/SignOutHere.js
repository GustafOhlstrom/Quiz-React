import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink className="link-nav" to="/signup">
          Sign up
        </NavLink>
      </li>
      <li>
        <NavLink className="link-nav" to="/"></NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
