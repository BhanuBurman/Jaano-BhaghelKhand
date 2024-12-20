import React from 'react'
import { FaGoogle } from "react-icons/fa6";
import { FaMeta } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import Twitter from "../../assets/twitter-logo.png"
// import facebook from "../../assets/fb-logo.png"
// import linkin from "../../assets/linkin-logo.png";
// import google from "../../assets/google-logo.png";


import "./Footer.scss"

const Footer = () => {
  return (
    <div className='app__footer' id='Contact Us'>
      <div className='copyright'>
        Copyright &#169;2024 Jano Baghelkhand
      </div>
      <div className="app__footer__main">
        <div className="footer__heading">
          Contact with Us
        </div>
        <div className="footer__info">
          <p>
            Stay updated on the latest developments and features of our platform. Follow us on social media for regular updates, announcements, and health-related tips. Your feedback is invaluable to us, and we look forward to building a healthier and more connected community together. Feel free to reach out to us for any inquiries or collaboration opportunities. Thank you for being a part of Jano Baghel Khand!
          </p>
        </div>
        <div className="footer__social__media">
          <a href=""><FaGoogle size={23} color='#b41111' /></a>
          <a href=""><FaMeta size={23} color='blue' /></a>
          <a href=""><FaXTwitter size={23} color='white' /></a>
          <a href=""><FaLinkedin size={25} color='#2c2cce' /></a>
        </div>
      </div>

      <div className="nav__list">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
