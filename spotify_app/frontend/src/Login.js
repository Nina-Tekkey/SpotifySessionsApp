import React from "react"
import { Container } from "react-bootstrap"
import "./App.css";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e6214187eccd44d89b73d411d987175f&response_type=code&redirect_uri=http://localhost:3000/user&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"



export default function Login() {
  return (
    
    <div className="LoginContainer"
    >
      
      <div className="LoginForm">
        <h1>Spotify Sessions</h1>
      <a className="btn btn-success btn-block text-center" href={AUTH_URL}>
        Login With Spotify
      </a>
      </div>
    </div>
  )
}