import { useSelector } from "react-redux";
import { NavLink, Outlet, Route, Routes, useMatch, useParams } from "react-router-dom";
import useMediaQuery from "../../tools/useMediaQuery";
import NotFound from "../NotFound";
import ProductAll from "./Navigation/ProductAll";
import ProductCharacter from "./Navigation/ProductCharacter";
import "./product.scss"

function Product() {
  const m_tablet = useMediaQuery("(max-width: 991.98px)");

  const { productId } = useParams();
  const { products } = useSelector(state => state.shop);
  const currentProduct = products.find(product => product.id === productId);
  const productPath = '/product/' + productId

  function ProductNav({ path, text }) {
    const match = useMatch(path);
  
    return (
      <li className="nav-product__item">
        <NavLink
          to={path}
          className={`nav-product__btn ${match ? 'nav-product__btn-active' : ''}`}
        >
          {text}
        </NavLink>
      </li>
    );
  }

  if (!currentProduct){
    return <NotFound title="Такого товару немає" />
  }

  return (
    <div className="product">
      <div className="product__container">
        <nav className="product__nav nav-product">
          <ul className="nav-product__list">
          <ProductNav path={`${productPath}`} text="Усе про товар" />
          <ProductNav path={`${productPath}/characteristics`} text="Характеристики" />
            <li className="nav-product__item">
              <button className="nav-product__btn">Відгуки</button>
            </li>
            <li className="nav-product__item">
              <button className="nav-product__btn">Доставка</button>
            </li>
            <li className="nav-product__item">
              <button className="nav-product__btn">Гарантія</button>
            </li>
          </ul>
        </nav>
       <div className="product__wrapper">
         <Outlet />
       </div>
      </div>
    </div>
  );
}

export default Product;
