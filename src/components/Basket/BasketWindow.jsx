import { GrClose } from "react-icons/gr"
import  "./basket.scss"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import CartList from "./CartList"
import { useCart } from "../../hooks/useCart"

function BasketWindow() {
    const { show,  cartItems, total, count } = useSelector(state => state.cart)  
    const {closeCart, closeCartOnClickOut} = useCart()

    return ( 
        <div className={`modal basket-modal ${show ? "modal-isActive" : ''}`} >
            <div className="modal__overlay" onClick={closeCartOnClickOut} data-lp>
                <div className="modal__content basket-window">
                    <div className="basket-window__top top-basket-window">
                        <h2 className="top-basket-window__title">Кошик</h2>
                        <div className="top-basket-window__close" onClick={closeCart}><GrClose /></div>
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
                                    <NavLink to="/checkout" className="footer-basket-window__btn btn" onClick={closeCart}>Офорити замовлення</NavLink>
                                </div>
                                <div className="footer-basket-window__contbox">
                                    <button className="footer-basket-window__continue" onClick={closeCart}>Продовжити покупки</button>
                                </div>
                            </div>
                        </div>
                    </div> : <NoItems closeCart={closeCart}/>}
                </div>
            </div>
        </div>
    )
}


function NoItems ({closeCart}) {
    return (
        <div className="basket-window-noItems">
            <p className="basket-window-noItems__text">Кошик порожній</p>
            <button className="basket-window-noItems__continue btn" onClick={closeCart}>Продовжити покупки</button>
        </div>
    )
}

export default BasketWindow;