// src/components/OfflineForms.jsx
import React from "react";
import '../components/css/offline_forms.css';
import pdfIcon from '../components/assets/pdf-icon.png';


const OfflineForms = () => {
  return (
    <div className="offline-page-wrapper">
      {/* Background Layer */}
      <div className="offline-bg-layer"></div>

      {/* Header */}
      <div className="top-header">
        <h1>Shanmuga Industries Arts and Science College</h1>
        <h2>Offline Leave Forms</h2>
      </div>

      {/* Content */}
      <div className="container">
        <div className="form-section">
          <h2>Staff - Leave Application</h2>
          <a className="download-link" href="" download>
            <img src={pdfIcon} alt="PDF Icon" />
            Leave Application - Click here to download
          </a>
        </div>

        <div className="form-section">
          <h2>Students - Leave Application</h2>
          <a className="download-link" href="/public/pdf forms/Leave Application Form - Students.pdf" download>
            <img src={pdfIcon} alt="PDF Icon" />
            Leave Application - Click here to download
          </a>
        </div>

        <a className="back-link" href="/">&larr; Back to Home </a>
      </div>

      {/* Footer */}
      <div className="bottom-bar">
        &copy; 2025 Shanmuga Industries Arts and Science College
      </div>
    </div>
  );
};

export default OfflineForms;
