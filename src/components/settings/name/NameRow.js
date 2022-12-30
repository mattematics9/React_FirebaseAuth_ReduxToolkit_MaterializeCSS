import React from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../../redux/slices/userSlice'

const NameRow = ({setEditName, closeAllEdits}) => {

    const user = useSelector(getUserFromStore);

    const handleEditName = () => {
        closeAllEdits();
        setEditName(true);
    }

    return (
        <div className='row'>
            <div className='col l1 m1 s1'>
                <i className="material-icons prefix" style={{marginTop: '15px'}}>account_circle</i>       
            </div>
            <div className='col l3 m3 s3'>
                <p>Name:</p>
            </div>
            <div className='col l6 m6 s6'>
                <p>{user? user.displayName: ''}</p>
            </div>
            <div className='col l2 m2 s2'>
                <span className="right"><button onClick={handleEditName} className="btn grey lighten-3"><i className="material-icons black-text">edit</i></button></span>
            </div>
        </div>
    )
}

export default NameRow