const dbSql = require("./db");

/**
 * It takes in a like object and assigns the userId and postId properties of the like object to the
 * userId and postId properties of the Like object
 * @param like - This is the object that is passed in when the function is called.
 */
const Like = function (like) {
  (this.userId = like.userId), (this.postId = like.postId);
};

/* Creating a new like in the database. */
Like.create = (like, result) => {
  dbSql.query("INSERT INTO likes SET ?", like, (error, response) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log("like: ", { id: response.insertId, ...like });
    result(null, {
      postId: like.postId,
    });
  });
};

module.exports = Like;
