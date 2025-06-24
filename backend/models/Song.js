const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  cover: { type: String }, // Image URL
  audioUrl: { type: String, required: true }, // S3 or local file URL
});

module.exports = mongoose.model("Song", SongSchema);
