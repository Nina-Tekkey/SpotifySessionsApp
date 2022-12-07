import { useState, useEffect } from "react"
import "./Dash.css";
import useAuth from "../useAuth"
import getSongsTest from "../getSongsTest"
import { Container, Form , Button} from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import SessionResult from "../SessionResult"
import HistoryResults from "../HistoryResults"
// import Navbar from "./navbar.component"
// import SongList from "./song-list.component";
// import CreateSong from "./create-song.component";
// import CreateUser from "./create-user.component";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import Login from "../Login"

const spotifyApi = new SpotifyWebApi({
  clientId: "e6214187eccd44d89b73d411d987175f",
})

export default function Dash({ code }) {
   
    const[name, setName]=useState("");
    const[session, setSession]=useState("");
    const[sessionID, setSessionID]=useState("");
    var lastSong = "";
    var preMap = [];
   var key =0;
    var mapItem="";
   
    const[listOfSongs, setListOfSongs]=useState([]);
    const[listofHist, setListofHist]=useState([]);
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
    if(session===""){
        console.log("invalid session name");
        return;
    }
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
    setSessionID("");
    setSession("");
     lastSong = "";
     preMap = [];
    key =0;
     mapItem="";
   setListOfSongs([]);

    clearInterval(interval);

  }


  const fetchSong=()=>{
    
    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data){ 
        if(data.body.is_playing!=false){
            console.log(lastSong);
            if(lastSong!=data.body.item.name){
               lastSong =data.body.item.name;
                console.log(data.body.item);
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
            
            
          
            // update the state
            
           
            //difftest
            
            preMap =[...preMap, data.body.item];
            setListOfSongs(preMap);
            console.log(preMap);
            key=key+1;
                
                // var newMap = data.body.item.map(item => {
                //   const smallestAlbumImage = item.album.images.reduce(
                //     (smallest, image) => {
                //       if (image.height < smallest.height) return image
                //       return smallest
                //     },
                //     item.album.images[0]
                //   )
        
                //   return {
                //     artist: item.artists[0],
                //     title: item.name,
                //     uri: item.uri,
                //     albumUrl: smallestAlbumImage.url,
                //   }
                // })
            
            

                

            //END TEST MAP

        }
        }
    } )
    .catch((err) => {
    console.log(err);
    })
}
  

useEffect(() => {
    if(listOfSongs.length===0) return
    
    console.log(listOfSongs);
    
  });

  

const logOut=()=>{
    
    setName("");
    setSession("");
    setSessionID("");
    var lastSong = "";
    var preMap = [];
   var key =0;
    var mapItem="";
   setListOfSongs([]);
   console.log("out");
   window.location = "/";

}


const history=()=>{
  console.log(name);
  axios.post("http://localhost:5000/songs/history", {
    username: name
  })
  .then(res => {
   console.log(res.data[0]);
   setListofHist(res.data);
   

  })
  .catch(() => {
      console.log("bad hist catch");

  })              

}

const remhistory=()=>{
    setListofHist([]);
}

return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
    
        <h3>Logged In As: {name}</h3>
    <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={session}
      />
      

    <Button className="btn btn-success" onClick={newSession}>Start Sesstion</Button>
    <Button className="btn btn-success" onClick={stopSession}>Stop Sesstion</Button>
    {/* <div className="row">
    <div className="col">
      One of  columns
    </div>
    <div className="col">
      One of three columns
    </div>
  </div> */}
  
    <div className="col-sm flex-grow-1 my-2 b-5" style={{ overflowY: "auto" }}>
        Current Session:
        {
        listOfSongs.map(track => (
          <SessionResult
            track={track}
            key={track.uri}
            
          />
        ))}
        </div>
       
      <div className="col-sm flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        Previous Sessions:
        {listofHist.map(track => (
          <HistoryResults
            track={track}
            key = {track.id}
            
          />
        ))}
      
        </div>
        <div className="position-absolute bottom-0 start-0" > <Button className="btn btn-success" onClick={logOut}>log out </Button> </div>
        <div className="position-absolute bottom-0 start-50" > <Button className="btn btn-success" onClick={history}>View History </Button> </div>
        <div className="position-absolute bottom-0 end-0" > <Button className="btn btn-success" onClick={remhistory}>Remove History </Button> </div>

  </Container>
  )
  
}
