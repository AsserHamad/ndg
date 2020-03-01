import React, { useState, useEffect } from 'react';
import './About.css';
import useGlobalState from "../../useGlobalState";
import { FaPlay } from 'react-icons/fa';
import CountUp from 'react-countup';

function About(){
    const globalState = useGlobalState(),
            [aboutText, setAboutText] = useState({}),
            lang = globalState.lang.lang,
            [modal, setModal] = useState({
                display: 'none'
            });
      useEffect(() => {
          fetch("/data/lang.json")
            .then(res => res.json())
            .then(res => {
                setAboutText(res[lang].about);
            });
      }, [lang]);
    return(
        <div className={`about-container about-container-${lang}`}>

            {/* Modal Shit */}
            <div className="modal" style={{display: modal.display}}>
                <span className="close" onClick={() => setModal({display: 'none'})}>&times;</span>
                <video className={`motivation-video`} controls>
                    <source src={`https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>


            <div className={`about-us-container about-us-container-${lang}`}>
                <p className={`abtus abtus-${lang}`}>{aboutText.aboutUs}</p>
                <div className={`todo-brownies todo-brownies-${lang}`}>
                    <p>
                        {aboutText.corporateOverview}
                    </p>
                </div>
            </div>
            <div className={`main-about-container main-about-container-${lang}`}>
                <p className={`titleText`}>{aboutText.aboutUs}</p>
                <div className={`about-div`}>
                  <div>
                    <img alt="About Page" src={`http://www.naturedesigngroup.com/web_test/public/Uploads/aboutus/image/en/1(1)1555170414.jpg`} />
                    <button className={`button button-${lang}`} onClick={
                                    (() => {
                                        setModal({display: 'flex'})
                                    }
                                    )}>
                      <div className={`button-about-us`}>{aboutText.aboutUs}</div>
                      <div className={`button-play`}><FaPlay /></div>
                    </button>
                  </div>
                  <div className={`corporate-overview`}>
                    <div className={`div11`}>
                      {aboutText.corporateOverview}
                    </div>
                    <div className={`div22`}>
                      {aboutText.corporateOverviewText}
                    </div>
                  </div>
                  <div>
                    <div className={`countup-div`}>
                      <div style={{marginRight: '5vw'}}>
                        <CountUp className={`countups`} end={260} duration={15} />
                        <div>
                          <p className={`bua`}>{aboutText.bua}</p>
                        </div>
                      </div>
                      <div style={{marginRight: '5vw'}}>
                        <CountUp className={`countups`} end={90} duration={15} />
                        <div>
                          <p className={`bua`}>{aboutText.projects}</p>
                        </div>
                      </div>
                      <div style={{marginRight: '5vw'}}>
                        <CountUp className={`countups`} end={18} duration={15} />
                        <div>
                          <p className={`bua`}>{aboutText.years}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className={`titleText`} style={{marginTop: '10vh'}}>{aboutText.motivation}</p>
                <div className={`about-div`}>
                  <div>
                    <img alt="About Page" src={`http://www.naturedesigngroup.com/web_test/public/Uploads/aboutus/image/en/1(1)1555170414.jpg`} />
                    <button className={`button button-${lang}`} onClick={
                                    (() => {
                                        setModal({display: 'flex'})
                                    }
                                    )}>
                      <div className={`button-about-us`}>{aboutText.motivation}</div>
                      <div className={`button-play`}><FaPlay /></div>
                    </button>
                  </div>
                  <div className={`corporate-overview`}>
                    <div className={`div11`}>
                    {aboutText.motivation}
                    </div>
                    <div className={`div22`}>
                    {aboutText.motivationText}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default About;


// import React, { useState, useEffect } from "react";
// import "./About.css";
// import useGlobalState from "../../useGlobalState";
// import about from "./dummyabout";

// function About() {
//   const globalState = useGlobalState(),
//     [aboutText, setaboutText] = useState({}),
//     lang = globalState.lang.lang;
//   useEffect(() => {
//     fetch("/data/lang.json")
//       .then(res => res.json())
//       .then(res => {
//         setaboutText(res[lang].about);
//       });
//   }, [lang]);
//   return (
//     <div className="about-container">
//       <div className="about-us-container">
//         <p className={`wwd wwd-${lang}`}>{aboutText.aboutUs}</p>
//         <div className={`todo-brownies todo-brownies-${lang}`}>
//           <p>{aboutText.corporateOverview}</p>
//         </div>
//       </div>
//       <div className="main-about-container">
//         {about.map(element => (
//           <div className="about-div">
//             <p className={`about-title about-title-${lang}`}>
//               {element.title[lang]}
//             </p>
//             <img alt="About Page" src={element.image} />
//             <div className={`list list-${lang}`}>
//               {element.text[lang].map(item => (
//                 <li>{item}</li>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default About;
