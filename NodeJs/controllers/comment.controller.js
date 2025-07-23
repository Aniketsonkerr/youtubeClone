import mongoose from "mongoose"; // ✅ Add this at the top
import commentModel from "../models/comment.model.js"; // and your model

// Create a new comment
export async function addComment(req, res) {
  const { video, message, user } = req.body;

  if (!video || !message || !user) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newComment = new commentModel({
      uploader: user, // ✅ Fix field name
      video,
      message,
    });

    const saved = await newComment.save();
    res.status(201).json({ success: true, message: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getComments(req, res) {
  const { id } = req.params; // ✅ match your route: /api/comments/:id

  try {
    const comments = await commentModel.aggregate([
      { $match: { video: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "uploader",
          foreignField: "_id",
          as: "uploaderInfo",
        },
      },
      { $unwind: "$uploaderInfo" },
      {
        $project: {
          message: 1,
          createdAt: 1,
          "uploaderInfo.username": 1,
          "uploaderInfo.avatar": 1,
        },
      },
    ]);

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Update a comment by ID
export async function updateComment(req, res) {
  const { id } = req.params;   // 🧠 corresponds to /api/comment/:id
  const { message } = req.body;

  try {
    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (String(comment.uploader) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    comment.message = message;
    await comment.save();

    return res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Delete a comment by ID
export async function deleteComment(req, res) {
  const { id } = req.params;

  try {
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await commentModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

