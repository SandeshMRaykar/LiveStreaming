import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  console.log("HomePage rendered");
  return (
    <div className="homepage">
      <Link to="/live">Live Streaming</Link>

      <Link to="/chat">Chat</Link>
      <Link to="/notifications">Alert</Link>
      <Link to="/profile">User Profile</Link>
    </div>
  );
};

export default HomePage;
