import "./checkout.scss"
import { useState, useEffect } from "react";
import CheckoutCart from "./CheckoutCart";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Loader from "../Loader";
import { scrollLock, scrollUnlock } from "../../tools/subFunctions";
import { getCities } from "../../state/reducers/newOrderReducer";

function Checkout() {
    const { count } = useSelector(state => state.cart)  
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        scrollLock()
        setIsLoading(true)
        dispatch(getCities()).then(() => {
            scrollUnlock()
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <Loader />
    }

    if (!count) {
        return (
            <div className="no-items">
                <p>Кошик порожній</p>
                <NavLink to='/' className='btn'>На головну</NavLink>
            </div>
        )
    }

    return ( 
        <div className="checkout">
            <div className="checkout__container">
                <div className="checkout__top">
                    <Logo />
                    <h1 className="checkout__title title">Оформлення замовлення</h1>
                </div>
                <div className="checkout__col">
                    <CheckoutForm setIsLoading={setIsLoading}/>
                    <CheckoutCart />
                </div>
            </div>
        </div>
     );
}


export default Checkout;