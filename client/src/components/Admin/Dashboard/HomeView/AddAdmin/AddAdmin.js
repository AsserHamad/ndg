import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './AddAdmin.css';
import swal from 'sweetalert';

function AddAdmin(props) {

    const [values, setValues] = useState({
            name: '',
            username: '',
            password: '',
            email: ''
        }),
        api = props.api,
        token = localStorage.getItem('token');

    const handleChange = (field, event) => {
        setValues({...values, [field]: event.target.value});

    }

    const handleSubmit = () => {
        console.log(values)
        fetch(`${api}/admin/register`,
        {
            method: 'post',
            body: JSON.stringify(values),
            headers: {'Content-Type': 'application/json', token},
        })
        .then(res => res.json())
        .then(res => {
            if(res.message) throw res.message;
            console.log(res);
            swal({
                title: `Admin ${values.username} added successfully!`,
                icon: "success",
                buttons: {
                    confirm: true,
                },
            })
            .then(confirm => {
                props.changeAdminPage('');
            })
        })
        .catch(err => {
            console.log(err);
            swal({
                title: `Error`,
                text: `${err}`,
                icon: "info",
                buttons: {
                    confirm: true,
                },
            })
        })
    }

    return (
    <div className="add-admin-container">
        <button className="admin-home-back-button" onClick={() => props.changeAdminPage('')}><FaArrowLeft /></button>
        <div className="service-detail-titles-divs">
            <p>Name</p>
            <input onChange={(event) => handleChange('name', event)} name="title_en" />

            <p>Username</p>
            <input onChange={(event) => handleChange('username', event)} name="title_en" />
            
            <p>Password</p>
            <input type="password" onChange={(event) => handleChange('password', event)} name="title_en" />
            
            <p>Email</p>
            <input onChange={(event) => handleChange('email', event)} name="title_en" />

            <button className="add-admin-submit" onClick={() => handleSubmit()}>Submit</button>
        </div>
    </div>
    );
}

export default AddAdmin;