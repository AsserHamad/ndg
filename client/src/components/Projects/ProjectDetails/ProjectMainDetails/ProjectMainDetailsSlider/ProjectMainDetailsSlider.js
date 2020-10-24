import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './ProjectMainDetailsSlider.css';

function ProjectMainDetailsSlider(props){
    const project = props.project;
    const [viewing, setViewing] = useState(null);
    return(
        <div>
            {/* <Swiper
                lazy
                autoHeight
                effect="coverflow"
                navigation
                zoom
                pagination={{ clickable: true}}
                slidesPerView={1}
                className="project-main-details-slider"
                >
                {project.images.map(image => (
                    <SwiperSlide className="project-main-details-slider-slide">
                        <img src={image} />
                    </SwiperSlide>
                ))}
            </Swiper> */}
            <div className="project-main-details-gallery">

            {project.images.map(image => {
                return(
                        <img onClick={() => setViewing(image)} src={image} className={`project-main-details-image ${viewing === image && `project-main-details-image-viewing`}`} />
                )
            })}
            </div>
            </div>
    )
}

export default ProjectMainDetailsSlider;