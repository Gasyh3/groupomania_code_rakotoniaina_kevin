const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer.middlewares");
const postController = require("../controllers/post.controllers");
const auth = require("../middlewares/auth.middlewares");

router.post("/", auth, multer, postController.newPost);
router.get("/", auth, multer, postController.getAllPosts);
router.put("/", auth, multer, postController.modifyPost);
router.delete("/", auth, postController.deletePost);

module.exports = router;
