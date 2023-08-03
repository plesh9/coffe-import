import { useEffect, useState } from "react";
import Menu from "./Menu";
import "./_header.scss";


function Header() {
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
    return () => window.removeEventListener('scroll', toggleVisible);
  }, [])

  useEffect(() => {
    if (headerActive){
      document.documentElement.classList.add('header-active')
    } else {
      document.documentElement.classList.remove('header-active')
    }
  }, [headerActive])

  return (
    <header className='header' data-lp>
      <div className={`header__container`}>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
