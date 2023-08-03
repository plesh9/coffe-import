import { NavLink } from "react-router-dom";
import logo from '../images/logo.png'

function Logo({ onClick, className }) {
  return (
    <NavLink to="/" className={`menu__logo ${className ? className : ''}`} onClick={onClick && onClick}>
      <img className="logo__img" src={logo} alt="" />
      <span className="logo__text">Coffe import</span>
    </NavLink>
  );
}

export default Logo;
