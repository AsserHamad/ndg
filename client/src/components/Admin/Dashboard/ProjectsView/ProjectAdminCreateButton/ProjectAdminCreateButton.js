import React from 'react';
import './ProjectAdminCreateButton.css';
import { FaPlus } from 'react-icons/fa';

function ProjectAdminCreateButton(props) {
    const setViewingProject = props.setViewingProject;
    return(
        <div className="new-project"  onClick={() => setViewingProject({})}>
            <FaPlus />
        </div>
    )
}

export default ProjectAdminCreateButton;