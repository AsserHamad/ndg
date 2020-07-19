import React, { useState, useEffect } from 'react';
import './Services.css';
import useGlobalState from "../../useGlobalState";
// import services from './dummyServices';

function Services(){
    const globalState = useGlobalState(),
            [servicesText, setServicesText] = useState({}),
            [services, setServices] = useState([]),
            lang = globalState.lang.lang;
      useEffect(() => {
          console.log("NODE ENV is currently", process.env.NODE_ENV)
        const api = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : '';
        fetch("/data/lang.json")
        .then(res => res.json())
        .then(res => {
            setServicesText(res[lang].services);
        });
        fetch(`${api}/api/services`)
        .then(res => res.json())
        .then(res => setServices(res));
      }, [lang]);
    return(
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
                    <div className="service-div">
                        <p className={`service-title service-title-${lang}`}>{element.title[lang]}</p>
                        <img alt="services pic" src={element.image} />
                        <ul className={`list list-${lang}`}>
                        {element.items[lang].map((item) =>
                            <li>{item}</li>
                        )}
                        </ul>
                    </div>
            )}
                
            </div>
        </div>
    )
}

export default Services;