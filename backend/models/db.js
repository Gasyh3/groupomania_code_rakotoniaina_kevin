const mysql = require("mysql2");
const dbConfig = require("../config/config");

/* It's creating a connection to the database. */
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

/* It's creating a connection to the database. */
connection.connect((error) => {
  if (error) throw error;
  console.log("Connexion réussi à la base de donnée Groupomania.");
});

module.exports = connection;
