const express = require("express");
const Song = require("../models/Song");

const router = express.Router();

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const updatedSongs = songs.map((song) => ({
      ...song.toObject(), // Convert Mongoose document to plain object
      cover: song.cover.startsWith("http")
        ? song.cover
        : `${baseUrl}/assets/images/${song.cover}`,
      audioUrl: song.audioUrl.startsWith("http")
        ? song.audioUrl
        : `${baseUrl}/assets/audio/${song.audioUrl}`,
    }));

    res.json(updatedSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single song by ID
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const updatedSong = {
      ...song.toObject(),
      cover: `/assets/images/${song.cover}`,
      audioUrl: `/assets/audio/${song.audioUrl}`,
    };

    res.json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, artist, cover, audioUrl } = req.body;
    const newSong = new Song({ title, artist, cover, audioUrl });
    await newSong.save();
    res
      .status(201)
      .json({ message: "Song added successfully!", song: newSong });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
