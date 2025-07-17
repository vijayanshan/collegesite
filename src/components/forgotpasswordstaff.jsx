import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import axios from 'axios';
import API_BASE_URL from './config';
import staffforgotbg from '../components/assets/background/campus.jpg'; // ✅ background image

const StaffForgotPassword = () => {
  const [staffId, setStaffId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);

  const navigate = useNavigate(); // ✅ initialize navigation

  const handleSendOtp = async () => {
    if (!staffId.trim()) {
      alert('Please enter your Staff ID');
      return;
    }

    setLoadingSendOtp(true);
    try {
      await axios.post(`${API_BASE_URL}/api/leaves/send-otp?userId=${staffId}`);
      alert(`OTP sent to your registered email/mobile for Staff ID: ${staffId}`);
      setOtpEnabled(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoadingSendOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/leaves/verify-otp?userId=${staffId}&otp=${otp}`);
      if (response.data.includes('✅')) {
        alert('OTP Verified. You can now reset your password.');
        setOtpVerified(true);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('❌ Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/leaves/reset-password?userId=${staffId}&newPassword=${newPassword}`
      );
      alert(response.data);

      // ✅ Navigate to home after success
      navigate('/');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${staffforgotbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        className="forgot-password-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '30px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Staff Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter your Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="input-field"
          style={inputStyle}
        />

        <button
          onClick={handleSendOtp}
          className="send-otp-button"
          style={buttonStyle}
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
          style={inputStyle}
        />

        <button
          onClick={handleVerifyOtp}
          disabled={!otpEnabled}
          className="verify-button"
          style={buttonStyle}
        >
          Verify OTP
        </button>

        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              style={inputStyle}
            />

            <button onClick={handleResetPassword} className="submit-button" style={buttonStyle}>
              Submit New Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffForgotPassword;

// ✅ Reusable styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '15px',
};
