import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileAccess.scss";

/**
 * It fetches the avatar of the user from the database and displays it on the profile page
 * @param props - the props that are passed to the component
 * @returns The avatar of the user.
 */
export default function ProfileAccess(props) {
  const [avatar, setavatar] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/api/auth/${props.username}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((value) => {
        setavatar(value.avatarUrl);
      });
  }, [props.username]);
  return (
    <div>
      <div className="profileCard">
        <Link className="profileCard__link" to={"profile"}>
          <div className="profileCard__avatar">
            {avatar !== undefined ? (
              <img
                className="avatar"
                src={`http://localhost:3001/images/${avatar}`}
                alt="avatar"
              ></img>
            ) : (
              ""
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
