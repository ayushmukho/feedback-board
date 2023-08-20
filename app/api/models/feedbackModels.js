const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // ip: {
    //   type: String,
    //   required: true,
    // },
    uploads: {
      type: [String],
    },
    vote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
