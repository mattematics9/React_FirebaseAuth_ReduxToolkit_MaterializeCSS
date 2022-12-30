import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebaseConfig'
import { getErrorText } from '../../errors'
import { getUrl } from '../../config/mainConfig'

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = getUrl();
        let actionCodeSettings = {url: `${url}/login`}
        try{
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setEmailSent(true);
            setMessage(`A password reset email has been sent to ${email}`)
        }catch(error){
            setEmailSent(false);
            setMessage(getErrorText(error.code));
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const text = emailSent? 
        <p className="blue-text">{message}<span style={{marginLeft: '30px'}}><Link to="/login"><button className="btn-large">LOGIN</button></Link></span></p>:
        <p className="red-text">{message}</p>;


    return (
        <div className="container center-align" style={{paddingBottom: '50px'}}>
            <h3 style={{marginTop: '120px'}}>Forgot your password?</h3>
            <h5>No worries...</h5>
            <form onSubmit={handleSubmit} style={{marginTop: '60px'}}>
                <div className="input-field">
                    <input onChange={handleChange} type="email" id="password-reset-email" value={email}/>
                    <label htmlFor="password-reset-email">Email</label>
                </div>
                {emailSent? null: (
                    <>
                        <p style={{marginTop: '30px'}}>Send a password reset email</p>
                        <button className="btn-large" style={{marginTop: '20px'}}>SEND</button>
                    </>
                )}
            </form>
            {text}
        </div>
    )
}

export default PasswordReset
