import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';
import useGlobalState from '../../../useGlobalState';

import Loading from '../../Loading/Loading';
import ProjectMainDetails from './ProjectMainDetails/ProjectMainDetails';
import ProjectDetailsHeader from './ProjectDetailsHeader/ProjectDetailsHeader';
import DownArrow from '../../DownArrow/DownArrow';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

const changeDescription = (description) => {
    description = description.replace(/<\/?[^>]+(>|$)/g, "");
    if (description.length > 250) {
        description = description.substr(0, 250) + '...';
    }
    return description;
}

function ProjectDetails(props){
    let id = props.location.pathname.split('/')[2];
    const globalState = useGlobalState(),
          lang = globalState.lang.lang,
          projectDetails = props.text,
          [project, setProject] = useState({
            title: {en: "" ,ar: ""},
            location: {en: "" ,ar: ""},
            owner: {en: "" ,ar: ""},
            description: {en: "" ,ar: ""},
            images: [],
            videos: []
        });
    useEffect(() => {
        globalState.setPage({ page: 'project-details'});
        
        if(props.location.projectBlock){
            setProject(props.location.projectBlock.project);
        } else {
            const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
            fetch(`${api}/api/projects/${id}`)
            .then(res => res.json())
            .then(proj => {setProject(proj)})
            .catch((err) => props.history.push('/expertise'));
        }
    },[id, props.history, props.location.projectBlock]);

    return(
        (!project.title.en) ?
        <Loading />
        :
        <div className={`project-details-container project-details-container-${lang}`}>
            <div className="project-header">
                <Swiper
                autoplay={{delay: 3000}}
                lazy
                freeMode
                navigation
                grabCursor
                spaceBetween={8}
                pagination={{ clickable: true, type: 'progressbar' }}
                slidesPerView={'auto'}
                className="project-details-swiper"
            >
                {project.images.map(image => (
                    <SwiperSlide key={image} style={{width: 'auto'}}>
                        <ProjectDetailsHeader image={image} />
                    </SwiperSlide>
                ))}
            </Swiper>
                <div className={`project-title title-${lang}`}>
                    <div className={`project-title-header`}>
                        <div>{project.title[lang]}</div>
                        <div>{project.location[lang]}</div>
                    </div>
                    <div className={`project-title-subtitle subtitle-${lang}`}>
                        <div>Built Up Area:</div>
                        <div>{project.builtUpArea}</div>
                    </div>
                </div>
                {/* <div className="preview-container">
                    <img alt="preview" className="preview-image" src={project.preview} />
                </div> */}
            </div>
            <ProjectMainDetails
                project={project}
                projectDetails={projectDetails}
                lang={lang}
            />
            <DownArrow />
        </div>
    )
}

export default ProjectDetails;