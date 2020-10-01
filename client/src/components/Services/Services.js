import React, { useState, useEffect } from 'react';
import './Services.css';
import useGlobalState from "../../useGlobalState";
import Loading from '../Loading/Loading';
// import services from './dummyServices';

function Services(props){
    const globalState = useGlobalState(),
            servicesText = props.text,
            [services, setServices] = useState([]),
            lang = globalState.lang.lang;
      useEffect(() => {
        const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
        fetch(`${api}/api/services`)
        .then(res => res.json())
        .then(res => setServices(res));
      }, []);
    return(
        (services.length === 0) ?
        <Loading />
        :
        <div className={`services-container services-container-${lang}`}>
            <div className={`what-we-do-container what-we-do-container-${lang}`}>
                <p className={`wwd wwd-${lang}`}>{servicesText.whatWeDo}</p>
                <div className={`todo-brownies todo-brownies-${lang}`}>
                    <p>
                        {servicesText.description}
                    </p>
                </div>
            </div>
            <div className="main-services-container">
                {services.map((element) => 
                    <div key={element._id} className="service-div">
                        <p className={`service-title service-title-${lang}`}>{element.title[lang]}</p>
                        <img className="service-img" alt="services pic" src={element.image} />
                        <ul className={`list list-${lang}`}>
                        {element.items[lang].map((item) =>
                            <li key={`item${Math.random()}`}>{item}</li>
                        )}
                        </ul>
                    </div>
            )}
                
            </div>
        </div>
    )
}

export default Services;