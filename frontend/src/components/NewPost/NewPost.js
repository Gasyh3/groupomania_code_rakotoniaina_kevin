import React from "react";
import { useState } from "react";
import "./NewPost.scss";
import PostModal from "../PostModal/PostModal";

/**
 * It renders a button that opens a modal when clicked
 * @param props - the props that are passed to the component
 * @returns A component that allows the user to create a new post.
 */
export default function NewPost(props) {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [isInEditMode, setEditMode] = useState(false);

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
