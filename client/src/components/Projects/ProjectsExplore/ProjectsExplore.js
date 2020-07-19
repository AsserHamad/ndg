import React, { useEffect } from "react";
import "./ProjectsExplore.css";
import useGlobalState from "../../../useGlobalState";
import ProjectBlock from "./ProjectBlock/ProjectBlock";
import dp from "../dummyProjects";

function ProjectsExplore(props) {
    console.log(props);
    const globalState = useGlobalState();
    const lang = globalState.lang.lang;
    const projects = dp.projects, categories = dp.categories, subcategories = dp.subcategories;
    useEffect(() => {
        globalState.setPage({ page: 'projects'});
    }, []);
    let count = 0;
    
    
    return(
        <div>
            <div className="projectBlocks">
                {[1,2,3,4,5,6,7,8,9].map((element) => 
                    <ProjectBlock
                        key={element}
                        _className={`div${element}`}
                        lang={lang} project={projects[++count % 8]}
                        category={categories[lang][projects[0].category]}
                        subcategory={subcategories[lang][projects[0].subcategory]} />
                )}
            </div>
            <div className="projectBlocks">
                {[1,2,3,4,5,6,7,8,9].map((element) => 
                    <ProjectBlock
                        key={element}
                        _className={`div${element}`}
                        lang={lang} project={projects[++count % 8]}
                        category={categories[lang][projects[0].category]}
                        subcategory={subcategories[lang][projects[0].subcategory]} />
                )}
            </div>
        </div>
    )
}

export default ProjectsExplore;