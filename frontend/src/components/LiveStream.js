import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Video from 'twilio-video';
import ReactPlayer from 'react-player';

const LiveStream = () => {
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [identity, setIdentity] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [playerUrl, setPlayerUrl] = useState('');

  useEffect(() => {
    // Example logic to fetch the player URL, typically from your backend
    const fetchPlayerUrl = async () => {
      // Simulate an API call
      setPlayerUrl('https://example.com/live-stream-url');
    };

    fetchPlayerUrl();
  }, []);

  const joinRoom = async () => {
    try {
      const response = await axios.post('/api/live/token', {
        identity,
        room: 'example-room'
      });

      const token = response.data.token;
      setToken(token);

      Video.connect(token, { name: 'example-room' })
        .then(room => {
          setRoom(room);
        })
        .catch(error => {
          console.error('Error connecting to room:', error);
        });
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  return (
    <div>
      <h1>Live Stream Page</h1>
      <input
        type="text"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
        placeholder="Enter your identity"
      />
      <button onClick={joinRoom}>Join Room</button>
      {room && <p>Connected to room: {room.name}</p>}
      <ReactPlayer url={playerUrl} playing controls />
    </div>
  );
};

export default LiveStream;
