import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterSuccess = () => {
    return (
        <div className="auth-container">
            <h1 className="auth-title">🎉 Success! 🎉</h1>
            <p>Congratulations! Your account has been created successfully. You're just one step away from accessing the amazing features of our Live Streaming App.</p>
            <p>Please proceed to log in and start your journey with us!</p>
            <Link to="/login" className="btn btn-primary btn-block">Go to Login</Link>
        </div>
    );
};

export default RegisterSuccess;
