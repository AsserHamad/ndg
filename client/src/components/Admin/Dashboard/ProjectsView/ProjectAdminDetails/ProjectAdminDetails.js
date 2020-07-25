import React, { useState, useEffect } from 'react';
import './ProjectAdminDetails.css';
import './EditType0.css';
import './EditType1.css';
import './EditType2.css';
import { FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import swal from 'sweetalert';


function ProjectAdminDetails(props){
    const 
        api = props.api,
        refreshProjects = props.refreshProjects,
        token = localStorage.getItem('token'),
        project = props.project,
        setViewingProject = props.setViewingProject,
        initialInputVal = {
            title_en: project.title.en,
            title_ar: project.title.ar,
            description_en: project.description.en,
            description_ar: project.description.ar,
            location_en: project.location.en,
            location_ar: project.location.ar,
            owner_en: project.owner.en,
            owner_ar: project.owner.ar,
            category: project.category,
            subcategory: project.subcategory,
            year: project.year,
            area: project.area,
            preview: project.preview,
            videoPreview: project.videoPreview || 'https://i2.wp.com/quidtree.com/wp-content/uploads/2020/01/placeholder.png?fit=1200%2C800&ssl=1'
        },
        [inputVal, setInputVal] = useState(initialInputVal),
        [imagesVal, setImagesVal] = useState({}),
        [videosVal, setVideosVal] = useState({}),
        [editType, setEditType] = useState(0),
        [currCategory, setCurrCategory] = useState(project.category),
        [currSubcategory, setCurrSubcategory] = useState(project.subcategory);

    useEffect(() => {
        window.scrollTo(0,0);
        let x = {};
        for(let i = 0; i < project.images.length; i++){
            x = ({...x, [i] : project.images[i]});
        }
        setImagesVal(x)

        
        x = {};
        for(let i = 0; i < project.videos.length; i++){
            x = ({...x, [i] : project.videos[i]});
        }
        setVideosVal(x)
    }, []);
    
    const updateProject = () => {
        let images = Object.keys(imagesVal).map(key => imagesVal[key]);
        let videos = Object.keys(videosVal).map(key => videosVal[key]);
        const updatedProject = {
            title: {
                en: inputVal.title_en,
                ar: inputVal.title_ar,
            },
            description: {
                en: inputVal.description_en,
                ar: inputVal.description_ar,
            },
            location: {
                en: inputVal.location_en,
                ar: inputVal.location_ar,
            },
            owner: {
                en: inputVal.owner_en,
                ar: inputVal.owner_ar,
            },
            year: inputVal.year,
            area: inputVal.area,
            preview: inputVal.preview,
            category: inputVal.category,
            subcategory: inputVal.subcategory,
            videoPreview: inputVal.videoPreview,
            images,
            videos
        }
        fetch(`${api}/projects`,  {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({_id: project._id, project: updatedProject})
          })
          .then(res => {
            if(res.ok)
                return res.json();
            else throw new Error();
          })
          .then(res => {
            swal({
                title: 'Project edited successfully',
                icon: "success"
            });
            refreshProjects();
            window.scrollTo(0,0); 
            setViewingProject(undefined);
          })
          .catch(err => console.log(err));
    }
    
    const deleteProject = () => {
        swal({
            title: `Deleting ${project.title.en}`,
            text: `Are you sure that you want to delete this project?`,
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: true,
                confirm: true,
            },
        })
        .then(willDelete => {
            if(willDelete){
                fetch(`${api}/projects`,  {
                    method: 'delete',
                    headers: {'Content-Type': 'application/json', token},
                    body: JSON.stringify({_id: project._id})
                })
                .then(res => res.json())
                .then(res => {
                    refreshProjects();
                    window.scrollTo(0,0); 
                    setViewingProject(undefined);
                });
            }
        })
    }
    
    const deleteImg = (key) => {
        let x = JSON.parse(JSON.stringify(imagesVal));
        let z = {};
        delete x[`${key}`];
        let y = Object.keys(x).map((key) => x[key]);
        for(let i = 0; i < y.length; i++){
            z = ({...z, [i] : y[i]});
        }
        setImagesVal(z);
    }
    
    const deleteVid = (key) => {
        let x = JSON.parse(JSON.stringify(videosVal));
        let z = {};
        delete x[`${key}`];
        let y = Object.keys(x).map((key) => x[key]);
        for(let i = 0; i < y.length; i++){
            z = ({...z, [i] : y[i]});
        }
        setVideosVal(z);
    }

    const addImage = () => {
        let x = JSON.parse(JSON.stringify(imagesVal));
        x = {...imagesVal, [Object.keys(imagesVal).length]: 'https://i2.wp.com/quidtree.com/wp-content/uploads/2020/01/placeholder.png?fit=1200%2C800&ssl=1'};
        setImagesVal(x);
    }

    const addVideo = () => {
        let x = JSON.parse(JSON.stringify(videosVal));
        x = {...videosVal, [Object.keys(videosVal).length]: 'https://static.videezy.com/system/resources/previews/000/043/910/original/Ball.mp4'};
        setVideosVal(x);
    }

    const changeCategory = (num) => {
        setCurrCategory(num);
        setInputVal(Object.assign(inputVal, {category: num}));
    }

    const changeSubcategory = (num) => {
        console.log(`changing ${inputVal.subcategory} to ${num}`)
        setCurrSubcategory(num);
        setInputVal(Object.assign(inputVal, {subcategory: num}));
    }
    return(
        <div className="project-edit-container">
            <div className="change-edit-type">
                <div className={`change-edit-type-div ${(editType===0 ? 'edit-type-selected' : '')}`} onClick={() => setEditType(0)}>Details</div>
                <div className={`change-edit-type-div ${(editType===1 ? 'edit-type-selected' : '')}`} onClick={() => setEditType(1)}>Media</div>
                <div className={`change-edit-type-div ${(editType===2 ? 'edit-type-selected' : '')}`} onClick={() => setEditType(2)}>Categories</div>
            </div>

        {/* Start of editing types */}
        {(editType === 0) ?
        // Type 0: Details
            <div>
                {/* Titles */}
                <p>Title</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Title</p>
                        <input name="title_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Title</p>
                        <input name="title_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.title_ar} />
                    </div>
                </div>


                {/* Description */}
                <p>Description</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Description</p>
                        <textarea name="description_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})}  value={inputVal.description_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Description</p>
                        <textarea name="description_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})}  value={inputVal.description_ar} />
                    </div>
                </div>


                {/* Location */}
                <p>Location</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Location</p>
                        <input name="location_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.location_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Location</p>
                        <input name="location_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.location_ar} />
                    </div>
                </div>


                {/* Owner */}
                <p>Owner</p>
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p>English Owner</p>
                        <input name="owner_en" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.owner_en} />
                    </div>
                    <div className="project-detail-titles-divs">
                        <p>Arabic Owner</p>
                        <input name="owner_ar" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.owner_ar} />
                    </div>
                </div>


                {/* Date */}
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p className="project-detail-misc">Date of Completion</p>
                        <input name="year" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.year} />
                    </div>
                </div>


                {/* Area */}
                <div className="project-detail-titles">
                    <div className="project-detail-titles-divs">
                        <p className="project-detail-misc">Area</p>
                        <input name="area" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.area} />
                    </div>
                </div>
            </div>
        :
        (editType === 1) ?
        // Type 1: Media 
            <div className="project-images-container">
                {/* Images */}
                <div>
                    <p className="project-edit-headers">Images</p>
                    <p className="project-edit-subheader">Preview Image</p>
                    <div className="edit-preview-div">
                        <input className="edit-preview-input" name="preview" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.preview} />
                        <img className="project-preview-img" src={inputVal.preview} alt="Preview" />
                    </div>
                    <p className="project-edit-subheader">Project Images</p>
                    <div className="project-images-list">
                        {Object.keys(imagesVal).map((key) => {
                            return(
                            <div key={key} className="edit-images-div">
                                <input className="edit-images-input" name={key} onChange={(e) => setImagesVal({...imagesVal, [e.target.name]: e.target.value})} value={imagesVal[key]} />
                                <div className="project-image-delete" onClick={() => {deleteImg(key)}}><FaTrash /></div>
                                <img className="project-images-img" src={imagesVal[key]} alt="Preview" />
                            </div>)
                        })}
                        <div className="new-image-div">
                            <div className="project-image-add" onClick={() => {addImage()}}>
                                <div className="project-add-plus"><FaPlus /></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Videos */}
                <div>
                    <p className="project-edit-headers">Videos</p>
                    <p className="project-edit-subheader">Preview Video</p>
                    <div className="edit-preview-div">
                        <input className="edit-preview-input" name="videoPreview" onChange={(e) => setInputVal({...inputVal, [e.target.name]: e.target.value})} value={inputVal.videoPreview} />
                        <video className="project-preview-img" src={inputVal.videoPreview} autoPlay="autoplay" loop muted alt="Preview" />
                    </div>
                    <p className="project-edit-subheader">Project Videos</p>
                    <div className="project-images-list">
                    {Object.keys(videosVal).map((key) => {
                        return(
                        <div key={key} className="edit-images-div">
                            <input className="edit-images-input" name={key} onChange={(e) => setVideosVal({...videosVal, [e.target.name]: e.target.value})} value={videosVal[key]} />
                            <video className="project-images-img" src={videosVal[key]} autoPlay="autoplay" loop muted/>
                            <div className="project-image-delete" onClick={() => {deleteVid(key)}}><FaTrash /></div>
                        </div>)
                    })}
                    <div className="new-image-div">
                        <div className="project-image-add" onClick={() => {addVideo()}}>
                            <div className="project-add-plus">
                                <FaPlus />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        :
        //Type 2: Categories
            <div className="project-categories-container">
                <p className="project-edit-headers">Categories</p>
                <div className="project-categories-div">
                {/* 
                    const categories = [
                        'Urban Design', 
                        'Master Planning', 
                        'Architecture'
                    ];
                */}
                    <div onClick={() => changeCategory(0)} className={`project-category-select ${(currCategory === 0) ? 'project-category-select-selected' : ''}`}>Urban Design</div>
                    <div onClick={() => changeCategory(1)} className={`project-category-select ${(currCategory === 1) ? 'project-category-select-selected' : ''}`}>Master Planning</div>
                    <div onClick={() => changeCategory(2)} className={`project-category-select ${(currCategory === 2) ? 'project-category-select-selected' : ''}`}>Architecture</div>
                </div>

                <p className="project-edit-headers">Subcategories</p>
                <div className="project-categories-div">
                {/*
                const subcategories = [
                    'Urban Design', 
                    'Landscape', 
                    'Urban Planning', 
                    'Housing', 
                    'Interior Design', 
                    'Architecture'
                    ]; */}
                    <div onClick={() => changeSubcategory(0)} className={`project-category-select ${(currSubcategory === 0) ? 'project-category-select-selected' : ''}`}>Urban Design</div>
                    <div onClick={() => changeSubcategory(1)} className={`project-category-select ${(currSubcategory === 1) ? 'project-category-select-selected' : ''}`}>Landscape</div>
                    <div onClick={() => changeSubcategory(2)} className={`project-category-select ${(currSubcategory === 2) ? 'project-category-select-selected' : ''}`}>Urban Planning</div>
                    <div onClick={() => changeSubcategory(3)} className={`project-category-select ${(currSubcategory === 3) ? 'project-category-select-selected' : ''}`}>Housing</div>
                    <div onClick={() => changeSubcategory(4)} className={`project-category-select ${(currSubcategory === 4) ? 'project-category-select-selected' : ''}`}>Interior Design</div>
                    <div onClick={() => changeSubcategory(5)} className={`project-category-select ${(currSubcategory === 5) ? 'project-category-select-selected' : ''}`}>Architecture</div>
                </div>
            </div>}
            
            <div className="project-edit-buttons">
                <div onClick={updateProject} className="save-button">Save&nbsp;&nbsp;<FaCheck /></div>
                <div onClick={deleteProject} className="delete-button">Delete&nbsp;&nbsp;<FaTrash /></div>
            </div>
        </div>
    )
}

export default ProjectAdminDetails;