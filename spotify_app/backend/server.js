const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app= express();


app.use(cors());
app.use(express.json());

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
const songsRouter = require('./routes/songs');
app.use('/users', usersRouter);
app.use('/songs', songsRouter);

app.listen(3000, ()=> {
    console.log('Server is running on port: 3000');
});

