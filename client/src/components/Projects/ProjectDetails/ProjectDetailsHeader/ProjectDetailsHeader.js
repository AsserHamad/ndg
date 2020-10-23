import React from 'react';

import './PorjectDetailsHeader.css';

function PorjectDetailsHeader(props) {
    return (
        <img className="project-details-header-image" src={props.image} />
        );
}

export default PorjectDetailsHeader;