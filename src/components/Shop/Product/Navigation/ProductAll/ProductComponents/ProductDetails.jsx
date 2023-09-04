import { BiCheckShield, BiWallet } from "react-icons/bi";

function ProductDetails() {
  return (
    <div className="product__wrap details-product">
      <ul className="details-product__list">
        <li className="details-product__item">
          <i><BiWallet /></i>
          <p>
            <span className="details-product__title">Оплата.</span> 
            Оплата під час отримання товару, Оплата карткою у відділенні, Приватбанк,
            Google Pay, Apple Pay, Visa, Mastercard
          </p>
        </li>
        <li className="details-product__item">
          <i><BiCheckShield /></i>
          <p>
            <span className="details-product__title">Гарантія.</span> 
            Законом про захист прав споживачів не передбачено повернення цього товару
            належної якості.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default ProductDetails;
