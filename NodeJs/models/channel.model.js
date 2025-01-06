import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  description: {
    type: String,
    required: true,
  },
  channelBanner: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
    },
  ],
});

const channelModel = mongoose.model("channel", channelSchema);

export default channelModel;
