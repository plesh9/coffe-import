import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartItem, deleteCartItem, increaseCartItem, setCartItemCount, setCartItemDropCount, setInvalidDrop } from "../../state/reducers/cartReducer"
import { FiMoreVertical } from "react-icons/fi"
import { RiDeleteBin7Line } from "react-icons/ri"
import { useRef } from "react";

function CartList({ className, drop, isAuth }) {
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
          isAuth={isAuth}
          key={cartItem.id}
        />
      ))}
    </ul>
  );
}

function CartItem ({ cartItem, handleFormCount, onBlur, 
    onDelete,  onDecrease, onIncrease, drop, handleDropFormCount, isAuth, onDropFormCountBlur }) {
    const [dropInvalid, setDropInvalid] = useState(true)
    const [deleteMode, setCartDeleteMode] = useState(false)
    const dropInp = useRef(null)

    useEffect(() => {
        if (dropInp?.current?.value < 675){
            setDropInvalid(true)
        } else {
            setDropInvalid(false)
        }
    }, [])

    useEffect(() => {
        if (deleteMode) {
            document.addEventListener('click', closeDeleteMode)
        }
    })

    function closeDeleteMode(e) {
        if (!e.target.closest('.cart-item__more')){
            setCartDeleteMode(false)
        }
    }

    function openDeleteMode(e) {
        setCartDeleteMode(true)
    }

    function onDropBlur (e) {
        onDropFormCountBlur(e, cartItem)
        
        if (e.target.value < 675){
            setDropInvalid(true)
        } else {
            setDropInvalid(false)
        }
    }

    return (
        <li className="cart-item">
            <div className="cart-item__img cart-item__img-ibg">
                <img src={cartItem.imgUrl} />
            </div>
            <span className="cart-item__title">{cartItem.title}</span>
            <BasketQuantityForm 
            cartItem={cartItem} 
            onBlur={onBlur} 
            handleFormCount={handleFormCount} 
            onDecrease={onDecrease} 
            onIncrease={onIncrease} />
            <p className="cart-item__price">{cartItem.totalPrice} грн</p>
            <div className="cart-item__more" onClick={e => openDeleteMode(e, cartItem)}>
                <FiMoreVertical />
                <button className={`cart-item__delete ${deleteMode ? 'cart-item__delete_show' : ''}`} 
                onClick={() => onDelete(cartItem.id)} id={`deleteCart-${cartItem.id}`}>
                    <RiDeleteBin7Line />
                    <span>Видалити</span>
                </button> 
            </div>
            {drop && isAuth ? 
            <div className="cart-item__drop">
                <input
                ref={dropInp}
                className={`${dropInvalid ? "_invalid" : ''}`}
                onChange={e => handleDropFormCount(e, cartItem.id)} 
                onBlur={onDropBlur}
                value={cartItem.dropPrice ? cartItem.dropPrice : ''} 
                placeholder="Вкажіть ціну" type="number" />
                {dropInvalid ? 
                <div className="cart-item__drop-error">
                    <p>Мінімальна ціна</p>
                    <span>675 грн за шт.</span>
                </div> : ''}
            </div> 
            : ''}
        </li>
    )
}

function BasketQuantityForm({cartItem, onBlur, handleFormCount, onDecrease, onIncrease}){
    return (
        <div className="cart-item__form">
            <button 
            className={`cart-item__increase ${cartItem.count <= 1 ? '_disabled' : ''} `} 
            onClick={() => onDecrease(cartItem.id)}>
            </button>
            <input 
            className="cart-item__quantity"
            value={cartItem.count}
            onFocus={e => e.target.select()} 
            onBlur={(e) => onBlur(e, cartItem.id)} 
            onChange={e => handleFormCount(e, cartItem.id)} 
            type="number"
            />
            <button 
            className={`cart-item__decrease ${cartItem.count >= 100000 ? '_disabled' : ''}`} 
            onClick={() => onIncrease(cartItem.id)} >
            </button>
        </div>
    )
}

export default CartList;
