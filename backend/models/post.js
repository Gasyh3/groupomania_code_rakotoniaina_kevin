const sql = require("./db");

const Post = function (post) {
  (this.userId = post.userId), (this.title = post.title);
  this.text = post.text;
  this.mediaUrl = post.mediaUrl;
  this.published_at = post.published_at;
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {
      title: newPost.title,
      text: newPost.text,
      published_at: newPost.published_at,
    });
  });
};

Post.modifyPost = (postModifications, result) => {
  sql.query(
    `UPDATE posts SET ? WHERE id = "${postModifications.id}"`,
    postModifications,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...postModifications });
    }
  );
};

module.exports = Post;
