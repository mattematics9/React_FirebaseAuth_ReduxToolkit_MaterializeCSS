import React from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../userSlice'

const PhoneNumberRow = ({setEditPhoneNumber, closeAllEdits}) => {
    const user = useSelector(getUserFromStore);

    const handleEditPhoneNumber = () => {
        closeAllEdits();
        setEditPhoneNumber(true);
    }

    return (
        <div className='row'>
            <div className='col l1 m1 s1'>
                <i className="material-icons prefix" style={{paddingTop: '15px'}}>phone</i>     
            </div>
            <div className='col l3 m3 s3'>
                <p>Phone Number:</p>
            </div>
            <div className='col l6 m6 s6'>
                <p>{user? user.phoneNumber: ''}</p>
            </div>
            <div className='col l2 m2 s2'>
                <span className="right"><button onClick={handleEditPhoneNumber} className="btn grey lighten-3"><i className="material-icons black-text">edit</i></button></span>            
            </div>
        </div>
    )
}

export default PhoneNumberRow