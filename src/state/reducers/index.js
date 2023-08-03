import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import navbarReducer from "./navbarReducer";
import ordersReducer from "./ordersReducer";
import shopReducer from "./shopReducer";

const reducers = combineReducers({
    shop: shopReducer,
    cart: cartReducer,
    orders: ordersReducer,
    navbar: navbarReducer
})

export default reducers;