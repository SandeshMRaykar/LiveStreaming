import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img src={user.avatar} alt="Profile Avatar" />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <div>
        <h4>Contact Information</h4>
        <p>Email: {user.email}</p>
      </div>
      {/* Include other sections like account settings, activity history, etc. */}
    </div>
  );
};

export default UserProfile;
