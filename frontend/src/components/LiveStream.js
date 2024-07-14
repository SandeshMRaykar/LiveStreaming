import React from 'react';
import ReactPlayer from 'react-player';

const LiveStream = () => {
    return (
        <div>
            <h1>Live Stream Page</h1>
            <ReactPlayer url="your_live_stream_url" playing controls />
        </div>
    );
};

export default LiveStream;
