import { configureStore } from '@reduxjs/toolkit';
import { coinGeckoApi } from '../../entities/coin/api/coinGeckoApi';
import authReducer from '../../features/auth/model/authSlice'
import languageReducer from '../../features/language/model/languageSlice';

export const store = configureStore({
    reducer: {
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
        auth: authReducer,
        language: languageReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coinGeckoApi.middleware)
})