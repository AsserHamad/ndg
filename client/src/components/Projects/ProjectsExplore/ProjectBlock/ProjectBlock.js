import React, { useState, useEffect } from "react";
import "./ProjectBlock.css";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from 'react-icons/fa';

function ProjectBlock(props) {
    const project = props.project, category = props.category, subcategory = props.subcategory, lang=props.lang;
    const [description, setDescription] = useState(project.description[lang]),
          [title, setTitle] = useState(project.title[lang]);
    useEffect(() => {
        setDescription(descr => {
            descr = descr.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
            if (descr.length > 200) {
                descr = descr.substr(0, 200) + '...';
            }
            setDescription(descr);
        });
        // if (title.length > 30) {
        //     setTitle(title => title.substr(0, 30) + '...');
        // }
    }, [description, title.length]);
    return(
        <Link
            to={{
                pathname: `/expertise/${project._id}`,
                projectBlock:{ project, category, subcategory}
            }}
            style={props.style}
            className={props._className + " project-block-container"}>
            <div className="project-brief">
                <div className="project-brief-info">
                    {title}
                </div>
                <div className="project-brief-categories">
                    <span>{subcategory}</span>
                    <span>{project.location[lang]}</span>
                </div>
                <div className="project-brief-description">
                    {description}
                </div>
            </div>
            <img alt="Project Preview" src={project.preview} />
        </Link>
    )
}

export default ProjectBlock;