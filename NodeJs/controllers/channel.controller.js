
import channelModel from "../models/channel.model.js";
import userModel from "../models/user.model.js"; // ✅ Need this to update user

export async function createChannel(req, res) {
  const { channelName, description, channelBanner, subscribers } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }

  try {
    const existing = await channelModel.findOne({ channelName });
    if (existing) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    // ✅ Create new channel
    const newChannel = new channelModel({
      channelName,
      description,
      channelBanner,
      subscribers: subscribers || 0,
      owner: req.user._id,
    });

    const savedChannel = await newChannel.save();

    // ✅ Update user's channels array
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { channels: savedChannel._id } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Channel created successfully", channel: savedChannel });
  } catch (error) {
    console.error("createChannel error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}
export async function getChannelById(req, res) {
  const { id } = req.params;

  try {
    const channel = await channelModel.findById(id).populate("videos");
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export function getChannels(req, res) {
  channelModel
    .find()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No channels found" });
      }
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    });
}
