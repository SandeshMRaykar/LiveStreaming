// import React, { useEffect, useRef, useState } from 'react';
// import { connect, createLocalTracks } from 'twilio';

// const VideoChat = ({ token, roomName }) => {
//   const [room, setRoom] = useState(null);
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();

//   useEffect(() => {
//     const startVideoChat = async () => {
//       const localTracks = await createLocalTracks({
//         audio: true,
//         video: { width: 640 },
//       });

//       localTracks.forEach(track => {
//         localVideoRef.current.appendChild(track.attach());
//       });

//       const room = await connect(token, {
//         name: roomName,
//         tracks: localTracks,
//       });

//       room.on('participantConnected', participant => {
//         participant.tracks.forEach(publication => {
//           if (publication.isSubscribed) {
//             const track = publication.track;
//             remoteVideoRef.current.appendChild(track.attach());
//           }
//         });

//         participant.on('trackSubscribed', track => {
//           remoteVideoRef.current.appendChild(track.attach());
//         });
//       });

//       setRoom(room);
//     };

//     startVideoChat();

//     return () => {
//       if (room) {
//         room.localParticipant.tracks.forEach(trackPublication => {
//           trackPublication.track.stop();
//         });
//         room.disconnect();
//       }
//     };
//   }, [token, roomName]);

//   return (
//     <div>
//       <div ref={localVideoRef} id="local-video"></div>
//       <div ref={remoteVideoRef} id="remote-video"></div>
//     </div>
//   );
// };

// export default VideoChat;



