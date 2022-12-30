import React from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../redux/slices/userSlice'
import HomeLoggedOut from './HomeLoggedOut'
import HomeLoggedIn from './HomeLoggedIn'

const Home = () => {

  const user = useSelector(getUserFromStore); 


  return (
    user? <HomeLoggedIn/>: <HomeLoggedOut/>
  )
}

export default Home