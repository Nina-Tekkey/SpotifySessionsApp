import React from "react"
import SongListHist from "./SongListHist"

export default function HistoryResults({ track }) {
console.log(track.songTitle);

  return (
    <div
      className="d-flex m-2 align-items-center"
    >
      
      <div className="ml-3">
      <div>{track.sessionName} </div>
      <ol>{track.songTitle.map((song)=> <SongListHist name={song} /> )}  </ol>
        {/* <div>{track.songTitle.join('\n')}</div> */}
        {/* <div className="text-muted">{track.artists[0].name}</div> */}
      </div>
    </div>
  )
}