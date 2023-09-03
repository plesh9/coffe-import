import { FiMoreVertical } from "react-icons/fi"
import { RiDeleteBin7Line } from "react-icons/ri"
import { useRef } from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";


function CartItem({ cartItem, handleFormCount, onBlur, onDelete, onDecrease, 
    onIncrease, drop, handleDropFormCount, isSeller, onDropFormCountBlur,}) {

  const [dropInvalid, setDropInvalid] = useState(true);
  const [deleteMode, setCartDeleteMode] = useState(false);
  const dropInp = useRef(null);
  const { closeCart } = useCart()

  useEffect(() => {
    if (+dropInp?.current?.value < +cartItem.price) {
      setDropInvalid(true);
    } else {
      setDropInvalid(false);
    }
  }, []);

  useEffect(() => {
    if (deleteMode) {
      document.addEventListener("click", closeDeleteMode);
    }
  });

  function closeDeleteMode(e) {
    if (!e.target.closest(".cart-item__more")) {
      setCartDeleteMode(false);
    }
  }

  function openDeleteMode(e) {
    setCartDeleteMode(true);
  }

  function onDropBlur(e) {
    onDropFormCountBlur(e, cartItem);

    if (+e.target.value < +cartItem.price) {
      setDropInvalid(true);
    } else {
      setDropInvalid(false);
    }
  }

  return (
    <li className="cart-item">
      <NavLink to={`/product/${cartItem.id}`} onClick={closeCart} className="cart-item__img cart-item__img-ibg">
        <img src={cartItem.imgUrl} />
      </NavLink>
      <NavLink to={`/product/${cartItem.id}`} className="cart-item__title" onClick={closeCart}>{cartItem.title}</NavLink>
      <BasketQuantityForm
        cartItem={cartItem}
        onBlur={onBlur}
        handleFormCount={handleFormCount}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />
      <p className="cart-item__price">{cartItem.totalPrice} грн</p>
      <div className="cart-item__more" onClick={(e) => openDeleteMode(e, cartItem)}>
        <FiMoreVertical />
        <button
          className={`cart-item__delete ${deleteMode ? "cart-item__delete_show" : ''}`}
          onClick={() => onDelete(cartItem.id)}
          id={`deleteCart-${cartItem.id}`}
        >
          <RiDeleteBin7Line />
          <span>Видалити</span>
        </button>
      </div>
      {drop && isSeller ? 
        <div className="cart-item__drop">
          <input
            ref={dropInp}
            className={`${dropInvalid ? "_invalid" : ""}`}
            onChange={(e) => handleDropFormCount(e, cartItem.id)}
            onBlur={onDropBlur}
            value={cartItem.dropPrice ? cartItem.dropPrice : ""}
            placeholder="Вкажіть ціну"
            type="number"
          />
          {dropInvalid ? 
            <div className="cart-item__drop-error">
              <p>Мінімальна ціна</p>
              <span>{cartItem.price} грн за шт.</span>
            </div> : ''}
        </div>: ''}
    </li>
  );
}

function BasketQuantityForm({cartItem, onBlur, handleFormCount, onDecrease, onIncrease,}) {
  return (
    <div className="cart-item__form">
      <button 
        className={`cart-item__increase ${cartItem.count <= 1 ? "_disabled" : ""} `} 
        onClick={() => onDecrease(cartItem.id)}></button>
      <input
        className="cart-item__quantity"
        value={cartItem.count}
        onFocus={(e) => e.target.select()}
        onBlur={(e) => onBlur(e, cartItem.id)}
        onChange={(e) => handleFormCount(e, cartItem.id)}
        type="number"
      />
      <button
        className={`cart-item__decrease ${cartItem.count >= 100000 ? "_disabled" : ""}`}
        onClick={() => onIncrease(cartItem.id)}></button>
    </div>
  );
}

export default CartItem;
