import {
  createChannel,
  getChannels,
} from "../controllers/channel.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function channelRouter(app) {
  app.post("/api/channel", verifyToken, createChannel);
  app.get("/api/channel", getChannels);
}
