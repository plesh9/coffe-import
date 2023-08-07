import { novaPoshtaApi } from "../../api/novaPoshtaApi"

const SET_PAY_RADIO = 'SET_PAY_RADIO'
const SET_DELIVERY_RADIO = 'SET_DELIVERY_RADIO'
const SET_SELECTED_DELIVERY = 'SET_SELECTED_DELIVERY' 
const SET_SELECTED_CITY = 'SET_SELECTED_CITY' 
const SET_DELIVERY_VALID = 'SET_DELIVERY_VALID'
const SET_CITY_VALID = 'SET_CITY_VALID'
const SET_WAREHOUSES = 'SET_WAREHOUSES'
const SET_WAREHOUSES_IS_LOADING = 'SET_WAREHOUSES_IS_LOADING'
const SET_CITITES = 'SET_CITITES'
const SET_STREET = 'SET_STREET'
const SET_HOME = 'SET_HOME'
const SET_APARTMENT = 'SET_APARTMENT'

const initialState = {
    selectedPayRadio: "Оплата при отриманні.",
    selectedDeliveryRadio: "Самовивіз із відділення Нової пошти.",
    selectedDelivery: null,
    deliveryValid: true,
    selectedCity: null,
    cityValid: true,
    warehouses: null,
    warehousesIsLoading: false,
    cities: null,
    street: '',
    home: '',
    apartment: '',
}

const newOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAY_RADIO:
            return {
                ...state,
                selectedPayRadio: action.currentRadio
            }
        case SET_DELIVERY_RADIO:
            return {
                ...state,
                selectedDeliveryRadio: action.currentRadio
            }
        case SET_SELECTED_DELIVERY:
            return {
                ...state,
                selectedDelivery: action.currentDelivery
            }
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.currentOption
            }
        case SET_DELIVERY_VALID:
            return {
                ...state,
                deliveryValid: action.state
            }
        case SET_CITY_VALID:
            return {
                ...state,
                cityValid: action.state
            }
        case SET_WAREHOUSES:
            return {
                ...state,
                warehouses: action.warehouses
            }
        case SET_WAREHOUSES_IS_LOADING:
            return {
                ...state,
                warehousesIsLoading: action.state
            }
        case SET_CITITES:
            return {
                ...state,
                cities: action.cities
            }
        case SET_STREET:
            return {
                ...state,
                street: action.text
            }
        case SET_HOME:
            return {
                ...state,
                home: action.text
            }
        case SET_APARTMENT:
            return {
                ...state,
                apartment: action.text
            }
    
        default: return state
    }
}

export const setSelectedPayRadio = (currentRadio) => {
    return {type: SET_PAY_RADIO, currentRadio}
}
export const setSelectedDeliveryRadio = (currentRadio) => {
    return {type: SET_DELIVERY_RADIO, currentRadio}
}
export const setSelectedDelivery = (currentDelivery) => {
    return {type: SET_SELECTED_DELIVERY, currentDelivery}
}
export const setSelectedCity = (currentOption) => {
    return {type: SET_SELECTED_CITY, currentOption}
}
export const setDeliveryValid = (state) => {
    return {type: SET_DELIVERY_VALID, state}
}
export const setCityValid = (state) => {
    return {type: SET_CITY_VALID, state}
}
const setWarehouses = (warehouses) => {
    return {type: SET_WAREHOUSES, warehouses}
}
export const getWarehouses = (selectedCity) =>{
    return dispatch => novaPoshtaApi.getWarehouses(selectedCity.Description).then((resp) => {
        dispatch(setWarehouses(resp.data))
    })
}
export const setWarehousesIsLoading = (state) => {
    return {type: SET_WAREHOUSES_IS_LOADING, state}
}
const setCitites = (cities) => {
    return {type: SET_CITITES, cities}
}
export const getCities = () =>{
    return dispatch => novaPoshtaApi.getCities().then((resp) => {
        dispatch(setCitites(resp.data))
    })
}
export const setStreet = (text) => {
    return {type: SET_STREET, text}
}
export const setHome = (text) => {
    return {type: SET_HOME, text}
}
export const setApartment = (text) => {
    return {type: SET_APARTMENT, text}
}

export default newOrderReducer;