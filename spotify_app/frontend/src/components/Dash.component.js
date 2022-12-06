import { useState, useEffect } from "react"
import useAuth from "../useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import Navbar from "./navbar.component"
import SongList from "./create-song.component";
import CreateSong from "./create-song.component";
import CreateUser from "./create-user.component";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
  clientId: "e6214187eccd44d89b73d411d987175f",
})

export default function Dash({ code }) {
    const[name, setName]=useState("");
   
   const accessToken = useAuth(code);
   useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

//add username 
  useEffect(()=>{
    if(!accessToken) return
    console.log(accessToken);
    spotifyApi.getMe()
    .then(function(data) {
        console.log('Some information about the authenticated user', data.body);
        var username = data.body.display_name;
        setName(data.body.display_name);
        console.log(username);
        axios.post('http://localhost:5000/user/add', {username})
        .then(res => console.log(res.data))
        .catch((err) => {
        console.log(err);
        })
      }).catch((err) => {
        
        })

  }, [accessToken])









  return(

<Router> 
    <Navbar name={name} /> 
   <br/> 
       <Routes> 
           <Route path="songs" exact element={<SongList />} /> 
            <Route path="create" element={<CreateSong />} /> 
           <Route path="user" element={<CreateUser />} /> 
           
         </Routes>
 </Router>
 
 
  )
  
}
