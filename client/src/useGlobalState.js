import { createContext, useReducer, useContext } from 'react';
import React from 'react';

const GlobalStateContext = createContext();

const SET_LANG = 'SET_LANG';
const SET_PAGE = 'SET_PAGE';

const initialState = {
    lang: {
        lang: 'ar'
    },
    page: {
        page: window.location.pathname.substr(1, window.location.pathname.length) || 'home'
    }
};

const globalStateReducer = (state, action) => {
    switch (action.type) {
        case SET_LANG:
            return {
                ...state,
                lang: action.payload
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        default:
            return state;
    }
}

export const GlobalStateProvier = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    )
}

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
  
    const setLang = (lang) => {
      dispatch({ 
        type: SET_LANG, 
        payload: { 
          lang
        } 
      });
    };
  
    const setPage = (page) => {
      dispatch({ 
        type: SET_PAGE, 
        payload: { 
          page: page.page
        } 
      });
    };
  
    return {
      setLang,
      setPage,
      lang: state.lang,
      page: state.page
    };
  };
  
  export default useGlobalState;