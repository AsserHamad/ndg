import React, { useState } from 'react';
import './ProjectMainDetails.css';
import ImageGallery from 'react-image-gallery';

import ReactHtmlParser from 'react-html-parser';
import ProjectMainDetailsSlider from './ProjectMainDetailsSlider/ProjectMainDetailsSlider';


function ProjectMainDetails(props){
    const  project = props.project,
            projectDetails = props.projectDetails,
            lang = props.lang,
            [currNavigation, setCurrNavigation] = useState(1);
            const images = project.images.map(image => {return {original: image, thumbnail: image}})
            const videos = project.videos.map(video => {
                return {
                    original:"",
                    renderItem: () => {
                        return(
                            <video key={video} className="background-vide" controls>
                                    <source key={video} src={video} type="video/mp4" />
                            </video>
                        )
                    }
                }
            });
            const details = ['owner', 'location', 'area', 'builtUpArea', 'year'].map(detail => {
                return (
                    <div key={detail} className="detail">
                        <p><span className="titles">{projectDetails[detail]}: </span>{project[detail][lang] || project[detail]}</p>
                    </div>
                );
            });

    return(
        <div className={`main-container main-container-${lang}`}>
            <div className="project-details">
                <div className="project-details-title">Project Details</div>
                <div className="project-main-details-container">
                    {details}
                </div>
            </div>
            <div className="project-media">
                <div className="project-media-navigation">
                    <div onClick={() => setCurrNavigation(0)} className={currNavigation === 0 ? 'project-media-navigation-selected' : ''}>Info</div>
                    <div onClick={() => setCurrNavigation(1)} className={currNavigation === 1 ? 'project-media-navigation-selected' : ''}>Gallery</div>
                </div>
                {currNavigation === 0 && 
                <div>
                    <div className="project-details-info">Project Info</div>
                    <div className="detail-description">
                        {ReactHtmlParser(project.description[lang]) || ReactHtmlParser(project.description)}
                    </div>
                </div>
                }
                {currNavigation === 1 && 
                <div>
                        <ProjectMainDetailsSlider project={project} />
                </div>}
                {/* <div className="gallery">
                    {(currGallery === 0) ?
                        <div className="image-div">
                            <ImageGallery items={images} showFullscreenButton={images.length > 0} showPlayButton={false} />
                        </div>
                    :
                    <div className="image-div">
                        <ImageGallery items={videos} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} />
                    </div>}
                </div> */}
            </div>
        </div>
    )
}

export default ProjectMainDetails;