// middleware/verifyToken.js
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("JWT ")) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secretKey"); // replace with your JWT secret

    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ✅ Attach user to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token", error: err.message });
  }
}
