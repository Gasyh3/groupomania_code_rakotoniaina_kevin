import React from "react";
import "./Avatar.scss";

export default function Avatar(props) {
  const avatar = props.avatar;
  return (
    <img
      className="avatar"
      src={`http://localhost:3001/images/${avatar}`}
      alt={props.altText}
    ></img>
  );
}
