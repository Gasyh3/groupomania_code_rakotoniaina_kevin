import React, { useState, useEffect } from "react";
import InputValidation from "../../components/InputValidation/InputValidation";
import Button from "../../components/Button/Button";
import "./PasswordReset.scss";
import BackLink from "../../components/BackLink/BackLink";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [validationIsDisabled, setValidationIsDisabled] = useState(true);
  const [responseMessage, setResponseMessage] = useState();
  const [inputsChecks, setInputsChecks] = useState({
    email: false,
  });

  function sendEmailAdress() {
    fetch("http://localhost:3001/api/auth/password-reset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok)
          setResponseMessage(
            "Si cette adresse est associé à un compte existant alors un e-mail vient de lui être envoyé"
          );
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (Object.values(inputsChecks).every(Boolean)) {
      setValidationIsDisabled(false);
    } else {
      setValidationIsDisabled(true);
    }
  }, [inputsChecks]);

  return (
    <div className="passwordReset">
      <h1 className="passwordReset__title">Réinitialiser le mot de passe</h1>
      <InputValidation
        label="email"
        checks={["typeMismatch", "valueMissing"]}
        inputProps={{ type: "email", required: true }}
        labelText="Adresse e-mail"
        id="email"
        errorMessage="Veuillez renseigner une adresse e-mail valide"
        setValue={setEmail}
        setInputsChecks={setInputsChecks}
        inputsChecks={inputsChecks}
      />
      <div className="row">
        <BackLink />
        <Button
          disabled={validationIsDisabled}
          className={"signupButton"}
          onClick={sendEmailAdress}
          action="Valider"
        />
      </div>
      <p>{responseMessage}</p>
    </div>
  );
}

export default PasswordReset;
