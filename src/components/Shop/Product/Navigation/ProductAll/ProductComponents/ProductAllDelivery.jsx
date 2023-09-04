import { NavLink } from "react-router-dom";
import CourierIcon from "../../../../../Icons/CourierIcon";
import ScCourierIcon from "../../../../../Icons/ScCourierIcon";

function ProductAllDelivery({ productPath }) {
  return (
    <div className="product__wrap delivery-product">
      <div className="delivery-product__title">
        <span>Доставка</span>
        <NavLink
          className="delivery-product__details"
          to={`${productPath}/delivery`}
        >
          Подробиці про доставку
        </NavLink>
      </div>
      <ul className="delivery-product__methods">
        <li className="delivery-product__method">
          <i>
            <CourierIcon />
          </i>
          <p>Самовивіз із Нової Пошти</p>
          <span>по тарифам перевізника</span>
        </li>
        <li className="delivery-product__method">
          <i>
            <ScCourierIcon />
          </i>
          <p>Кур’єром на вашу адресу</p>
          <span>по тарифам перевізника</span>
        </li>
      </ul>
    </div>
  );
}

export default ProductAllDelivery;
