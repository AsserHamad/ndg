import React, { useState, useEffect } from "react";
import "./Projects.css";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import useGlobalState from "../../useGlobalState";
import { Link } from "react-router-dom";
import dp from "./dummyProjects";
import Loading from '../Loading/Loading';

function Projects(props) {
    const categories = dp.categories, subcategories = dp.subcategories;
    const globalState = useGlobalState(),
          projectsText = props.text,
          [projects, setProjects] = useState([{
              category: 0,
              title: {en:'', ar:''},
              isLoaded: false
          }]),
          [previewNum, setPreviewNum] = useState(0),
          [loadedImage, setLoadedImage] = useState(false),
          lang = globalState.lang.lang;
    useEffect(() => {
        const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api/projects/`
        fetch(api)
          .then(res => res.json())
          .then(res => setProjects(res));
    }, [])
    function changePreviewNum(num) {
        setLoadedImage(false)
        setPreviewNum((previewNum === 0 && num === -1) ? projects.length-1 : (previewNum + num) % projects.length);
        console.log(projects[previewNum])
    }
    function capitalizeTitle(text){
        let sentence = text.toLowerCase().split(" ");
        for(let i = 0; i< sentence.length; i++){
           sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
     sentence = sentence.join(" ");
     return sentence;
    }
    return(
        (projects.length === 1) ? <Loading /> :
    <div>
        <div className={`ndg-info ndg-info-${lang}`}>
            <div id="ndg-info-text">
                {projectsText.projectDescription}
            </div>
            <Link id="ndg-info-button" className="link" to={{pathname: "/projects/explore", projects}}>
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
                    <p className={loadedImage ? `yellow-box-animation-loaded`:`yellow-box-animation-loading`}>{categories[lang][projects[previewNum].category]}</p>
                    <span className={loadedImage ? `yellow-box-animation-loaded`:`yellow-box-animation-loading`}>{capitalizeTitle(projects[previewNum].title[lang])}</span>
                    <div>
                    <Link className="link" to={{
                        pathname: `/projects/${projects[previewNum]._id}`,
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
            {/* <div className={`project-image project-image-${lang}`} style={{backgroundImage: `url()`}} /> */}
            <div className={`project-image project-image-${lang}`}>
                {!loadedImage ? <Loading /> : null}
                <img
                    className={`project-image-img ${!loadedImage ? `project-image-loading` : `project-image-loaded`}`} 
                    onLoad={() => setLoadedImage(true)}
                    src={projects[previewNum].preview} />
            </div>
        </div>
            <Link to={{pathname: "/projects/explore", projects}}>
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
                <button onClick={() => changePreviewNum(-1)} className="previewNavigatingButtons">&lt; {projectsText.back}</button>
                <button onClick={() => changePreviewNum(1)} className="previewNavigatingButtons">{projectsText.next} &gt;</button>
            </div>
    </div>
    )
}

export default Projects;