const dbSql = require("./db");

const Comment = function (comment) {
  (this.userId = comment.userId), (this.text = comment.text);
  this.postId = comment.postId;
};

Comment.create = (newComment, result) => {
  dbSql.query("INSERT INTO comments SET ?", newComment, (error, response) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log("commentaire créé: ", { id: response.insertId, ...newComment });
    result(null, { id: response.insertId, ...newComment });
  });
};

Comment.modifyComment = (commentModifications, result) => {
  dbSql.query(
    `UPDATE comments SET ? WHERE id = "${commentModifications.id}"`,
    commentModifications,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, { ...commentModifications });
    }
  );
};

module.exports = Comment;
