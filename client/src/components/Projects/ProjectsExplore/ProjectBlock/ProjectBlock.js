import React, { useState, useEffect } from "react";
import "./ProjectBlock.css";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from 'react-icons/fa';

function ProjectBlock(props) {
    const project = props.project, category = props.category, subcategory = props.subcategory, lang=props.lang;
    const [description, setDescription] = useState(project.description[lang]);
    let title = project.title[lang];
    useEffect(() => {
        setDescription(descr => {
            descr = descr.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
            if (descr.length > 60) {
                descr = descr.substr(0, 60) + '...';
            }
            setDescription(descr);
        });
        if (title.length > 20) {
            title = title.substr(0, 20) + '...';
        }
    }, [description]);
    return(
        <Link
            to={{
                pathname: `/projects/${project._id}`,
                projectBlock:{ project, category, subcategory}
            }}
            style={props.style}
            className={props._className + " project-block-container"}>
            <div className="projectBlocks-cover"></div>
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