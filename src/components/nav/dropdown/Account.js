import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getUserFromStore } from '../../../redux/slices/userSlice';
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firebaseConfig'

const Account = () => {

    const user = useSelector(getUserFromStore);
    const navigate = useNavigate();


    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    }

    return (
        <div>
            <ul id='dropdown-account' className='dropdown-content'>
                <li>
                    <span className='black-text'>
                        <p>{user.email}</p>
                    </span>
                </li>
                <li className="divider" tabIndex="-1"></li>
                <li className='nav-link-dropdown' id='settings-link'><Link to="/settings"><i className="material-icons purple-text text-darken-3">settings</i><span className='black-text'>Settings</span></Link></li>
                <li className="divider" tabIndex="-1"></li>
                <li className='nav-link-dropdown'><Link onClick={handleLogout} to='#'><i className="material-icons purple-text text-darken-3">logout</i><span className='black-text'>LOG OUT</span></Link></li>
            </ul>
        </div>
    )
}

export default Account;
