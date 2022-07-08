import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();

  // console.log(location.pathname) "/login/signup"
  return (
    <div className="main">
      <div className="nav">
        <Link
          className={
            "nav__links " +
            (location.pathname === "/login/signup" ? "" : "nav__links--focus")
          }
          to="signIn"
        >
          Connexion
        </Link>
        <Link
          className={
            "nav__links " +
            (location.pathname === "/login/signup" ? "nav__links--focus" : "")
          }
          to="signup"
        >
          Inscription
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
