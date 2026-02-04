const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    songTitle: {
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
songSchema.index({ likes: -1, createdAt: -1 });

module.exports = mongoose.model('Song', songSchema);
