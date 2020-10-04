import React, { useState, useEffect } from 'react';
import './MessagesView.css';
import Loading from '../../../Loading/Loading';
import ReactHtmlParser from 'react-html-parser';

function MessagesView(props){
    const
        [messages, setMessages] = useState([]),
        api = props.api,
        token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${api}/contact`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', token},
        })
        .then(res => res.json())
        .then(res => {setMessages(res);console.log(res)});
    }, [api, token]);

    return((!messages.length) ? <Loading /> :
        <div className="contact-container">
            {messages.map(msg => 
                <div key={msg._id} className="contact-message-container">
                    <div>
                        From: {msg.name} &lt;{msg.email}&gt;
                    </div>
                    <div>
                        {ReactHtmlParser(msg.message)}
                    </div>
                </div>
                )}
        </div>
    )
}

export default MessagesView;