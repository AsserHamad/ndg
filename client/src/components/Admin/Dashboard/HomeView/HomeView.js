import React from 'react';
import './HomeView.css';
import { FaPlusCircle, FaEdit } from 'react-icons/fa';

function HomeView(props) {
    const api = props.api,
        admin = props.admin;

    
    return(
        <div className="admin-home-container">
            <div className="admin-home-welcome">Hello, {admin.name || admin.username}</div>
            <div className="admin-functions-container">
                <div className="admin-functions">
                    <div className="admin-functions-icon"><FaPlusCircle /></div>
                    <div className="admin-functions-title">Add Admin</div>
                </div>
                <div className="admin-functions">
                    <div className="admin-functions-icon"><FaEdit /></div>
                    <div className="admin-functions-title">Edit Details</div>
                </div>
            </div>
        </div>
    )
}

export default HomeView;