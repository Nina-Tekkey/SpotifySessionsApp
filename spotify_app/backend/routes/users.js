
const router = require('express').Router();
let User = require('../models/user.model');

//get
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

//post
router.route('/add').post((req, res) => {
  const username = req.body.username;
  console.log(toString(req.body.username));
  console.log("here");
  const newUser = new User({username});
  User.exists({username:username}, function (err, doc) {
    if (err){
        console.log(err)
    }else{
        if(!doc){
          newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => res.status(400).json('Error: ' + err));
        }
    }
});

  

});




module.exports = router;