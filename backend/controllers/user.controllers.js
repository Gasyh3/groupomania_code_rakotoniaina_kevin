const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token").uid;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const dbSql = require("../models/db");

/* A function that is called when a user sign up. */
exports.signup = (req, res) => {
  console.log(req.file);
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide.",
    });
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    if (req.file !== undefined) {
      user.avatarUrl = req.file.filename;
    } else {
      user.avatarUrl = "default.png";
    }
    User.create(user, (error, data) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite.",
        });
      else res.json({ data });
    });
  });
};

/* This function is called when a user tries to log in. It checks if the user exists in the database
and if the password is correct. If it is, it creates a token and sends it to the user. */
exports.login = (req, res) => {
  dbSql.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    (error, response) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite.",
        });
      else {
        if (response[0] == undefined) {
          return res.status(401).json({ error: "utilisateur inconnu" });
        }
        bcrypt
          .compare(req.body.password, response[0].password)
          .then((comparedPassword) => {
            if (!comparedPassword) {
              return res.status(401).json({ error: "mot de passe erroné" });
            }
            const token = jwt.sign(
              { userId: response[0].id, privilege: response[0].privileges },
              "token",
              { expiresIn: "72h" }
            );
            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: true,
              })
              .json({
                username: response[0].username,
                privilege: response[0].privileges,
              })
              .status(200);
          });
      }
    }
  );
};

/* It clears the cookie and sends a message to the user. */
exports.logout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .send("L'utilisateur a été déconnécté");
};

/* A function that is called when a user tries to access another user's profile. It checks if the user
exists in the database and if it does, it sends the username and the avatarUrl to the user. */
exports.getUser = (req, res) => {
  dbSql.query(
    `SELECT * FROM users WHERE username = ?`,
    [req.params.user],
    (error, response) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite.",
        });
      else {
        if (response[0] == undefined) {
          return res.status(401).json({ error: "utilisateur inconnu" });
        }
        res.status(200).json({
          username: response[0].username,
          avatarUrl: response[0].avatarUrl,
        });
      }
    }
  );
};

/* A function that is called when a user tries to access his own profile. It checks if the user exists
in the database and if it does, it sends the username and the avatarUrl to the user. */
exports.getPrivateUserInfos = (req, res) => {
  dbSql.query(
    `SELECT * FROM users WHERE id = ?`,
    [req.userId],
    (error, response) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite.",
        });
      else {
        if (response[0] == undefined) {
          return res.status(401).json({ error: "utilisateur inconnu" });
        }
        res.status(200).json({ result: response[0] });
      }
    }
  );
};

/* A function that is called when a user tries to change his password. It checks if the user exists in
the database and if the token is valid. If it is, it changes the password and sends a message to the
user. */
exports.newPassword = (req, res) => {
  dbSql.query(
    `SELECT * FROM users WHERE token = ? AND id= ?`,
    [req.params.token, req.params.id],
    (error, response) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite.",
        });
      else {
        if (response.length === 0) {
          res.status(401).send({
            message: "Requête non autorisée",
          });
        } else {
          if ((new Date() - result[0].reinitialisationLink) / 500 / 60 >= 60) {
            res.status(500).send({
              message: "Le lien de réinitisalisation est invalide ou a expiré",
            });
          } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
              const userModifications = {
                id: response[0].id,
                password: hash,
                reinitialisationLink: null,
                token: null,
              };
              User.modifyUser(userModifications, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      "Une erreur s'est produite à la modification du mot de passe.",
                  });
              });
              res
                .status(200)
                .json({ message: "Votre mot de passe a bien été mis à jour" });
            });
          }
        }
      }
    }
  );
};

/* A function that is called when a user tries to modify his profile. It checks if the user exists in
the database and if the token is valid. If it is, it changes the user's data and sends a message to
the user. */
exports.modifyUser = (req, res) => {
  function checkAndSendUserModifications(request, userModifications) {
    for (value in request) {
      if (request[value] !== "undefined") {
        if (value === "password" || value === "image") {
        } else {
          userModifications[value] = request[value];

          if (req.file !== undefined) {
            userModifications.avatarUrl = req.file.filename;
            //Delete previous avatar image file
            dbSql.query(
              `SELECT avatarURL FROM users WHERE id = ?`,
              [req.userId],
              (error, response) => {
                if (error) {
                  result(error, null);
                  return;
                }
                fs.unlink(`images/${response[0].avatarURL}`, () =>
                  console.log("L'avatar a été supprimer.")
                );
              }
            );
          }
        }
      }
    }
    User.modifyUser(userModifications, (error, data) => {
      if (error)
        res.status(500).send({
          message: "Une erreur s'est produite lors de la modification du post.",
        });
      else res.send(data);
    });
  }
  if (req.body.password !== "undefined") {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const userModifications = {
        id: req.userId,
        password: hash,
      };
      checkAndSendUserModifications(req.body, userModifications);
    });
  } else {
    const userModifications = {
      id: req.userId,
    };
    checkAndSendUserModifications(req.body, userModifications);
  }
};

/* It deletes the user and all the data associated with it. */
exports.deleteUser = (req, res) => {
  //Delete user avatar file
  dbSql.query(
    `SELECT avatarURL FROM users WHERE id = ?`,
    [req.userId],
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      if (response[0].avatarURL !== "default.png") {
        fs.unlink(`images/${response[0].avatarURL}`, () =>
          console.log("L'avatar a été supprimer.")
        );
      }
    }
  );
  // Delete all data associated with the user
  dbSql.query(`DELETE FROM likes WHERE userId = ?`, [req.userId], (error) => {
    if (error) {
      result(err, null);
      return;
    }
  });
  dbSql.query(
    `DELETE FROM comments WHERE userId = ?`,
    [req.userId],
    (error) => {
      if (error) {
        result(error, null);
        return;
      }
    }
  );
  dbSql.query(`DELETE FROM posts WHERE userId = ?`, [req.userId], (error) => {
    if (error) {
      result(error, null);
      return;
    }
  });

  // Then delete the user
  dbSql.query(`DELETE FROM users WHERE id = ?`, [req.userId], (error) => {
    if (error) {
      result(err, null);
      return;
    }
    res.status(200).json({ message: "utilisateur supprimé" });
  });
};
