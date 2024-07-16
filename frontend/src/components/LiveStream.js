import React, { useState, useRef } from "react";
import Video from "twilio-video";

const LiveStreaming = () => {
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [room, setRoom] = useState(null);
  const videoRef = useRef(null);

  const handleJoinRoom = async () => {
    if (!roomName || !identity) return;

    const response = await fetch(`/video/token?identity=${identity}`);
    const data = await response.json();

    Video.connect(data.token, { name: roomName })
      .then((room) => {
        setRoom(room);
        room.localParticipant.tracks.forEach((publication) => {
          videoRef.current.appendChild(publication.track.attach());
        });
        room.on("participantConnected", (participant) => {
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              videoRef.current.appendChild(publication.track.attach());
            }
            publication.on("subscribed", (track) => {
              videoRef.current.appendChild(track.attach());
            });
          });
        });
      })
      .catch((error) => {
        console.error("Unable to connect to room", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your identity"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <div ref={videoRef}></div>
    </div>
  );
};

export default LiveStreaming;
