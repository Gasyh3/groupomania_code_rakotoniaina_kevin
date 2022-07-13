const dbSql = require("./db");

//constructeur

const Like = function (like) {
  (this.userId = like.userId), (this.postId = like.postId);
};

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
