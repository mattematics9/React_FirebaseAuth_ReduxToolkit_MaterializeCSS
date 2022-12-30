import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import GoogleLogin from './GoogleLogin'
import AppleLogin from './AppleLogin'
import { getErrorText } from '../../errors'



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const navigate = useNavigate();    

    useEffect(() => {
        if(errorText){
            setTimeout(() => {
                setErrorText('');
            }, 7000)
        }
    }, [errorText])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        }catch(error){
            setErrorText(getErrorText(error.code));
        }
    }

    const handleChange = (e) => {
        switch (e.target.id){
            case 'email-login':
                setEmail(e.target.value)
                break;
            case 'password-login':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className='container' style={{marginTop: '120px'}}>
            <div className='row'>

                <div className='col l7 m12 s12'>
                    <h4 className="center">LOGIN</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input onChange={handleChange} type="email" id="email-login" name="email-login" value={email}/>
                            <label htmlFor="name-login">Email</label>
                        </div>
                        <div className="input-field">
                            <input onChange={handleChange} type="password" id="password-login" name="password-login" value={password}/>
                            <label htmlFor="password-login">Password</label>
                        </div>
                        <p className="center red-text">{errorText}</p>
                        <div className="input-field center-align" style={{marginTop: '40px'}}>
                            <button className="btn-large">LOGIN</button>
                        </div>     
                    </form>
                    <div className="container center" style={{marginTop: '40px'}}>
                        <div className='row'>
                            <div className='col l6 s6 center'>
                                <Link to='/password-reset'>Forgot Password?</Link>
                            </div>
                            <div className='col l6 s6 center'>
                                <Link to='/signup'>Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col l1 hide-on-med-and-down'></div>

                <div className='col l4 m12'>
                    <div className='row idp-login-btn-row'>
                        <div className='col l12 m6 s12 center'>
                            <GoogleLogin/>
                        </div>
                        <div className='col l12 m6 s12 center'>
                            <AppleLogin/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;
