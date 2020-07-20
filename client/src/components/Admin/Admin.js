import React, { useState, useEffect } from 'react';
import './Admin.css';
import useGlobalState from "../../useGlobalState";
import { render } from '@testing-library/react';
import Dashboard from './Dashboard/Dashboard';

function Admin(){
    const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`
    const globalState = useGlobalState(),
            lang = globalState.lang.lang;
    const [adminText, setAdminText] = useState({}),
          [formData, setFormData] = useState({}),
          [error, setError] = useState(""),
          [token, setToken] = useState(localStorage.getItem('token')),
          [admin, setAdmin] = useState(localStorage.getItem('admin'));

    useEffect(() => {
        fetch("/data/adminLang.json")
        .then(res => res.json())
        .then(res => setAdminText(res));
        /*Check for expired token*/
        if(token){
            fetch(`${api}/admin/verify`, {method: 'get', headers: {token}})
            .then((res) => {
                console.log(res.ok)
                if(res.ok)
                    return res.json();
                else {
                    throw new Error();
                }
            })
            .then((res) => {
                setAdmin(JSON.parse(admin));
            })
            .catch((err) => {
                alert("Token expired, please log in again");
                setToken(undefined);
                setAdmin(undefined);
            })
        }
    }, [lang]);
    const handleChange = (event) => {
        event.preventDefault();
        const username = event.target.username.value,
            password = event.target.password.value;
        fetch(`${api}/admin/login`,  {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
          })
          .then((res) => res.json())
          .then((res) => {
                if(res.status === 'success'){
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('admin', JSON.stringify(res.data.admin));
                    globalState.setPage('admin');
                    setAdmin(res.data.admin);
                    setToken(res.data.token);
                }
                else throw new Error(res.message);
          })
          .catch((err) => {
              setError(err.message)
          })
    };
    return ((token) ? 
        <Dashboard admin={admin} />
        :
        <div className="admin-body">
            <div className="padding"></div>
            <div className="login-details">
                <div className="login-div">
                    <p className="login-text">{adminText.login}</p>
                    <p className="login-subtitle">{adminText.login_subtitle}</p>
                    <p className="login-error">{error}</p>
                    <form onSubmit={handleChange} >
                        <div className="input-entry">
                            <p>Username</p>
                            <input required name="username" type="text"/>
                        </div>
                        <div className="input-entry">
                            <p>Password</p>
                            <input required name="password" type="password"/>
                        </div>
                        <input className="submit" type="submit" value="Login" />
                    </form>
                </div>
                <div className="login-info">
                    <div class="ndg-div">
                        <img src="/ndg.png" />
                        <p>NATURE DESIGN GROUP</p>
                    </div>
                </div>
            </div>
            <div className="padding"></div>
        </div>
    )
}

export default Admin;