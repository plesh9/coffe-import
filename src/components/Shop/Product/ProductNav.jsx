import { NavLink, useMatch } from "react-router-dom";

function ProductNav({ path, text }) {
  const match = useMatch(path);

  return (
    <li className="nav-product__item">
      <NavLink
        to={path}
        className={`nav-product__btn ${match ? "nav-product__btn-active" : ""}`}
      >
        {text}
      </NavLink>
    </li>
  );
}
export default ProductNav;
