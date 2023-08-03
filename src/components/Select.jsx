import { useState } from "react";

function Select({ list, placeholder = '', search = false }) {
    const [selectCountry, setSelectCountry] = useState(null)
    return ( 
        <div className="select">
            <button className="select-controler">
                <input className="select-controler__value" placeholder={placeholder} value={selectCountry} />
                <span className="select-controler__icon"></span>
            </button>
            <div className="select-menu">
                <ul className="select-menu__list">
                    {list?.map(item => (
                        <li className="select-menu__item" onClick={e => setSelectCountry(e.target.textContent)}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
     );
}

export default Select;