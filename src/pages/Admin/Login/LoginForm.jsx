import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        email: username,
        password,
      });

      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return config;
      });

      localStorage.setItem("auth", JSON.stringify(response.data));
      setTimeout(() => {
        localStorage.removeItem("auth");
      }, 2 * 60 * 60 * 1000); // 2 hours

      navigate("/adminHome");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      setTimeout(() => {
        setError("");
      }, 10000);
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div id="login-form">
        <h1>Մուտք գործել</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Գաղտնաբառ:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
