import { useState, useEffect } from "react"
import useAuth from "../useAuth"
import getSongsTest from "../getSongsTest"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import Navbar from "./navbar.component"
import SongList from "./song-list.component";
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
    const[session, setSession]=useState("");
    const[sessionID, setSessionID]=useState("");
    var lastSong = "";
  
   const accessToken = useAuth(code);
  
   useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  
   // setSession(getSongsTest(spotifyApi));
   // console.log(session);
    // axios.post('http://localhost:5000/songs/id', {name})
    //     .then(res => console.log(res.data))
    //     .catch((err) => {
    //     console.log(err);
    //     })


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


//   useEffect(() => {
//     if (!accessToken) return
//     getSongsTest(session, spotifyApi);
//   }, [session, spotifyApi])







//   return(
// <Router> 
//     <Navbar name={name} /> 
//    <br/> 
//        <Routes> 
//            <Route path="create" exact element={<CreateSong />} /> 
//             <Route path="songs" element={<SongList username={name} />} /> 
//            <Route path="user" element={<CreateUser />} /> 
           
//          </Routes>
//  </Router>
 
 
 
//   )
const handleChange = (event) => {
    setSession(event.target.value);
    console.log(session);
  };

  const newSession = () => {
    var validname= false;
    axios
    .post("http://localhost:5000/songs/add", {
      username: name,
      sessionName:session
    })
    .then(res => {
      var id=res.data;
      
        validname=true;
        setSessionID(id);
      console.log(id);
     
    })
    .catch(() => {
        console.log("bad sessionname catch");

    })
  
  };


// useEffect(()=>{
//     if (session=="") return
//     if (sessionID=="") return
//     if (!accessToken) return
//     console.log(sessionID);
    


// },[sessionID])
var interval;
useEffect(() => {
    if (session=="") return
    if (sessionID=="") return
    if (!accessToken) return
     interval = setInterval(() => {
     fetchSong();
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionID]);

  const stopSession=()=>{
    clearInterval(interval);

  }


  const fetchSong=()=>{

    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data){ 
        if(data.body.is_playing!=false){
            console.log(lastSong);
            if(lastSong!=data.body.item.name){
               lastSong =data.body.item.name;
                console.log("added");
         //   console.log(data.body.item.artists[0].name);
            axios
            .post("http://localhost:5000/songs/updateSong", {
              sessionID: sessionID,
              songTitle: data.body.item.name,
              
            })
            .then(res => {
              console.log("update w song");
            })
            .catch(() => {
                console.log("bad update catch");
            }) 

            axios.post("http://localhost:5000/songs/updateArtist", {
              sessionID: sessionID,
             
              songArtist: data.body.item.artists[0].name
            })
            .then(res => {
              console.log("update w art");
            })
            .catch(() => {
                console.log("bad update catch");
        
            }) 

            //THIS IS TEST MAP
            









            //END TEST MAP

        }
        }
    } )
    .catch((err) => {
    console.log(err);
    })
}
  
// useEffect(() => {
//     console.log("eff"+lastSong);
     
//   }, [lastSong]);

 





return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
    <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={session}
      />

    <button onClick={newSession}>Start Sesstion</button>
    <button onClick={stopSession}>Stop Sesstion</button>
   <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        Songs
    </div>
  </Container>
  )
  
}
