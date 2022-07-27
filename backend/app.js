const express = require("express");

const path = require("path");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likesRoutes = require("./routes/like.routes");
dotenv.config();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    hidePoweredBy: true,
  })
);

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likesRoutes);
app.get("/", (req, res) => {
  res.json({ message: "OK" });
});
module.exports = app;
