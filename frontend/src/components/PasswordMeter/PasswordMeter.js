import React, { useEffect } from "react";
import zxcvbn from "zxcvbn";
import "./PasswordMeter.scss";

/**
 * It takes a password as a prop, uses the zxcvbn library to test the password, and then returns a
 * progress bar with a label that indicates the strength of the password
 * @param props - The props that are passed to the component.
 * @returns A component that displays the strength of a password.
 */
export default function PasswordStrengthMeter(props) {
  const password = props.password;
  const testedPassword = zxcvbn(password);

  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return "Très faible";
      case 1:
        return "Faible";
      case 2:
        return "Moyen";
      case 3:
        return "Fort";
      case 4:
        return "Très fort";
      default:
        return "Weak";
    }
  };

  useEffect(() => {
    if (props.checkSecurity) {
      props.checkSecurity(testedPassword.score);
    }
  });
  return (
    <div className="password-meter">
      <div className="password-meter__label">
        <strong>Sécurité du mot de passe :</strong>{" "}
        {createPasswordLabel(testedPassword)}
      </div>
      <progress
        className={`password-meter__progress strength-${testedPassword.score}`}
        value={testedPassword.score}
        max="4"
      />
    </div>
  );
}
