import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getErrorText } from '../../errors';

const GoogleLogin = () => {

    const [errorText, setErrorText] = useState('');
    const auth = getAuth();

    useEffect(() => {
        if(errorText){
            setTimeout(() => {
                setErrorText('');
            }, 7000)
        }
    }, [errorText])


    const provider = new GoogleAuthProvider();

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
            <button className="idp-login-btn" onClick={handleClick}><ion-icon name="logo-google"></ion-icon><span style={{marginLeft: '20px'}}>GOOGLE</span></button>
            <p className='red-text'>{errorText}</p>
        </div>
    )
}

export default GoogleLogin