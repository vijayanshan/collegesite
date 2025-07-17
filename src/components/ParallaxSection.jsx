import React from 'react';
import { Parallax } from 'react-parallax';
import campusImage from './assets/background/campus.jpg'; // adjust path if needed

const ParallaxSection = () => {
  return (
    <Parallax bgImage={campusImage} strength={300}>
      <div style={{
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textShadow: '2px 2px 8px #000',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Welcome to</h1>
        <h2 style={{ fontSize: '2rem' }}>Shanmuga Industries Arts and Science College</h2>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
