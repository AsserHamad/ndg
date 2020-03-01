import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import useGlobalState from '../../../useGlobalState';
import projects from '../dummyProjects';

import { FaAngleDown } from 'react-icons/fa';
import ProjectMainDetails from './ProjectMainDetails/ProjectMainDetails';

function ProjectDetails(props){
    const globalState = useGlobalState(),
          lang = globalState.lang.lang,
          [projectDetails, setProjectDetails] = useState({});
    const [project, category, subcategory] = getProject();
  
    function getProject(){
        if(props.location.projectBlock){
            return [props.location.projectBlock.project, props.location.projectBlock.category, props.location.projectBlock.subproject];
        } else {
            let proj = projects.projects.filter((proj) => proj.id==props.match.params.id)[0];
            return [proj, projects.categories[lang][proj.category], projects.subcategories[lang][proj.subcategory]]
        }
    }

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
                        project.videoPreview || "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4"
                        } type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <ProjectMainDetails
                project={project}
                category={category}
                subcategory={subcategory}
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