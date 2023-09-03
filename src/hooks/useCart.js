import { useDispatch } from "react-redux";
import { addToCart, showCart } from "../state/reducers/cartReducer";
import { scrollLock, scrollUnlock } from "../tools/subFunctions";

export const useCart = () => {
  const dispatch = useDispatch();

  const closeCartOnClickOut = (e) => {
    if (!e.target.closest(".modal__content")) {
      closeCart();
    }
  };

  const closeCart = () => {
    dispatch(showCart(false));
    scrollUnlock();
  };

  const handleAddToCart = (currentItem) => {
    dispatch(addToCart(currentItem));
    dispatch(showCart(true));
    scrollLock();
  };

  return { closeCart, closeCartOnClickOut, handleAddToCart };
};
