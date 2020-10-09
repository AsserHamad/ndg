import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Projects.css";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import useGlobalState from "../../useGlobalState";
import { Link } from "react-router-dom";
import dp from "./dummyProjects";
import Loading from '../Loading/Loading';

function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

function changeTitleAndDescription(title, description) {
    description = description.replace(/<\/?[^>]+(>|$)/g, "");
    if (description.length > 250) {
        description = description.substr(0, 250) + '...';
    }
    
    title = title.split(" ");
    let half = Math.ceil(title.length / 2);
    title = {firstHalf: title.slice(0, half).join(" "), secondHalf: title.slice(half, title.length).join(" "), description};
    return title;
}

function checkCategory(category) {
    return (!isNaN(category) && category < 6 && category >= 0) ? category : 0;
}

function Projects(props) {
    const categories = dp.categories, subcategories = dp.subcategories;
    const globalState = useGlobalState(),
          projectsText = props.text,
          api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api/projects/`,
          width = useWindowSize(),
          font_size = width / 40,
          [loadedImages, setLoadedImages] = useState([]),
          [allProjects, setAllProjects] = useState([{
            category: 0,
            subcategory: 0,
            description: {en: '', ar: ''},
            title: {en:'', ar:''},
            isLoaded: false,
            }]),
          [projects, setProjects] = useState([{
              category: 0,
              subcategory: 0,
              description: {en: '', ar: ''},
              title: {en:'', ar:''},
              isLoaded: false
          }]),
          [previewNum, setPreviewNum] = useState(0),
          [selectedCategory, setSelectedCategory] = useState(0),
          [title, setTitle] = useState({}),
          lang = globalState.lang.lang;
    useEffect(() => {
        fetch(api)
          .then(res => res.json())
          .then(res => {
              setAllProjects(res);
              setProjects(res.filter(project => Number(project.subcategory) === Number(selectedCategory)));
          });
    }, [api]);
    useEffect(() => {
        setTitle(
            changeTitleAndDescription(projects[previewNum].title[lang], projects[previewNum].description[lang])
            );
    }, [projects, previewNum, lang])
    useEffect(() => {
        setPreviewNum(0);
        setProjects(
            allProjects.filter(project => Number(project.subcategory) === Number(selectedCategory))
        )
    }, [selectedCategory, allProjects])
    
    // Functions
    const changePreviewNum = (num) => {
        setPreviewNum((previewNum === 0 && num === -1) ? projects.length-1 : (previewNum + num) % projects.length);
        console.log(projects[previewNum])
    }
    const generateCategories = () => {
        return Object.keys(dp.subcategories[lang]).map(sub => {
            let subcategory = dp.subcategories[lang][sub]
            return(
                <div 
                    className={`project-categories-element ${Number(selectedCategory) === Number(sub) ? 'project-categories-element-selected' : ''}`}
                    key={subcategory}
                    onClick={() => {setSelectedCategory(sub)}}
                >
                    {subcategory}
                </div>
            )
        })
    }
    return(
        (projects.length === 1) ? <Loading /> :
    <div>
        <div className="projects-categories">
            {generateCategories()}
        </div>
        <svg className="svg-container">
            <rect className={`svg-rectangle svg-rectangle-loaded`}/>
        </svg>
        <div className={`projects-container projects-container-${lang}`}>
            <div id="project-title">
                <div id="title-box">
                <div id="box-1" />
                <div className={`yellow-box yellow-box-${lang}`}>
                    <p className={(loadedImages.includes(projects[previewNum].preview)) ? `yellow-box-animation-loaded`:`yellow-box-animation-loading`}>{subcategories[lang][projects[previewNum].subcategory]}</p>
                    <span style={{fontSize: `${font_size / 1.2}px`}}
                    className={(loadedImages.includes(projects[previewNum].preview)) ? `yellow-box-animation-loaded title-first-half`:`yellow-box-animation-loading`}>{title.firstHalf}</span>
                    <span style={{fontSize: `${font_size / 1.6}px`}}
                    className={(loadedImages.includes(projects[previewNum].preview)) ? `yellow-box-animation-loaded title-second-half`:`yellow-box-animation-loading`}>{title.secondHalf}</span>
                    <span style={{fontSize: `${font_size / 2.8}px`}}
                    className={(loadedImages.includes(projects[previewNum].preview)) ? `yellow-box-animation-loaded title-description`:`yellow-box-animation-loading`}>{title.description}</span>
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
            <Link className="view-projects-link" to={{
                pathname: `/projects/explore`,
                category: selectedCategory
            }} > 
                <div className="view-projects-button">View All Projects</div>
            </Link>
            <div className={`project-image project-image-${lang}`}>
                {!(loadedImages.includes(projects[previewNum].preview)) ? <Loading /> : null}
                <img
                    alt="proj-img"
                    className={`project-image-img ${!(loadedImages.includes(projects[previewNum].preview)) ? `project-image-loading` : `project-image-loaded`}`} 
                    onLoad={(img) => {
                        const src = img.target.src;
                        setLoadedImages(loadedImages => loadedImages.concat(src))    
                    }}
                    src={projects[previewNum].preview} />
            </div>
        </div>
        <div className={`previewNavigatingDiv previewNavigatingDiv-${lang}`}>
                <button onClick={() => changePreviewNum(-1)} className="previewNavigatingButtons">&lt; {projectsText.back}</button>
                <button onClick={() => changePreviewNum(1)} className="previewNavigatingButtons">{projectsText.next} &gt;</button>
            </div>
    </div>
    )
}

export default Projects;