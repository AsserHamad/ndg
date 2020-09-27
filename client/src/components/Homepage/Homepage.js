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
      <img className={`homepage-img`} src="https://res.cloudinary.com/duiexwi8t/image/upload/v1601205231/NDG%20Projects/Urban%20Design/Al%20Aqeer%20archeology%20District/photo_a_kcgfvl.jpg" />
    </div>
  );
}
export default Homepage;