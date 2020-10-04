import React, { useEffect, useState } from "react";
import "./ProjectsExplore.css";
import useGlobalState from "../../../useGlobalState";
import ProjectBlock from "./ProjectBlock/ProjectBlock";
import dp from "../dummyProjects";
import Loading from "../../Loading/Loading";

function ProjectsExplore(props) {
    const filter = props.text.filter,
            defaultCategory = props.location.category;
    const [projects, setProjects] = useState([]),
          [viewedProjects, setViewedProjects] = useState([]),
          [selectedCategory, setSelectedCategory] = useState(!isNaN(defaultCategory) ? defaultCategory : -1),
          globalState = useGlobalState();
    useEffect(() => {
        setViewedProjects(projects.filter(project => (Number(project.subcategory) === Number(selectedCategory) || selectedCategory === -1) ? project : false))
    }, [selectedCategory, projects])
    useEffect(() => {
        if(props.location.projects){
            setProjects(props.location.projects);
            setViewedProjects(props.location.projects);
        } else {
            const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
            fetch(`${api}/api/projects/`)
            .then(res => res.json())
            .then(res => {setProjects(res); setViewedProjects(res)});
        }
    }, [props.location.projects]);
    const lang = globalState.lang.lang;
    let categories = dp.categories[lang], subcategories = dp.subcategories[lang];
    useEffect(() => {
        globalState.setPage({ page: 'projects'});
    }, []);
    const returnGridLayout = (position) => {
        let x = Math.floor(position/9)*3;
        let arrs = [
            `${1 + x} / 1 / ${2 + x} / 2`,
            `${2 + x} / 1 / ${3 + x} / 2`,
            `${1 + x} / 2 / ${3 + x} / 3`,
            `${1 + x} / 3 / ${3 + x} / 4`,
            `${1 + x} / 4 / ${2 + x} / 5`,
            `${2 + x} / 4 / ${4 + x} / 5`,
            `${3 + x} / 3 / ${4 + x} / 4`,
            `${3 + x} / 2 / ${4 + x} / 3`,
            `${3 + x} / 1 / ${4 + x} / 2`,
        ];
        return arrs[position % 9];
    }
    
    return(
        (projects.length === 0) ?
        <Loading />
        :
        <div>
            <div className="projectBlocks" style={{height: `${(Math.ceil(viewedProjects.length/9))*30}em`, gridTemplateRows: `repeat(${3*Math.ceil(viewedProjects.length/9)}, 1fr)`}}>
                {[...Array(viewedProjects.length).keys()].map((element) => 
                    <ProjectBlock
                        key={element}
                        style={{gridArea: returnGridLayout(element)}}
                        lang={lang} project={viewedProjects[element]}
                        category={categories[viewedProjects[0].category]}
                        subcategory={subcategories[viewedProjects[0].subcategory]} />
                )}
            </div>
            <div className="explore-filter">
                <div className="explore-works-filter">{filter}</div>
                <div className="explore-filter-categories">
                    <div className={`explore-filter-categories-item ${(Number(selectedCategory) === -1) ? `explore-filter-categories-item-highlight` : ``}`} onClick={() => {setSelectedCategory(-1)}}>All Works</div>
                    {Object.keys(subcategories).map(key => {
                        return(
                            <div 
                                key={key}
                                className={`explore-filter-categories-item ${(Number(selectedCategory) === key) ? `explore-filter-categories-item-highlight` : ``}`}
                                onClick={() => {setSelectedCategory(key)}}>
                                    {subcategories[key]}</div>
                        )
                    })}
                </div>
                <div className="explore-filter-numbers">
                    {viewedProjects.length} - {projects.length}
                </div>
            </div>
        </div>
    )
}

export default ProjectsExplore;