import './_navbar.scss'
import { GrClose } from "react-icons/gr";
import AllcategoryBtn from '../Btns/AllcategoryBtn';
import { useEffect } from 'react';
import Logo from '../Logo';
import { scrollUnlock } from '../../tools/subFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarActive } from '../../state/reducers/navbarReducer';


function Navbar() {
  const { navbarActive } = useSelector(state => state.navbar)
  const dispatch = useDispatch()

  useEffect(() => {
    if (navbarActive) {
      document.body.addEventListener("click", closeNavbarOnClickOut);
      return () => document.body.removeEventListener("click", closeNavbarOnClickOut);
    }
  });

  function closeNavbarOnClickOut(e) {
    if (!e.target.closest(".navbar") && !e.target.closest(".menu__icon")) {
      closeNavbar()
    }
  }

  function closeNavbar() {
    dispatch(setNavbarActive(false))
    scrollUnlock()
  };

  return (
    <>
      <div className={`layer ${navbarActive ? 'layer__active' : ''}`}></div>
      <aside className={`navbar ${navbarActive ? 'navbar__active' : ''}`}>
        <div className="navbar__wrapper">
          <div className='navbar__top'>
            <button className='navbar__close' onClick={closeNavbar}><GrClose /></button>
            <Logo onClick={closeNavbar} />
          </div>
          <div className="navbar__body">
            <div className="navbar__enter">
              <a href='#' className="navbar__login">Вхід</a>
              <a href='#' className="navbar__sign">Реєстрація</a>
            </div>
            <AllcategoryBtn className='navbar__btn' onClick={closeNavbar} />
            <ul className="navbar__list">
              <li className="navbar__item"><a className='navbar__link' href="#">Акції</a></li>
              <li className="navbar__item"><a className='navbar__link' href="#">Дропшипінг</a></li>
              <li className="navbar__item"><a className='navbar__link' href="#">Доставка | Оплата</a></li>
              <li className="navbar__item"><a className='navbar__link' href="#">Гарантія | Повернення</a></li>
              <li className="navbar__item"><a className='navbar__link' href="#">Графік роботи | Контакти</a></li>
            </ul>
            <ul className="navbar__list">
              <li className="navbar__item"><a className='navbar__link' href="#">Онлайн-консультант</a></li>
              <li className="navbar__item"><a className='navbar__link' href="#">Бот центр | Чат</a></li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
