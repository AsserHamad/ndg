import React, { useState, useEffect } from 'react';
import './ProjectsTab.css';
import ProjectsView from './ProjectsView/ProjectsView';

function ProjectsTab(props){
    const
        admin = props.admin,
        api = props.api,
        [page, setPage] = useState('projects');
    
    return(
        (page==='projects') ? 
        <div className="select">
            <div className="operation" onClick={() => setPage('view')}>
                View Projects
            </div>
            <div className="operation" onClick={() => setPage('create')}>
                Create Project
            </div>
            <div className="operation" onClick={() => setPage('edit')}>
                Edit Project
            </div>
            <div className="operation" onClick={() => setPage('delete')}>
                Delete Project
            </div>
        </div>
        :(page==='view') ?
        <ProjectsView admin={admin} api={api} />
        :<div>something else</div>
    )
}

export default ProjectsTab;