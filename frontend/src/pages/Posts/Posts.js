import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import "./Posts.scss";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";

/**
 * It fetches all the posts from the database, and then displays them on the page
 * @param props - This is the props that are passed to the component.
 * @returns A div with a div with a NewPost component and a Post component for each post in the posts
 * array.
 */
export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getAllPosts = () => {
    fetch("http://localhost:3001/api/posts", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((value) => {
        if (value.posts !== undefined) {
          setPosts(value.posts);
        } else {
          localStorage.clear();
          navigate("/login/signIn");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(
    () => getAllPosts(),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="posts">
      <div className="profileAndNewPost">
        <NewPost getAllPosts={getAllPosts} />
      </div>
      {posts.map((post, key) => {
        return (
          <Post
            key={key}
            post={post}
            username={props.username}
            getAllPosts={getAllPosts}
          />
        );
      })}
    </div>
  );
}
