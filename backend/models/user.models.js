const req = require("express/lib/request");
const dbSql = require("./db");

//constructeur

const User = function (user) {
  //this.uuid = user.uuid,
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.avatarUrl = user.avatarUrl;
};

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
