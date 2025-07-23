import channelModel from "../models/channel.model.js";

// Ensure the order is (req, res)
export function createChannel(req, res) {
  const { channelName, description, channelBanner, subscribers } = req.body;

  // Check if channelName is provided
  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }

  channelModel
    .findOne({ channelName }) // Query with an object, not just a string
    .then((data) => {
      if (data) {
        return res.status(400).json({ message: "Channel already exists" });
      }
      const newChannel = new channelModel({
        channelName,
        description,
        channelBanner,
        subscribers,
        owner: req.user._id, // Ensure req.user is populated (e.g., via middleware)
      });
      return newChannel.save();
    })
    .then((channel) => {
      return res
        .status(201)
        .json({ message: "Channel created successfully", channel });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    });
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
