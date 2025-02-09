import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "secretKey",
      function (err, verifiedToken) {
        if (err) {
          return res.status(403).json({ message: err });
        }
        userModel
          .findOne({ _id: verifiedToken.id })
          .then((user) => {
            req.user = user;
            console.log(user);
            next();
          })
          .catch((err) => res.status(500).json({ message: err.message }));
      }
    );
  } else {
    return res.status(401).json({ message: "token not present" });
  }
}
