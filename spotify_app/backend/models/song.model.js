const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  username: { type: String, required: true },
  songTitle: { type: [String], required: true },
  songArtist: { type: [String], required: true },
  duration: { type: Number, required: true },
  time: { type: Date, required: true },
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;