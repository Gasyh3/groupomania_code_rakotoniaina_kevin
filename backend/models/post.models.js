const dbSql = require("./db");

const Post = function (post) {
  (this.userId = post.userId), (this.title = post.title);
  this.text = post.text;
  this.mediaUrl = post.mediaUrl;
  this.published_at = post.published_at;
};

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
