import { ordersApi } from "../../api/ordersApi"

const SET_ORDER = 'SET_ORDER' 
const SET_ALL_ORDERS = 'SET_ALL_ORDER' 

const initialState = {
    orders: [],
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {     
        case SET_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.newOrder]
            }       
        case SET_ALL_ORDERS:
            return {
                ...state,
                orders: action.orders
            } 
        
        default: return state
    }
}

const setOrder = (newOrder) => {
    return {type: SET_ORDER, newOrder}
}
const setOrders = (orders) => {
    return {type: SET_ALL_ORDERS, orders}
}

export const addOrder = (newOrder) =>{
    return dispatch => ordersApi.addOrder(newOrder).then((resp) => {
        dispatch(setOrder(resp?.data?.newOrder))
    }).catch(err => console.log(err))
}

export const getOrders = () =>{
    return dispatch => ordersApi.getOrders().then((resp) => {
        dispatch(setOrders(resp?.data))
    }).catch(err => console.log(err))
}

export default ordersReducer;