import React from "react";
import { useState } from "react";
import "./NewPost.scss";
import PostModal from "../PostModal/PostModal";

export default function NewPost(props) {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [isInEditMode, setEditMode] = useState(false);

  /**
   * It takes the file that the user has selected, creates a URL for it, and then sets the image state to
   * that URL
   * @param e - the event object
   */
  const getFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  let formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  formData.append("image", image.data);

  /**
   * The post function is called when the user clicks the submit button. It sends a POST request to the
   * server with the form data. If the request is successful, the getAllPosts function is called to
   * update the posts on the page. The image state is reset to the default image and the edit mode is
   * toggled off
   */
  const post = () => {
    fetch("http://localhost:3001/api/posts", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => {
        if (res.ok) props.getAllPosts();
        const defaultImg = { preview: "", data: "" };
        setImage(defaultImg);
        toogleEditMode();
      })
      .catch((err) => console.error(err));
  };

  const toogleEditMode = () => {
    setEditMode(!isInEditMode);
  };

  const toogleEditModeOnPressEnter = (e) => {
    if (e.code === "Enter") toogleEditMode(!isInEditMode);
  };

  if (isInEditMode) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="newPost">
      <label hidden htmlFor="newPost">
        Créer un nouveau post
      </label>
      <input
        className="startPost"
        id="newPost"
        name="newPost"
        type="text"
        placeholder="Ecrivez quelque chose..."
        onClick={toogleEditMode}
        onKeyPress={toogleEditModeOnPressEnter}
      ></input>

      {isInEditMode ? (
        <div>
          <div className="modale_background_overlay"></div>
          <PostModal
            getFile={getFile}
            toogleEditMode={toogleEditMode}
            image={image}
            setTitle={setTitle}
            setText={setText}
            post={post}
            actionText="Créer un post"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
