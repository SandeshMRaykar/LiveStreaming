import React from 'react';

const Home = () => {
    const firstName = localStorage.getItem('firstName');
    return (
        <div className="container mt-4">
            {firstName && (
                <h1>Hello {firstName}, Welcome to this app!</h1>
            )}
            {!firstName && (
                <h1>Welcome to the Live Streaming App</h1>
            )}
            <p>This app offers the following features:</p>
            <ul>
                <li>Live Stream: Watch live streams from various content creators.</li>
                <li>Notifications: Stay updated with the latest notifications.</li>
                <li>Profile: Manage your profile and settings.</li>
                <li>Chat: Engage in real-time chat with other users.</li>
            </ul>
        </div>
    );
};

export default Home;
