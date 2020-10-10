import React, { useState } from 'react';
import './ProjectMainDetails.css';
import ImageGallery from 'react-image-gallery';

import ReactHtmlParser from 'react-html-parser';


function ProjectMainDetails(props){
    const  project = props.project,
            projectDetails = props.projectDetails,
            lang = props.lang,
            [currGallery, setCurrGallery] = useState(0);
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
                        <p><span className="titles">{projectDetails[detail]}<br /> </span>{project[detail][lang] || project[detail]}</p>
                    </div>
                );
            });

    return(
        <div className={`main-container main-container-${lang}`}>
            <div className="project-details">
                    <div className="detail-description">
                        {ReactHtmlParser(project.description[lang]) || ReactHtmlParser(project.description)}
                    </div>
            {details}
            </div>
            <div className="project-media">
                <div className="select">
                    <div className="gallery-navbar">
                        {/* <div onClick={() => setCurrGallery(0)} className={(Number(currGallery) === 0 ? "navbarItem highlighted-navbar": "navbarItem" )}>
                            01. {projectDetails.images}
                        </div> */}
                        {/* <div onClick={() => setCurrGallery(1)} className={(Number(currGallery) === 1 ? "navbarItem highlighted-navbar": "navbarItem" )}>
                            02. {projectDetails.videos}
                        </div> */}
                    </div>
                </div>
                <div className="gallery">
                    {(currGallery === 0) ?
                        <div className="image-div">
                            <ImageGallery items={images} showFullscreenButton={images.length > 0} showPlayButton={false} />
                        </div>
                    :
                    <div className="image-div">
                        <ImageGallery items={videos} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProjectMainDetails;