const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const songTitle = req.body.songTitle;
  const songArtist = req.body.songArtist;
  const duration = Number(req.body.duration);
  const time = Date.parse(req.body.time);

  const newSong = new Song({
    username,
    songTitle,
    songArtist,
    duration,
    time,
  });

  newSong.save()
  .then(() => res.json('Song added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Song.findById(req.params.id)
    .then(song => res.json(song))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Song.findByIdAndDelete(req.params.id)
    .then(() => res.json('Song deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Song.findById(req.params.id)
    .then(song => {
     
       song.username = req.body.username;
      song.songTitle = req.body.songTitle;
      song.songArtist = req.body.songArtist;
      song.duration = Number(req.body.duration);
      song.time = Date.parse(req.body.time);
      song.save()
        .then(() => res.json('Song updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;