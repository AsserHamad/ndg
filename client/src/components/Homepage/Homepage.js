import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="videoDiv page">
      <video id="background-video" autoPlay loop muted>
        <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
export default Homepage;