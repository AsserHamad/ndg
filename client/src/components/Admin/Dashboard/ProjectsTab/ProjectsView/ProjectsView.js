import React, { useState, useEffect } from 'react';
import './ProjectsView.css';

function ProjectsView(props){
    const
        admin = props.admin,
        api = props.api,
        [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${api}/projects`)
        .then(res => res.json())
        .then(res => setProjects(res));
    }, []);
    
    return(
        <div>
            <p>Viewing projects</p>
            {projects.map((element) => {
                return(
                    <div className="viewed-project" key={element._id}>
                        <div className="preview-div">
                            <img src={element.preview} />
                        </div>
                        <div className="viewed-project-div">
                            <p class="viewed-project-title">{element.title.en}</p>
                            <hr />
                        </div>
                        <div>
                            Delete
                        </div>
                </div>
                )
                
            })}
        </div>
    )
}

export default ProjectsView;