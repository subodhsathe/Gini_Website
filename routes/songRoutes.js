const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get latest 10 songs
router.get('/latest', async (req, res) => {
  try {
    const songs = await Song.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top 5 songs by likes, then by latest if less than 5 liked
router.get('/top', async (req, res) => {
  try {
    // Get top 5 songs sorted by likes (descending), then by date (newest first)
    const songs = await Song.find()
      .sort({ likes: -1, createdAt: -1 })
      .limit(5);

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new song suggestion
router.post('/create', async (req, res) => {
  try {
    const { songTitle } = req.body;

    if (!songTitle || songTitle.trim() === '') {
      return res.status(400).json({ message: 'Song title cannot be empty' });
    }

    const newSong = new Song({
      songTitle: songTitle.trim(),
    });

    await newSong.save();

    // Delete old songs - keep only latest 10
    const allSongs = await Song.find().sort({ createdAt: -1 });
    if (allSongs.length > 10) {
      const songsToDelete = allSongs.slice(10);
      const idsToDelete = songsToDelete.map(s => s._id);
      await Song.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.status(201).json({ message: 'Song suggestion posted successfully', data: newSong });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a song
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;

    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Check if user already liked
    if (song.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this song' });
    }

    song.likes += 1;
    song.likedBy.push(userId);
    await song.save();

    res.status(200).json({ message: 'Song liked', data: song });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unlike a song
router.post('/:id/unlike', async (req, res) => {
  try {
    const { userId } = req.body;

    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Check if user has liked
    const index = song.likedBy.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: 'You have not liked this song' });
    }

    song.likes -= 1;
    song.likedBy.splice(index, 1);
    await song.save();

    res.status(200).json({ message: 'Song unliked', data: song });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
