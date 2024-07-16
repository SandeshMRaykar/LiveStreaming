import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Custom CSS for additional styling

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const res = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(res.data);
            }
        };

        fetchUserDetails();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5 pt-4 profile-container">
            <h1 className="profile-title">User Profile</h1>
            <div className="card profile-card">
                <div className="card-body">
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>First Name:</strong> {user.firstName}</p>
                    <p className="card-text"><strong>Last Name:</strong> {user.lastName}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
