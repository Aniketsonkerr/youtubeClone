import videoModel from "../models/video.model.js";

export function uploadVideo(req, res) {
  const {
    title,
    videoLink,
    description,
    thumbnailUrl,
    channelId,
    comments,
    uploadDate,
    views,
    likes,
    dislikes,
    genres,
  } = req.body;
  videoModel.findOne({ title }).then((data) => {
    if (data) {
      return res.status(400).json({ message: "video title already exist" });
    }
    const newVideo = new videoModel({
      title,
      videoLink,
      description,
      thumbnailUrl,
      channelId,
      comments,
      uploadDate,
      views,
      likes,
      dislikes,
      genres,
      uploader: req.user._id,
    });
    newVideo
      .save()
      .then((savedVideo) => {
        if (savedVideo) {
          return res
            .status(201)
            .json({ message: "video saved successfully", video: savedVideo });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
      });
  });
}

export function getVideos(req, res) {
  const { id } = req.params; // Optional: Video ID from the request parameters

  if (id) {
    // Get a specific video by ID
    videoModel
      .findById(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "Video not found" });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({ message: "Server error", error: err });
      });
  } else {
    // Get all videos
    videoModel
      .find()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({ message: "Server error", error: err });
      });
  }
}

export function updateVideo(req, res) {
  const { id } = req.params; // Video ID from the request parameters
  const updateData = req.body; // Data to update

  videoModel
    .findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedVideo) => {
      if (!updatedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }
      return res.status(200).json({
        message: "Video updated successfully",
        video: updatedVideo,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    });
}

// Delete a video
export function deleteVideo(req, res) {
  const { id } = req.params; // Video ID from the request parameters

  videoModel
    .findByIdAndDelete(id)
    .then((deletedVideo) => {
      if (!deletedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }
      return res.status(200).json({
        message: "Video deleted successfully",
        video: deletedVideo,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    });
}
