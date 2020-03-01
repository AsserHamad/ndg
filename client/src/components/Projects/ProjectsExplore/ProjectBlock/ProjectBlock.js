import React from "react";
import "./ProjectBlock.css";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from 'react-icons/fa';

function ProjectBlock(props) {
    const project = props.project, category = props.category, subcategory = props.subcategory, lang=props.lang;
    return(
        <Link
            to={{
                pathname: `/projects/${project.id}`,
                projectBlock:{ project, category, subcategory}
            }}
            className={props._className + " project-block-container"}>
            <div className="project-brief">
                <div className="project-brief-categories">
                    <span>{category}</span>
                    <span>{subcategory}</span>
                </div>
                <div className="project-brief-description">
                    {project.description[lang]}
                </div>
                <div className="project-brief-info">
                    {project.title[lang]} - {project.location[lang]} <span><FaLongArrowAltRight /></span>
                </div>
            </div>
            <img alt="Project Preview" src={project.preview} />
        </Link>
    )
}

export default ProjectBlock;