import React from 'react';
import ReactPlayer from 'react-player';

const LiveStreamPage = () => {
    console.log('LiveStreamPage rendered');
    return (
        <div className='liveform'>
            <h1 className='live'>Live Stream</h1>
            
            <ReactPlayer className='url' url="https://www.youtube.com/watch?v=YQvm5qxZTBg" playing controls />
           
        </div>
    );
};

export default LiveStreamPage;
