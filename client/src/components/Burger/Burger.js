import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import useGlobalState from "../../useGlobalState";
import './Burger.css';

import { FaHome, FaProjectDiagram, FaInfoCircle, FaServicestack, FaPhone, FaFacebook, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import ReactHtmlParser from 'react-html-parser';

function Burger(props) {
    const globalState = useGlobalState(),
            lang = globalState.lang.lang,
            page = globalState.page.page,
            navbar = props.navbar,
            items = [{
                to: '/',
                page: 'home',
                icon: <FaHome />,
                text: navbar.home
            }, {
                to: '/expertise',
                page: 'expertise',
                icon: <FaProjectDiagram />,
                text: navbar.projects
            }, {
                to: '/services',
                page: 'services',
                icon: <FaServicestack />,
                text: navbar.services
            }, {
                to: '/about',
                page: 'about',
                icon: <FaInfoCircle />,
                text: navbar.about
            }, {
                to: '/contact',
                page: 'contact',
                icon: <FaPhone />,
                text: navbar.contact
            }]
    return(
        <div className={`burger burger-${lang}`}>
            {(lang === 'en') ? 
            <Menu right>
                <ul className={`menu menu-${lang}`}>
                    {items.map(item => {
                        return(
                            <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => globalState.setPage({ page: item.page })}
                            style={{ textDecoration: "inherit", fontSize: "inherit" }}
                            >
                                <li>
                                    <div className={`menuText menuText-${lang} ${item.page === page && 'burger-selected'}`}>{ReactHtmlParser(item.text)}</div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                <div className="burger-socials">
                    <div><FaFacebookF /></div>
                    <div><FaTwitter /></div>
                    <div><FaInstagram /></div>
                    <div><FaYoutube /></div>
                    
                </div>
            </Menu> : 
            <Menu left>
                <ul className="menu">
                    {items.map(item => {
                        return(
                            <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => globalState.setPage({ page: item.page })}
                            style={{ textDecoration: "inherit", fontSize: "inherit" }}
                            >
                                <li>
                                    <div className={`menuText menuText-${lang}`}><div className="icon">{item.icon}</div>{ReactHtmlParser(item.text)}</div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                </Menu> }
        </div>
    )
};

export default Burger;