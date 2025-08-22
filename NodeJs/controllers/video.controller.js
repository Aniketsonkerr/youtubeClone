import videoModel from "../models/video.model.js";
import { cloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export async function uploadVideo(req, res) {
  const {
    title,
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

  try {
    const existing = await videoModel.findOne({ title });
    if (existing) {
      return res.status(400).json({ message: "Video title already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Upload to Cloudinary with resource_type 'video'
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    // Remove temp file after upload
    fs.unlinkSync(req.file.path);

    const newVideo = new videoModel({
      title,
      videoLink: result.secure_url, // cloudinary's hosted video URL
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

    const saved = await newVideo.save();
    return res.status(201).json({ message: "Video saved successfully", video: saved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
}

export async function getVideos(req, res) {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const genre = req.query.genre;

  try {
    if (id) {
      // Get a specific video
      const video = await videoModel.findById(id).populate("uploader");
      if (!video) return res.status(404).json({ message: "Video not found" });
      return res.status(200).json(video);
    }

    let query = {};
    if (genre && genre !== "All") {
      query.genres = genre;
    }

    const videos = await videoModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("uploader");

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
export async function updateVideo(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const video = await videoModel.findById(id).populate("channelId");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (String(video.channelId.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(video, updateData);
    const updated = await video.save();

    return res.status(200).json({ video: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
export async function deleteVideo(req, res) {
  const { id } = req.params;

  try {
    const video = await videoModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Only allow owner of the channel to delete
    if (String(video.channelId.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to delete this video." });
    }

    await videoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Video deleted", video });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
