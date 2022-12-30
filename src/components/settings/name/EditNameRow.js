import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { userProfileUpdated } from '../../../redux/slices/userSlice'
import { auth } from '../../../config/firebaseConfig'
import { updateProfile } from 'firebase/auth'

const EditNameRow = ({closeAllEdits}) => {

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        var scrollEl = document.getElementById("edit-name-row").offsetTop;
        window.scrollTo({ top: scrollEl-110, behavior: 'smooth'});
    },[])

    const handleSubmit = async () => {
        try{
            await updateProfile(auth.currentUser, {displayName: name});
            dispatch(userProfileUpdated({displayName: name}));
            closeAllEdits();
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <div id='edit-name-row' className='row grey lighten-3' style={{position: 'relative', padding: '70px', border: '1px solid grey'}}>
            <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input onChange={(e) => setName(e.target.value)} type="text" id='edit-name-input' name='edit-name-input' value={name}/>
                <label htmlFor='edit-name-input'>New Name</label>
            </div>
            <div className='center'>
                <button onClick={handleSubmit} style={{marginTop: '30px'}} className='btn-large'>SUBMIT CHANGE</button>
                <p className='red-text'>{error}</p>
            </div>
            <button onClick={closeAllEdits} className="btn-small grey lighten-3 black-text" style={{marginLeft: '20px', position: 'absolute', top: '5px', right: '5px'}}>Cancel</button>

        </div>
    )
}

export default EditNameRow