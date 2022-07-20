const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/* A middleware that checks if the user is authenticated. */

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, "token");
    const userId = decodedToken.userId;
    const userPrivilege = decodedToken.privilege;

    req.userId = userId;
    req.userPrivilege = userPrivilege;

    if (!userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
