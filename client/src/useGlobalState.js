import { createContext, useReducer, useContext } from 'react';
import React from 'react';

const GlobalStateContext = createContext();

const SET_LANG = 'SET_LANG';
const SET_PAGE = 'SET_PAGE';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_PREVIEW = 'SET_PREVOEW';

const initialState = {
    lang: {
        lang: 'en'
    },
    page: {
        page: window.location.pathname.substr(1, window.location.pathname.length) || 'home'
    },
    category: {
        category: 0
    },
    preview: {
        preview: 0
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
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case SET_PREVIEW:
            return {
                ...state,
                preview: action.payload
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
  
    const setCategory = (category) => {
      dispatch({ 
        type: SET_CATEGORY, 
        payload: { 
          category
        } 
      });
    };
  
    const setPreview = (preview) => {
      dispatch({ 
        type: SET_PREVIEW, 
        payload: { 
          preview
        } 
      });
    };
  
    return {
      setLang,
      setPage,
      setCategory,
      setPreview,
      lang: state.lang,
      page: state.page,
      category: state.category,
      preview: state.preview
    };
  };
  
  export default useGlobalState;