import React from "react"

export default function SessionResult({ track }) {
  const smallestAlbumImage = track.album.images.reduce(
    (smallest, image) => {
      if (image.height < smallest.height) return image
      return smallest
    },
    track.album.images[0]
  )
console.log(smallestAlbumImage);
  return (
    <div
      className="d-flex m-2 align-items-center"
     
    >
      <img src={smallestAlbumImage.url} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div className="text-light">{track.name}</div>
        <div className="text-muted">{track.artists[0].name}</div>
      </div>
    </div>
  )
}