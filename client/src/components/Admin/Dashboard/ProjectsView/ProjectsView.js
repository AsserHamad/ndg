import React, { useState, useEffect } from 'react';
import './ProjectsView.css';
import { FaTrash, FaMapPin, FaSearch, FaArrowLeft } from 'react-icons/fa';
import ProjectAdminDetails from './ProjectAdminDetails/ProjectAdminDetails';

function ProjectsView(props){
    const
        api = props.api,
        [projects, setProjects] = useState([]),
        [viewedProjects, setViewedProjects] = useState([]),
        [viewingProject, setViewingProject] = useState(false),
        token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${api}/projects`)
        .then(res => res.json())
        .then(res => {setProjects(res); setViewedProjects(res)});
    }, []);
   const categories = [
       'Urban Design', 
       'Master Planning', 
       'Architecture'
    ];
   const subcategories = [
       'Urban Design', 
       'Landscape', 
       'Urban Planning', 
       'Housing', 
       'Interior Design', 
       'Architecture'
    ];

   const deleteProject = ((_id) => {
    if(window.confirm('Are you sure you want to delete this project?'))
    fetch(`${api}/projects`,  {
        method: 'delete',
        headers: {'Content-Type': 'application/json', token},
        body: JSON.stringify({_id})
      })
      .then(res => res.json())
      .then(res => {
        fetch(`${api}/projects`)
        .then(res => res.json())
        .then(res => setProjects(res));
      });
   });

   const refreshProjects = () => {
    fetch(`${api}/projects`)
    .then(res => res.json())
    .then(res => {setProjects(res); setViewedProjects(res)});
    };

   const filterProjects = ((e) => {
       const regex = new RegExp(`${e.target.value.toLowerCase()}`);
       const p = projects.filter((project) => {
           const title = project.title.en.toLowerCase(),
                owner = project.owner.en.toLowerCase(),
                location = project.location.en.toLowerCase();
           return regex.test(title) || regex.test(owner) || regex.test(location);
        });
       setViewedProjects(p)
   });

    
    return((!projects.length) ? <div>Loading...</div> :
        (!viewingProject) ? 
        <div>
            <div>
            <div className="projects-search">
                <div className="projects-search-div">
                    <span><FaSearch /></span><input onChange={filterProjects} placeholder="Search title, owner, location" type="text" />
                </div>
            </div>
            <p className="projects-view-title">Viewing projects</p>
            </div>
            <div className="viewed-projects-container">
                {viewedProjects.map((element) => {
                    let description = element.description.en;
                if (description.length > 100)
                    description = description.substr(0, 150) + '...';
                    return(
                        <div onClick={() => {setViewingProject(element)}} className="viewed-project" key={element._id}>
                            <div className="preview-div">
                                <img src={element.preview} />
                            </div>
                            <div className="viewed-project-div">
                                <span className="viewed-project-title">{element.title.en}</span>
                                <span className="viewed-project-sub-title"><FaMapPin /> {element.location.en}</span>
                                <p className="viewed-project-subtitle">{categories[element.category]}, {subcategories[element.subcategory]}</p>
                                <p className="viewed-project-description">{description}</p>
                            </div>
                            <div className="viewed-project-delete-div">
                                {/* <div className="viewed-project-delete" onClick={() => deleteProject(element._id)}>
                                    <div className="viewed-project-edit-icon"><FaEdit /></div>
                                    <div className="viewed-project-edit-text">Edit</div>
                                </div> */}
                                <div className="viewed-project-delete" onClick={() => deleteProject(element._id)}>
                                    <div className="viewed-project-delete-icon"><FaTrash /></div>
                                    <div className="viewed-project-delete-text">Delete</div>
                                </div>
                            </div>
                    </div>
                    )
                    
                })}
            </div>
        </div>
        :
        <div>
            <FaArrowLeft className="projects-back-arrow" onClick={() => setViewingProject(undefined)} />
            <ProjectAdminDetails project={viewingProject} api={api} setViewingProject={setViewingProject} refreshProjects={refreshProjects}/>
        </div>
    )
}

export default ProjectsView;