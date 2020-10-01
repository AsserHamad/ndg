import React, { useState } from 'react';
import './About.css';
import useGlobalState from "../../useGlobalState";
import { FaPlay } from 'react-icons/fa';
import CountUp from 'react-countup';
import Loading from '../Loading/Loading';

import ReactHtmlParser from 'react-html-parser';

function About(props){
    const globalState = useGlobalState(),
            aboutText = props.text,
            lang = globalState.lang.lang,
            [modal, setModal] = useState({
                display: 'none'
            });
    return(
      (!aboutText) ?
      <Loading />
      :
        <div className={`about-container about-container-${lang}`}>

            {/* Modal Shit */}
            <div className="modal" style={{display: modal.display}}>
                <span className="close" onClick={() => setModal({display: 'none'})}>&times;</span>
                <video className={`motivation-video`} controls>
                    <source src={`https://static.videezy.com/system/resources/previews/000/043/910/original/Ball.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>


            <div className={`about-us-container about-us-container-${lang}`}>
                <p className={`abtus abtus-${lang}`}>{aboutText.aboutUs}</p>
                <div className={`todo-brownies todo-brownies-${lang}`}>
                    <p>
                        {ReactHtmlParser(aboutText.corporateOverview)}
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
