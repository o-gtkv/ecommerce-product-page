import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.products))
})

export default store