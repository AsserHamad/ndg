import React from 'react';
import { Link } from 'react-router-dom';

import './HomepageProject.css';

function HomepageProject(props) {
    const project = props.project;
    return (
        <div style={{backgroundImage: `url(${project.preview})`}} className="homepage-container">
          <div className="homepage-project-container">
            <div className="homepage-project-title">{project.title}</div>
              <div className="homepage-project-location">{project.location}</div>
              <div className="homepage-project-description">{project.description.en}</div>
              <div className="homepage-project-button">Discover More</div>
            </div>
          </div>
        );
}

export default HomepageProject;