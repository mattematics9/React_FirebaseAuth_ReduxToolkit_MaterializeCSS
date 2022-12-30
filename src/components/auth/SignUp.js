import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import AppleLogin from './AppleLogin'
import GoogleLogin from './GoogleLogin'
import { Link } from 'react-router-dom'
import { getErrorText } from '../../errors'
import { getUrl } from '../../config/mainConfig'


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReenter, setPasswordReenter] = useState('');
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if(errorText){
            setTimeout(() => {
                setErrorText('');
            }, 7000)
        }
    }, [errorText])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === passwordReenter){
            if(password.length > 6){
                try{
                    await createUserWithEmailAndPassword(auth, email, password);
                    let url = getUrl();
                    let actionCodeSettings = {url: url}
                    await sendEmailVerification(auth.currentUser, actionCodeSettings);
                }catch(error){
                    setErrorText(getErrorText(error.code));
                }       
            }else{
                setErrorText('The password must be at least 6 characters.');
            }
        }else{
            setErrorText('The two passwords do not match.');
        }
    }

    const handleChange = (e) => {
        switch (e.target.id){
            case 'email-signup':
                setEmail(e.target.value)
                break;
            case 'password-signup':
                setPassword(e.target.value)
                break;
            case 'password-reenter-signup':
                setPasswordReenter(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container" style={{marginTop: '120px'}}>
            <div className='row'>

                <div className='col l7 m12 s12'>
                    <h4 className="center">SIGN UP</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input onChange={handleChange} type="email" id="email-signup" name="email-signup" value={email}/>
                            <label htmlFor="name-signup">Email</label>
                        </div>
                        <div className="input-field">
                            <input onChange={handleChange} type="password" id="password-signup" name="password-signup" value={password}/>
                            <label htmlFor="password-signup">Password</label>
                        </div>
                        <div className="input-field">
                            <input onChange={handleChange} type="password" id="password-reenter-signup" name="password-reenter-signup" value={passwordReenter}/>
                            <label htmlFor="password-reenter-signup">Re-enter Password</label>
                        </div>
                        <p className="center red-text">{errorText}</p>
                        <div className="input-field center-align" style={{marginTop: '40px'}}>
                            <button className="btn-large">CREATE ACCOUNT</button>
                            <div className='row' style={{marginTop: '20px'}}>
                                <p>Already have an account?</p>
                                <Link to='/login'>LOGIN HERE</Link>
                            </div>              
                        </div>
                    </form>
                </div>

                <div className='col l1 hide-on-med-and-down'></div>

                <div className='col l4 m12'>
                    <div className='row idp-login-btn-row'>
                        <div className='col l12 m12 s12 center'>
                            <GoogleLogin/>
                        </div>
                        <div className='col l12 m12 s12 center'>
                            <AppleLogin/>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default SignUp