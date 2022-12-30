import React, {useState, useEffect} from 'react'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { getErrorText } from '../../../errors';

const EditPasswordRow = ( {closeAllEdits }) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        var scrollEl = document.getElementById("edit-password-row").offsetTop;
        window.scrollTo({ top: scrollEl-110, behavior: 'smooth'});
    },[])

    useEffect(() => {
        if(errorText){
            setTimeout(() => {
                setErrorText('');
            }, 10000)
        }
    }, [errorText])

    const handleSubmit = async () => {
        try{
            if(newPassword === newPasswordRepeat){
                let credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
                await reauthenticateWithCredential(auth.currentUser, credential);
                await updatePassword(auth.currentUser, newPassword);
                closeAllEdits();
            }else{
                setErrorText('Passwords do not match')
            }
        }catch(error){
            setErrorText(getErrorText(error.code));
        }
    }

    return (
        <div id='edit-password-row' className='grey lighten-3' style={{position: 'relative', padding: '70px', border: '1px solid grey'}}>
            <div className="input-field">
                <i className="material-icons prefix">password</i>
                <input onChange={(e) => setNewPassword(e.target.value)} type="password" id='edit-newPassword-input' name='edit-newPassword-input' value={newPassword}/>
                <label htmlFor='edit-newPassword-input'>New Password</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix">password</i>
                <input onChange={(e) => setNewPasswordRepeat(e.target.value)} type="password" id='edit-newPasswordRepeat-input' name='edit-newPasswordRepeat-input' value={newPasswordRepeat}/>
                <label htmlFor='edit-newPasswordRepeat-input'>Enter New Password Again</label>
            </div>
            <p>For security reasons, you must enter your current password in order to make this change.</p>
            <div className="input-field">
                <i className="material-icons prefix">security</i>
                <input onChange={(e) => setCurrentPassword(e.target.value)} type="password" id="enter-currentPassword-to-edit-password" name="enter-currentPassword-to-edit-password" value={currentPassword}/>
                <label htmlFor="enter-currentPassword-to-edit-password">Enter Current Password</label>
            </div>
            <div className='center'>
                <button onClick={handleSubmit} style={{marginTop: '30px'}} className='btn-large'>SUBMIT CHANGE</button>
                <p className='red-text'>{errorText}</p>
            </div>
            <button onClick={closeAllEdits} className="btn-small grey lighten-3 black-text" style={{marginLeft: '20px',  position: 'absolute', top: '5px', right: '5px'}}>Cancel</button>
        </div>
    )
}

export default EditPasswordRow