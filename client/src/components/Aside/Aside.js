import React, { useState, useEffect } from 'react';
import './Aside.css';
import useGlobalState from '../../useGlobalState';

function Aside(props) {
  const globalState = useGlobalState();
  const lang = globalState.lang.lang;
  const [pageName, setPageName] = useState("");
  useEffect(() => {
    fetch('/data/lang.json')
      .then(res => res.json())
      .then(res => setPageName(res[lang].pageNames[props.page]));
  }, [globalState.page]);
  return (
      <div className={`aside-container aside-container-${lang}`}>
        <div className={"header " + lang}>
          <p>{pageName ? pageName : lang === 'en' ? "Home" : "الرئيسية"}</p>
        </div>
      </div>
  );
}
export default Aside;