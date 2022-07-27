const Post = require("../models/post.models");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dbSql = require("../models/db");
const { response } = require("express");

/* Creating a new post. */
exports.newPost = (req, res) => {
  dbSql.query(
    `SELECT * FROM users WHERE id = ?`,
    req.userId,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      let dt = moment().format("YYYY-MM-DD HH:mm:ss");
      const post = new Post({
        userId: jwt.verify(req.cookies.access_token, "token").userId,
        title: req.body.title,
        text: req.body.text,
        published_at: dt,
      });
      if (req.file !== undefined) {
        post.mediaUrl = req.file.filename;
      }
      Post.create(post, (error, data) => {
        if (error)
          res.status(500).send({
            message: "Une erreur s'est produite.",
          });
        else res.send(data);
      });
    }
  );
};

/* A function that is called when the user is requesting all the posts. */
exports.getAllPosts = (req, res) => {
  dbSql.query(
    "SELECT p.title, p.text, p.mediaUrl, p.published_at, users.avatarURL, users.username, p.id AS postID FROM posts p JOIN users ON p.userID = users.id ORDER BY published_at DESC",
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      res.status(200).json({ posts: response });
    }
  );
};

/* A function that is called when the user is requesting to modify a post. */
exports.modifyPost = (req, res) => {
  dbSql.query(
    `SELECT * FROM posts WHERE id = ?`,
    req.body.id,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }

      if (req.userPrivilege == 1 || req.userId == response[0].userID) {
        let dt = moment().format("YYYY-MM-DD HH:mm:ss");
        const postModifications = {
          id: req.body.id,
          title: req.body.title,
          text: req.body.text,
          published_at: dt,
        };
        if (req.file !== undefined) {
          fs.unlink(`images/${response[0].mediaUrl}`, () =>
            console.log("l'ancienne photo a été changé.")
          );

          postModifications.mediaUrl = req.file.filename;
        }
        Post.modifyPost(postModifications, (error, data) => {
          if (error)
            res.status(500).send({
              message: "Une eereur s'est produite à la modification du post.",
            });
          else res.send(data);
        });
      } else {
        res.status(401).json({
          message: "Vous n'êtes pas autorisé à modifier ce post.",
        });
      }
    }
  );
};

/* This function is called when the user is requesting to delete a post. */
exports.deletePost = (req, res) => {
  dbSql.query(
    `SELECT * FROM posts WHERE id = ?`,
    req.body.id,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }

      if (req.userPrivilege == 1 || req.userId == response[0].userID) {
        fs.unlink(`images/${response[0].mediaUrl}`, () =>
          console.log("le post du post a été supprimer.")
        );
        dbSql.query(
          `DELETE FROM comments WHERE postId = ?`,
          req.body.id,
          (error) => {
            if (error) {
              result(error, null);
              return;
            }
          }
        );
        dbSql.query(
          `DELETE FROM likes WHERE postId = ?`,
          req.body.id,
          (error) => {
            if (error) {
              result(error, null);
              return;
            }
          }
        );
        dbSql.query(`DELETE FROM posts WHERE id = ?`, req.body.id, (error) => {
          if (error) {
            result(error, null);
            return;
          }
          res.status(200).json({ message: "post supprimé" });
        });
      } else {
        res.status(401).json({
          message: "Vous n'êtes pas autorisé à supprimer ce post.",
        });
      }
    }
  );
};
