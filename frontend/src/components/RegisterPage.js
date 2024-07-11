import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", { email, password });
      // Assuming your backend sends a token upon successful login
      const { token } = response.data;
      // Store the token in local storage
      localStorage.setItem("token", token);
      // Navigate to the home page
      navigate("/login");
    } catch (error) {
      console.error("SignUp failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1 className="login">Register</h1>
      <div className="loginform">
        <input
          className="logmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="logpwd"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          className="logpwd"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button className="logbtn" type="submit">
          Sign Up
        </button>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default Signup;
