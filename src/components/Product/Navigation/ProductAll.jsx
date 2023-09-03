import Rating from "../../Rating";
import { BiWallet } from "react-icons/bi"
import { BiCheckShield } from "react-icons/bi"
import CourierIcon from "../../Icons/CourierIcon";
import ScCourierIcon from "../../Icons/ScCourierIcon";
import { useParams } from "react-router-dom";
import ProductCharacter from "./ProductCharacter";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/useCart";
import useMediaQuery from "../../../tools/useMediaQuery";

function ProductAll() {
    const m_tablet = useMediaQuery("(max-width: 991.98px)");
    const { productId } = useParams();
    const { products } = useSelector(state => state.shop);
    const currentProduct = products.find(product => product.id === productId);
    const { handleAddToCart } = useCart()

    return ( 
        <div className="product__all">
        <div className="product__content">

          <div className="product__img">
            <img src={currentProduct.imgUrl} alt={currentProduct.title} />
          </div>
          <div className="product__info">
            <h1 className="product__title title title-secondary">{currentProduct.title}</h1>
            <div className="product__rating rating-product">
              <div className="rating-product__block">
                <Rating edit={false} className="rating-product__stars" />
                <a href="#" className="rating-product__response">Залиши відгук</a>
              </div>
              <p className="rating-product__code">Код виробника: <span>{currentProduct.vendorCode}</span></p>
            </div>
            <div className="product__buy product__wrap">
              <div className="product__sell sell-product">
                <div className="sell-product__info">Замовлення зроблене до 11-ї  години відправимо того ж дня!</div>
                <div className="sell-product__status">Готовий до відправки</div>
              </div>
              <ul className="product__prices">
                <li className="product__price product__price-old">{Math.ceil(+currentProduct.price - +currentProduct.price / 100 * 20)} ₴</li>
                <li className="product__price product__price-current">{currentProduct.price} ₴</li>
              </ul>
              <button className="product__btn btn" onClick={() => handleAddToCart(currentProduct)}>Купити</button>
            </div>
            <div className="product__wrap delivery-product">
              <div className="delivery-product__title">
                <span>Доставка</span>
                <a className="delivery-product__details" href="#">Подробиці про доставку</a>
              </div>
              <ul className="delivery-product__methods">
                <li className="delivery-product__method">
                  <i><CourierIcon /></i>
                  <p>Самовивіз із Нової Пошти</p>
                  <span>по тарифам перевізника</span>
                </li>
                <li className="delivery-product__method">
                  <i><ScCourierIcon /></i>
                  <p>Кур’єром на вашу адресу</p>
                  <span>по тарифам перевізника</span>
                </li>
              </ul>
            </div>
            <div className="product__wrap details-product">
              <ul className="details-product__list">
                <li className="details-product__item">
                   <i><BiWallet /></i>
                   <p><span className="details-product__title">Оплата.</span> Оплата під час отримання товару, Оплата карткою у відділенні, Приватбанк, Google Pay, Apple Pay,  Visa, Mastercard</p>
                </li>
                <li className="details-product__item">
                  <i><BiCheckShield /></i>
                  <p><span className="details-product__title">Гарантія.</span> Законом про захист прав споживачів не передбачено повернення цього товару належної якості. </p>
                </li>
             </ul>
            </div>
          </div>
        </div>
        <div className="product__more">
          <div className="product__block">
            <h2 className="product__subtitle">Описання товару</h2>
            <div className="product__description">{currentProduct.description}</div>
          </div>
          {currentProduct?.params?.length && <ProductCharacter currentProduct={currentProduct} />}
        </div>
      </div>
     );
}

export default ProductAll;