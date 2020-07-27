import React, { useState, useEffect } from 'react';
import './TextView.css';
import swal from 'sweetalert';
import Loading from '../../../Loading/Loading';

function TextView(props) {
    const admin = props.admin,
            api = props.api,
            token = localStorage.getItem('token'),
            [englishText, setEnglishText] = useState({}),
            [englishInnerText, setEnglishInnerText] = useState({}),
            [arabicText, setArabicText] = useState({}),
            [selectedLanguage, setSelectedLanguage] = useState(1),
            [arabicInnerText, setArabicInnerText] = useState({});
    useEffect(() => {
        fetch(`${api}/admin/language`)
        .then(res => res.json())
        .then(res => {
            const [en, ar] = [res.en, res.ar];
            let iTextEn = {};
            Object.keys(en).map(key => {
                Object.keys(en[key]).map(innerKey => {
                    iTextEn = {...iTextEn, [innerKey]: en[key][innerKey]}
                })
            })
            setEnglishText(en);
            setEnglishInnerText(iTextEn);
            
            let iTextAr = {};
            Object.keys(ar).map(key => {
                Object.keys(ar[key]).map(innerKey => {
                    iTextAr = {...iTextAr, [innerKey]: ar[key][innerKey]}
                })
            })
            setArabicText(ar);
            setArabicInnerText(iTextAr);
            
        })
        .catch(err => console.log(err))
    }, []);
    
    const handleChange = (key, value, lang) => {
        (lang === 'en') ?
        setEnglishInnerText({...englishInnerText, [key]: value.target.value})
        : setArabicInnerText({...arabicInnerText, [key]: value.target.value})
    }

    const handleSubmit = (() => {
        let en = JSON.parse(JSON.stringify(englishText));
        Object.keys(en).map(key => 
            Object.keys(en[key]).map(innerKey => en[key][innerKey] = englishInnerText[innerKey])
        )
        
        let ar = JSON.parse(JSON.stringify(arabicText));
        Object.keys(ar).map(key => 
            Object.keys(ar[key]).map(innerKey => ar[key][innerKey] = arabicInnerText[innerKey])
        )
        fetch(`${api}/admin/language`,  {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({en, ar})
          })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                swal({
                    text: 'Successfully updated text!',
                    icon: "success",
                });
            }
        })
        .catch(err => console.log(err))
    })

    return (Object.keys(englishText).length === 0) ? <Loading />:
    <div className="textedit-container">
        <div className="textedit-select-language">
            <div onClick={() => setSelectedLanguage(0)} className={`textedit-language ${selectedLanguage === 0 ? 'textedit-language-highlight' : ''} `}>English</div>
            <div onClick={() => setSelectedLanguage(1)} className={`textedit-language ${selectedLanguage === 1 ? 'textedit-language-highlight' : ''} `}>Arabic</div>
        </div>
        {(selectedLanguage === 0) ?
            Object.keys(englishInnerText).map(key => {
                return (
                    <div key={key} className="textedit-text-container">
                        <span className="textedit-key">{key}</span>
                        <textarea className="textedit-input" value={englishInnerText[key]} onChange={(value) => {handleChange(key, value, 'en')}} />
                    </div>
                )
            })
        :
            Object.keys(arabicInnerText).map(key => {
                return (
                    <div key={key} className="textedit-text-container">
                        <span className="textedit-key">{key}</span>
                        <textarea className="textedit-input textedit-input-ar" value={arabicInnerText[key]} onChange={(value) => {handleChange(key, value, 'ar')}} />
                    </div>
                )
            })
        }
        <div onClick={handleSubmit} className="textedit-submit">Submit</div>
    </div>
}

export default TextView;