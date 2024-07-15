import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css"; // Custom CSS for additional styling
;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
