import { useState } from 'react'
import basket_icon from '../../images/basket.svg'
import { scrollLock } from '../../tools/subFunctions'
import { useDispatch, useSelector } from "react-redux";
import { showCart } from '../../state/reducers/cartReducer';


function Basket() {
    const { count, cartItems } = useSelector(state => state.cart)  
    const dispatch = useDispatch()
    
    const openModal = () =>{
        dispatch(showCart(true))
        scrollLock()
    }

    return ( 
        <>
            <div className='menu__basket basket' onClick={openModal}>
                <button className="basket__button">
                    <img src={basket_icon} alt="" />
                </button>
                {count ? 
                <div className='basket__value'>
                    <span>{count}</span>
                </div> : ''}
            </div>
        </>

     );
}

export default Basket;