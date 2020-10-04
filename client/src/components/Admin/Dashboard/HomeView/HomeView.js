import React, { useState } from 'react';
import './HomeView.css';
import { FaPlusCircle } from 'react-icons/fa';
import AddAdmin from './AddAdmin/AddAdmin';

function HomeView(props) {
    const api = props.api,
        admin = props.admin,
        [currAdminPage, setCurrAdminPage] = useState(``);
    
        const changeAdminPage = (newPage) => {
            setCurrAdminPage(newPage);
        }
    return(
        (currAdminPage === '') ? 
        <div className="admin-home-container">
            <div className="admin-home-welcome">Hello, {admin.name || admin.username}</div>
            <div className="admin-functions-container">
                <div onClick={() => changeAdminPage('add')} className="admin-functions">
                    <div className="admin-functions-icon"><FaPlusCircle /></div>
                    <div className="admin-functions-title">Add Admin</div>
                </div>
                {/* <div onClick={() => changeAdminPage('edit')} className="admin-functions">
                    <div className="admin-functions-icon"><FaEdit /></div>
                    <div className="admin-functions-title">Edit Details</div>
                </div> */}
            </div>
        </div>
        :
        (currAdminPage === 'add') ?
        <AddAdmin changeAdminPage={changeAdminPage} api={api} /> : <span></span>

    )
}

export default HomeView;