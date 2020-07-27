import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GlobalStateProvier } from './useGlobalState';
import { BrowserRouter } from 'react-router-dom';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Oswald:700,400', 'sans-serif']
  }
});

ReactDOM.render(
    <GlobalStateProvier>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStateProvier>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
