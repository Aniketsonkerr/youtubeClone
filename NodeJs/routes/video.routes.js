import {
  deleteVideo,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export function videoRouter(app) {
  app.post("/api/video", verifyToken, uploadVideo);
  app.get("/api/videos", getVideos);
  app.get("/api/video/:id", getVideos);
  app.put("/api/video/:id", updateVideo);
  app.delete("/api/video/:id", deleteVideo);
}
