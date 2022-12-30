import React from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../../redux/slices/userSlice';

const EmailRow = ({setEditEmail, closeAllEdits}) => {
    const user = useSelector(getUserFromStore);

    const handleEditEmail = () => {
        closeAllEdits();
        setEditEmail(true);
    }

    return (
        <div className='row'>
            <div className='col l1 m1 s1'>
                <i className="material-icons prefix" style={{marginTop: '15px'}}>email</i>
            </div>
            <div className='col l3 m3 s3'>
                <p>Email:</p>
            </div>
            <div className='col l6 m6 s6'>
                <p>{user? user.email: ''}</p>
            </div>
            <div className='col l2 m2 s2'>
                <span className="right"><button onClick={handleEditEmail} className="btn grey lighten-3"><i className="material-icons black-text">edit</i></button></span>
            </div>
        </div>
    )
}

export default EmailRow