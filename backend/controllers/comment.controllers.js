const Comment = require("../models/comments.models");
const dbSql = require("../models/db");

/* Creating a new comment. */
exports.newComment = (req, res) => {
  dbSql.query(
    `SELECT * FROM users WHERE id = ?`,
    req.userId,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      const comment = new Comment({
        userId: req.userId,
        text: req.body.text,
        postId: req.body.postId,
      });

      Comment.create(comment, (error, data) => {
        if (error)
          res.status(500).send({
            message:
              "Une erreur s'est produit lors de la création du commentaire.",
          });
        else res.send(data);
      });
    }
  );
};

/* A function that is called when the route /comments/:id is called. It is used to get all the comments
of a post. */
exports.getAllPostComments = (req, res) => {
  dbSql.query(
    `SELECT c.id AS commentId, c.userId, c.postId, c.text, users.username, users.avatarUrl 
                FROM comments c JOIN users ON c.userId = users.id WHERE c.postId = "${req.params.id}"`,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      res.status(200).json({ comments: response });
    }
  );
};

/* A function that is called when the route /comments/:id is called. It is used to modify comments
of a post. */
exports.modifyComment = (req, res) => {
  dbSql.query(
    `SELECT * FROM comments WHERE id = ?`,
    req.body.id,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }

      if (req.userId != response[0].userId) {
        res.status(401).json({
          message: "Vous n'êtes pas autorisé à modifier ce commentaire.",
        });
      } else {
        const commentModifications = {
          id: req.body.id,
          text: req.body.text,
        };
        Comment.modifyComment(commentModifications, (error, data) => {
          if (error)
            res.status(500).send({
              message:
                "Une erreur s'est produit à la modification du commentaire.",
            });
          else res.send(data);
        });
      }
    }
  );
};

/* A function that is called when the route /comments/:id is called. It is used to delete comments
of a post. */
exports.deleteComment = (req, res) => {
  dbSql.query(
    `SELECT * FROM comments WHERE id = ?`,
    req.body.id,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      if (req.userPrivilege == 1 || req.userId == response[0].userId) {
        dbSql.query(
          `DELETE FROM comments WHERE id = ?`,
          req.body.id,
          (error, response) => {
            if (error) {
              result(error, null);
              return;
            }
            res.status(200).json({ message: "commentaire supprimé" });
          }
        );
      } else {
        res.status(401).json({
          message: "Vous n'êtes pas autorisé à supprimer ce post.",
        });
      }
    }
  );
};
