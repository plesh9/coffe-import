import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvalidDrop } from "../../state/reducers/cartReducer";
import CartList from "../Basket/CartList";

function CheckoutCart() {
  const dispatch = useDispatch();
  const { show, cartItems, total, count, dropTotal, dropInvalid } = useSelector((state) => state.cart);
  const isAuth = false
  useEffect(() => {
    if (!isAuth) {
      dispatch(toggleInvalidDrop(false))
    }
  }, [])

  return (
    <div className="cart-checkout">
      <h2 className="cart-checkout__title title">Кошик</h2>
      <CartList className="cart-checkout__list" drop="true" isAuth={isAuth} />
      <div className="cart-checkout__total">
        <p>Разом:</p>
        <span>{total} грн</span>
      </div>
      {isAuth ?
        <div className="cart-checkout__total">
          <p>Разом (для покупця):</p>
          {dropInvalid ? 
          <span className="_invalid">Перевірте свої ціни для покупця</span>
          :<span>{dropTotal} грн</span>}
        </div>
        : '' }
    </div>
  );
}

export default CheckoutCart;
