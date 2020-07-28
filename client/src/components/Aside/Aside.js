import React, { useState, useEffect } from 'react';
import './Aside.css';
import useGlobalState from '../../useGlobalState';

function Aside(props) {
  const globalState = useGlobalState();
  const lang = globalState.lang.lang;
  const pageName = props.text;
  console.log(pageName)
  const [name, setName] = useState(pageName.home)
  useEffect(() => {
    console.log(globalState.page)
    console.log(pageName)
    setName(pageName[globalState.page.page]);
  }, [globalState.page])
  return (
      <div className={`aside-container aside-container-${lang}`}>
        <div className={"header " + lang}>
          <p>{name}</p>
        </div>
      </div>
  );
}
export default Aside;