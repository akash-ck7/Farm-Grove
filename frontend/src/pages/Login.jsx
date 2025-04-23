import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", formData);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to home
      navigate("/");

      console.log("Login successful:", response.data);
    } catch (err) {
      const message = err.response?.data || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login to your From Grove account</p>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <p className="form-subtitle" style={{ marginTop: "10px", textAlign: "center" }}>
            Don't have an account?{" "}
            <a href="/registerBuyer" className="register-link">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;