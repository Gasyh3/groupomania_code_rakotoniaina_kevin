const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const auth = require("../middlewares/auth.middlewares");

router.post("/:id", auth, commentController.newComment);
router.get("/:id", auth, commentController.getAllPostComments);
router.put("/:id", auth, commentController.modifyComment);
router.delete("/", auth, commentController.deleteComment);

module.exports = router;
