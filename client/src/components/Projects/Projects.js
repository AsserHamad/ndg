import React, { useState, useEffect } from "react";
import "./Projects.css";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import useGlobalState from "../../useGlobalState";
import { Link } from "react-router-dom";
import dp from "./dummyProjects";

function Projects() {
    const projects = dp.projects, categories = dp.categories, subcategories = dp.subcategories;
    const globalState = useGlobalState(),
          [projectsText, setProjectsText] = useState({}),
          [previewNum, setPreviewNum] = useState(0),
          lang = globalState.lang.lang;
    useEffect(() => {
        fetch("/data/lang.json")
          .then(res => res.json())
          .then(res => {
              setProjectsText(res[lang].projects);
          });
    }, [])
    function changePreviewNum() {
        setPreviewNum((previewNum + 1) % 3);
    }
    return(
    <div>
        <div className={`ndg-info ndg-info-${lang}`}>
            <div id="ndg-info-text">
                {projectsText.description}
            </div>
            <Link id="ndg-info-button" className="link" to="/projects/explore">
                <button>
                    <div id="ndg-info-button-text">
                        {projectsText.viewProjectsButton}
                    </div>
                    { (lang === 'en') ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft /> }
                </button>
            </Link>
        </div>
        <div className={`projects-container projects-container-${lang}`}>
            <div id="project-title">
                <div id="title-box">
                <div id="box-1" />
                <div className={`yellow-box yellow-box-${lang}`}>
                    <p>{categories[lang][projects[previewNum].category]}</p>
                    <span>{projects[previewNum].title[lang]}</span>
                    <div>
                    <Link className="link" to={{
                        pathname: `/projects/${projects[previewNum].id}`,
                        projectBlock:{
                            project: projects[previewNum],
                            category: categories[lang][projects[previewNum].category],
                            subcategory: subcategories[lang][projects[previewNum].subcategory]
                        }
                    }}>
                        <p>
                        {projectsText.viewProjectLink} { (lang === 'en') ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft /> }
                        </p>
                    </Link>
                    </div>
                </div>
                <div id="box-2" />
            </div>
            </div>
            <div className={`project-image project-image-${lang}`} style={{backgroundImage: `url(${projects[previewNum].preview})`}} />
        </div>
            <Link to="/projects/explore">
                <button className={`explore-button explore-button-${lang}`}>
                    <div id="ndg-info-button-text">
                        {projectsText.startExploring}
                    </div>
                    <div id="ndg-info-button-arrow">
                    { (lang === 'en') ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft /> }
                    </div>
                </button>
            </Link>
            <div className={`previewNavigatingDiv previewNavigatingDiv-${lang}`}>
                <button onClick={changePreviewNum} className="previewNavigatingButtons">&lt; {projectsText.back}</button>
                <button onClick={changePreviewNum} className="previewNavigatingButtons">{projectsText.next} &gt;</button>
            </div>
    </div>
    )
}

export default Projects;