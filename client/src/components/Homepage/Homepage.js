import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="videoDiv page">
      <video id="background-video" autoPlay loop muted>
        <source src="https://i.imgur.com/83NMbaF.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
export default Homepage;