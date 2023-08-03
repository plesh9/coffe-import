import { GrClose } from "react-icons/gr"
import { scrollUnlock } from "../../tools/subFunctions"
import  "./basket.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { decreaseCartItem, deleteCartItem, increaseCartItem, setCartItemCount, showCart } from "../../state/reducers/cartReducer"
import { useRef } from "react"
import { NavLink } from "react-router-dom"
import CartList from "./CartList"

function BasketWindow() {
    const dispatch = useDispatch()
    const { show,  cartItems, total, count } = useSelector(state => state.cart)  

    useEffect(() => {
        // console.log("cart", count);
      }, [count])

    function closeModalOnClickOut(e) {
        if (!e.target.closest(".modal__content")) {
            closeModal()
        }
    }

    function closeModal() {
        dispatch(showCart(false))
        scrollUnlock() 
    }



    return ( 
        <div className={`modal ${show ? "modal-isActive" : ''}`} >
            <div className="modal__overlay" onClick={closeModalOnClickOut} data-lp>
                <div className="modal__content basket-window">
                    <div className="basket-window__top top-basket-window">
                        <h2 className="top-basket-window__title">Кошик</h2>
                        <div className="top-basket-window__close" onClick={closeModal}><GrClose /></div>
                    </div>
                    {cartItems.length ?
                    <div className="body-basket-window__cont">
                        <div className="body-basket-window__wrapper">
                            <div className="basket-window__body body-basket-window">
                                <CartList />
                            </div>
                            <div className="basket-window__footer footer-basket-window">
                                <div className="footer-basket-window__top">
                                    <p className="footer-basket-window__all">Разом:</p>
                                    <span className="footer-basket-window__current">{total ? total : 0} грн</span>
                                </div>
                                <div className="footer-basket-window__box">
                                    <NavLink to="/checkout" className="footer-basket-window__btn btn" onClick={closeModal}>Офорити замовлення</NavLink>
                                </div>
                                <div className="footer-basket-window__contbox">
                                    <button className="footer-basket-window__continue" onClick={closeModal}>Продовжити покупки</button>
                                </div>
                            </div>
                        </div>
                    </div> : <NoItems closeModal={closeModal}/>}
                </div>
            </div>
        </div>
    )
}


function NoItems ({closeModal}) {
    return (
        <div className="basket-window-noItems">
            <p className="basket-window-noItems__text">Кошик порожній</p>
            <button className="basket-window-noItems__continue btn" onClick={closeModal}>Продовжити покупки</button>
        </div>
    )
}

export default BasketWindow;