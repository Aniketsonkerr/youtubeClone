import {
  deleteVideo,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


import { upload } from "../middlewares/multer.js";

export function videoRouter(app) {
  // Use upload.single('video') to handle video file
  app.post("/api/video", verifyToken, upload.single("video"), uploadVideo);

  app.get("/api/videos", getVideos);
  app.get("/api/video/:id", getVideos);
  app.put("/api/video/:id", verifyToken, updateVideo);
  app.delete("/api/video/:id", verifyToken, deleteVideo);
}