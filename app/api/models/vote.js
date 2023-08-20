const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    feedbackId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);
