import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StreamPage.css';
import TwilioVideo from 'twilio-video';

const StreamPage = () => {
    const [identity, setIdentity] = useState('');
    const [streamName, setStreamName] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [room, setRoom] = useState(null);
    const [streamDetails, setStreamDetails] = useState(null);

    useEffect(() => {
        const startEndButton = document.getElementById('streamStartEnd');

        const handleBeforeUnload = async (event) => {
            event.preventDefault();
            await endStream();
            event.returnValue = '';
        };

        startEndButton.addEventListener('click', startOrEndStream);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            startEndButton.removeEventListener('click', startOrEndStream);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [identity, streamName, isStreaming, streamDetails, room]);

    const handleIdentityChange = (event) => {
        setIdentity(event.target.value);
    };

    const handleStreamNameChange = (event) => {
        setStreamName(event.target.value);
    };

    const startOrEndStream = async (event) => {
        event.preventDefault();
        console.log('Button clicked to start or end stream');
        const startEndButton = document.getElementById('streamStartEnd');

        if (!isStreaming) {
            startEndButton.innerHTML = 'End Stream';
            startEndButton.disabled = true;

            try {
                await startStream(streamName, identity);
                startEndButton.disabled = false;
            } catch (error) {
                console.log(error);
                alert('Unable to start livestream.');
                startEndButton.innerHTML = 'Start Stream';
                startEndButton.disabled = false;
            }
        } else {
            endStream();
        }
    };

    const startStream = async (streamName, identity) => {
        console.log('Starting stream with streamName:', streamName, 'and identity:', identity);
        const startStreamResponse = await fetch('http://localhost:5000/api/stream/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                streamName: streamName
            })
        });

        const streamDetails = await startStreamResponse.json();
        setStreamDetails(streamDetails);
        const roomId = streamDetails.roomId;

        const tokenResponse = await fetch('http://localhost:5000/api/stream/streamerToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identity: identity,
                room: roomId
            })
        });

        const tokenData = await tokenResponse.json();

        const videoRoom = await TwilioVideo.connect(tokenData.token);
        setRoom(videoRoom);
        setIsStreaming(true);

        // Attach local video track
        const localTrack = await TwilioVideo.createLocalVideoTrack();
        const videoElement = localTrack.attach();
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';

        const stream = document.getElementById('stream');
        stream.appendChild(videoElement);

        const liveNotification = document.createElement('div');
        liveNotification.innerHTML = 'LIVE';
        liveNotification.id = 'liveNotification';
        liveNotification.classList.add('badge', 'badge-danger', 'position-absolute', 'top-0', 'start-0');
        stream.insertBefore(liveNotification, stream.firstChild);
    };

    const endStream = async () => {
        if (isStreaming) {
            try {
                console.log('Ending stream with details:', streamDetails);
                const response = await fetch('http://localhost:5000/api/stream/end', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        streamDetails: streamDetails
                    })
                });

                const data = await response.json();
                room.disconnect();
                setRoom(null);
                setIsStreaming(false);
                const liveNotification = document.getElementById('liveNotification');
                if (liveNotification) {
                    liveNotification.remove();
                }
                const stream = document.getElementById('stream');
                stream.innerHTML = ''; // Clear the stream element
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container mt-5 text-center">
            <div id="stream" className="d-flex justify-content-center align-items-center w-100 mb-5 bg-light" style={{ minHeight: '300px', border: '2px dashed #ccc' }}>
                {/* Video feed will be appended here */}
            </div>
            <div id="controls" className="mt-3">
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
                            disabled={isStreaming}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-3">
                        <input
                            className="form-control"
                            id="streamName"
                            type="text"
                            placeholder="Livestream name"
                            value={streamName}
                            onChange={handleStreamNameChange}
                            required
                            disabled={isStreaming}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-3">
                        <button
                            className={`btn ${isStreaming ? 'btn-danger' : 'btn-success'} text-white font-bold py-2 px-6`}
                            id="streamStartEnd"
                        >
                            {isStreaming ? 'End Stream' : 'Start Stream'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPage;
