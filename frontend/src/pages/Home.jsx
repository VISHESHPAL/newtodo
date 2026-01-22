import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {

  const {logout} = useAuth();
  return (
    <div>
       <h1>Home Page</h1>
       <button onClick={logout}> logout</button>
    </div>
  )
}

export default Home
