import React, { useEffect, useState } from "react";
import "./ProjectsExplore.css";
import useGlobalState from "../../../useGlobalState";
import ProjectBlock from "./ProjectBlock/ProjectBlock";
import dp from "../dummyProjects";

function ProjectsExplore(props) {
    const [projects, setProjects] = useState([]);
    useEffect(() => {

        if(props.location.projects){
            setProjects(props.location.projects);
        } else {
            fetch("http://localhost:5000/api/projects/")
            .then(res => res.json())
            .then(res => setProjects(res));
        }
    }, [])
    const globalState = useGlobalState();
    const lang = globalState.lang.lang;
    const categories = dp.categories, subcategories = dp.subcategories;
    useEffect(() => {
        globalState.setPage({ page: 'projects'});
    }, []);
    let count = 0;
    
    
    return(
        <div>
            <div className="projectBlocks">
                {[...Array(projects.length).keys()].map((element) => 
                    <ProjectBlock
                        key={element}
                        _className={`div${element}`}
                        lang={lang} project={projects[++count % projects.length]}
                        category={categories[lang][projects[0].category]}
                        subcategory={subcategories[lang][projects[0].subcategory]} />
                )}
            </div>
        </div>
    )
}

export default ProjectsExplore;