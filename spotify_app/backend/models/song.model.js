const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  username: { type: String, required: true },
  sessionName:{ type: String, required: true },
  songTitle: { type: [String], required: false },
  songArtist: { type: [String], required: false },
  duration: { type: Number, required: false },
  time: { type: Date, required: false },
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;