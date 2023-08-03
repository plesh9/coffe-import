import React, {useEffect, useState} from 'react';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0){
      setVisible(true)
    } 
    else if (scrolled <= 0){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, [])
  
  return (
    <button className={`scroll-btn ${visible ? 'active' : ''}`} onClick={scrollToTop} data-lp>
     <BsFillArrowUpCircleFill />
    </button>
  );
}
  
export default ScrollButton;