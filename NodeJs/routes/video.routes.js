import {
  deleteVideo,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";



export function videoRouter(app) {
  // Create a new video (protected)
  app.post("/api/video", verifyToken, uploadVideo);

  // ✅ Get videos with pagination: ?page=1&limit=9
  app.get("/api/videos", getVideos);

  // Get a specific video by ID
  app.get("/api/video/:id", getVideos);

  // Update a video
  app.put("/api/video/:id", verifyToken, updateVideo);

  // Delete a video
  app.delete("/api/video/:id", verifyToken, deleteVideo);
}
