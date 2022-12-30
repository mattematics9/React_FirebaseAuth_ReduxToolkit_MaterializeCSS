import React, { useState, useEffect } from 'react'
import { auth } from '../../config/firebaseConfig'
import { sendEmailVerification, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorText } from '../../errors';
import { getUrl } from '../../config/mainConfig';



const EmailVerification = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [disableEmailSendBtn, setDisableEmailSendBtn] = useState(false);
    const [errorText, setErrorText] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setDisableEmailSendBtn(false);
            setErrorText('');
            setEmailSent(false);
        }, 10000)
    }, [disableEmailSendBtn])

    const resendVerificaitonEmail = async () => {
        try{
            let url = getUrl();
            let actionCodeSettings = {url: url};
            await sendEmailVerification(auth.currentUser, actionCodeSettings);
            setDisableEmailSendBtn(true);
            setErrorText('');
            setEmailSent(true);
        }catch(error){
            setDisableEmailSendBtn(true);
            setEmailSent(false);
            setErrorText(getErrorText(error.code));
        }
    }

    const editEmail = () => {
        navigate('/edit-email');
    }

    return (
        <div className="container" style={{marginTop: '150px', marginBottom: '100px'}}>
            <h4 className="center" style={{marginTop: '70px'}}>A verification email has been sent to {auth.currentUser.email}.</h4>
            <h5 className="center orange-text text-darken-2" style={{marginTop: '40px'}}>Click the link in your email to verify.</h5>
            <div className='row'>
                <div className='col l6 m6 s12'>
                    <h5 className="center" style={{marginTop: '40px'}}>Didn't receive it?</h5>
                    <div className="center" style={{marginTop: '40px'}}>
                        {disableEmailSendBtn? 
                            <button className="btn-large" style={{opacity: .7}}>Re-send Verification Email</button>
                            :<button onClick={resendVerificaitonEmail} className="btn-large">Re-send Verification Email</button>}
                        {errorText? <p className='red-text'>{errorText}</p>: null}
                        {emailSent? <p className='green-text'>Email Sent.  Check Inbox.</p>: null}
                    </div>
                </div>
                <div className='col l6 m6 s12'>
                    <h5 className="center" style={{marginTop: '40px'}}>Oops... Not your email?</h5>
                    <div className="center" style={{marginTop: '40px'}}>
                        <button onClick={editEmail} className="btn-large" id='edit-email-btn'>Edit Email</button>
                    </div>
                </div>
                <div className='col l12 m12 s12 center' style={{paddingTop: '70px'}}>
                    <Link to='#' onClick={() => {signOut(auth)}} id='email-verification-sign-out-link'>SIGN OUT</Link>
                </div>
            </div>
        </div>
    )
}


export default EmailVerification;

