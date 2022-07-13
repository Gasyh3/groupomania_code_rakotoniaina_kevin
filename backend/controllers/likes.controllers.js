const Like = require("../models/like.models");
const dbSql = require("../models/db");

/* A function that is called when a user likes a post. */
exports.likeAPost = (req, res) => {
  dbSql.query(
    `SELECT * FROM likes WHERE postId = ? AND userID = ?`,
    [req.body.postId, req.userId],
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      if (response.length == 0) {
        const like = new Like({
          userId: req.userId,
          postId: req.body.postId,
        });
        Like.create(like, (error, data) => {
          if (error)
            res.status(500).send({
              message:
                "Une erreur s'est produite lors de la création du compte.",
            });
          else res.json({ data });
        });
      } else {
        dbSql.query(
          `DELETE FROM likes WHERE postId = ? AND userID = ?`,
          [req.body.postId, req.userId],
          (error, response) => {
            if (error) {
              result(error, null);
              return;
            }
            res.status(200).json({ message: "like supprimé" });
          }
        );
      }
    }
  );
};

/* A function that is called when a user wants to get the number of likes of a post. */
exports.getAllLikes = (req, res) => {
  dbSql.query(
    `SELECT * FROM likes WHERE postId = ?`,
    req.params.postId,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      res.status(200).json({ numberOfLikes: response.length });
    }
  );
};
