import React from 'react'
import './NavBar.scss';
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <div className='app__navbar'>
      <div className="logo_section">
        <img src ={logo} alt="Baghel Khand" />
        <p>Baghel Khand</p>
      </div>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Translator</li>
            <li>Visiting Places</li>
        </ul>
    </div>
  )
}

export default NavBar
