import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import useGlobalState from "../../useGlobalState";
import './Burger.css';

import { FaHome, FaProjectDiagram, FaInfoCircle, FaServicestack, FaPhone } from 'react-icons/fa';

function Burger(props) {
    const globalState = useGlobalState(),
            lang = globalState.lang.lang,
            navbar = props.navbar;
    return(
        <div className={`burger burger-${lang}`}>
            {(lang === 'en') ? 
            <Menu right>
                <ul className={`menu menu-${lang}`}>
                    <Link
                    to="/"
                    onClick={() => globalState.setPage({ page: "home" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                        <li>
                            <div className={`menuText menuText-${lang}`}><div className="icon"><FaHome /></div>{navbar.home}</div>
                        </li>
                    </Link>
                    <Link
                    to="/projects"
                    onClick={() => globalState.setPage({ page: "home" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaProjectDiagram /></div>{navbar.projects}</div>
                    </li>
                    </Link>
                    <Link
                    to="/about"
                    onClick={() => globalState.setPage({ page: "about" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                        <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaInfoCircle /></div>{navbar.about}</div>
                        </li>
                    </Link>
                    <Link
                    to="/services"
                    onClick={() => globalState.setPage({ page: "services" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaServicestack /></div>{navbar.services}</div>
                    </li>
                    </Link>
                    <Link
                    to="/contact"
                    onClick={() => globalState.setPage({ page: "contact" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaPhone /></div>{navbar.contact}</div>
                    </li>
                    </Link>
                </ul>
            </Menu> : 
            <Menu left>
                <ul className="menu">
                    <Link
                    to="/"
                    onClick={() => globalState.setPage({ page: "home" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                        <li>
                            <div className={`menuText menuText-${lang}`}><div className="icon"><FaHome /></div>{navbar.home}</div>
                        </li>
                    </Link>
                    <Link
                    to="/projects"
                    onClick={() => globalState.setPage({ page: "home" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaProjectDiagram /></div>{navbar.projects}</div>
                    </li>
                    </Link>
                    <Link
                    to="/about"
                    onClick={() => globalState.setPage({ page: "about" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                        <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaInfoCircle /></div>{navbar.about}</div>
                        </li>
                    </Link>
                    <Link
                    to="/services"
                    onClick={() => globalState.setPage({ page: "services" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaServicestack /></div>{navbar.services}</div>
                    </li>
                    </Link>
                    <Link
                    to="/contact"
                    onClick={() => globalState.setPage({ page: "contact" })}
                    style={{ textDecoration: "inherit", fontSize: "inherit" }}
                    >
                    <li>
                        <div className={`menuText menuText-${lang}`}><div className="icon"><FaPhone /></div>{navbar.contact}</div>
                    </li>
                    </Link>
                </ul>
                </Menu> }
        </div>
    )
};

export default Burger;