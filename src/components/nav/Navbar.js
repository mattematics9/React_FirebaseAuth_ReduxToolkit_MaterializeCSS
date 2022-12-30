import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../redux/slices/userSlice'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from './MobileNav'
import Account from './dropdown/Account'
import { appName } from '../../config/mainConfig'



const Navbar = () => {
  const user = useSelector(getUserFromStore);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
      var sidenav = document.querySelectorAll('.sidenav');
      M.Sidenav.init(sidenav, {});

      var elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems, {
          coverTrigger: false,
          alignment: 'left',
          constrainWidth: false
      });
  }, [user])


  useEffect(() => {
      let pathParts = pathname.split('/');
      let page = pathParts[1];

      if(page === ''){
          page = 'home';
      }

      const array = ['home', 'about', 'contact', 'login'];

      if(array.includes(page)){
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.className = 'nav-link';
        })
        document.getElementById(`${page}-link`).className = 'nav-link active-nav-link'; 
      }else{
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.className = 'nav-link';
      })
      }
  },[pathname])

  const dropdownContent = user? <Account/>: null;

  return (
    <>
      <nav className="nav-wrapper" style={{top: '0px'}}>
          <Link to="/" className="brand-logo" style={{marginLeft: "30px"}}>{appName}</Link>
          <Link to="#" className="sidenav-trigger" data-target="mobile-nav">
              <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li className='nav-link-top' id='home-link'><Link to='/' className='btn btn-floating'><i className='material-icons' style={{backgroundColor: 'orange'}}>home</i></Link></li>
            <li className='nav-link-top' id='about-link'><Link to='/about'>ABOUT</Link></li>
            <li className='nav-link-top' id='contact-link'><Link to='/contact'>CONTACT</Link></li>    
            {user? 
              <>
                <li><Link className='btn-floating dropdown-trigger btn' to='#' data-target='dropdown-account'><i className="material-icons" style={{backgroundColor: 'orange'}}>person</i></Link></li>
              </>:
              <li className='nav-link-top' id='login-link'><Link to='/login'>LOGIN</Link></li>
            }                   
          </ul>
      </nav>
      {dropdownContent}
      <MobileNav/>
    </>
  )
}

export default Navbar