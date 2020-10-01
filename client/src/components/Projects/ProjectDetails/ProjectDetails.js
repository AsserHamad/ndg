import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import useGlobalState from '../../../useGlobalState';
import projects from '../dummyProjects';
import Loading from '../../Loading/Loading';

import { FaAngleDown } from 'react-icons/fa';
import ProjectMainDetails from './ProjectMainDetails/ProjectMainDetails';

function ProjectDetails(props){
    let id = props.location.pathname.split('/')[2];
    const globalState = useGlobalState(),
          lang = globalState.lang.lang,
          projectDetails = props.text,
          [project, setProject] = useState({
            title: {en: "" ,ar: ""},
            location: {en: "" ,ar: ""},
            owner: {en: "" ,ar: ""},
            description: {en: "" ,ar: ""},
            images: [],
            videos: []
        });
    useEffect(() => {
        globalState.setPage({ page: 'project-details'});
        
        if(props.location.projectBlock){
            setProject(props.location.projectBlock.project);
        } else {
            const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
            fetch(`${api}/api/projects/${id}`)
            .then(res => res.json())
            .then(proj => {setProject(proj)})
            .catch((err) => props.history.push('/projects'));
        }
    },[]);

    return(
        (!project.title.en) ?
        <Loading />
        :
        <div className={`project-details-container project-details-container-${lang}`}>
            <div className="project-header">
                <div className={`project-title title-${lang}`}>
                    <div>
                        <p className={`project-title-header`}>{project.title[lang]}</p>
                        <div className={`project-subtitle subtitle-${lang}`}>
                            <p>{project.location[lang]} - {project.owner[lang]}</p>
                        </div>
                    </div>
                </div>
                <div className="preview-container">
                    <img className="preview-image" src={project.preview} />
                    {/* <video className="background-video" autoPlay loop muted src={project.videoPreview || "https://i.imgur.com/83NMbaF.mp4"}/> */}
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