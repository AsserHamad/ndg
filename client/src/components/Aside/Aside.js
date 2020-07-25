import React, { useState, useEffect } from 'react';
import './Aside.css';
import useGlobalState from '../../useGlobalState';

function Aside(props) {
  const globalState = useGlobalState();
  const lang = globalState.lang.lang;
  const pageName = props.text;
  const [name, setName] = useState(pageName)
  useEffect(() => {
    setName(globalState.page.page);
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