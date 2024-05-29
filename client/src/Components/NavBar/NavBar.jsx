import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import logo from "../../assets/logo.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaArrowUp } from "react-icons/fa";

const NavBar = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='app__navbar'>
      <div className="logo_section">
        <img src={logo} alt="Baghel Khand" />
        <p>Baghel Khand</p>
      </div>
      <ul>
        {["About", "Translator", "Visiting","Contact Us"].map((item) => (
          <li key={`link-${item}`} onClick={() => scrollToSection(item)}>
            <ScrollLink
              to={item}
              spy={true}
              smooth={true}
              offset={1}
              duration={700}
            >
              {item}
            </ScrollLink>
          </li>
        ))}
      </ul>
      {showScrollButton && (
        <FaArrowUp 
          className="scroll-to-top" 
          onClick={() => {
            scroll.scrollToTop();
            setShowScrollButton(false);
          }}
        >
          Scroll to Top
          </FaArrowUp > 
      )}
    </div>
  );
}

export default NavBar;
