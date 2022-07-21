const req = require("express/lib/request");
const dbSql = require("./db");

/**
 * It creates a new user object with the given username, email, password, and avatarUrl
 * @param user - This is the user object that is passed in when the User object is created.
 */
const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.avatarUrl = user.avatarUrl;
};

/* It creates a new user object with the given username, email, password, and avatarUrl */
User.create = (newUser, result) => {
  dbSql.query("INSERT INTO users SET ?", newUser, (error, response) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log("utilisateur créé : ", { id: response.insertId, ...newUser });
    result(null, { id: response.insertId, ...newUser });
  });
};

/* A function that is used to find a user by email. */
User.findOne = (email, result) => {
  dbSql.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      if (response.length) {
        return response.password;
      }
    }
  );
};

/* Updating the user in the database. */
User.modifyUser = (userModifications, result) => {
  dbSql.query(
    `UPDATE users SET ? WHERE id = "${userModifications.id}"`,
    userModifications,
    (error, response) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, { ...userModifications });
    }
  );
};

module.exports = User;
