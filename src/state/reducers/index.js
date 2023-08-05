import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import navbarReducer from "./navbarReducer";
import newOrderReducer from "./newOrderReducer";
import ordersReducer from "./ordersReducer";
import shopReducer from "./shopReducer";

const reducers = combineReducers({
    shop: shopReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    orders: ordersReducer,
    navbar: navbarReducer
})

export default reducers;