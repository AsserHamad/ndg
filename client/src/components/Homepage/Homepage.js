import React, { useEffect, useState, useLayoutEffect } from 'react';
import './Homepage.css';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function Homepage() {
  const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`,
        [projects, setProjects] = useState([{
          preview: "https://res.cloudinary.com/duiexwi8t/image/upload/v1601205299/NDG%20Projects/Urban%20Design/BAB%20MECCA-JEDDAH-KSA/photo_f_usc7ek.jpg",
          title: { firstHalf: 'Bab Makkah', secondHalf: 'Historical Jeddah'},
          description: { 
            en: 'BAB MAKKAH is one of the eight doors of Jeddah’s historical wall. It is located in front of the Bedouin market. The door was once used as a route for funerals heading to Al-Asad Cemetery outside the w...'
          },
          _id: "5f6f6e6af9c7330017be6c93"
        }]),
        [currentProject, setCurrentProject] = useState(0),
        [changingProject, setChangingProject] = useState(''),
        [width, height] = useWindowSize();
        
  
  // Calls for example projects
  useEffect(() => {
    fetch(`${api}/projects/example`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let result = res.map(project => {
          return {...project, title: changeTitle(project.title['en'])}
        })
        setProjects(result)
      })
      .catch(err => console.log(err));
  }, []);
  
  // Functions
  const handleNextPreviousClick = next => {
    setChangingProject('reverse-');
    setTimeout(() => {
      setCurrentProject(currentProject === 0 && next === -1 ? 2 : (currentProject + next) % 3);
      setChangingProject('');
    }, 1500);
  }

  return (
    <div className="homepage-container">
    <svg className={`${changingProject}circle-svg`} >
      <circle r={calculateRadius(width, height)} cx="50%" cy="55%"  />
    </svg> 
      <img className={`${changingProject}homepage-img`} src={projects[currentProject].preview} />
      <div className={`${changingProject}home-previous`}>
        <div onClick={() => handleNextPreviousClick(-1)} className={`${changingProject}home-previous-text`}>
          Previous
        </div>
        <hr className={`${changingProject}home-previous-hr`} />
      </div>
      <div className={`${changingProject}home-next`}>
        <hr className={`${changingProject}home-next-hr`} />
        <div onClick={() => handleNextPreviousClick(1)} className={`${changingProject}home-next-text`}>
          Next
        </div>
      </div>
      <div className="home-circle">
        <div>
          <div className={`${changingProject}home-title-first-half`}>
            {projects[currentProject].title.firstHalf}
          </div>
          <div className={`${changingProject}home-title-second-half`}>
            {projects[currentProject].title.secondHalf}
          </div>
          <div className={`${changingProject}home-description`}>
            {changeDescription(projects[currentProject].description['en'])}
            <Link to={`/projects/${projects[currentProject]._id}`} className="home-discover">DISCOVER MORE</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function changeTitle(title) {
  title = title.split(" ");
  let half = title.length / 2;
  return {firstHalf: title.slice(0, half).join(" "), secondHalf: title.slice(half, title.length).join(" ")};
}

function changeDescription(descr) {
    descr = descr.replace(/<\/?[^>]+(>|$)/g, "");
    if (descr.length > 200) {
        descr = descr.substr(0, 200) + '...';
    }
    return descr;
}

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

function calculateRadius(width, height){
  return (width + height) / 9;
}

export default Homepage;