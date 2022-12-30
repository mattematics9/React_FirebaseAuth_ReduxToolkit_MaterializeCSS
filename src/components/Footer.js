import React from 'react';
import { appName } from '../config/mainConfig';

const Footer = () => {

    return(
        <div id='footer' style={{marginTop: '40px'}}>
            <div className='grey lighten-2 grey-text text-darken-3'>
                <div className='container center' style={{paddingTop: '50px', paddingBottom: '50px'}}>
                    <h6>{appName}</h6>
                    <h6>{`info@${appName.replace(/\s+/g, '')}.com`}</h6>
                </div>
            </div>
            <div className='black center' style={{height: '50px', fontSize: '10px', paddingTop: '17px'}}>
                <a className='purple-text text-lighten-1' href='/'>HOME</a>
                <a className='purple-text text-lighten-1' style={{marginLeft: '10px'}} href='/about'>ABOUT</a>
                <a className='purple-text text-lighten-1' style={{marginLeft: '10px'}} href='/contact'>CONTACT</a>
            </div>
        </div>
        
    )
};

export default Footer;