import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getOrders, setLoading } from "../../../state/reducers/ordersReducer";
import { scrollLock, scrollUnlock } from "../../../tools/subFunctions";
import Loader from "../../Loader"

function Orders() {
    const { orders } = useSelector(state => state.orders)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        scrollLock()
        setIsLoading(true)

        dispatch(getOrders()).then(() => {
            scrollUnlock()
            setIsLoading(false)
        })
    }, [])

    console.log(orders)

    const getDate = (string)  => {
        const parts = string.split(', ');
        const datePart = parts[0];
        const timePart = parts[1];

        return (
            <>
                <li>{`Дата: ${datePart}`}</li>
                <li>{`Час: ${timePart}`}</li>
            </>
        )
    }
    
    if (isLoading){
        return <Loader />
    }

    if (!orders?.length) {
        return <div className="history-orders__empty">У вас немає жодних замовлень.</div>
    }

  return (
    <div className="history-orders">
      <h1 className="cabinet__title title title-secondary">Історія замовлень</h1>
       <div>
        {orders?.map((order, i) => (
             <div key={i} className="history-orders__wrapper">
                <div>
                    <h2 className="history-orders__header">Замовлення №{order.orderCount || ''}</h2>
                    <h2 className="history-orders__title">Отримано:</h2>
                    <ul className="history-orders__list">
                        {getDate(order.date)}
                    </ul>
                    <h2 className="history-orders__title">Контакти:</h2>
                    <ul className="history-orders__list">
                        <li>Ім'я: {order.firstname}</li>
                        <li>Прізвище: {order.lastname}</li>
                        <li>Телефон: {order.phone}</li>
                        <li>Електронна пошта: {order.email}</li>
                    </ul>
                    <h2 className="history-orders__title">Дані для відправки:</h2>
                    <ul className="history-orders__list">
                        <li>Місто: {order.country}</li>
                        <li>Спосіб доставки: {order.delivery}</li>
                        {order.addres.street 
                        ?  <li>Адреса:  Вулиця: {order.addres.street}, Будинок: {order.addres.home}, Квартира: {order.addres.apartment}</li>
                        :  <li>Адреса: {order.addres}</li>
                        }
                        <li>Спосіб оплати: {order.payment}</li>
                    </ul>
                    <div className="history-orders__footer">
                        <p>Номер декларації: -</p>
                    </div>
                </div>
                <div>
                    <h2 className="history-orders__header">Кошик</h2>
                    <h2 className="history-orders__title">Кошик:</h2>
                    <div>
                        {order.products.map((el, i) => {
                            return (
                            <ul className="history-orders__products history-orders__list" key={i}>
                                <li className="history-orders__box">
                                    <NavLink to={`/product/${el.id}`}>
                                        <img src={el.imgUrl} />
                                    </NavLink>
                                    <NavLink to={`/product/${el.id}`}>{el.title}</NavLink>
                                </li>
                                <li>Ціна за одиницю: {el.price}грн</li>
                                <li>Кількість: {el.count}шт</li>
                                {el.dropPrice ? <li>Ціна з націнкою: {el.dropPrice}грн за одиницю</li> : ''}
                                <li>Всього за товар: {el.dropPrice ? +el.dropPrice * +el.count : el.totalPrice}грн</li>
                            </ul>
                            )
                        })}
                    </div>
                    <div className="history-orders__footer">
                        <p>Загальна ціна: {order.total}грн</p>
                        {order.dropTotal ? <p>Загальна ціна з націнкою: {order.dropTotal}грн</p> : ''}
                    </div>
                </div>
             </div>
         ))}
       </div>
    </div>
  );
}

export default Orders;
