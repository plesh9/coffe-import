import { NavLink } from "react-router-dom";

function Thanks() {
    return ( 
        <div className="thanks">
            <div className="thanks__container">
                <h1 className="thanks__title">Дякуємо за замовлення!</h1>
                <p className="thanks__subtitle">Наш менеджер скоро з вами зв'яжеться</p>
                <NavLink to='/' className='btn'>На головну</NavLink>
            </div>
        </div>
     );
}

export default Thanks;