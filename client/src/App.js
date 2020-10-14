import React, { useState, useEffect } from 'react';
import './App.css';
import './pageTransitions/slideTransition.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
// import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';
import useGlobalState from './useGlobalState';
import Projects from './components/Projects/Projects';
import ProjectsExplore from './components/Projects/ProjectsExplore/ProjectsExplore';
import ProjectDetails from './components/Projects/ProjectDetails/ProjectDetails';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Admin from './components/Admin/Admin';
import Loading from './components/Loading/Loading';
import DeepDesign from './components/DeepDesign/DeepDesign';

function App() {
  const globalState = useGlobalState(),
        lang = globalState.lang.lang,
        page = globalState.page.page,
        [text, setText] = useState({}),
        [loading, setLoading] = useState(false),
        api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`;
  useEffect(() => {
    /* Check if preexisting language settings exist */
    const _lang = localStorage.getItem('language');
    if(_lang)
      globalState.setLang(_lang);
    fetch(`${api}/admin/language`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lang: lang})
    })
    .then(res => res.json())
    .then(res => setText(res))
    .catch(err => console.log(err));
  }, [lang, api]);

  return ((/^admin.*$/.test(globalState.page.page)) ? 
    <Route exact path="/admin" component={Admin} />
  :
  (!Object.keys(text).length || loading) ?
  <Loading />
  :
    <div>
      <NavBar text={text.pageNames} />
      {/* <Aside text={text.pageNames} /> */}
      <div className={`app-container ${page === 'home' ? 'app-container-home' : ''}`}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" render={(props) => <About {...props} setLoading={setLoading} text={text.about}/>} />
          <Route exact path="/expertise" render={(props) => <Projects {...props} setLoading={setLoading} text={text.projects} />} />
          <Route exact path="/expertise/explore" render={(props) => <ProjectsExplore {...props} setLoading={setLoading} text={text.projects} />} />
          <Route exact path="/expertise/:id" render={(props) => <ProjectDetails {...props} setLoading={setLoading} text={text.projectDetails} />} />
          <Route exact path="/deepdesign" render={(props) => <DeepDesign {...props} setLoading={setLoading} />} />
          <Route exact path="/services" render={(props) => <Services {...props} setLoading={setLoading} text={text.services} />} />
          <Route exact path="/contact" render={(props) => <Contact {...props} setLoading={setLoading} text={text.contact} />} />
          <Route exact path="/admin" render={(props) => <Admin {...props} setLoading={setLoading} />} />
          <Route path="/*" component={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
