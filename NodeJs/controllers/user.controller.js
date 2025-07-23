import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function userRegisteration(req, res) {
  const { username, email, password, avatar, channels } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = new userModel({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        avatar,
        channels,
      });
      return newUser.save();
    })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(201)
          .json({ message: "User registered successfully", user: savedUser });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    });
}

export function userLogin(req, res) {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Ensure user.password exists before comparing
      if (!user.password) {
        return res
          .status(500)
          .json({ message: "Password is missing in user data" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(403).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, "secretKey", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
        },
        accessToken: token,
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error", error });
    });
}

export function getUser(req, res) {
  const { id } = req.params;

  userModel
    .findById(id)
    .populate("channels")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Get User Error:", error);
      return res.status(500).json({ message: "Server error", error });
    });
}


export function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, avatar, channels, password } = req.body;

  userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (avatar) user.avatar = avatar;
      if (channels) user.channels = channels;
      if (password) user.password = bcrypt.hashSync(password, 10);

      return user.save();
    })
    .then((updatedUser) => {
      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    })
    .catch((error) => {
      console.error("Update User Error:", error);
      return res.status(500).json({ message: "Server error", error });
    });
}

export function deleteUser(req, res) {
  const { id } = req.params;

  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User deleted successfully", user });
    })
    .catch((error) => {
      console.error("Delete User Error:", error);
      return res.status(500).json({ message: "Server error", error });
    });
}
