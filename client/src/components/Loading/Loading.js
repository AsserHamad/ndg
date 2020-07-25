import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

function Loading (){

return (
    <div className="loading-background">
        <ReactLoading type="spinningBubbles" color={'white'} />
        {/* <img className="loading-image" src="/ndg.png" /> */}
    </div>
);
}

export default Loading;