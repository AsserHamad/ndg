import React from "react";
import "./ProjectBlock.css";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from 'react-icons/fa';

function ProjectBlock(props) {
    const project = props.project, category = props.category, subcategory = props.subcategory, lang=props.lang;
    let description = project.description[lang];
    let title = project.title[lang];

    if (description.length > 60) {
        description = description.substr(0, 60) + '...';
    }
    if (title.length > 20) {
        title = title.substr(0, 20) + '...';
    }
    return(
        <Link
            to={{
                pathname: `/projects/${project._id}`,
                projectBlock:{ project, category, subcategory}
            }}
            className={props._className + " project-block-container"}>
            <div className="project-brief">
                <div className="project-brief-categories">
                    <span>{category}</span>
                    <span>{subcategory}</span>
                </div>
                <div className="project-brief-description">
                    {description}
                </div>
                <div className="project-brief-info">
                    {title} - {project.location[lang]} <span><FaLongArrowAltRight /></span>
                </div>
            </div>
            <img alt="Project Preview" src={project.preview} />
        </Link>
    )
}

export default ProjectBlock;