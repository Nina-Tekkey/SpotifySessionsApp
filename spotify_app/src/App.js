import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter as Router, Route} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Navbar from "./components/navbar.component"
import SongList from "./components/song-list.component";
import CreateSong from "./components/create-song.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router> 
    <Navbar /> 
    <br/> 
        <Routes> 
            <Route path="/" exact element={<SongList />} /> 
            <Route path="create" element={<CreateSong />} /> 
            <Route path="user" element={<CreateUser />} /> 
        </Routes>
</Router>
  );
}

export default App;