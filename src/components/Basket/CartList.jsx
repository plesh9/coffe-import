import { useDispatch, useSelector } from "react-redux";
import { decreaseCartItem, deleteCartItem, increaseCartItem, setCartItemCount, setCartItemDropCount, setInvalidDrop } from "../../state/reducers/cartReducer"
import CartItem from "./CartItem";

function CartList({ className, drop }) {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)  

    function handleFormCount(e, id) {
        dispatch(setCartItemCount(e.target.value, id))
    }
    function onDelete (id) {
        dispatch(deleteCartItem(id))
    }

    function onBlur(e, id) {
        if (!e.target.value) {
            dispatch(setCartItemCount('1', id))
        }
    }
    function onDecrease(id) {
        dispatch(decreaseCartItem(id))
    }
    function onIncrease(id) {
        dispatch(increaseCartItem(id))
    }
    function handleDropFormCount(e, id) {
        dispatch(setCartItemDropCount(e.target.value, id))
    }
    function onDropFormCountBlur(e, cartItem) {
        dispatch(setInvalidDrop(e.target.value, cartItem.id))
    }

  return (
    <ul className={`cart-list ${className ? className : ''}`}>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          onDelete={onDelete}
          onBlur={onBlur}
          handleFormCount={handleFormCount}
          handleDropFormCount={handleDropFormCount}
          onDropFormCountBlur={onDropFormCountBlur}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          drop={drop}
          key={cartItem.id}
          isAuth={false}
        />
      ))}
    </ul>
  );
}

export default CartList;
