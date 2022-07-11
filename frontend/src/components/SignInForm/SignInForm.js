import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../Button/Button";

export default function SignInForm(props) {
  //const [username, setUsername] = useState();
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
