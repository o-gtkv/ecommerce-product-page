import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: JSON.parse(localStorage.getItem('cart')) || []
    },
    reducers: {
        addProduct(state, action) {
            const product = action.payload
            const idx = state.products.findIndex((el) => el.id === product.id)
            if (idx === -1) {
                state.products.push(product)
            }
            else {
                state.products[idx].count += product.count
            }
        },
        deleteProduct(state, action) {
            const productId = action.payload
            const delIndex = state.products.findIndex((el) => el.id === productId)
            if (state.products[delIndex].count > 1) {
                state.products[delIndex].count--
            }
            else {
                state.products = state.products.slice(0, delIndex).concat(state.products.slice(delIndex + 1))
            }
        }
    }
})

export const cartContentSelector = (state) => state.cart.products
export const { addProduct, deleteProduct } = cartSlice.actions
export default cartSlice.reducer