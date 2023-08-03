import "./checkout.scss"
import Field from "../Field";
import Select from 'react-select';
import { useState, useEffect } from "react";
import CheckoutCart from "./CheckoutCart";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { resetCart } from "../../state/reducers/cartReducer";
import { useForm } from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import Loader from "../Loader";
import { novaPoshtaApi } from "../../api/novaPoshtaApi";
import { scrollLock, scrollUnlock } from "../../tools/subFunctions";

function Checkout() {
    const { count } = useSelector(state => state.cart)  
    const [isLoading, setIsLoading] = useState(true)

    const [cities, setCities] = useState(null)

    useEffect(() => {
        scrollLock()
        setIsLoading(true)
        novaPoshtaApi.getCities().then((resp) => {
            const cityArray = resp?.data?.map((city) => {
                return {
                    ...city,
                    value: city.Description,
                    label: city.Description
                }
            })
            setCities(cityArray)
            console.log(cityArray)
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
                    <CheckoutForm cities={cities} setIsLoading={setIsLoading} />
                    <CheckoutCart />
                </div>
            </div>
        </div>
     );
}


export default Checkout;