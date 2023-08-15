const SHOW_CART = 'SHOW_CART'
const SET_CART_DELETE_MODE = 'SET_CART_DELETE_MODE' 
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const SET_CART_ITEM_COUNT = 'SET_CART_ITEM_COUNT'
const SET_CART_ITEM_COUNT_ON_ZERO = 'SET_CART_ITEM_COUNT_ON_ZERO'
const INCREASE_CART_ITEM_COUNT = 'INCREASE_CART_ITEM_COUNT'
const DECREASE_CART_ITEM_COUNT = 'DECREASE_CART_ITEM_COUNT'
const SET_CART_ITEM_DROP_COUNT = 'SET_CART_ITEM_DROP_COUNT'
const SET_INVALID_DROP = 'SET_INVALID_DROP'
const TOGGLE_INVALID_DROP = 'TOGGLE_INVALID_DROP'
const RESET_CART = 'RESET_CART'

let initialState = {
    cartItems: [],
    show: false,
    deleteMode: false,
    total: 0,
    dropTotal: 0,
    count: 0,
    dropInvalid: true,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CART:
            return{
                ...state,
                show: action.state
            }
        case SET_CART_DELETE_MODE:
            return{
                ...state,
                deleteMode: action.state
            }
        case RESET_CART:
            return{
                ...state,
                cartItems: [],
                total: 0,
                dropTotal: 0,
                count: 0,
                dropInvalid: true
            }
        case ADD_TO_CART:
            let cartItem = {
                title: action.cartItem.title,
                id: action.cartItem.id, 
                imgUrl: action.cartItem.imgUrl,
                price: action.cartItem.price,
                dropPrice: 0,
                count: 1,
                totalPrice: action.cartItem.price
              }

            let currentItems
            if (state.cartItems.find(cart => cart.id === cartItem.id)) {
                const filterItems = state.cartItems.map((item) => {
                    if (item.id === cartItem.id){
                        item.count += 1
                        item.totalPrice = item.price * item.count 
                        return item
                    }
                    return item
                  })
                  currentItems = filterItems

            } else {
                currentItems = state.cartItems
                currentItems.unshift(cartItem)
            }
            function knowDrop() {
                for (let i = 0; i <= currentItems.length; i += 1) {
                    if (parseInt(currentItems[i]?.dropPrice) < 675) {
                      return true;
                    }
                  }
                  return false;
            }
            return{
                ...state,
                dropInvalid:  knowDrop(),
                cartItems: currentItems,
                total: currentItems.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.totalPrice)}, 0),
                dropTotal: currentItems.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice))}, 0),
                count: currentItems.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.count)}, 0)
            }
        case DELETE_CART_ITEM:
            const newCartArray = state.cartItems.filter(item => item.id !== action.id)

            return{
                ...state,
                cartItems: newCartArray,
                total: newCartArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.totalPrice)}, 0),
                dropTotal: newCartArray.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice))}, 0),
                count: newCartArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.count)}, 0)
            }
        case SET_CART_ITEM_COUNT:
            let value
            if (action.value < 1) {
                value = ''
            } else if (action.value > 100000) {
                value = 100000
            } else {
                value = action.value
            }
            const updateArray = state.cartItems.map((item) => {
                if (item.id === action.id){
                    item.count = value
                    item.totalPrice = item.price * (item.count < 1 ? 1 : item.count) 
                    return item
                }
                return item
            })
            return {
                ...state,
                total: updateArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.totalPrice)}, 0),
                dropTotal: updateArray.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice) * parseInt(curr.count ? curr.count : 1 ))}, 0),
                count: updateArray.reduce((prev, curr) => {
                    let s = curr.count
                    if (s < 1){
                        s = 1
                    }
                    return parseInt(prev) + parseInt(s)
                }, 0)
            }
        case DECREASE_CART_ITEM_COUNT:
            const decreaseArray = state.cartItems.map((item) => {
                if (item.id === action.id){
                    item.count = parseInt(item.count) - 1  
                    item.totalPrice = item.price * item.count
                    return item
                }
                return item
            })
            return {
                ...state,
                cartItems: decreaseArray,
                total: decreaseArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.totalPrice)}, 0),
                dropTotal: decreaseArray.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice) * parseInt(curr.count))}, 0),
                count: decreaseArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.count)}, 0)
            }
        case INCREASE_CART_ITEM_COUNT:
            const increaseArray = state.cartItems.map((item) => {
                if (item.id === action.id){
                    item.count =  parseInt(item.count) + 1 
                    item.totalPrice = item.price * item.count
                    return item
                }
                return item
            })
            return {
                ...state,
                cartItems: increaseArray,
                total: increaseArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.totalPrice)}, 0),
                dropTotal: increaseArray.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice) * parseInt(curr.count))}, 0),
                count: increaseArray.reduce((prev, curr) => { return parseInt(prev) + parseInt(curr.count)}, 0)
            }
        case SET_CART_ITEM_DROP_COUNT:
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    if (item.id === action.id){
                        item.dropPrice = action.value ? action.value : 0
                        return item
                    }
                    return item
                })
            }
        case SET_INVALID_DROP:
            const dropArray = state.cartItems.map((item) => {
                if (item.id === action.id){
                    item.dropPrice = action.value ? action.value : 0
                    return item
                }
                return item
            })
            function knowVal() {
                for (let i = 0; i <= dropArray.length; i += 1) {
                    if (dropArray[i]?.dropPrice < 675) {
                      return true;
                    }
                  }
                  return false;
            }
            return {
                ...state,
                dropInvalid:  knowVal(),
                dropTotal: dropArray.reduce((prev, curr) => { return parseInt(prev) + (parseInt(curr.totalPrice) + parseInt(curr.dropPrice) * parseInt(curr.count))}, 0),

            }
        case TOGGLE_INVALID_DROP:
            return {
                ...state,
                dropInvalid: action.state
            }

        default: return state
    }
}

export const showCart = (state) => {
    return {type: SHOW_CART, state}
}
export const setCartDeleteMode = (state) => {
    return {type: SET_CART_DELETE_MODE, state}
}
export const addToCart = (cartItem) => {
    return {type: ADD_TO_CART, cartItem}
}
export const deleteCartItem = (id) => {
    return {type: DELETE_CART_ITEM, id}
}
export const setCartItemCount = (value, id) => {
    return {type: SET_CART_ITEM_COUNT, value, id}
}
export const setCartItemCountOnZero = (value, id) => {
    return {type: SET_CART_ITEM_COUNT_ON_ZERO, value, id}
}
export const decreaseCartItem = (id) => {
    return {type: DECREASE_CART_ITEM_COUNT, id}
}
export const increaseCartItem = (id) => {
    return {type: INCREASE_CART_ITEM_COUNT, id}
}
export const setCartItemDropCount = (value, id) => {
    return {type: SET_CART_ITEM_DROP_COUNT, value, id}
}
export const setInvalidDrop = (value, id) => {
    return {type: SET_INVALID_DROP, value, id}
}
export const toggleInvalidDrop = (state) => {
    return {type: TOGGLE_INVALID_DROP, state}
}
export const resetCart = () => {
    return {type: RESET_CART}
}


export default cartReducer;