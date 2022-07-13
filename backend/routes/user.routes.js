const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer.middlewares");
const auth = require("../middlewares/auth.middlewares");
const userController = require("../controllers/user.controllers");

router.post("/signup", multer, userController.signup);
router.post("/login", userController.login);
router.post("/:token/:id", userController.newPassword);
router.get("/logout", userController.logout);
router.get("/private/:user", auth, userController.getPrivateUserInfos);
router.get("/:user", auth, userController.getUser);
router.put("/:user", auth, multer, userController.modifyUser);
router.delete("/", auth, userController.deleteUser);

module.exports = router;
