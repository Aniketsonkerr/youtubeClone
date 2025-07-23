import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controller.js";
export function commentRouter(app) {
  app.get("/api/comments/:id", getComments); // id = videoId
  app.post("/api/comment", addComment);
  app.put("/api/comment/:id", updateComment);
  app.delete("/api/comment/:id", deleteComment);
}
