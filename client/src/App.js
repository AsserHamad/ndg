import React, { useState, useEffect } from 'react';
import './App.css';
import './pageTransitions/slideTransition.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
// import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';
import Aside from './components/Aside/Aside';
import useGlobalState from './useGlobalState';
import Projects from './components/Projects/Projects';
import ProjectsExplore from './components/Projects/ProjectsExplore/ProjectsExplore';
import ProjectDetails from './components/Projects/ProjectDetails/ProjectDetails';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Admin from './components/Admin/Admin';
import Footer from './components/Footer/Footer';
import ReactLoading from 'react-loading';
import Loading from './components/Loading/Loading';

function App() {
  const globalState = useGlobalState(),
        lang = globalState.lang.lang,
        [text, setText] = useState({}),
        api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}/api`;
  useEffect(() => {
    fetch(`${api}/admin/language`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lang: lang})
    })
    .then(res => res.json())
      .then(res => {
        console.log('setting text')
          setText(res);
      })
      .catch(err => console.log(err));
  }, [lang]);
  return ((/^admin.*$/.test(globalState.page.page)) ? 
    <Route exact path="/admin" component={Admin} />
  :
  (Object.keys(text).length === 0) ?
  <Loading />
  :
    <div>
      <NavBar text={text.pageNames} />
      <Aside text={text.pageNames} />
          <div id="container">
              {/* <AnimatedSwitch
                atEnter={{opacity: 0}}
                atLeave={{opacity: 0}}
                atActive={{opacity: 1}}
              > */}
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route exact path="/about" render={(props) => <About {...props} text={text.about}/>} />
                  <Route exact path="/projects" render={(props) => <Projects {...props} text={text.projects} />} />
                  <Route exact path="/projects/explore" render={(props) => <ProjectsExplore {...props} text={text.projects} />} />
                  <Route exact path="/projects/:id" render={(props) => <ProjectDetails {...props} text={text.projectDetails} />} />
                  <Route exact path="/services" render={(props) => <Services {...props} text={text.services} />} />
                  <Route exact path="/contact" render={(props) => <Contact {...props} text={text.contact} />} />
                  <Route exact path="/admin" render={(props) => <Admin {...props} />} />
                  <Route path="/*" component={() => <Redirect to='/' />} />
                </Switch>
              {/* </AnimatedSwitch> */}
          </div>
          {/* <Footer /> */}
    </div>
  );
}

export default withRouter(App);
