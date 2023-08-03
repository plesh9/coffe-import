import { useEffect, useState } from "react";
import {MdError} from 'react-icons/md';


function Select({ cities, selectedOption, 
    setSelectedOption, selectValid, setSelectValid, name, general=false,min=2, label = true, placeholder, validation=true }) {
    const [filterCities, setFilterCities] = useState(null)
    const [serachInputText, setSerachInputText] = useState('');
    const [selectActive, setSelectActive] = useState(false)
    const minLen = (cities?.length >= 1000 ? 2 : min)

    const onSelectEnter = (e) => {
        let serachText = e.target.value
        setSerachInputText(serachText)
        
        if (serachText.length >= minLen) {
            setSelectActive(true)
            const startArray = cities?.filter(city => city?.Description?.toLowerCase().startsWith(serachText.toLowerCase()))
            const generalArray = cities?.filter(city => city?.Description?.toLowerCase().includes(serachText.toLowerCase()))
            setFilterCities(general ? generalArray : startArray)
        } else {
            setSelectActive(false)
            setFilterCities(null)
        }
    }

    const onClickSelect = (e, city) => {
        setSelectedOption(city)
        setSerachInputText(city.Description)
        setSelectActive(false)
    }

    const onSelectBlur = (e) => {
        if (!e.target.value){
            setSelectedOption(null)
        }
    }

    const onSelectFocus = (e) => {
        if (e.target.value.length >= minLen){
            setSelectActive(true)
        }
    } 

    const closeSelect = (e) => {
        const select = e.target.closest('.select')
        if (select){
            if (select.id !== `select-${name}`){
                setSelectActive(false)
            }
        } else setSelectActive(false)
    }

    useEffect(() => {
        document.addEventListener('click', closeSelect)
    }, [])

    useEffect(() => {
        if (!validation) return
        if (serachInputText.length >= minLen && !selectActive) {
            const validOption = cities?.find(city => city.Description === serachInputText)
            if (!validOption) {
                setSelectValid(false)
                setSelectedOption(null)
                return
            }
            setSelectValid(true)
            setSelectedOption(validOption)
        }
    }, [serachInputText, selectActive])

    useEffect(() => {
        setFilterCities(cities)
        setSelectValid(true)
        setSerachInputText('')
    }, [cities])
    
    return ( 
        <div className="field select" id={`select-${name}`}>
            {label ? <label htmlFor={name} className={`field__label ${!selectValid ? '_invalid' : '' }`}>Місто</label> : ''}
            <div className="select__wrapper">
                <input
                    required={false}
                    className={`field__input select__input ${!selectValid ? '_invalid' : '' }`} 
                    placeholder={placeholder}
                    value={serachInputText}
                    onFocus={onSelectFocus}
                    onChange={onSelectEnter}
                    onBlur={onSelectBlur}
                />
                {selectActive ? 
                    <div className="select__menu">
                        {filterCities?.length ? 
                            <ul className="select__list">
                                {filterCities?.map((city, i) => {
                                    return <CityItem city={city} selectedOption={selectedOption} onClickSelect={onClickSelect} key={i} />
                                })}
                            </ul> 
                            : <p className="select__undefinded">Нічого не знайдено</p> }
                    </div> : ''
                }
            </div>
            {!selectValid ? <p className="field__invalid"><MdError />
            {!selectValid && "Місто вказане не вірно"}</p> : ''}
        </div>
     );
}

function CityItem({ city, onClickSelect, selectedOption }) {
    return (
        <li>
            <button className={`select__btn ${city.Description === selectedOption?.Description ? '_selected' : ''}`} onClick={(e) => onClickSelect(e, city)}>
                {city.Description}
            </button>
        </li>
    )
}

export default Select;