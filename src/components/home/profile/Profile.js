import React from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../../redux/slices/userSlice'
import Picture from './picture/Picture'

const Profile = () => {

    const user = useSelector(getUserFromStore);

    return (
        <div className='col l2 m4 s12'>
            <Picture/>
            {user && user.email? <p className='center'>{user.email}</p>: null}
            {user && user.displayName? 
                <p className='center'>{user.displayName}</p>:
                null
            }
        </div>
    )
}

export default Profile