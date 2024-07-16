import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WatchPage.css';

const WatchPage = () => {
    const [isWatching, setIsWatching] = useState(false);

    const handleWatchStream = () => {
        // Placeholder function for watching the stream
        setIsWatching(!isWatching);
    };

    return (
        <div className="container mt-5 text-center">
            <div id="player" className="mx-auto bg-light h-96 max-w-2xl">
                {/* livestream will appear here */}
                {isWatching && <p>Livestream is playing...</p>}
            </div>
            <button
                className={`btn btn-success text-white font-bold mt-4 py-2 px-6 mr-2 ${isWatching ? 'btn-danger' : 'btn-success'}`}
                id="streamStartEnd"
                onClick={handleWatchStream}
            >
                {isWatching ? 'Stop Watching' : 'Watch Stream'}
            </button>
        </div>
    );
};

export default WatchPage;
