import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalState from '../../../useGlobalState';

import './HomepageProject.css';

function HomepageProject(props) {
    const project = props.project;
    const globalState = useGlobalState();
    return (
        <div style={{backgroundImage: `url(${project.preview})`}} className="homepage-container">
          <div className="homepage-project-container">
            <div className="homepage-project-title">{project.title}</div>
              <div className="homepage-project-location">{project.location}</div>
              <div className="homepage-project-description">{project.description.en}</div>
              <Link
                className="homepage-project-button"
                to={`/expertise/${project.id}`}
                onClick={() => globalState.setPage({ page: 'expertise-details' })}
                style={{ textDecoration: "inherit", fontSize: "inherit" }}
              >
                Discover More
               </Link>
            </div>
          </div>
        );
}

export default HomepageProject;