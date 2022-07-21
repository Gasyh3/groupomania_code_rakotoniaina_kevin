const dbSql = require("./db");

/**
 * The Comment function takes a comment object as an argument and assigns the userId, text, and postId
 * properties of the comment object to the Comment function's userId, text, and postId properties.
 * @param comment - This is the comment object that is passed in from the controller.
 */
const Comment = function (comment) {
  (this.userId = comment.userId), (this.text = comment.text);
  this.postId = comment.postId;
};

/* Creating a new comment in the database. */
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

/* Updating the comment in the database. */
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
