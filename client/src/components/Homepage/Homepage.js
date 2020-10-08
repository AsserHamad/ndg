import React, { useEffect, useState, useLayoutEffect } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
  const [projects, setProjects] = useState([{
          preview: "https://res.cloudinary.com/duiexwi8t/image/upload/v1602096070/Untitled_grzu3b.png",
          title: 'AL Mahmoudya',
          location: 'Seeyouf - Alexandria - Egypt',
          description: { 
            en: 'The rehabilitation project of Al Juffali & AL Sharbatly hotel represents one of the most significant experiences that emphasize the historical role of the old buildings and the prominent value that it added throughout history.'
          }
        }]),
        [preview, setPreview] = useState(0);

  return (
    <div className="homepage-container">
      <div className="homepage-project-container">
        <div className="homepage-project-title">{projects[preview].title}</div>
        <div className="homepage-project-location">{projects[preview].location}</div>
        <div className="homepage-project-description">{projects[preview].description.en}</div>
        <div className="homepage-project-button">Discover More</div>
      </div>
    </div>
  );
}

export default Homepage;