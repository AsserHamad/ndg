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
      <img className={`homepage-img`} src="http://www.naturedesigngroup.com/web_test/public/Uploads/projects/en/bab_mecca_main1555173303.jpg" />
    </div>
  );
}
export default Homepage;