import React from "react";
import "./Avatar.scss";

/**
 * It takes in a prop called avatar, and returns an image tag with the src set to the avatar prop
 * @param props - This is the object that contains all the properties that were passed to the
 * component.
 * @returns The avatar image.
 */
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
