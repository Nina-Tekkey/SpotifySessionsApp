const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var SpotifyWebApi = require('spotify-web-api-node');
const bodyParser= require("body-parser");

require('dotenv').config();
const app= express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const username = "NinaTekkey";
const password = "Knee%40MongoDB";
const cluster = "cluster0.oyco4ry";
const dbname = "myFirstDatabase";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
 
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected successfully");
});

const usersRouter = require('./routes/users');
// const songsRouter = require('./routes/songs');

app.use('/user', usersRouter);
// app.use('/songs', songsRouter);

app.post('/login', (req, res)=>{
  const code = req.body.code
  console.log(code);
  const spotifyApi = new SpotifyWebApi({
   
    redirectUri: 'http://localhost:3000/user',
        clientId: 'e6214187eccd44d89b73d411d987175f',
        clientSecret: '5692dc9232044b83ac87c4b536b6e49d',
       
      });
    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
        
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400)
    })
console.log("me");

})



// app.listen(3000, ()=> {
//     console.log('Server is running on port: 3000');
// });

///HEHEH

//HEHEHE

// const scopes = [
//     'ugc-image-upload',
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'streaming',
//     'app-remote-control',
//     'user-read-email',
//     'user-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-private',
//     'user-library-modify',
//     'user-library-read',
//     'user-top-read',
//     'user-read-playback-position',
//     'user-read-recently-played',
//     'user-follow-read',
//     'user-follow-modify'
//   ];
  
// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//     clientId: 'e6214187eccd44d89b73d411d987175f',
//     clientSecret: '5692dc9232044b83ac87c4b536b6e49d',
//     redirectUri: 'http://localhost:5000/account/'
//   });
  
  
  
//   app.get('/login', (req, res) => {
//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
//   });
  
//   app.get('/account/', (req, res) => {
//     const error = req.query.error;
//     const code = req.query.code;
//     const state = req.query.state;
  
//     if (error) {
//       console.error('Callback Error:', error);
//       res.send(`Callback Error: ${error}`);
//       return;
//     }
  
//     spotifyApi
//       .authorizationCodeGrant(code)
//       .then(data => {
//         const access_token = data.body['access_token'];
//         const refresh_token = data.body['refresh_token'];
//         const expires_in = data.body['expires_in'];
  
//         spotifyApi.setAccessToken(access_token);
//         spotifyApi.setRefreshToken(refresh_token);
  
//         console.log('access_token:', access_token);
//         console.log('refresh_token:', refresh_token);
  
//         console.log(
//           `Sucessfully retreived access token. Expires in ${expires_in} s.`
//         );
//         res.send('Success! You can now close the window.');
  
//         setInterval(async () => {
//           const data = await spotifyApi.refreshAccessToken();
//           const access_token = data.body['access_token'];
  
//           console.log('The access token has been refreshed!');
//           console.log('access_token:', access_token);
//           spotifyApi.setAccessToken(access_token);
//         }, expires_in / 2 * 1000);
//       })
//       .catch(error => {
//         console.error('Error getting Tokens:', error);
//         res.send(`Error getting Tokens: ${error}`);
//       });
//   });
  
  app.listen(5000, () =>
    console.log(
      'HTTP Server up. Now go to http://localhost:5000/login in your browser.'
    )
  );



