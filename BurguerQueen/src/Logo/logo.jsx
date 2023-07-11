import LogoBQ from '../assets/LogoBQ.png'
import React from 'react';
import './logo.css'
function Logo() {
    return(
        <div className='logoContainer'>
        <img src= {LogoBQ} alt="logo" className='logo' /> 
        </div>
    
    )
}

export {Logo};