import React, { useState } from 'react';
import './Contact.css';
import useGlobalState from "../../useGlobalState";
import WrappedMap from './MyMapComponent/MyMapComponent';
import { useForm } from 'react-hook-form'
import swal from 'sweetalert';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Contact(props){
    const globalState = useGlobalState(),
            lang = globalState.lang.lang,
            contactText = props.text,
            [message, setMessage] = useState('');

    const api = `${(process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''}`;
    const { register, handleSubmit } = useForm()
    const onSubmit = body => {
      body.message = message;
      fetch(`${api}/api/contact`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      })
      .then(res => res.json())
      .then(() => {
        swal({
            title: 'Message Sent Successfully',
            icon: "success"
        });
      })
     }
    return(
        <div className={`about-container about-container-${lang}`}>
            <div className={`about-us-container about-us-container-${lang}`}>
                <WrappedMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAJbQg4kTkse4eRXEAGk4F1ZNgLlBhgU90`}
                  loadingElement={<div style={{height: '100%'}}/>}
                  containerElement={<div style={{height: '100%'}}/>}
                  mapElement={<div style={{height: '100%'}}/>}
                />
            </div>
            <div className={`main-about-container main-about-container-${lang}`}>
              <div className="service-div">
                  <p className={`service-title service-title-${lang}`}>{contactText.contactUs}</p>
                  <img alt="services pic" src="http://www.naturedesigngroup.com/web_test/public/Uploads/pages/en/171555132651.jpg" />
                  <div className={`black-box black-box-${lang}`}>
                    <div className={`black-box-text`}>
                      <span>01.</span>
                      <span>{contactText.write}</span>
                      <span onClick={() => window.open('mailto:info@maildesigngroup.com', '_blank')}>INFO@NATUREDESIGNGROUP.COM</span>
                    </div>
                    <div className={`black-box-text`}>
                      <span>02.</span>
                      <span>{contactText.call}</span>
                      <span onClick={() => window.open('tel:+20%E2%80%9033030023')}>+20‐33030023</span>
                    </div>
                    <div className={`black-box-text`}>
                      <span>03.</span>
                      <span>{contactText.visit}</span>
                      <span onClick={() => window.open('mailto:info@maildesigngroup.com', '_blank')}>{contactText.visitText}</span>
                    </div>
                  </div>
                  <p className={`service-title service-title-${lang}`}>{contactText.getInTouch}</p>
                  <div className={`getInTouch`}>
                    {[0,1,2,3,4,5,6].map((element) => 
                      <p key={element}>{contactText[`getInTouchText${element}`]}</p>
                    )}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}  className={`contact-form`}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div><input required placeholder={contactText.name} name="name" ref={register} /></div>
                    <div><input required placeholder={contactText.email} name="email" ref={register} /></div>
                    <div><input required placeholder={contactText.phone} name="phone" ref={register} /></div>
                    <div><select className={`select-placeholder`} id="subject" name="subject" defaultValue="subject" ref={register}>
                      <option value="2" disabled hidden>{contactText.subject}</option>
                      <option value="0">{contactText.orderProject}</option>
                      <option value="1">{contactText.support}</option>
                      <option value="2">{contactText.otherQuestions}</option>
                    </select></div>
                    {/* <div><textarea required placeholder={contactText.message} name="message" ref={register} /></div> */}
                    <div><ReactQuill theme="snow" name="description_en" value={message}
                    onChange={(e) => setMessage(e)} /></div>
                    <div><button className={`submitButton`}type="submit" >{contactText.send}</button></div>
                    {/* include validation with required or other standard HTML validation rules */}
                    {/* <input name="exampleRequired" ref={register({ required: true })} /> */}
                    {/* errors will return when field validation fails  */}
                    {/* {errors.exampleRequired && <span>This field is required</span>} */}
                    
                    
                  </form>
              </div>
            </div>
        </div>
    )
}

export default Contact;