import React from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./PostModal.scss";

export default function PostModale(props) {
  const toogleEditModeOnPressEnter = (e) => {
    if (e.code === "Enter") {
      props.toogleEditMode();
    }
  };

  const viewPosition = window.scrollY + 30;
  return (
    <div>
      <div
        style={{ top: viewPosition }}
        className="newPost-input createNewPost"
      >
        <div className="createNewPost__header">
          <h2>{props.actionText}</h2>
          <FontAwesomeIcon
            tabIndex={0}
            className="closeButton"
            icon={faCircleXmark}
            onClick={props.toogleEditMode}
            onKeyPress={toogleEditModeOnPressEnter}
          />
        </div>

        <div className="postContent">
          <input
            autoFocus
            className="postContent__title"
            name={"title"}
            type={"text"}
            placeholder={"Titre du post..."}
            defaultValue={props.title}
            onChange={(e) => props.setTitle(e.target.value)}
          ></input>

          <textarea
            placeholder="Ecrivez quelque lignes..."
            defaultValue={props.text}
            className="postContent__text"
            name="postText"
            rows={7}
            onChange={(e) => props.setText(e.target.value)}
          ></textarea>
          <input
            className="fileInput"
            type={"file"}
            name={"image"}
            id="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={props.getFile}
          />
          <label htmlFor="image">Choisir un fichier</label>
          {props.image.preview !== "" ? (
            <img
              src={props.image.preview}
              alt="avatar"
              width="100"
              height="auto"
            />
          ) : (
            ""
          )}
        </div>

        <Button onClick={props.post} action="Poster" className="modalButton" />
      </div>
    </div>
  );
}
