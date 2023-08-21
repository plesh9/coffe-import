import { useEffect, useState } from "react";
import Menu from "./Menu";
import "./header.scss";
import { useRef } from "react";


function Header() {
  const headerRef = useRef()
  const [headerActive, setHeaderActive] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100){
      setHeaderActive(true)
    } 
    else if (scrolled <= 0){
      setHeaderActive(false)
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      document.documentElement.classList.remove('header-active')
      window.removeEventListener('scroll', toggleVisible)
    };
  }, [])


  useEffect(() => {
    if (headerActive){
      document.documentElement.classList.add('header-active')
      headerRef.current.setAttribute('data-lp', '')
    } else {
      document.documentElement.classList.remove('header-active')
      headerRef.current.removeAttribute('data-lp')
    }
  }, [headerActive])


  return (
    <header className='header' ref={headerRef}>
      <div className={`header__container`}>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
