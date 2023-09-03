import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../state/reducers/cartReducer";
import { addOrder } from "../../state/reducers/ordersReducer";
import axios from "axios";
import { scrollLock, scrollUnlock } from "../../tools/subFunctions";
import Select from "./Select";
import TransparentLoader from "../TransparentLoader ";
import { setSelectedCity, setCityValid, setWarehousesIsLoading, getWarehouses, setSelectedDelivery } from "../../state/reducers/newOrderReducer";
import RadioDelivery from "./RadioDelivery";
import RadioPay from "./RadioPay";
import CheckoutFields from "./CheckoutFields";

const deliveryOptions = [
    {title: 'Самовивіз із відділення Нової пошти.',
    descr: `Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
     автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.`, id: 'delivery-branch'},
    {title: 'Самовивіз із поштомата Нової пошти',
    descr: `Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
    автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.`, id: 'delivery-postomat'},
    {title: `Кур'єрська доставка Новою Поштою`,
    descr: `Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
     автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.`, id: 'delivery-courier'}
]
const payOptions = [
    {title: 'Оплата при отриманні.',
    descr: `Варіанти для оплати: на відділенні готівкою при отриманні, на відділенні карткою,
     попередня оплата додатка Нової пошти.`, id: 'pay-1'},
    {title: 'Оплата за реквізитами Приват Банку',
    descr: `Комісія за платіж 0% від суми. Резерв замовлення на 24 години.
    Зарахування коштів, що очікується: ПриватБанк від 5 до 30 хвилин, 
    інший банк можлива затримка до 3-х робочих днів.`, id: 'pay-2'},
]

function CheckoutForm({ setIsLoading }) {
    const { user } = useSelector((state) => state.auth);
    const { dropInvalid, cartItems, total, dropTotal } = useSelector((state) => state.cart);
    const { selectedDeliveryRadio, selectedDelivery, selectedCity, 
        selectedPayRadio, cityValid, warehousesIsLoading, cities } = useSelector((state) => state.newOrder);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({mode: "onBlur"});

    useEffect(() => {
        if (selectedCity) {
            dispatch(setWarehousesIsLoading(true))
            dispatch(getWarehouses(selectedCity)).then(() => {
                dispatch(setWarehousesIsLoading(false))
            })
        }
    }, [selectedCity])

    const submitOrder = (data) => {
        if (dropInvalid) return
        if (!selectedDelivery) return
        const filterCartItems = cartItems.map((item) => {
            if (dropTotal) {
                return item
            }
            delete item.dropPrice
            return item
        })

        const newOrder = {
            ...data,
            country: selectedCity.Description,
            delivery: selectedDeliveryRadio,
            addres: selectedDelivery.Description || selectedDelivery,
            payment: selectedPayRadio,
            products: filterCartItems,
            total,
            dropTotal
        }

        if (user?.id) {
            newOrder.userId = user.id
        }
        console.log(filterCartItems)

        scrollLock()
        setIsLoading(true)
        dispatch(addOrder(newOrder)).then((resp) => {
            scrollUnlock()
            setIsLoading(false)
            navigate("/thanks");
            reset()
            dispatch(resetCart())
            dispatch(setSelectedCity(null))
        })
    }

    return ( 
        <form className="checkout__form form-checkout" onSubmit={handleSubmit(submitOrder)}>
            {warehousesIsLoading ? <TransparentLoader /> : ''}
            <h2 className="form-checkout__title title">Контактні дані</h2>
            <CheckoutFields register={register} errors={errors} />
            <Select 
                items={cities}
                selectedOption={selectedCity}
                setSelectedOption={setSelectedCity}
                setSelectValid={setCityValid}
                selectValid={cityValid}
                name="country"
                placeholder='Виберіть своє місто'
                error='Місто вказане не вірно'
            />
            <div className={`form-checkout__info ${!selectedCity ? '_invalid' : ''}`}>
                <h2 className="form-checkout__title title">Доставка</h2>
                <div>
                    {deliveryOptions.map(option => <RadioDelivery key={option.id} option={option} />)}
                </div>
                <h2 className="form-checkout__title title">Оплата</h2>
                <div>
                    {payOptions.map(option => <RadioPay key={option.id} option={option} />)}
                </div>
            </div>
            <div className="form-checkout__footer">
                <button 
                    type="submit" 
                    className={`form-checkout__confirm btn 
                    ${!isValid || !cityValid || !selectedDelivery || dropInvalid ? '_disabled' : ''}`}
                >
                    Підтвердити замовлення
                </button>
            </div>
        </form>
     );
}


export default CheckoutForm;