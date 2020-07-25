import React, { useState, useEffect } from 'react';
import './ServiceAdminCreate.css';
import './EditType0.css';
import './EditType1.css';
import './EditType2.css';
import { FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import swal from 'sweetalert';


function ServiceAdminCreate(props){
    const 
        api = props.api,
        refreshServices = props.refreshServices,
        token = localStorage.getItem('token'),
        service = props.service,
        setViewingService = props.setViewingService,
        initialInputVal = {
            title_en: '',
            title_ar: '',
            image: '/images/placeholder.png',
            items_en: [],
            items_ar: [],
        },
        [itemsEn, setItemsEn] = useState({}),
        [itemsAr, setItemsAr] = useState({}),
        [inputVal, setInputVal] = useState(initialInputVal);
    
        useEffect(() => {
            window.scrollTo(0,0);
        }, [])
    
    const deleteItem = (key, type) => {
        let x = JSON.parse(JSON.stringify(itemsEn));
        let z = {};
        delete x[`${key}`];
        let y = Object.keys(x).map((key) => x[key]);
        for(let i = 0; i < y.length; i++){
            z = ({...z, [i] : y[i]});
        }
        setItemsEn(z);

        x = JSON.parse(JSON.stringify(itemsAr));
        z = {};
        delete x[`${key}`];
        y = Object.keys(x).map((key) => x[key]);
        for(let i = 0; i < y.length; i++){
            z = ({...z, [i] : y[i]});
        }
        setItemsAr(z);
    }
    
    const updateService = () => {
        let items_en = Object.keys(itemsEn).map(key => itemsEn[key]);
        let items_ar = Object.keys(itemsAr).map(key => itemsAr[key]);
        const updatedService = {
            title: {
                en: inputVal.title_en,
                ar: inputVal.title_ar,
            },
            items: {
                en: items_en,
                ar: items_ar
            },
            image: inputVal.image
        }
        fetch(`${api}/services`,  {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({_id: service._id, service: updatedService})
          })
          .then(res => {
            if(res.ok)
                return res.json();
            else throw new Error();
          })
          .then(res => {
            swal({
                title: 'Service edited successfully',
                icon: "success"
            });
            refreshServices();
            window.scrollTo(0,0); 
            setViewingService(undefined);
          })
          .catch(err => console.log(err));
    }

    const addItem = (type) => {
        let x = JSON.parse(JSON.stringify(itemsEn));
        x = {...itemsEn, [Object.keys(itemsEn).length]: ''}
        setItemsEn(x);
        
        x = JSON.parse(JSON.stringify(itemsAr));
        x = {...itemsAr, [Object.keys(itemsAr).length]: ''};
        setItemsAr(x);
    }
    
    const deleteService = () => {
        swal({
            title: `Deleting ${service.title.en}`,
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
                    body: JSON.stringify({_id: service._id})
                })
                .then(res => res.json())
                .then(res => {
                    refreshServices();
                    window.scrollTo(0,0); 
                    setViewingService(undefined);
                });
            }
        })
    }
    return(
        <div className="service-edit-container">
            <div>
                {/* Titles */}
                <p>Title</p>
                <div className="service-detail-titles">
                    <div className="service-detail-titles-divs">
                        <p>English Title</p>
                        <input name="title_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_en} />
                    </div>
                    <div className="service-detail-titles-divs">
                        <p>Arabic Title</p>
                        <input name="title_ar" style={{direction: 'rtl'}} onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_ar} />
                    </div>
                </div>
            </div>
            <div>
                {/* Items */}
                <p>Items</p>
                <div className="service-detail-titles">
                    <div className="service-detail-titles-divs">
                        {Object.keys(itemsEn).map((key) => {
                            return(
                            <div key={key} className="edit-items-div">
                                <input className="edit-items-input" name={key} onChange={(e) => setItemsEn({...itemsEn, [e.target.name]: e.target.value})} value={itemsEn[key]} />
                                <div className="service-item-delete" onClick={() => {deleteItem(key, 'en')}}><FaTrash /></div>
                            </div>)
                        })}
                        <div className="new-image-div">
                            <div className="service-item-add" onClick={() => {addItem('en')}}>
                                <div className="service-add-plus">
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="service-detail-titles-divs">
                        {Object.keys(itemsAr).map((key) => {
                            return(
                            <div key={key} className="edit-items-div">
                                <div className="service-item-delete" onClick={() => {deleteItem(key, 'ar')}}><FaTrash /></div>
                                <input style={{direction: 'rtl'}} className="edit-items-input" name={key} onChange={(e) => setItemsAr({...itemsAr, [e.target.name]: e.target.value})} value={itemsAr[key]} />
                            </div>)
                        })}
                        <div className="new-image-div">
                            <div className="service-item-add" onClick={() => {addItem('ar')}}>
                                <div className="service-add-plus">
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="service-images-container">
                <div>
                    <p className="service-edit-subheader">Preview Image</p>
                    <div className="edit-preview-div">
                        <input className="edit-preview-input" name="preview" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.image} />
                        <img className="service-preview-img" src={inputVal.image} alt="Preview" />
                    </div>
                </div>
            </div>
            
            <div className="service-categories-container">
            </div>
            
            <div className="service-edit-buttons">
                <div onClick={updateService} className="save-button">Save&nbsp;&nbsp;<FaCheck /></div>
                <div onClick={deleteService} className="delete-button">Delete&nbsp;&nbsp;<FaTrash /></div>
            </div>
        </div>
    )
}

export default ServiceAdminCreate;