import React, { useEffect, useState } from "react";
import "../../pages/Login/Login.scss";
import PasswordMeter from "../PasswordMeter/PasswordMeter";
import Button from "../Button/Button";
import InputValidation from "../InputValidation/InputValidation";

export default function SignUp(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepetedPassword] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [message, setMessage] = useState();
  const [passwordDifferenceMessage, setPasswordDifferenceMessage] = useState();
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState();
  const [validationIsDisabled, setValidationIsDisabled] = useState(true);
  const [passwordSecurityLevel, setPasswordSecurityLevel] = useState();

  const [inputsChecks, setInputsChecks] = useState({
    username: false,
    email: false,
    password: false,
    repeatedPassword: false,
  });

  const getFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const checkPasswords = () => {
    if (password !== repeatedPassword) {
      setPasswordDifferenceMessage("Les mots de passe ne sont pas identiques");
    } else if (passwordSecurityLevel < 2) {
      setPasswordStrengthMessage(
        "Votre mot de passe est trop faible nous vous recommandons d'inclure au moins une majuscule et un caractère spécial"
      );
      setPasswordDifferenceMessage("");
    } else {
      setPasswordStrengthMessage("");
      setPasswordDifferenceMessage("");
    }
  };
  const signUp = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image.data);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Votre compte à été créé !");
        } else {
          setMessage(
            "Le nom d'utilisateur ou l'adresse e-mail est déja utilisée"
          );
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(
    () => {
      if (
        Object.values(inputsChecks).every(Boolean) &&
        passwordDifferenceMessage === ""
      ) {
        if (passwordSecurityLevel < 2) {
          setValidationIsDisabled(true);
        } else setValidationIsDisabled(false);
      } else setValidationIsDisabled(true);
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [inputsChecks]
  );
  return (
    <div className="signInUp">
      <form className="form">
        <InputValidation
          label="username"
          checks={["valueMissing"]}
          inputProps={{ type: "text", required: true }}
          labelText="Nom d'utilisateur"
          id="username"
          errorMessage="Veuillez choisir un nom d'utilisateur"
          setValue={setUsername}
          setInputsChecks={setInputsChecks}
          inputsChecks={inputsChecks}
        />

        <InputValidation
          label="email"
          checks={["typeMismatch", "valueMissing"]}
          inputProps={{ type: "email", required: true }}
          labelText="Adresse email"
          id="email"
          errorMessage="Veuillez renseigner une adresse e-mail valide"
          setValue={setEmail}
          setInputsChecks={setInputsChecks}
          inputsChecks={inputsChecks}
        />

        <InputValidation
          label="password"
          checks={["valueMissing"]}
          inputProps={{ type: "password", required: true }}
          labelText="Mot de passe"
          id="password"
          errorMessage="Veuillez renseigner un mot de passe"
          setValue={setPassword}
          setInputsChecks={setInputsChecks}
          inputsChecks={inputsChecks}
          checkPasswords={checkPasswords}
        />
        <InputValidation
          label="repeatedPassword"
          checks={["valueMissing"]}
          inputProps={{ type: "password", required: true }}
          labelText="Vérification du mot de passe"
          id="password"
          errorMessage="Veuillez répeter le mot de passe"
          setValue={setRepetedPassword}
          setInputsChecks={setInputsChecks}
          inputsChecks={inputsChecks}
          checkPasswords={checkPasswords}
        />

        {passwordDifferenceMessage ? (
          <p className="passwordWarning">{passwordDifferenceMessage}</p>
        ) : (
          ""
        )}
        {passwordStrengthMessage ? (
          <p className="passwordWarning">{passwordStrengthMessage}</p>
        ) : (
          ""
        )}

        <PasswordMeter
          password={password}
          checkSecurity={setPasswordSecurityLevel}
        />

        <label htmlFor={"avatar"}>Photo de profil : </label>

        <input
          className="fileInput"
          type={"file"}
          name={"image"}
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={getFile}
        />
        <label htmlFor="image">Choisir un fichier</label>
        {image.preview !== "" ? (
          <img src={image.preview} alt="avatar" width="100" height="auto" />
        ) : (
          ""
        )}
        <p className="signupMessage">{message}</p>
        <Button
          disabled={validationIsDisabled}
          className={"signupButton"}
          onClick={signUp}
          action="Créer un compte"
        />
      </form>
    </div>
  );
}
