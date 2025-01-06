import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
