const mysql = require("mysql2");
const dbConfig = require("../config/config");

// Connection to DB
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Connexion réussi à la base de donnée Groupomania.");
});

module.exports = connection;
