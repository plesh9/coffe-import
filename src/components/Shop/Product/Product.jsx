import { Route, Routes, } from "react-router-dom";
import { useCurrentProduct } from "../../../hooks/useCurrentProduct";
import NotFound from "../../NotFound";
import ProductAll from "./Navigation/ProductAll/ProductAll";
import ProductCharacter from "./Navigation/ProductCharacter";
import ProductComments from "./Navigation/ProductComments/ProductComments";
import ProductDelivery from "./Navigation/ProductDelivery";
import "./product.scss"
import ProductNav from "./ProductNav";


function Product() {
  const {currentProduct, productPath} = useCurrentProduct()

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
