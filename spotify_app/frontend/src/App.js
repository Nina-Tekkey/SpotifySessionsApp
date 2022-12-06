import React, { useState, useEffect } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Login from "./Login";
import Dash from "./components/Dash.component";
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


const code = new URLSearchParams(window.location.search).get("code")



function App() {

  

console.log(code);
  
  return (
//     <Router> 
//     <Navbar /> 
//     <br/> 
//         <Routes> 
//             <Route path="/songs" exact element={<SongList />} /> 
//             <Route path="create" element={<CreateSong />} /> 
//             <Route path="user" element={<CreateUser />} /> 
//         </Routes>
// </Router>


code ? <Dash code={code} /> : <Login />
  );
}

export default App;