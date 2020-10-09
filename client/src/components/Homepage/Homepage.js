import React, { useState } from 'react';
import HomepageProject from './HomepageProject/HomepageProject';

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
  const [projects] = useState([{
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
        },{
          preview: 'https://res.cloudinary.com/duiexwi8t/image/upload/v1601205272/NDG%20Projects/Urban%20Design/Alexandria%20Airport%20Lake%20-%20Egypt/photo_g_udinex.jpg',
          title: 'ALEXANDRIA AIRPORT LAKE',
          location: 'Alexandria, Egypt-GOPP, Ministry Of Housing, Egypt',
          description: { 
            en: 'Airport lake land, Alexandria airport land, Al Nozha airport land or Airport farm land are all the names of the project’s site, these names are attributed to the site’s HISTORICAL BACKGROUND and the significant events that occurred in this place.The project is located in Alexandria and is 6 km from the city center within the administration of Al Nozha district.'
          }
        }]);

  return (
    <div>
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
      <SwiperSlide>
        <HomepageProject project={projects[2]} />
      </SwiperSlide>
    </Swiper>
      {/* <div className="other">
        Helloooo
      </div> */}
    </div>
  );
}

export default Homepage;