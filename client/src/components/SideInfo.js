import React from 'react';
import './style/SideInfo.css';

function SideInfo() {
  return (
    <div className="sideinfo">
      <div className="left-section">
        <img src="https://example.com/image.png" alt="example" />
        <p>Left section text</p>
      </div>
      <div className="right-section">
        <p>Right section text</p>
      </div>
    </div>
  );
}

export default SideInfo;

