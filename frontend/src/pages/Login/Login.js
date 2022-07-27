import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

/**
 * It renders a div with two links and an outlet
 * @returns A function that returns a div with a nav and an outlet.
 */
export default function Login() {
  const location = useLocation();

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
