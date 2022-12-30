import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from 'firebase/auth'
import { auth } from '../../../config/firebaseConfig'
import { userProfileUpdated } from '../../../redux/slices/userSlice'
import { getErrorText } from '../../../errors'
import { getUrl } from '../../../config/mainConfig'

const EditEmailRow = ({ closeAllEdits }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        var scrollEl = document.getElementById("edit-email-row").offsetTop;
        window.scrollTo({ top: scrollEl-110, behavior: 'smooth'});
    },[])

    useEffect(() => {
        setTimeout(() => {
            setErrorText('');
        }, 10000)
    }, [errorText])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try{
            //reauthenticate the user.  accounts with only either google or apple providers without an email/password will fail here since the password will be incorrect since there is no password.  
            let credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            //update email
            await updateEmail(auth.currentUser, email);
            //update store
            dispatch(userProfileUpdated({ email }));
            //send email verification
            let url = getUrl();
            let actionCodeSettings = {url: url};
            await sendEmailVerification(auth.currentUser, actionCodeSettings);
            //trigger email verification screen by refreshing the page
            window.location.reload();
        }catch(error){
            setErrorText(getErrorText(error.code));
        }
    }

    return (
        <div id='edit-email-row' className='row grey lighten-3' style={{position: 'relative', padding: '70px', border: '1px solid grey'}}>
            <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id='edit-email-input' name='edit-email-input' value={email}/>
                <label htmlFor='edit-email-input'>New Email</label>
            </div>
            <p>For security reasons, you must enter your password in order to make this change.</p>
            <div className="input-field">
                <i className="material-icons prefix">security</i>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="enter-password-to-edit-email" name="enter-password-to-edit-email" value={password}/>
                <label htmlFor="enter-password-to-edit-email">Enter Password</label>
            </div>
            <p>After submitting, you will be required to verify your email by going to your email inbox.  You will not be able to access your account until you verify your email.</p>
            <div className='center'>
                <button onClick={handleSubmit} className='btn-large center' style={{marginTop: '30px'}}>SUBMIT CHANGE</button>
                <p className='red-text center'>{errorText}</p>
            </div>
            <button onClick={closeAllEdits} className="btn-small grey lighten-3 black-text" style={{marginLeft: '20px',  position: 'absolute', top: '5px', right: '5px'}}>Cancel</button>
        </div>
    )
}

export default EditEmailRow