import { useState, useEffect } from "react"
import axios from "axios"

export default function GetSongsTest(session, api) {
    
  var s= "session";
var sessionName= session;
var id="";

    axios
      .post("http://localhost:5000/songs/add", {
        username: s,
        sessionName:sessionName
      })
      .then(res => {
        id="";
        
        
      })
      .catch((err) => {
        console.log("me");
      console.log(err);
      })
    


 
    
  
    return id;
  }



