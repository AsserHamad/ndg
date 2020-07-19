import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import useGlobalState from '../../../useGlobalState';
import projects from '../dummyProjects';

import { FaAngleDown } from 'react-icons/fa';
import ProjectMainDetails from './ProjectMainDetails/ProjectMainDetails';

function ProjectDetails(props){
    let id = props.location.pathname.split('/')[2];
    const globalState = useGlobalState(),
          lang = globalState.lang.lang,
          [projectDetails, setProjectDetails] = useState({}),
          [project, setProject] = useState({
            title: {en: "" ,ar: ""},
            location: {en: "" ,ar: ""},
            owner: {en: "" ,ar: ""},
            description: {en: "" ,ar: ""},
            images: [],
            videos: []
        });
  
    useEffect(() => {
        if(props.location.projectBlock){
            setProject(props.location.projectBlock.project);
        } else {
            const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
            fetch(`${api}/api/projects/${id}`)
            .then(res => res.json())
            .then(proj => setProject(proj));
        }
    },[]);

    useEffect(() => {
        fetch("/data/lang.json")
          .then(res => res.json())
          .then(res => {
              setProjectDetails(res[lang].projectDetails);
          });
    }, [lang])

    return(
        <div className={`project-details-container project-details-container-${lang}`}>
            <div>
                <div className={`project-title title-${lang}`}>
                    <div>
                        <p>{project.title[lang]}</p>
                        <div className={`project-subtitle subtitle-${lang}`}>
                            <p>{project.location[lang]} - {project.owner[lang]}</p>
                        </div>
                    </div>
                </div>
                <div className="video-container">
                    <video className="background-video" autoPlay loop muted>
                    <source src={
                        project.videoPreview || "https://i.imgur.com/83NMbaF.mp4"
                        } type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <ProjectMainDetails
                project={project}
                projectDetails={projectDetails}
                lang={lang}
            />
            <div className="downArrow">
                <FaAngleDown />
            </div>
        </div>
    )
}

export default ProjectDetails;