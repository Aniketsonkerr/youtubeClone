import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import { videoRouter } from "./routes/video.routes.js";
import { channelRouter } from "./routes/channel.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
const app = express();

app.listen(3000, () => {
  console.log("server running on Port 3000");
});

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connection successful");
});

db.on("error", () => {
  console.log("Database connection failed");
});

userRouter(app);
videoRouter(app);
channelRouter(app);
commentRouter(app);
