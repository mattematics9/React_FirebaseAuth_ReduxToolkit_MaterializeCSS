import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../redux/slices/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

const MobileNav = () => {

    const user = useSelector(getUserFromStore);

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        let pathParts = pathname.split('/');
        let page = pathParts[1];

        if(page === ''){
            page = 'home';
        }

        const allLinks = ['home', 'about', 'contact', 'settings', 'login']
        const loggedInAndOutLinks = ['home', 'about', 'contact']
        const loggedInLinks = ['settings'];
        const loggedOutLinks = ['login'];

        if(allLinks.includes(page)){
            document.querySelectorAll('.mobile-nav-link').forEach(mobileNavLink => {
                mobileNavLink.className = 'mobile-nav-link';
            })
            if(user && (loggedInLinks.includes(page) || loggedInAndOutLinks.includes(page))){
                document.getElementById(`mobile-${page}-link`).className = 'mobile-nav-link active-mobile-nav-link'; 
            }else if(!user && (loggedOutLinks.includes(page) || loggedInAndOutLinks.includes(page))){
                document.getElementById(`mobile-${page}-link`).className = 'mobile-nav-link active-mobile-nav-link'; 
            }
        }else{
            document.querySelectorAll('.mobile-nav-link').forEach(mobileNavLink => {
                mobileNavLink.className = 'mobile-nav-link';
            })
        }
    },[pathname,user])

    const handleLogOut = () => {
        signOut(auth);
        navigate('/');
    }

    return (
        <div>
            <ul className="sidenav" id="mobile-nav">
                <li className = 'mobile-nav-link' id='mobile-home-link'><Link to='/'>HOME</Link></li>
                <li className = 'mobile-nav-link' id='mobile-about-link'><Link to='/about'>ABOUT</Link></li>
                <li className = 'mobile-nav-link' id='mobile-contact-link'><Link to='/contact'>CONTACT</Link></li>
                {user?
                    <>
                        <li className = 'mobile-nav-link' id='mobile-settings-link'><Link to='/settings'>SETTINGS</Link></li>
                        <li className = 'mobile-nav-link' id='mobile-signout-link'><Link to='#' onClick={handleLogOut}>LOG OUT</Link></li>
                    </>:
                    <li className = 'mobile-nav-link' id='mobile-login-link'><Link to='/login'>LOGIN</Link></li>
                }
            </ul>
        </div>
    )
}

export default MobileNav