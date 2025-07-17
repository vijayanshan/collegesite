import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/forgotpassword.css';
import backforgot from '../components/assets/loginsignupstaff.jpg';

import axios from 'axios';
import API_BASE_URL from './config';

const ForgotPassword = () => {
  const [studentId, setStudentId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [resetEnabled, setResetEnabled] = useState(false);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);

  const navigate = useNavigate(); // 👈 used for redirection

  const handleSendOtp = async () => {
    if (!studentId.trim()) {
      alert('Please enter your Student ID');
      return;
    }
    setLoadingSendOtp(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/leaves/student/send-otp?userId=${studentId}`);
      alert(res.data);
      setOtpEnabled(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('❌ Failed to send OTP. Please try again.');
    } finally {
      setLoadingSendOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      alert('Please enter OTP');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/leaves/student/verify-otp?userId=${studentId}&otp=${otp}`);
      if (response.data.includes('✅')) {
        alert('✅ OTP Verified. Now enter your new password.');
        setResetEnabled(true);
      } else {
        alert('❌ Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('❌ Failed to verify OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert('Please fill both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/leaves/student/reset-password`,
        new URLSearchParams({
          userId: studentId,
          otp: otp,
          newPassword: newPassword,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      alert(response.data);
      navigate('/home'); // 👈 redirect to home page after success
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('❌ Failed to reset password. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(190, 197, 232, 0)',
        backgroundImage: `url(${backforgot})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        className="forgot-password-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgb(14, 1, 1)',
          width: '100%',
          maxWidth: '400px',
          backdropfilter: 'blur(100px)',
        }}
      >
        <h2>Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter your Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="input-field"
        />

        <button
          onClick={handleSendOtp}
          className="send-otp-button"
          disabled={loadingSendOtp}
        >
          {loadingSendOtp ? 'Sending...' : 'Send OTP'}
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpEnabled}
          className="input-field"
        />

        <button
          onClick={handleVerifyOtp}
          disabled={!otpEnabled}
          className="verify-button"
        >
          Verify OTP
        </button>

        {resetEnabled && (
          <>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
            <button
              onClick={handleResetPassword}
              className="reset-button"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );  
};

export default ForgotPassword;
