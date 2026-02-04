const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: String, // IP address or session ID
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index to sort by likes and date
questionSchema.index({ likes: -1, createdAt: -1 });

module.exports = mongoose.model('Question', questionSchema);
