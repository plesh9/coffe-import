import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {MdError} from 'react-icons/md';
import InputMask from "react-input-mask";
import { resetCart } from "../../state/reducers/cartReducer";
import { addNewOrder } from "../../state/reducers/ordersReducer";
import axios from "axios";
import { scrollLock, scrollUnlock } from "../../tools/subFunctions";
import Select from "./Select";
import { novaPoshtaApi } from "../../api/novaPoshtaApi";
import TransparentLoader from "../TransparentLoader ";

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

function CheckoutForm({ cities, setIsLoading }) {
  const { dropInvalid, cartItems, total, dropTotal } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({mode: "onBlur"});

    const [selectedRadio, setSelectedRadio] = useState(deliveryOptions[0].title);
    const [selectedPay, setSelectedPay] = useState(payOptions[0].title);

    const [selectValid, setSelectValid] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    const [warehouses, setWarehouses] = useState(null);
    const [warehousesIsLoading, setWarehousesIsLoading] = useState(false)
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [deliveryValid, setDeliveryValid] = useState(true);

    const [courierData, setCourierData] = useState(null);
    const [street, setStreet] = useState('');
    const [home, setHome] = useState('');
    const [apartment, setapartment] = useState('');


    useEffect(() => {
        console.log('yes');
        setStreet('')
        setHome('')
        setapartment('')
    }, [selectedRadio])

        useEffect(() => {
        if (street && home && apartment) {
            setSelectedDelivery({street, home, apartment})
        }
        if (!street || !home || !apartment) {
            setSelectedDelivery(null)
        }
    }, [street, home, apartment])


    const onChangeRadio = (e, option) => {
        setSelectedRadio(e.target.value)
        setSelectedDelivery(null)
    }

    const onChangeRadioPay = (e, option) => {
        setSelectedPay(e.target.value)
    }

    useEffect(() => {
        setWarehouses(null)
        setSelectedDelivery(null)
        if (selectedOption) {
            setWarehousesIsLoading(true)
            novaPoshtaApi.getWarehouses(selectedOption.Description).then((resp) => {
                console.log(resp.data);
                setWarehouses(resp.data)
                setWarehousesIsLoading(false)
            })
        }
    }, [selectedOption, selectValid])



    const submitOrder = (data) => {
        if (dropInvalid) return
        if (!selectedDelivery) return
        const newOrder = {
            contacts: data,
            country: selectedOption.Description,
            delivery: selectedRadio,
            addres: selectedDelivery.Description || selectedDelivery,
            payment: selectedPay,
            products: cartItems,
            total: total,
            dropTotal: dropTotal
        }
        console.log(newOrder);

        scrollLock()
        setIsLoading(true)
        sendMail(newOrder).then((resp) => {
            scrollUnlock()
            setIsLoading(false)
            
            navigate("/thanks");
            reset()
            dispatch(resetCart())

            dispatch(addNewOrder(data, selectedOption.Description, selectedRadio, selectedPay, cartItems, total, dropTotal))
        })
}

    const sendMail = async (newOrder) => {
        return await axios.post("http://localhost:5000/send_email", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            newOrder: newOrder
        })
        .then(() => console.log('Message Send Succesfuly'))
        .catch(() => console.log('Error Message Send'));
    };


    return ( 
        <form className="checkout__form form-checkout" onSubmit={handleSubmit(submitOrder)}>
            {warehousesIsLoading ? <TransparentLoader /> : ''}
            <h2 className="form-checkout__title title">Контактні дані</h2>
            <div className="form-checkout__fields">
                <div className="field">
                    <label htmlFor='lastname' className={`field__label ${errors?.lastname ? '_invalid' : '' }`}>Прізвище</label>
                    <input {...register('lastname', {
                        required: true, 
                        minLength: {value: 2, message: "Мінімум 2 букви"},
                        })}
                        className={`field__input ${errors?.lastname ? '_invalid' : '' }`} 
                    />
                    {errors?.lastname ? <p className="field__invalid"><MdError />
                    {errors?.lastname?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='firstname' className={`field__label ${errors?.firstname ? '_invalid' : '' }`}>Ім'я</label>
                    <input {...register('firstname', {
                        required: true, 
                        minLength: {value: 2, message: "Мінімум 2 букви"}
                        })}
                        className={`field__input ${errors?.firstname ? '_invalid' : '' }`}
                    />
                    {errors?.firstname ? <p className="field__invalid"><MdError />
                    {errors?.firstname?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='phone' className={`field__label ${errors?.phone ? '_invalid' : '' }`}>Мобільний телефон</label>
                    <InputMask {...register('phone', {
                            required: true,
                            minLength: {value: 19, message: 'Номер телефону вказаний не вірно'} 
                        })} 
                        // onBlur={(e) => onMaslBlur(e)}
                        mask={"+38 (999) 999-99-99"}
                        maskPlaceholder=''
                        className={`field__input ${errors?.phone ? '_invalid' : '' }`} 
                    />
                    {errors?.phone ? <p className="field__invalid"><MdError />{errors?.phone?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='email' className={`field__label ${errors?.email ? '_invalid' : '' }`}>Електронна пошта</label>
                    <input {...register('email', {
                        required: true,
                        minLength: {value: 2, message: "Мінімум 2 букви"}
                        })} 
                        type='email' 
                        className={`field__input ${errors?.email ? '_invalid' : '' }`}
                    />
                    {errors?.email ? <p className="field__invalid"><MdError />
                    {errors?.email?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
            </div>

            <br/>
            <Select 
                errors={errors} 
                register={register}
                cities={cities}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setSelectValid={setSelectValid}
                selectValid={selectValid}
                name="country"
                placeholder='Виберіть своє місто'
            />
            <div className={`form-checkout__info ${!selectedOption ? '_invalid' : ''}`}>
                <h2 className="form-checkout__title title">Доставка</h2>
                <div>
                    {deliveryOptions.map(option => 
                    (<Radio 
                    key={option.id} 
                    onChangeRadio={onChangeRadio} 
                    name="delivery" 
                    option={option} 
                    selectedRadio={selectedRadio} 
                    setStreet={setStreet}
                    setHome={setHome}
                    setapartment={setapartment}
                    street={street}
                    home={home}
                    apartment={apartment}

                    errors={errors} 
                    register={register}
                    cities={warehouses}
                    selectedOption={selectedDelivery}
                    setSelectedOption={setSelectedDelivery}
                    setSelectValid={setDeliveryValid}
                    selectValid={deliveryValid}
                    select={true}
                    general={true}
                    />) )}
                </div>
                <h2 className="form-checkout__title title">Оплата</h2>
                <div>
                    {payOptions.map(option => <Radio key={option.id} onChangeRadio={onChangeRadioPay} name="pay" option={option} selectedRadio={selectedPay} />)}
                </div>
            </div>
            <div className="form-checkout__footer">
                <button type="submit" className={`form-checkout__confirm btn ${!isValid || !selectValid || !selectedDelivery || dropInvalid ? '_disabled' : ''}`}>Підтвердити замовлення</button>
            </div>
        </form>
     );
}
function Radio({option, selectedRadio, onChangeRadio, name, setStreet, setHome ,setapartment, street,home, apartment,
    errors, register, cities, selectedOption, setSelectedOption, selectValid, setSelectValid, select = false, general}) {
    const [courier, setCourier] = useState(false)
    const [filterWarehouse, setFilterWarehouse] = useState(cities)
    const [showSelect, setShowSelect] = useState(select)

    useEffect(() => {
        switch (option.id) {
            case 'delivery-postomat':
                return setFilterWarehouse(cities?.filter(city => city.CategoryOfWarehouse === "Postomat"))
            
            case 'delivery-branch':
                return setFilterWarehouse(cities?.filter(city => city.CategoryOfWarehouse === "Branch" || city.CategoryOfWarehouse === "Store"))

            case 'delivery-courier':
                select = false
                setCourier(true)
                return
        
            default: break;
        }
    }, [cities])

    useEffect(() => {
        switch (option.id) {
            case 'delivery-courier':
                setShowSelect(false)
                setCourier(true)
                return
        
            default: break;
        }
    }, [])

    const [validStreet, setValidSteet] = useState(true)
    const [validHome, setValidHome] = useState(true)
    const [validapartment, setValidapartment] = useState(true)

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeHome = (e) => {
        setHome(e.target.value)
    }
    const onChangeapartment = (e) => {
        setapartment(e.target.value)
    }

    const onBlurStreet = (e) => {
        if(!e.target.value){
            return setValidSteet(false)
        }
        setValidSteet(true)
    }    
    const onBlurHome = (e) => {
        if(!e.target.value){
            return setValidHome(false)
        }
        setValidHome(true)
    }
    const onBlurapartment = (e) => {
        if(!e.target.value){
            return setValidapartment(false)
        }
        setValidapartment(true)
    }    

    useEffect(() => {
        setValidSteet(true)
        setValidHome(true)
        setValidapartment(true)
    }, [selectedRadio])

    return(
        <>
            <div className="custom-radio__wrapper">
                <div className="custom-radio">
                    <input id={option.id} name={name} type="radio" value={option.title} checked={selectedRadio === option.title && true} onChange={(e) => onChangeRadio(e, option)} />
                    <label htmlFor={option.id}>{option.title}</label>
                </div>
                {selectedRadio === option.title ? 
                <div>
                    <p className="custom-radio__descr">{option.descr}</p>
                    {showSelect ? 
                    <Select 
                        errors={errors} 
                        name='delivery'
                        label={false}
                        placeholder='Виберіть відповідне відділення'
                        register={register}
                        cities={filterWarehouse}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        setSelectValid={setSelectValid}
                        selectValid={selectValid} 
                        general={general}
                        min={0}
                        validation={false}
                    /> : ''}
                    {courier ? 
                    <div className="form-checkout__courier">
                        <div className="field">
                            <input 
                                value={street}
                                onChange={onChangeStreet}
                                onBlur={onBlurStreet}
                                placeholder='Вулиця'
                                className={`field__input ${!validStreet ? '_invalid' : '' }`}
                            />
                        </div>
                        <div className="field">
                            <input
                                value={home}
                                onChange={onChangeHome}
                                onBlur={onBlurHome}
                                placeholder='Будинок'
                                className={`field__input ${!validHome ? '_invalid' : '' }`}
                            />
                        </div>
                        <div className="field">
                            <input
                                value={apartment}
                                onChange={onChangeapartment}
                                onBlur={onBlurapartment}
                                placeholder='Квартира'
                                className={`field__input ${!validapartment ? '_invalid' : '' }`}
                            />
                        </div>
                    </div> 
                    : '' }
                </div> : ''}
            </div>
        </>
    )
}

export default CheckoutForm;