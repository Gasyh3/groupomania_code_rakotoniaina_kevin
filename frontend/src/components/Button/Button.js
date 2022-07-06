import React from "react";
import "./Button.scss";

export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      className={`default--button ${props.className}`}
      onClick={props.onClick}
      style={props.style}
    >
      {props.action}
    </button>
  );
}
