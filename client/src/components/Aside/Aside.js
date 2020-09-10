import React, { useState, useEffect } from 'react';
import './Aside.css';
import useGlobalState from '../../useGlobalState';

function Aside(props) {
  const globalState = useGlobalState();
  const lang = globalState.lang.lang;
  let pageName = props.text;
  console.log(pageName)
  const [name, setName] = useState(pageName.home)
  useEffect(() => {
    console.log(`changing aside page text to ${pageName[globalState.page.page]}`)
    setName(pageName[globalState.page.page]);
  }, [pageName, globalState.page])
  return (
      <div className={`aside-container aside-container-${lang}`}>
        <div className={"header " + lang}>
          <p>{name}</p>
        </div>
      </div>
  );
}
export default Aside;