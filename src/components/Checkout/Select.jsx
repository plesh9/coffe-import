import { useEffect, useState } from "react";
import {MdError} from 'react-icons/md';
import { useDispatch } from "react-redux";

function Select({ items, selectedOption, 
    setSelectedOption, selectValid, setSelectValid, name, general=false,min=2, label = true, placeholder, error }) {
    const [filterItems, setFilterItems] = useState(null)
    const [serachInputText, setSerachInputText] = useState('');
    const [selectActive, setSelectActive] = useState(false)
    const minLen = (items?.length >= 1000 ? 2 : min)
    const dispatch = useDispatch()


    const onSelectEnter = (e) => {
        let serachText = e.target.value
        setSerachInputText(serachText)
        
        if (serachText.length >= minLen) {
            setSelectActive(true)
            const startArray = items?.filter(item => item?.Description?.toLowerCase().startsWith(serachText.toLowerCase()))
            const generalArray = items?.filter(item => item?.Description?.toLowerCase().includes(serachText.toLowerCase()))
            setFilterItems(general ? generalArray : startArray)
        } else {
            setSelectActive(false)
            setFilterItems(null)
        }
    }

    const onClickSelect = (e, item) => {
        dispatch(setSelectedOption(item))
        setSerachInputText(item.Description)
        setSelectActive(false)
    }

    const onSelectBlur = (e) => {
        if (!e.target.value){
            dispatch(setSelectedOption(null))
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
        if (serachInputText.length >= minLen && !selectActive) {
            const validOption = items?.find(item => item.Description === serachInputText)
            if (!validOption) {
                dispatch(setSelectValid(false))
                dispatch(setSelectedOption(null))
                return
            }
            dispatch(setSelectValid(true))
            dispatch(setSelectedOption(validOption))
        }
    }, [serachInputText, selectActive])

    useEffect(() => {
        setFilterItems(items)
        dispatch(setSelectValid(true))
        setSerachInputText('')
    }, [items])
    
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
                        {filterItems?.length ? 
                            <ul className="select__list">
                                {filterItems?.map((item, i) => {
                                    return <Item item={item} selectedOption={selectedOption} onClickSelect={onClickSelect} key={i} />
                                })}
                            </ul> 
                            : <p className="select__undefinded">Нічого не знайдено</p> }
                    </div> : ''
                }
            </div>
            {!selectValid ? <p className="field__invalid"><MdError />
            {!selectValid && error}</p> : ''}
        </div>
     );
}

function Item({ item, onClickSelect, selectedOption }) {
    return (
        <li>
            <button className={`select__btn ${item.Description === selectedOption?.Description ? '_selected' : ''}`} onClick={(e) => onClickSelect(e, item)}>
                {item.Description}
            </button>
        </li>
    )
}

export default Select;