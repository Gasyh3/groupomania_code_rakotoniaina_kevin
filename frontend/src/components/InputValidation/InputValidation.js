import React, { useState } from "react";

/**
 * It takes in props, and returns a div with a label, an input, and a paragraph
 * @param props - {
 * @returns A function that returns a div with a label, input and a p tag.
 */
function InputWithvalidation(props) {
  const [isValid, setIsValid] = useState(true);
  const checkPasswords = () => {
    if (props.checkPasswords !== undefined) {
      const checkPasswords = props.checkPasswords;
      checkPasswords();
    } else {
      return "";
    }
  };

  const checkValidty = (e) => {
    const { validity } = e.target;
    const checksPassed =
      props.checks.filter((check) => validity[check]).length === 0;

    setIsValid(checksPassed);
    const inputsChecks = props.inputsChecks;
    inputsChecks[props.label] = checksPassed;
    props.setInputsChecks({ ...inputsChecks, label: checksPassed });
  };

  return (
    <div className="inputValidation" style={props.style}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        className="input"
        {...props.inputProps}
        onChange={(e) => props.setValue(e.target.value)}
        onKeyUp={(e) => {
          checkValidty(e);
          checkPasswords();
        }}
      />
      {isValid ? (
        ""
      ) : (
        <p className="inputValidation__warningMessage">{props.errorMessage}</p>
      )}
    </div>
  );
}

export default InputWithvalidation;
