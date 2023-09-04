import ProductCharacter from "../ProductCharacter";
import CustomRating from "../../../../Ratings/CustomRating";
import ProductImageMagnify from "./ProductComponents/ProductImageMagnify";
import ProductAllDelivery from "./ProductComponents/ProductAllDelivery";
import { useCurrentProduct } from "../../../../../hooks/useCurrentProduct";
import ProductBuy from "./ProductComponents/ProductBuy";
import ProductDetails from "./ProductComponents/ProductDetails";

function ProductAll() {
    const {currentProduct, productPath} = useCurrentProduct()
    return ( 
        <div className="product__all">
        <div className="product__content">
          <ProductImageMagnify currentProduct={currentProduct} />
          <div className="product__info">
            <h1 className="product__title title title-secondary">{currentProduct.title}</h1>
            <div className="product__rating rating-product">
              <div className="rating-product__block">
                <CustomRating className="rating-product__stars" />
                <a href="#" className="rating-product__response">Залишити відгук</a>
              </div>
              <p className="rating-product__code">Код виробника: <span>{currentProduct.vendorCode}</span></p>
            </div>
            <ProductBuy currentProduct={currentProduct} />
            <ProductAllDelivery productPath={productPath} />
            <ProductDetails />
          </div>
        </div>
        <div className="product__more">
          <div className="product__block">
            <h2 className="product__subtitle">Описання товару</h2>
            <div className="product__description">{currentProduct.description}</div>
          </div>
          <ProductCharacter currentProduct={currentProduct} />
        </div>
      </div>
     );
}

export default ProductAll;