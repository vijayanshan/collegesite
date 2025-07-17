import React, { useState } from 'react';
import '../components/css/Loginsignup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from './config';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/leaves/login/student`,
        null,
        {
          params: {
            id: id,
            password: password
          }
        }
      );
      alert(response.data);
      navigate('/LoginForm/LeaveForm');
    } catch (error) {
      alert(error.response?.data || "Login failed ❌");
    }
  };

  return (
    <div className="login-bg">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-heading">Student Login</h2>

        <div className="input-group">
          <label htmlFor="id" className="input-label">Student ID:</label>
          <input
            type="text"s
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="input-label">Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="forgot-link">
          <a href="/LoginForm/ForgotPassword">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Sign In</button>
      </form>
    </div>
  );
};

// ✅ Eye icon
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#555" viewBox="0 0 24 24">
    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/>
    <circle cx="12" cy="12" r="2.5" fill="#555"/>
  </svg>
);

// ✅ Eye slash icon
const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#555" viewBox="0 0 24 24">
    <path d="M2.1 3.51L.39 5.22 4.9 9.73A9.62 9.62 0 001 12s4 7 11 7a10.88 10.88 0 005.22-1.3l3.56 3.57 1.71-1.71zM12 17a5 5 0 01-5-5 4.79 4.79 0 01.4-1.81l1.51 1.52a2.5 2.5 0 003.9 3.9l1.52 1.51A4.79 4.79 0 0112 17zm6.12-2.29L16.54 12l1.58-1.58a7.07 7.07 0 00-4.12-1.42 7 7 0 00-5.58 2.84l1.71 1.71a4.9 4.9 0 015.11-1.3l1.12 1.12a5 5 0 011.22 1.52z" />
  </svg>
);

export default LoginForm;
