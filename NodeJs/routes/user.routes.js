import {
  getUser,
  userLogin,
  userRegisteration,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


export function userRouter(app) {
  app.post("/api/registeration", userRegisteration);
  app.post("/api/login", userLogin);
  app.get("/api/user/:id",verifyToken,getUser)
}
