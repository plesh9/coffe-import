import './navbar.scss'
import { GrClose } from "react-icons/gr";
import AllcategoryBtn from '../Btns/AllcategoryBtn';
import { useEffect } from 'react';
import Logo from '../Logo';
import { scrollUnlock } from '../../tools/subFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbarActive } from '../../state/reducers/navbarReducer';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';


function Navbar() {
  const { navbarActive } = useSelector(state => state.navbar)
  const {user, isAuth} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (navbarActive) {
      document.body.addEventListener("click", closeNavbarOnClickOut);
      return () => {
        closeNavbar()
        document.body.removeEventListener("click", closeNavbarOnClickOut)
      };
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
          {!isAuth &&
            <div className="navbar__enter">
              <Link to='/login' className="navbar__login">Вхід</Link>
              <Link to='/login' state={{registration: true}} className="navbar__sign">Реєстрація</Link>
            </div> }
          {isAuth && 
              <Link to='/cabinet' className='navbar__profile'>
                <Avatar />
                <p>{user?.firstname}</p>
              </Link>
            }
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
