import React, { useState } from 'react';
import './ProjectMainDetails.css';

function ProjectMainDetails(props){
    const  project = props.project,
            projectDetails = props.projectDetails,
            lang = props.lang,
            [currGallery, setCurrGallery] = useState(0),
            [modal, setModal] = useState({
                src: '',
                display: 'none'
            });
            console.log('project', project, 'project details', projectDetails);

    return(
        <div className={`main-container main-container-${lang}`}>
            <div className="modal" style={{display: modal.display}}>
                <span className="close" onClick={() => setModal({display: 'none'})}>&times;</span>
                <img alt="details" className="modal-content" src={modal.src} />
            </div>
            <div className="project-details">
                <p className="project-details-title">{projectDetails.projectDetails}</p>
                <p className="description">{project.description[lang]}</p>
                <div className="detail">
                    <p><span className="titles">{projectDetails.owner}:<br /> </span>{project.owner[lang]}</p>
                </div>
                <div className="detail">
                    <p><span className="titles">{projectDetails.location}:<br /> </span>{project.location[lang]}</p>
                </div>
                <div className="detail">
                    <p><span className="titles">{projectDetails.area}:<br /> </span>{project.area}</p>
                </div>
                <div className="detail">
                    <p><span className="titles">{projectDetails.builtUpArea}:<br /> </span>{project.builtUpArea}</p>
                </div>
                <div className="detail">
                    <p><span className="titles">{projectDetails.year}:<br /> </span>{project.year}</p>
                </div>
            </div>
            <div className="project-media">
                <div className="select">
                    <div className="gallery-navbar">
                        <div onClick={() => setCurrGallery(0)} className={(currGallery==0 ? "navbarItem highlighted-navbar": "navbarItem" )}>
                            01. {projectDetails.images}
                        </div>
                        <div onClick={() => setCurrGallery(1)} className={(currGallery==1 ? "navbarItem highlighted-navbar": "navbarItem" )}>
                            02. {projectDetails.videos}
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <div style={{display: (currGallery === 1) ? 'none' : 'block'}}>
                        <p className="titles project-details-title">{projectDetails.gallery}</p>
                        <div className="image-box">
                            <div className="image-div">
                                {project.images.map((image) => <img key={image} onClick={
                                    (() => {
                                        setModal({src: image, display: 'flex'})
                                    }
                                    )} src={image} alt="gallery" style={{cursor: 'pointer'}} />)}
                            </div>
                        </div>
                    </div>
                    <div style={{display: (currGallery === 0) ? 'none' : 'block'}}>
                        <p className="titles project-details-title">{projectDetails.videoPresentations}</p>
                        <div className="image-box">
                            <div className="image-div">
                                {project.videos.map((video) =>  
                                <div key={video+Math.random()} className="video-presentation">
                                    <video key={video} className="background-vide" controls>
                                        <source key={video} src={video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectMainDetails;