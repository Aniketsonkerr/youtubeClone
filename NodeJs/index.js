import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.routes.js";
import { videoRouter } from "./routes/video.routes.js";
import { channelRouter } from "./routes/channel.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
const app = express();

dotenv.config({path:"./.env"})
const port = process.env.PORT ||  5000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.use(express.json());
app.use(cors());

mongoose.connect(
  `${
    process.env.MONGODB_URI
  }`
);

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connection successful");
});

db.on("error", (err) => { console.log("Database connection failed", err); });


userRouter(app);
videoRouter(app);
channelRouter(app);
commentRouter(app);
