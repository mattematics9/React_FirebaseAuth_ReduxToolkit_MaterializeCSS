import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Footer from './components/Footer'
import Home from './components/home/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Settings from './components/settings/Settings'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromStore, userLoggedInOrSignedUp, userLoggedOut } from './redux/slices/userSlice'
import PasswordReset from './components/auth/PasswordReset'
import EmailVerification from './components/auth/EmailVerification'
import EditEmail from './components/auth/EditEmail'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(getUserFromStore);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user){
        dispatch(userLoggedInOrSignedUp(
          {
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL
          }
        ));
      }else{
        dispatch(userLoggedOut());
      }
    })
  }, [dispatch])

  let routes;

  if (user && user.emailVerified){
    routes = (
      <>
        <Route path='/' exact element={ <Home/> }/>
        <Route path='/about' element={ <About/> }/>
        <Route path='/contact' element={ <Contact/> }/>
        <Route path='/settings' element={ <Settings/> } />
        <Route path="/*" element={ <Navigate to='/'/> } />
      </>
    )

  } else if (user && !user.emailVerified){
    routes = (
      <>
        <Route path='/email-verification' element={ <EmailVerification/> }/>
        <Route path='/edit-email' element={ <EditEmail/> }/>
        <Route path='/*' element={ <Navigate to='/email-verification'/> } />
      </>
    )

  } else if (!user){
    routes = (
      <>
        <Route path='/' exact element={ <Home/> }/>
        <Route path='/password-reset' element={ <PasswordReset/> }/>
        <Route path='/about' element={ <About/> }/>
        <Route path='/contact' element={ <Contact/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/signup' element={ <SignUp/> }/>
        <Route path='/*' element={ <Navigate to="/"/> } />
      </>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            {routes}
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
