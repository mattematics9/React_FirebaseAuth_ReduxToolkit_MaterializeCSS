import React, { useState, useEffect } from 'react'

const EditPhoneNumberRow = ({closeAllEdits}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        var scrollEl = document.getElementById("edit-phone-number-row").offsetTop;
        window.scrollTo({ top: scrollEl+150, behavior: 'smooth'});
    },[])

    return (
        <div id='edit-phone-number-row' className='grey lighten-3' style={{position: 'relative', padding: '70px', border: '1px solid grey'}}>
            <div className="input-field">
                <i className="material-icons prefix">phone</i>
                <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" id='edit-phone-number-input' name='edit-phone-number-input' value={phoneNumber}/>
                <label htmlFor='edit-phone-number-input'>New Phone Number</label>
            </div>
            <p>For security reasons, you must enter your password in order to make this change.</p>
            <div className="input-field">
                <i className="material-icons prefix">security</i>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="enter-password-to-edit-phone-number" name="enter-password-to-edit-phone-number" value={password}/>
                <label htmlFor="enter-password-to-edit-phone-number">Enter Password</label>
            </div>
            <button className='btn-large'>SUBMIT CHANGE</button>
            <button onClick={closeAllEdits} className="btn-small grey lighten-3 black-text" style={{marginLeft: '20px',  position: 'absolute', top: '5px', right: '5px'}}>Cancel</button>
        </div>
    )
}

export default EditPhoneNumberRow