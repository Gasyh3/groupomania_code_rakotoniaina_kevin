import React from "react";
import "./Button.scss";

/**
 * It returns a button with the className of default--button and the className of the props.className,
 * and it's disabled if the props.disabled is true, and it has an onClick function of props.onClick,
 * and it has a style of props.style, and it has an action of props.action
 * @param props - This is the object that contains all the properties that are passed to the component.
 * @returns A button element with the className of default--button and the className of
 * props.className.
 */
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
