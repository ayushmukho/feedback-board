const mongoose = require("mongoose");

const commentSchem = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    uploads: {
      type: [String],
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchem);
