import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import useGlobalState from '../../../useGlobalState';

import Loading from '../../Loading/Loading';
import ProjectMainDetails from './ProjectMainDetails/ProjectMainDetails';
import DownArrow from '../../DownArrow/DownArrow';

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
    },[id, props.history, props.location.projectBlock]);

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
                    <img alt="preview" className="preview-image" src={project.preview} />
                </div>
            </div>
            <ProjectMainDetails
                project={project}
                projectDetails={projectDetails}
                lang={lang}
            />
            <DownArrow />
        </div>
    )
}

export default ProjectDetails;