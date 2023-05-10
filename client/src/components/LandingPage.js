import React from 'react';
import './style/LandingPage.css';
import './style/Banner.css';
import Location from './Location'

function LandingPage() {
  return (
    <div> 
      <div className="banner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/fondo.png)`}}>
      <h1>BG-Project</h1>
      </div>
      <Location />
    </div>
  );
}

export default LandingPage;

