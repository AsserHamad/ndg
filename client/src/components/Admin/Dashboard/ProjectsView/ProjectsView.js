import React, { useState, useEffect } from 'react';
import './ProjectsView.css';
import { FaTrash, FaMapPin, FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import ProjectAdminDetails from './ProjectAdminDetails/ProjectAdminDetails';
import swal from 'sweetalert';
import ProjectAdminCreate from './ProjectAdminCreate/ProjectAdminCreate';
import Loading from '../../../Loading/Loading';
import ProjectAdminCreateButton from './ProjectAdminCreateButton/ProjectAdminCreateButton';

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
        .then(res => {setProjects(res); setViewedProjects(res);});
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

   const deleteProject = ((_id, title) => {
    swal({
        title: `Deleting ${title}`,
        text: `Are you sure that you want to delete this project?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
            cancel: true,
            confirm: true,
        },
    })
    .then(willDelete => {
        if(willDelete){
            fetch(`${api}/projects`,  {
                method: 'delete',
                headers: {'Content-Type': 'application/json', token},
                body: JSON.stringify({_id})
            })
            .then(res => res.json())
            .then(res => refreshProjects());
        }
    })
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

    
    return((!projects.length) ? <Loading /> :
        (!viewingProject) ? 
        <div>
            <ProjectAdminCreateButton setViewingProject={setViewingProject} />
            <div>
            <div className="projects-search">
                <div className="projects-search-div">
                    <span><FaSearch /></span><input onChange={filterProjects} placeholder="Search title, owner, location" type="text" />
                </div>
                {/* <input type="file" name="file" id="file" onChange={(e) => uploadExcel(e)} className="add-multiple" /> */}
            </div>
            </div>
            <div className="viewed-projects-container">
                {viewedProjects.map((element) => {
                    let description = element.description.en;
                    description = description.replace(/<\/?[^>]+(>|$)/g, "");
                if (description.length > 150)
                    description = description.substr(0, 150) + '...';
                    return(
                        <div className="viewed-project" key={element._id}>
                            <div onClick={() => {setViewingProject(element)}} className="preview-div">
                                <img src={element.preview} />
                            </div>
                            <div onClick={() => {setViewingProject(element)}} className="viewed-project-div">
                                <span className="viewed-project-title">{element.title.en}</span>
                                <span className="viewed-project-sub-title"><FaMapPin /> {element.location.en}</span>
                                <p className="viewed-project-subtitle">{categories[element.category]}, {subcategories[element.subcategory]}</p>
                                <p className="viewed-project-description">{description}</p>
                            </div>
                            <div className="viewed-project-delete-div">
                                <div className="viewed-project-delete" onClick={() => deleteProject(element._id, element.title.en)}>
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
        (Object.keys(viewingProject).length !== 0) ?
        <div>
            <div className="projects-back-arrow-div">
                <FaArrowLeft className="projects-back-arrow" onClick={() => setViewingProject(undefined)} />
            </div>
            <ProjectAdminDetails project={viewingProject} api={api} setViewingProject={setViewingProject} refreshProjects={refreshProjects}/>
        </div>
        :
        <div>
            <div className="projects-back-arrow-div"><FaArrowLeft className="projects-back-arrow" onClick={() => setViewingProject(undefined)} /></div>
            <ProjectAdminCreate project={viewingProject} api={api} setViewingProject={setViewingProject} refreshProjects={refreshProjects}/>
        </div>
    )
}

export default ProjectsView;