import React from 'react'
import { Link } from 'react-router-dom'
import "./utils/NavBar.css"
const NavBar = () => {
  return (

    <>

      <nav>
  
          <p><Link to="/dashboard">Dashboard</Link></p>
          <p><Link to="/mentees">Mentees</Link></p>
    
      </nav>
    </>
  )
}

export default NavBar