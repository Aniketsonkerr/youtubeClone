import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    videoLink: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    genres: [
      {
        type: String,
      },
    ],
    uploadDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);

export default videoModel;
