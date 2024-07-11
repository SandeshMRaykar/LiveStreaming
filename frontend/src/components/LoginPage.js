import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      // Assuming your backend sends a token upon successful login
      const { token } = response.data;
      // Store the token in local storage
      localStorage.setItem("token", token);
      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1 className="login">Login</h1>
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
        <button className="logbtn" type="submit">
          Login
        </button>
        <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
};

export default Login;
