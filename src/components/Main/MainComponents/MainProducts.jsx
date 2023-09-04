import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import ProductCard from "../../Shop/Products/ProductCard";

function MainProducts() {
  const { products } = useSelector((state) => state.shop);
  const { handleAddToCart } = useCart();
  const slicedProducts = products.slice(0, 8);

  return (
    <div className="main__cards cards-main">
      <div className="cards-main__container">
        <div className="cards-main__title title">Хіти продажів</div>
        <ul className="list-product">
          {slicedProducts.map((item) => (
            <ProductCard
              currentItem={item}
              handleAddToCart={handleAddToCart}
              key={item.id}
            />
          ))}
        </ul>
        <NavLink to='/catalog' className="show-more__btn btn">Переглянути все</NavLink>
      </div>
    </div>
  );
}

export default MainProducts;
