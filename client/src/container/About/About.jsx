import React from 'react'
import tigerImage from "../../assets/tiger.jpg";

import "./About.scss";
const About = () => {
  return (
    <div className='app__about' id='About'>
      <div className="about_card">
        <div className="section1">
            <img src= {tigerImage} alt="" />
        </div>
        <div className="section2">
            <h1>About BaghelKhand</h1>
            <p>Baghelkhand is a region and also a mountain range in central India that covers the northeastern regions of Madhya Pradesh and a small area of southeastern Uttar Pradesh. It includes the Madhya Pradesh districts of Rewa, Satna, Shahdol, Sidhi, and Singrauli and Chitrakoot of Uttar Pradesh. Bagelkhand is surrounded by the Indo-Gangetic plains in the north and east, Bundelkhand in the west and the Vindhya range in the south.</p>
        </div>
      </div>
    </div>
  )
}

export default About
