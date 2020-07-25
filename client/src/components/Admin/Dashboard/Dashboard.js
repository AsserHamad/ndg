import React, { useState } from 'react';
import './Dashboard.css';
import ProjectsView from './ProjectsView/ProjectsView';
import ServicesView from './ServicesView/ServicesView';

function Dashboard(props){
    const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`;
    const admin = props.admin;
    const [page, setPage] = useState('services');
    return (
        <div className="dashboard-body">
            <div className="admin-sidebar">
                <img className="admin-sidebar-logo"src="/ndg.png" />
                <div onClick={() => setPage('home')} className={`sidebar-button ${(page === 'home') ? 'sidebar-button-selected': ''}`}>Home</div>
                <div onClick={() => setPage('projects')} className={`sidebar-button ${(page === 'projects') ? 'sidebar-button-selected': ''}`}>Projects</div>
                <div onClick={() => setPage('services')} className={`sidebar-button ${(page === 'services') ? 'sidebar-button-selected': ''}`}>Services</div>
                <div onClick={() => setPage('messages')} className={`sidebar-button ${(page === 'messages') ? 'sidebar-button-selected': ''}`}>Messages</div>
                <div onClick={() => setPage('text')} className={`sidebar-button ${(page === 'text') ? 'sidebar-button-selected': ''}`}>Text</div>
            </div>
            <div className="admin-content">
                {(page==='home') ? 
                    <h1>Hello, {admin.username}</h1>
                :(page==='projects') ? 
                    <ProjectsView admin={admin} api={api} />
                :(page==='services') ? 
                    <ServicesView admin={admin} api={api} /> :
                <div>The rest</div>
                }
            </div>
        </div>
        )
}

export default Dashboard;