import commentModel from "../models/comment.model.js";

// Create a new comment
export function addComment(req, res) {
  const { user, video, message } = req.body;

  // Create a new comment document
  const newComment = new commentModel({
    user,
    video,
    message,
  });

  newComment
    .save()
    .then((data) => res.status(201).json({ success: true, message: data }))
    .catch((err) =>
      res.status(500).json({ success: false, error: err.message })
    );
}

// Get all comments for a video
export function getComments(req, res) {
  const { videoId } = req.params;

  commentModel
    .find({ video: videoId })
    .then((comments) => res.status(200).json({ success: true, comments }))
    .catch((err) =>
      res.status(500).json({ success: false, error: err.message })
    );
}

// Update a comment by ID
export function updateComment(req, res) {
  const { commentId } = req.params;
  const { message } = req.body;

  commentModel
    .findByIdAndUpdate(commentId, { message }, { new: true })
    .then((updatedComment) => {
      if (!updatedComment) {
        return res
          .status(404)
          .json({ success: false, error: "Comment not found" });
      }
      res.status(200).json({ success: true, updatedComment });
    })
    .catch((err) =>
      res.status(500).json({ success: false, error: err.message })
    );
}

// Delete a comment by ID
export function deleteComment(req, res) {
  const { commentId } = req.params;

  commentModel
    .findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res
          .status(404)
          .json({ success: false, error: "Comment not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Comment deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ success: false, error: err.message })
    );
}
