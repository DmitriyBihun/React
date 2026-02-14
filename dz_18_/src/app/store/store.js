import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../features/auth/api/authApi";
import authReducer from '../../features/auth/api/authSlice'
import { productApi } from "../../entities/product/api/productApi";
import { cartApi } from "../../entities/cart/api/cartApi";
import { favouritesApi } from "../../entities/favourite/api/favouritesApi";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [favouritesApi.reducerPath]: favouritesApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        authApi.middleware,
        productApi.middleware,
        cartApi.middleware,
        favouritesApi.middleware)
})