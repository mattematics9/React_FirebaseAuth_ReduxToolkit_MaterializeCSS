import React, { useState, useEffect } from 'react'
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth"
import { getErrorText } from '../../errors';


const AppleLogin = () => {

    const [errorText, setErrorText] = useState('');
    const auth = getAuth();

    const provider = new OAuthProvider('apple.com');

    useEffect(() => {
        if(errorText){
            setTimeout(() => {
                setErrorText('');
            }, 7000)
        }
    }, [errorText])

    const handleClick = async () => {
        try{
            await signInWithPopup(auth, provider);
        }
        catch(error){
            setErrorText(getErrorText(error.code));
        }
    }

    return (
        <div>
            <button className="idp-login-btn" onClick={handleClick}><ion-icon name="logo-apple"></ion-icon><span style={{marginLeft: '20px'}}>APPLE</span></button>
            <p className='red-text'>{errorText}</p>
        </div>
    )
}

export default AppleLogin