import React, { useState } from 'react';
import './ProjectAdminDetails.css';
import { FaCheck } from 'react-icons/fa';
import swal from 'sweetalert';


function ProjectAdminDetails(props){

    const 
        api = props.api,
        refreshProjects = props.refreshProjects,
        token = localStorage.getItem('token'),
        project = props.project,
        setViewingProject = props.setViewingProject,
        initialInputVal = {
            title_en: project.title.en,
            title_ar: project.title.ar,
            description_en: project.description.en,
            description_ar: project.description.ar,
            location_en: project.location.en,
            location_ar: project.location.ar,
            owner_en: project.owner.en,
            owner_ar: project.owner.ar,
            year: project.year,
            area: project.area
        },
        [inputVal, setInputVal] = useState(initialInputVal);
    const updateProject = () => {
        const updatedProject = {
            title: {
                en: inputVal.title_en,
                ar: inputVal.title_ar,
            },
            description: {
                en: inputVal.description_en,
                ar: inputVal.description_ar,
            },
            location: {
                en: inputVal.location_en,
                ar: inputVal.location_ar,
            },
            owner: {
                en: inputVal.owner_en,
                ar: inputVal.owner_ar,
            },
            year: inputVal.year,
            area: inputVal.area
        }
        fetch(`${api}/projects`,  {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({_id: project._id, project: updatedProject})
          })
          .then(res => {
            if(res.ok)
                return res.json();
            else throw new Error();
          })
          .then(res => {
            swal({
                title: 'Project edited successfully',
                icon: "success"
            });
            refreshProjects();
            window.scrollTo(0,0); 
            setViewingProject(undefined);
          })
          .catch(err => console.log(err));
    }
    
    return(
        <div className="project-edit-container">
            <div>
                {/* Titles */}
                <p>Title</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Title</p>
                        <input name="title_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Title</p>
                        <input name="title_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_ar} />
                    </div>
                </div>


                {/* Description */}
                <p>Description</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Description</p>
                        <textarea name="description_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})}  value={inputVal.description_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Description</p>
                        <textarea name="description_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})}  value={inputVal.description_ar} />
                    </div>
                </div>


                {/* Location */}
                <p>Location</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Location</p>
                        <input name="location_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.location_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Location</p>
                        <input name="location_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.location_ar} />
                    </div>
                </div>


                {/* Owner */}
                <p>Owner</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Owner</p>
                        <input name="owner_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.owner_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Owner</p>
                        <input name="owner_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.owner_ar} />
                    </div>
                </div>


                {/* Date */}
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p className="project-detail-misc">Date of Completion</p>
                        <input name="year" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.year} />
                    </div>
                </div>


                {/* Area */}
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p className="project-detail-misc">Area</p>
                        <input name="area" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.area} />
                    </div>
                </div>
                <div onClick={updateProject} className="save-button">Save&nbsp;&nbsp;<FaCheck /></div>
            </div>
        </div>
    )
}

export default ProjectAdminDetails;