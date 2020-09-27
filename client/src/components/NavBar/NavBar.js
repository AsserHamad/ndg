import React, { useState, useEffect } from "react";
import useGlobalState from "../../useGlobalState";
import "./NavBar.css";
import Burger from "../Burger/Burger";
import NavBarLink from "./NavBarLink/NavBarLink";
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

function NavBar(props) {
  const globalState = useGlobalState(),
        navbar = props.text,
        lang = globalState.lang.lang,
        page = globalState.page.page,
        [scrollPos, setScrollPos] = useState(0);

  const changeLanguage = (language) => {
      localStorage.setItem('language', language);
      globalState.setLang(language);
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })

  return (
    <div>
      <nav className={`navbar ${(page === 'home' || page == 'project-details') && !scrollPos ? 'navbar-special' : ''}`}>
        <div className={`nav-wrapper nav-wrapper${lang}`}>
        <Link
        className={`logo logo-${lang}`}
        to="/"
        onClick={() => globalState.setPage({ page: "home" })}
        style={{ textDecoration: "inherit", fontSize: "inherit" }}
        >
              <img src="/ndg.png" className="logo" alt="logo" />
        </Link>
          <ul id="menu" className={`menu-${lang}`}>
            <NavBarLink page={page} pageName="home" navbar={navbar} link="/" lang={lang} />
            <NavBarLink page={page} pageName="projects" navbar={navbar} link="/projects" lang={lang} />
            <NavBarLink page={page} pageName="about" navbar={navbar} link="/about" lang={lang} />
            <NavBarLink page={page} pageName="services" navbar={navbar} link="/services" lang={lang} />
            <NavBarLink page={page} pageName="contact" navbar={navbar} link="/contact" lang={lang} />
            {/* <li onClick={() => changeLanguage(lang==='en' ? 'ar':'en')}><span className={` ${lang} change-language change-language-${lang}`}>{(lang === 'en') ? 'العربية' : 'English'}</span></li> */}
          </ul>
        </div>
      </nav>
      <Burger navbar={navbar} />
    </div>
  );
}

export default NavBar;
