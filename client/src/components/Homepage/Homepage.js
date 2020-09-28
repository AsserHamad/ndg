import React from 'react';
import './Homepage.css';
import Footer from '../Footer/Footer';

function Homepage() {
  return (
    <div className="videoDiv page">
      {/* <video id="background-video" autoPlay loop muted>
        <source src="https://i.imgur.com/83NMbaF.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <img className={`homepage-img`} src="https://res.cloudinary.com/duiexwi8t/image/upload/v1601205286/NDG%20Projects/Urban%20Design/Antique%20Market%20-%20Historic%20Jeddah/photo_d_eshcir.jpg" />
    </div>
  );
}
export default Homepage;