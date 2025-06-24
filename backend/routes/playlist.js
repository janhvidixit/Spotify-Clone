const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();

// Like a song
router.post("/like/:songId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const songId = req.params.songId;

    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }

    res.json({ message: "Song added to liked playlist" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get liked songs
router.get("/liked", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("likedSongs");
    res.json({ likedSongs: user.likedSongs });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
