import React, { useState } from 'react';
import HomepageProject from './HomepageProject/HomepageProject';
import { Link } from 'react-router-dom';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import './Homepage.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Homepage() {
  const [projects, setProjects] = useState([{
          preview: "https://res.cloudinary.com/duiexwi8t/image/upload/v1602096070/Untitled_grzu3b.png",
          title: 'AL Mahmoudya',
          location: 'Seeyouf - Alexandria - Egypt',
          description: { 
            en: 'The rehabilitation project of Al Juffali & AL Sharbatly hotel represents one of the most significant experiences that emphasize the historical role of the old buildings and the prominent value that it added throughout history.'
          }
        },{
          preview: "https://res.cloudinary.com/duiexwi8t/image/upload/v1601851593/NDG%20Projects/Architecture/P118-93AR04%20Architecture%20Design%20for%20Privet%20Residence%20%28Abdul%20rahman%20Al%20Kamy%20Villa%29/ALt01_lulfuh.jpg",
          title: 'JEDDAH MALL',
          location: 'Jeddah - KSA - Shk.Mhd.Bin Salem Bin Mahfooz',
          description: { 
            en: 'The project is located in a prime location in Jeddah. It includes many commercial activities and a food court. The main concept of the building is to construct an iconic façade in the intersection of two main roads in Jeddah, by using luxurious materials which will leave a distinctive mental image for the users.'
          }
        }]),
        [preview, setPreview] = useState(0);

  return (
    <div>
      {/* <div style={{backgroundImage: `url(${projects[preview].preview})`}} className="homepage-container">
        <div className="homepage-project-container">
          <div onClick={() => setPreview(preview === 0 ? 1 : 0)} className="homepage-project-title">{projects[preview].title}</div>
          <div className="homepage-project-location">{projects[preview].location}</div>
          <div className="homepage-project-description">{projects[preview].description.en}</div>
          <div className="homepage-project-button">Discover More</div>
        </div>
      </div> */}
      <Swiper
      style={{height: '100vh'}}
      navigation
      loop
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      slidesPerView={1}
    >
      <SwiperSlide>
        <HomepageProject project={projects[0]} />
      </SwiperSlide>
      <SwiperSlide>
        <HomepageProject project={projects[1]} />
      </SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
      {/* <div className="other">
        Helloooo
      </div> */}
    </div>
  );
}

export default Homepage;