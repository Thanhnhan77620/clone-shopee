import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/slices/authSlice"
import cartReducer from "~/slices/cartSlice"

const rootReducer = {
    auth: authReducer,
    cart: cartReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;