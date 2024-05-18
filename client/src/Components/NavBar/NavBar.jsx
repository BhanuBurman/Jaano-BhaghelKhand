import React from 'react'
import './NavBar.scss';
import logo from "../../assets/logo.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const NavBar = () => {
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      // Scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className='app__navbar'>
      <div className="logo_section">
        <img src ={logo} alt="Baghel Khand" />
        <p>Baghel Khand</p>
      </div>
        <ul>
            {
            ["about","translator","visiting"].map((item) =>(
              <li key={`link-${item}`}>
                <ScrollLink
                  // activeClass="active"
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={1}
                  duration={700}
                >
                  <a href="#" onClick={() => scrollToSection(item)}>
                  {item}
                  </a>
                </ScrollLink>
              </li>
              
            ))}
        </ul>
    </div>
  )
}

export default NavBar
