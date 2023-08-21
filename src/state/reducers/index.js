import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import navbarReducer from "./navbarReducer";
import newOrderReducer from "./newOrderReducer";
import ordersReducer from "./ordersReducer";
import shopReducer from "./shopReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
    shop: shopReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    orders: ordersReducer,
    auth: authReducer,
    users: usersReducer,
    navbar: navbarReducer
})

export default reducers;