import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LiveStream.css'; // Ensure to create this file for custom styling

const LiveStream = () => {
    return (
        <div className="container mt-5 text-center">
            <div className="mt-5">
                <a href="/stream" className="live-stream-link">Start a Livestream</a>
            </div>
            <div className="mt-4">
                <a href="/watch" className="live-stream-link">Watch a Livestream</a>
            </div>
        </div>
    );
};

export default LiveStream;
