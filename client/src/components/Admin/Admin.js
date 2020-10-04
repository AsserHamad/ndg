import React, { useState, useEffect } from 'react';
import './Admin.css';
import useGlobalState from "../../useGlobalState";
import Dashboard from './Dashboard/Dashboard';
import swal from 'sweetalert';

function Admin(){
    const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`
    const globalState = useGlobalState(),
            lang = globalState.lang.lang;
    const 
          [error, setError] = useState(""),
          [token, setToken] = useState(localStorage.getItem('token')),
          [admin, setAdmin] = useState(localStorage.getItem('admin'));

    useEffect(() => {
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
                swal({
                    text: 'Please log in again',
                    icon: "warning",
                    dangerMode: true,
    
                });
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                setToken(undefined);
                setAdmin(undefined);
            })
        }
    }, [lang, admin, api, token]);
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
        <Dashboard setToken={setToken} token={token} admin={admin} />
        :
        <div className="admin-body">
            <div className="padding"></div>
            <div className="login-details">
                <div className="login-div">
                    <p className="login-text">Login</p>
                    <p className="login-subtitle">Please enter your admin credentials</p>
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
                    <div className="ndg-div">
                        <img alt="ndg" src="/ndg.png" />
                        <p>NATURE DESIGN GROUP</p>
                    </div>
                </div>
            </div>
            <div className="padding"></div>
        </div>
    )
}

export default Admin;