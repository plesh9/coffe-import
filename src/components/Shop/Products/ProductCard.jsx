import { NavLink } from "react-router-dom";
import CustomRating from "../../Ratings/CustomRating";

function ProductCard({ currentItem, handleAddToCart }) {
  return (
      <div className="list-product__item">
        <div className="list-product__actions">
          <div className="list-product__action list-product__action-sale">
            Акція -50%
          </div>
          <div className="list-product__action list-product__action-top">
            Топ продажу
          </div>
        </div>
        <NavLink to={`/product/${currentItem.id}`} className="list-product__img">
          <img src={currentItem?.imgUrl} alt="" />
        </NavLink>
        <NavLink to={`/product/${currentItem.id}`} className="list-product__title">
          <span>{currentItem?.title}</span>
        </NavLink>
        <div className="list-product__info">
          <NavLink to={`/product/${currentItem.id}`}>{currentItem?.description}</NavLink>
        </div>
        <div className="list-product__box">
          <CustomRating className="list-product__rating"/>
          <a href="#" className="list-product__response">
            Написати відгук
          </a>
        </div>
        <div className="list-product__prices">
          <div className="list-product__price list-product__price-old">
            {Math.ceil( +currentItem.price - +currentItem?.price / 100 * 20)} ₴
          </div>
          <div className="list-product__price list-product__price-new">
            {currentItem?.price} ₴
          </div>
        </div>
        <button className="list-product__btn btn" onClick={() => handleAddToCart(currentItem)}>Купити</button>
      </div>
  );
}

export default ProductCard;
