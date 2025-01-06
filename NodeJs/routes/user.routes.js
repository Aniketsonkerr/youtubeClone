import {
  userLogin,
  userRegisteration,
} from "../controllers/user.controller.js";

export function userRouter(app) {
  app.post("/api/registeration", userRegisteration);
  app.post("/api/login", userLogin);
}
