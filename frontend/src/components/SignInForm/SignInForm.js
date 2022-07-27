import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../Button/Button";

/**
 * It takes a props object as a parameter, it uses the useState hook to create a state for the email,
 * password and unauthorizedMessage, it uses the useNavigate hook to navigate to the home page, it has
 * a signIn function that sends a POST request to the server to sign in, and it returns a form with an
 * email input, a password input, a sign in button and a message that is displayed when the user enters
 * a wrong email or password
 * @param props - the props that are passed to the component
 * @returns A form with an email input, a password input and a button.
 */
export default function SignInForm(props) {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [unauthorizedMessage, setUnauthorizedMessage] = useState("");

  let navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((value) => {
            props.setUsername(value.username);
            props.setIsLoggedIn(true);
            localStorage.setItem("loggedInUser", value.username);
            localStorage.setItem("privilege", value.privilege);
            navigate("/");
          });
        } else {
          if (res.status === 401) {
            setUnauthorizedMessage("Mot de passe ou nom d'utilisateur erroné");
          }
        }
      })
      .catch(() => console.log("Impossible de se connecter"));
  };

  return (
    <div className="signInUp">
      <form className="form">
        <label htmlFor={"email"}>Adresse email</label>
        <input
          className="input"
          type={"text"}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor={"password"}>Mot de passe</label>
        <input
          className="input"
          type={"password"}
          name={"password"}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <Button
          className={"signinButton"}
          onClick={signIn}
          action="Se connecter"
        />
        {unauthorizedMessage}
      </form>
    </div>
  );
}
