const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likes.controllers");
const auth = require("../middlewares/auth.middlewares");

router.get("/:postId", auth, likeController.getAllLikes);
router.post("/:postId", auth, likeController.likeAPost);

module.exports = router;
