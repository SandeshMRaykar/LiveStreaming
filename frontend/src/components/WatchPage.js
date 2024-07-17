import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StreamPage.css';
import TwilioVideo from 'twilio-video';

const WatchPage = () => {
    const [roomName, setRoomName] = useState('');
    const [identity, setIdentity] = useState('');
    const [room, setRoom] = useState(null);
    const [isWatching, setIsWatching] = useState(false);

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleIdentityChange = (event) => {
        setIdentity(event.target.value);
    };

    const joinRoom = async (event) => {
        event.preventDefault();

        try {
            const tokenResponse = await fetch('http://localhost:5000/api/stream/viewerToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identity: identity,
                    room: roomName
                })
            });

            const tokenData = await tokenResponse.json();

            const videoRoom = await TwilioVideo.connect(tokenData.token, { name: roomName });
            setRoom(videoRoom);
            setIsWatching(true);

            videoRoom.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                });
            });

            videoRoom.participants.forEach(participant => {
                console.log(`Participant "${participant.identity}" is already connected`);

                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                });
            });

        } catch (error) {
            console.log('Error connecting to the room:', error);
            alert('Unable to join the stream.');
        }
    };

    return (
        <div className="container mt-5 text-center">
            {!isWatching && (
                <form onSubmit={joinRoom}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 mb-3">
                            <input
                                className="form-control"
                                id="identity"
                                type="text"
                                placeholder="Your name"
                                value={identity}
                                onChange={handleIdentityChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 mb-3">
                            <input
                                className="form-control"
                                id="roomName"
                                type="text"
                                placeholder="Livestream name"
                                value={roomName}
                                onChange={handleRoomNameChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 mb-3">
                            <button className="btn btn-primary text-white font-bold py-2 px-6" type="submit">
                                Join Stream
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {isWatching && <div id="remote-media-div" className="d-flex justify-content-center align-items-center w-100 mb-5 bg-light" style={{ minHeight: '300px', border: '2px dashed #ccc' }}>
                {/* Remote video will be appended here */}
            </div>}
        </div>
    );
};

export default WatchPage;
