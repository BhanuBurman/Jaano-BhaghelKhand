import React , { useState }  from 'react'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
import img5 from '../../assets/img5.jpg'
import img6 from '../../assets/img6.jpg'
import img7 from '../../assets/img7.jpg'
import img8 from '../../assets/img8.jpg'
import img9 from '../../assets/img9.jpg'
import img10 from '../../assets/img10.jpg'
// import img1 from '../../assets/img1.jpg'
import './Visiting.scss';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import bg from "../../assets/background1.jpg"


const Visting = () => {
  const [currSliderIndex, setCurrSliderIndex] = useState(0);
  const style = {  width: "5rem",
    height: "2rem",
    // margin: "5px",
    cursor:"pointer",
    color: "darkblue"
  }

  // Slider section

  const images = [
    {
      src: img1,
      heading: "Mukundpur",
      text: 'India’s maiden White Tiger Safari is a treat for wildlife lovers. Located in the heart of India, this beautiful place is surrounded by water bodies at one end and by the forest at the other. Mukundpur is named after Raja Mukund Dev, since it was his birthplace. Mukundpur has a strong historical significance.'
    },
    {
      src: img2,
      heading:"Sharda Dham Temple",
      text: 'The hamlet of Maihar which is about 50 kms from Satna proudly houses the Sharadha Devi temple which is located on the Trikut hillock, which is about 600 feet from the ground level. There are 1001 steps that lead to the temple.'
    },
    {
      src: img3,
      heading:"CHACHAI WATERFALLS",
      text: 'Chachai water fall is in Rewa district of Madhya Pradesh in India. It is just 40kms North of Rewa city. It is counted among Rewa tourist attractions. Chachai fall is a very beautiful water fall. It comes from Beehad River. It is the 2nd highest fall of Madhya Pradesh and 23rd in India. The Chachai falls are a classic'
    },
    {
      src: img4,
      heading:"SANJAY DUBRI NATIONAL PARK",
      text: 'The Name of the P.A. firstly notified as “Sanjay National Park” in the year 1981 by G.O.M.P., vide Gazette notification 15-6-80-10 (02 dated 1st Oct. 1981 Government of Madhya Pradesh under section (35[1]) of Wild Life (Protection) Act 1972 and 15-16-2001-X-2 dt. 09.03.2001. The areas of old Sidhi.'
    },
    {
      src: img5,
      heading:"Chitrakoot Dham",
      text: 'Chitrakoot Dham which is about 70 kms from Satna is popular for its scores of temples, holy places and rich scenic locale. People from many parts of India visit this place to attain spiritual enlightenment.'
    },
    {
      src: img6,
      heading:"Purwa Falls",
      text: 'Purwa Falls is located near Rewa, Madhya Pradesh. It is a vertical fall of 70 meters when River Tons comes down through Rewa Plateau. For the geography enthusiasts, it is a beautiful example of nick point by rejuvenation. Purwa Falls has religious significance according to Hindu mythology as it is close to many places associated to the Epic Ramayana.'
    },
    {
      src: img7,
      heading:"Bahuti Falls",
      text: 'Bahuti is the highest waterfall in Madhya Pradesh. It is on the river Sellar as it rushes down the edge of the Valley of Mauganj to join the Bihad River, which is a tributary of Tamsa or Tons River. It is near Chachai Falls. It has a height of 198 metres (650 ft).'
    },
    {
      src: img8,
      heading:"NAGOD FORT",
      text: 'In 1344 the city of Uchchakalpa, present-day Unchahara, was founded by Raja Veerraj Judeo when he seized the fort of Naro from the Teli Rajas. In 1720 the state was renamed Nagod after its new capital. In 1807 Nagod was a tributary to Panna and was included in the sanad granted to that state.'
    },
    {
      src: img9,
      heading:"GOBINDGARH FORT",
      text: 'Gobindgarh Fort the summer capital of Mahraja Rewa, is about 18 km from Rewa in Madhya Pradesh, India. The Rewa, with an area of about 13,000'
    },
    {
      src: img10,
      heading:"BANDHAVGARH FORT",
      text: "There are 32 hills in this part of the park, which has a large natural fort at its center. The fort's cliffs are 2625 feet (800 meters) high, 1000 feet (300 meters) above the surrounding countryside. The fort still belongs to the Maharaja of Rewa and permission is required to visit it."
    }
    
  ];

  const handleNext = () => {
    setCurrSliderIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrSliderIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };


  return (
    <div className='app_visiting'>
      <div className="overlay"></div>
      {/* <div className="background_img">
        <img src={bg} alt="" /> 
      </div> */}
      <div className="visiting_card">
        <div className="prev_btn">
          <FaArrowAltCircleLeft onClick={handlePrevious}  style={style}/>
        </div>
        <div className="image_section">
          <img src={images[currSliderIndex].src} alt="Slider" />
        </div>
        <div className="info_section">
          <div className="info_heading">
            {images[currSliderIndex].heading}
          </div>
          <div className="info_para">
            {images[currSliderIndex].text}
          </div>
          <button className="read_more_btn">Read More</button>
          </div>
        <div className="next_btn">
          <FaArrowAltCircleRight onClick={handleNext} style={style}/>
        </div>
      </div>
    </div>
  )
}

export default Visting;