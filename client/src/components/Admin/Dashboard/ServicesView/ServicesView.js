import React, { useState, useEffect } from 'react';
import './ServicesView.css';
import { FaTrash, FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import ServiceAdminDetails from './ServiceAdminDetails/ServiceAdminDetails';
import swal from 'sweetalert';
import ServiceAdminCreate from './ServiceAdminCreate/ServiceAdminCreate';
import Loading from '../../../Loading/Loading';

function ServicesView(props){
    const
        api = props.api,
        [services, setServices] = useState([]),
        [viewedServices, setViewedServices] = useState([]),
        [viewingService, setViewingService] = useState(false),
        token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${api}/services`)
        .then(res => res.json())
        .then(res => {setServices(res); setViewedServices(res);});
    }, [api]);

   const deleteService = ((_id, title) => {
    swal({
        title: `Deleting ${title}`,
        text: `Are you sure that you want to delete this service?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
            cancel: true,
            confirm: true,
        },
    })
    .then(willDelete => {
        if(willDelete){
            fetch(`${api}/services`,  {
                method: 'delete',
                headers: {'Content-Type': 'application/json', token},
                body: JSON.stringify({_id})
            })
            .then(res => {console.log(res);res.json()})
            .then(res => {console.log(res);refreshServices()});
        }
    })
   });

   const refreshServices = () => {
    fetch(`${api}/services`)
    .then(res => res.json())
    .then(res => {setServices(res); setViewedServices(res)});
    };

   const filterServices = ((e) => {
       const regex = new RegExp(`${e.target.value.toLowerCase()}`);
       const p = services.filter((service) => {
           const title = service.title.en.toLowerCase();
           return regex.test(title)
        });
       setViewedServices(p)
   });

    
    return((!services.length) ? <Loading /> :
        (!viewingService) ? 
        <div>
            <div className="new-service" onClick={() => setViewingService({})}><FaPlus /></div>
            <div>
            <div className="services-search">
                <div className="services-search-div">
                    <span><FaSearch /></span><input onChange={filterServices} placeholder="Search titles" type="text" />
                </div>
            </div>
            <p className="services-view-title">Viewing services</p>
            </div>
            <div className="viewed-services-container">
                {viewedServices.map((element) => {
                    return(
                        <div className="viewed-service" key={element._id}>
                            <div onClick={() => {setViewingService(element)}} className="preview-div">
                                <img alt="service" src={element.image} />
                            </div>
                            <div onClick={() => {setViewingService(element)}} className="viewed-service-div">
                                <span className="viewed-service-title">{element.title.en}</span>
                            </div>
                            <div className="viewed-service-delete-div">
                                <div className="viewed-service-delete" onClick={() => deleteService(element._id, element.title.en)}>
                                    <div className="viewed-service-delete-icon"><FaTrash /></div>
                                </div>
                            </div>
                    </div>
                    )
                    
                })}
            </div>
        </div>
        :
        (Object.keys(viewingService).length !== 0) ?
        <div>
            <div className="services-back-arrow-div"><FaArrowLeft className="services-back-arrow" onClick={() => setViewingService(undefined)} /></div>
            <ServiceAdminDetails service={viewingService} api={api} setViewingService={setViewingService} refreshServices={refreshServices}/>
        </div>
        :
        <div>
            <div className="services-back-arrow-div"><FaArrowLeft className="services-back-arrow" onClick={() => setViewingService(undefined)} /></div>
            <ServiceAdminCreate service={viewingService} api={api} setViewingService={setViewingService} refreshServices={refreshServices}/>
        </div>
    )
}

export default ServicesView;