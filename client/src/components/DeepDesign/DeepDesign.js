import React from 'react';
import './DeepDesign.css';

function DeepDesign() {
    return(
        <div className="deep-design-container">
            <img src="https://res.cloudinary.com/duiexwi8t/image/upload/v1601205387/NDG%20Projects/Urban%20Design/The%20Amiri%20School%20District/photo_f_qgtzg1.jpg" />
            <div className="deep-design-coming-soon">
                <img className="deep-design-logo" src="ndg.png" />
                <div className="deep-design-title">Coming <span style={{color: '#F8BF26'}}>Soon</span></div>
                <div className="deep-design-subtitle">Deep Design</div>
                <div className="deep-design-text">Our process of Deep DesignTM involves a step-by-step in-depth assessment of culture, behaviour, processes and knowledge. It is the act of solving problem at a fundamental human level.</div>
            </div>
        </div>
    )
}

export default DeepDesign;