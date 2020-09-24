import React, { useState, useEffect } from 'react';
import './MessagesView.css';
import swal from 'sweetalert';
import Loading from '../../../Loading/Loading';

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
    }, []);

    return((!messages.length) ? <Loading /> :
        <div className="contact-container">
            {messages.map(msg => 
                <div key={msg._id} className="contact-message-container">
                    <div>
                        From: {msg.name} &lt;{msg.email}&gt;
                    </div>
                    <div>
                        Message: {msg.message}
                    </div>
                </div>
                )}
        </div>
    )
}

export default MessagesView;