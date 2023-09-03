import { useSelector } from "react-redux";
import { NavLink, Outlet, Route, Routes, useMatch, useParams } from "react-router-dom";
import useMediaQuery from "../../tools/useMediaQuery";
import NotFound from "../NotFound";
import ProductAll from "./Navigation/ProductAll";
import ProductCharacter from "./Navigation/ProductCharacter";
import ProductComments from "./Navigation/ProductComments/ProductComments";
import ProductDelivery from "./Navigation/ProductDelivery";
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
            <ProductNav path={`${productPath}/comments`} text="Відгуки" />
            <ProductNav path={`${productPath}/delivery`} text="Доставка і оплата" />
          </ul>
        </nav>
       <div className="product__wrapper">
       <Routes>
          <Route index element={<ProductAll />} />
          <Route path="characteristics" element={<ProductCharacter title="true" />} />
          <Route path="delivery" element={<ProductDelivery />} />
          <Route path="comments" element={<ProductComments />} />
        </Routes>
       </div>
      </div>
    </div>
  );
}

export default Product;
