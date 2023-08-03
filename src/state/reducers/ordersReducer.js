const SET_NEW_ORDER = 'SET_NEW_ORDER' 

const initialState = {
    orders: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {     
        case SET_NEW_ORDER:
            const newOrder = {
                contacts: action.contacts,
                country: action.country,
                delivery: action.delivery,
                payment: action.payment,
                products: action.products,
                total: action.total,
                dropTotal: action.dropTotal
            }
            console.log(newOrder);
            return {
                ...state,
                orders: [...state.orders, newOrder]
            }       
    
        default: return state
    }
}

export const addNewOrder = (contacts, country, delivery, payment, products, total, dropTotal) => {
    return {type: SET_NEW_ORDER, contacts, country, delivery, payment, products, total, dropTotal}
}

export default ordersReducer;