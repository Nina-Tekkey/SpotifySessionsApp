const router = require('express').Router();
let Song = require('../models/song.model');
const cron = require('node-cron');


router.route('/get').get((req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const sessionName = req.body.sessionName;


  const newSong = new Song({
    username,
    sessionName,
  
  });


  Song.exists({sessionName:sessionName}, function (err, doc) {
    if (err){
        console.log(err)
    }else{
//        if(!doc){
           var id = newSong._id;
           console.log(id.toString());
          newSong.save()
          .then(() => res.json(id.toString()))
          .catch(err => res.status(400).json('Error: ' + err));
//        }
        
    }
});

});


router.route('/sessionlog').get((req, res) => {
  console.log("jub");
  // cron.schedule('*/10 * * * * *', function() {
  //   console.log('running a task every minute');
  // });
  // console.log("jub");
  Song.findById(req.body.id)
  .then(() => res.json(req.body.id.toString()))
    .catch(err => res.status(400).json('Error: ' + err));
});



// router.route('/:id').get((req, res) => {
//   Song.findById(req.params.id)
//     .then(song => res.json(song))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Song.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Song deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/updateSong').post((req, res) => {


  Song.updateOne(
    {_id: req.body.sessionID},
    {$push: { songTitle: [req.body.songTitle] }},

    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );

  
});

router.route('/updateArtist').post((req, res) => {

  
    Song.updateOne(
      {_id: req.body.sessionID},
      {$push: { songArtist: [req.body.songArtist] }},
  
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  
    
  });
  


module.exports = router;