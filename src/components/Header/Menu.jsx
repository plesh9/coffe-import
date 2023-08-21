import Basket from "../Basket/Basket";
import search from "../../images/search.svg";
import ProfileIcon from "../Icons/ProfileIcon";
import Logo from "../Logo";
import Avatar from "../Avatar";
import AllcategoryBtn from "../Btns/AllcategoryBtn";
import { scrollLock } from '../../tools/subFunctions';
import { useDispatch, useSelector } from "react-redux";
import { setNavbarActive } from "../../state/reducers/navbarReducer";
import { NavLink } from "react-router-dom";

function Menu() {
  const { navbarActive } = useSelector(state => state.navbar)
  const {user, isAuth} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleNavbar = () => {
    dispatch(setNavbarActive(true))
    scrollLock()
  };

  return (
    <div className="header__menu menu">
      <nav className="menu__body">
        <button 
          type="button" 
          className={`menu__icon icon-menu menu-open ${navbarActive ? "icon-menu__open" : ""}`} 
          onClick={handleNavbar}
        >
          <span></span>
        </button>
        <Logo className="header__logo" />
        <AllcategoryBtn className='menu__categories'>Каталог</AllcategoryBtn>
        <div className="menu__search search">
          <button className="search__icon">
            <img src={search} alt="" />
          </button>
          <input type="text" className="search__input" placeholder="Пошук" />
          <button className="search__button">Знайти</button>
        </div>
        <div className="menu__right">
          <Basket />
          {isAuth ? 
            <NavLink to='/cabinet' className="menu__profile">
              <Avatar />
            </NavLink> : 
            <NavLink to='/login' className="menu__profile"><ProfileIcon /></NavLink>
          }
        </div>
      </nav>
    </div>
  );
}

export default Menu;
