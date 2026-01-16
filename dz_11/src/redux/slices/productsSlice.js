import { createSlice } from "@reduxjs/toolkit";
import { products } from '../../data/products.js'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: products,
        filter: '',
    },
    reducers: {
        addProduct: (state, action) => {
            const newProduct = {
                ...action.payload,
                id: state.items.length > 0
                    ? Math.max(...state.items.map(p => p.id)) + 1
                    : 1
            };
            state.items.push(newProduct);
        },
        changeFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const { addProduct, changeFilter } = productsSlice.actions

export default productsSlice.reducer