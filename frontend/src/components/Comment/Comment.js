import React from "react";
import { useState } from "react";

import "./Comment.scss";
import Avatar from "../Avatar/Avatar";
import OptionsControl from "../OptionsControl/OptionsControl";

/**
 * It renders a comment with an avatar, a username, a text, and an option to modify or delete the
 * comment
 * @param props - the props that are passed to the component
 * @returns A component that displays a comment.
 */
export default function Comment(props) {
  const [comment, setComment] = useState();
  const [isInEditMode, setEditMode] = useState(false);

  function toogleEditMode() {
    setEditMode(!isInEditMode);
  }

  const modifyComment = () => {
    fetch(`http://localhost:3001/api/comments/${props.postId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: props.comment.commentId,
        text: comment,
      }),
    }).then(() => {
      props.getAllComments();
      toogleEditMode();
    });
  };

  const deleteComment = () => {
    fetch("http://localhost:3001/api/comments", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: props.comment.commentId,
      }),
    }).then(() => {
      props.getAllComments();
    });
  };
  return (
    <div className="comment__wrapper">
      <Avatar
        avatar={props.comment.avatarUrl}
        altText="avatar de l'auteur(e) du commentaire"
      />
      <div className="comment">
        <div className="comment__header">
          <p className="comment__owner">{props.comment.username}</p>
          {props.username === props.comment.username ||
          localStorage.getItem("privilege") === "1" ? (
            <OptionsControl modify={toogleEditMode} delete={deleteComment} />
          ) : (
            ""
          )}
        </div>
        <p>{props.comment.text}</p>

        {props.username === props.comment.username ? (
          isInEditMode ? (
            <div className="comment__modifications">
              <input
                className="modifyCommentInput"
                name={"title"}
                type={"text"}
                defaultValue={props.comment.text}
                placeholder={"Modifiez votre commentaire"}
                onChange={(e) => setComment(e.target.value)}
              />

              <input
                className="commentInput--button"
                type={"submit"}
                value={"Valider"}
                onClick={() => modifyComment()}
              />
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
