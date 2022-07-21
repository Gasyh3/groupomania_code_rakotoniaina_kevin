const dbSql = require("./db");

/**
 * It takes a post object as an argument and returns a new Post object with the same properties
 * @param post - This is the post object that is passed in from the controller.
 */
const Post = function (post) {
  (this.userId = post.userId), (this.title = post.title);
  this.text = post.text;
  this.mediaUrl = post.mediaUrl;
  this.published_at = post.published_at;
};

/* Creating a new post in the database. */
Post.create = (newPost, result) => {
  dbSql.query("INSERT INTO posts SET ?", newPost, (error, response) => {
    if (error) {
      result(error, null);
      return;
    }
    result(null, {
      title: newPost.title,
      text: newPost.text,
      published_at: newPost.published_at,
    });
  });
};

/* Updating the post in the database. */
Post.modifyPost = (postModifications, result) => {
  dbSql.query(
    `UPDATE posts SET ? WHERE id = "${postModifications.id}"`,
    postModifications,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, { ...postModifications });
    }
  );
};

module.exports = Post;
