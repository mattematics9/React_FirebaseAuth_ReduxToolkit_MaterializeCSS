import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromStore } from '../../redux/slices/userSlice';
import { EmailAuthProvider, updateEmail, sendEmailVerification, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { userProfileUpdated } from '../../redux/slices/userSlice';
import { auth } from '../../config/firebaseConfig';
import { getErrorText } from '../../errors';
import { getUrl } from '../../config/mainConfig';


const EditEmail = () => {

    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const user = useSelector(getUserFromStore);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //reauthenticate the user
            let credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            //update email
            await updateEmail(auth.currentUser, newEmail);
            //update store
            dispatch(userProfileUpdated({ newEmail }));
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

    const handleChange = (e) => {
        switch (e.target.id){
            case 'edit-email-new-email':
                setNewEmail(e.target.value)
                break;
            case 'edit-email-password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className='container' style={{marginTop: '120px'}}>
            <h4 className="center">EDIT EMAIL</h4>
            <p style={{marginTop: '40px', marginBottom: '30px'}}>Current Email: {user.email}</p>
            <p style={{marginTop: '40px', marginBottom: '30px'}}>If this email is incorrect, you can change it below.</p>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input onChange={handleChange} type="email" id="edit-email-new-email" name="edit-email-new-email" value={newEmail}/>
                    <label htmlFor="name-login">New Email</label>
                </div>
                <div className="input-field">
                    <input onChange={handleChange} type="password" id="edit-email-password" name="edit-email-password" value={password}/>
                    <label htmlFor="password-login">Password</label>
                </div>
                <div className="row input-field center-align" style={{marginTop: '40px'}}>
                    <div className='col l6 m6 s6'>
                        <button className="btn-large">CHANGE EMAIL</button>
                        <p className="center red-text">{errorText}</p>
                    </div>
                    <div className='col l6 m6 s6'>
                        <button onClick={() => {signOut(auth)}} className='btn-large left' id='edit-email-sign-out-btn'>SIGN OUT</button>                  
                    </div>
                </div>     
            </form>  
        </div>

    )
}

export default EditEmail